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

import javax.inject.Inject;
import javax.jms.*;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/subscribe/{userId}")
public class PushNotificationResource {
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
    public void onOpen(Session session, @PathParam("userId") Long userId) {
        sessions.put(userId, session);
        sessions.get(userId).getAsyncRemote().sendText("Succesfully subscribed for PushNotifications");
    }

    @Incoming("task-is-due")
    public void notifySubscibers(Task task) throws JsonProcessingException {
        TaskActivity taskActivity = this.taskActivityService.create(new TaskActivity(null, task.getTaskId(), null));
        String taskActivityJson = objectMapper.writeValueAsString(taskActivity);
        List<Subscription> subscriptions = this.subscriptionService.getByTaskId(task.getTaskId());
        subscriptions.stream().map(Subscription::getUserId).forEach(userId -> {
            sessions.get(userId).getAsyncRemote().sendText(taskActivityJson);
        });
    }

    @OnMessage
    public void onMessage(Session session, @PathParam("userId") Long userId, String taskActivityJson) throws JMSException {
        Connection connection = connectionFactory.createConnection();
        javax.jms.Session jmsSession = connection.createSession(false, javax.jms.Session.AUTO_ACKNOWLEDGE);
        Queue queue = jmsSession.createQueue("task-accepted");
        MessageProducer producer = jmsSession.createProducer(queue);
        producer.send(jmsSession.createTextMessage(taskActivityJson));
    }

    @Incoming("task-accepted")
    public void acceptTask(TaskActivity taskActivity) throws JsonProcessingException {
        TaskActivity storedTaskActivity = this.taskActivityService.getById(taskActivity.getTaskActivityId());
        String taskActivityJson = "";
        if (null == storedTaskActivity.getUserId()) {
            TaskActivity updatedTaskActivity = this.taskActivityService.update(taskActivity.getTaskActivityId(), taskActivity);
            taskActivityJson = this.objectMapper.writeValueAsString(updatedTaskActivity);
        } else {
            taskActivityJson = this.objectMapper.writeValueAsString(storedTaskActivity);
        }
        sessions.get(taskActivity.getUserId()).getAsyncRemote().sendText(taskActivityJson);
    }

}
