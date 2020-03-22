package org.aidmind.reminder.model;

public class TaskActivity {

    private Integer taskActivityId;
    private Integer taskId;
    private Integer userId;

    public TaskActivity(Integer taskActivityId, Integer taskId, Integer userId) {
        this.taskActivityId = taskActivityId;
        this.taskId = taskId;
        this.userId = userId;
    }

    public Integer getTaskActivityId() {
        return taskActivityId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public Integer getUserId() {
        return userId;
    }
}
