package org.aidmind.reminder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aidmind.reminder.model.Subscription;
import org.aidmind.reminder.model.Task;
import org.aidmind.reminder.model.TaskActivity;
import org.aidmind.reminder.service.SubscriptionService;
import org.aidmind.reminder.service.TaskActivityService;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.jms.*;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/subscribe/{userId}")
public class PushNotificationResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(PushNotificationResource.class);

    Map<Long, Session> sessions = new ConcurrentHashMap<>();

    @Inject
    ObjectMapper objectMapper;
    @RestClient
    @Inject
    SubscriptionService subscriptionService;
    @RestClient
    @Inject
    TaskActivityService taskActivityService;
    @Inject
    ConnectionFactory connectionFactory;


    @OnOpen
    public void onOpen(final Session session, @PathParam("userId") final Long userId) {
        this.sessions.put(userId, session);
        this.sessions.get(userId).getAsyncRemote().sendText("Succesfully subscribed for PushNotifications");
    }

    @Incoming("task-is-due")
    public void notifySubscribers(final String taskJson) {
        try {
            final Task task = this.objectMapper.readValue(taskJson, Task.class);
            LOGGER.info("Fetching taskActivity...");
            final TaskActivity taskActivity = this.taskActivityService.create(new TaskActivity(null, task.getTaskId(), null, new Date(), null));
            LOGGER.info("Fetched taskActivity.");
            final String taskActivityJson = this.objectMapper.writeValueAsString(taskActivity);
            LOGGER.info("Fetching subscriptions...");
            final List<Subscription> subscriptions = this.subscriptionService.getByTaskId(task.getTaskId());
            LOGGER.info("Fetched subscriptions");
            subscriptions.stream().map(Subscription::getUserId).forEach(userId -> {
                this.sessions.get(userId).getAsyncRemote().sendText(taskActivityJson);
            });
        } catch (final JsonProcessingException e) {
            LOGGER.error("Object could not be (de)serialized.", e);
        } catch (final WebApplicationException e) {
            final int respStatus = e.getResponse().getStatus();
            final Response.StatusType respStatusType = e.getResponse().getStatusInfo();
            final String respBody = (String) e.getResponse().getEntity();
            LOGGER.error(respStatus + ' ' + respStatusType.getReasonPhrase());
            LOGGER.error(respBody, e);
        }
    }

    @OnMessage
    public void onMessage(final Session session, @PathParam("userId") final Long userId, final String taskActivityJson) throws JMSException {
        final Connection connection = this.connectionFactory.createConnection();
        final javax.jms.Session jmsSession = connection.createSession(false, javax.jms.Session.AUTO_ACKNOWLEDGE);
        final Queue queue = jmsSession.createQueue("task-accepted");
        final MessageProducer producer = jmsSession.createProducer(queue);
        producer.send(jmsSession.createTextMessage(taskActivityJson));
    }

    @Incoming("task-accepted")
    public void acceptTask(final TaskActivity taskActivity) throws JsonProcessingException {
        final TaskActivity storedTaskActivity = this.taskActivityService.getById(taskActivity.getTaskActivityId());
        String taskActivityJson = "";
        if (null == storedTaskActivity.getUserId()) {
            final TaskActivity updatedTaskActivity = this.taskActivityService.update(taskActivity.getTaskActivityId(), taskActivity);
            taskActivityJson = this.objectMapper.writeValueAsString(updatedTaskActivity);
        } else {
            taskActivityJson = this.objectMapper.writeValueAsString(storedTaskActivity);
        }
        this.sessions.get(taskActivity.getUserId()).getAsyncRemote().sendText(taskActivityJson);
    }

}
