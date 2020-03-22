package org.aidmind.reminder.model;

public class TaskActivity {

    private final Integer taskActivityId;
    private final Integer taskId;
    private final Integer userId;

    public TaskActivity(final Integer taskActivityId, final Integer taskId, final Integer userId) {
        this.taskActivityId = taskActivityId;
        this.taskId = taskId;
        this.userId = userId;
    }

    public Integer getTaskActivityId() {
        return this.taskActivityId;
    }

    public Integer getTaskId() {
        return this.taskId;
    }

    public Integer getUserId() {
        return this.userId;
    }
}
