package org.aidmind.reminder.model;

public class Subscription {
        private int subscriptionId;
        private int userId;
        private int taskId;

    public Subscription(int subscriptionId, int userId, int taskId) {
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.taskId = taskId;
    }

    public int getSubscriptionId() {
        return subscriptionId;
    }

    public int getUserId() {
        return userId;
    }

    public int getTaskId() {
        return taskId;
    }
}
