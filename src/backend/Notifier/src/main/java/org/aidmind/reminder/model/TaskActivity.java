package org.aidmind.reminder.model;

import java.util.Date;

public class TaskActivity {

    private final Integer taskActivityId;
    private final Integer taskId;
    private final Integer userId;
    private final Date dueToDate;

    public TaskActivity(final Integer taskActivityId, final Integer taskId, final Integer userId, final Date dueToDate) {
        this.taskActivityId = taskActivityId;
        this.taskId = taskId;
        this.userId = userId;
        this.dueToDate = dueToDate;
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

    public Date getDueToDate() {
        return this.dueToDate;
    }
}
