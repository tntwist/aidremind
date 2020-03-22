package org.aidmind.reminder.model;

public class Subscription {
    private final int subscriptionId;
    private final int userId;
    private final int taskId;

    public Subscription(final int subscriptionId, final int userId, final int taskId) {
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.taskId = taskId;
    }

    public int getSubscriptionId() {
        return this.subscriptionId;
    }

    public int getUserId() {
        return this.userId;
    }

    public int getTaskId() {
        return this.taskId;
    }
}