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
}
