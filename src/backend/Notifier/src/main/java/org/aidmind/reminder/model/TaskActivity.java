package org.aidmind.reminder.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskActivity {

    private final Integer taskActivityId;
    private final Integer taskId;
    private final Integer userId;
    private final Date dueToDate;
    private final Date doneDate;

    public TaskActivity(final Integer taskActivityId, final Integer taskId, final Integer userId, final Date dueToDate, final Date doneDate) {
        this.taskActivityId = taskActivityId;
        this.taskId = taskId;
        this.userId = userId;
        this.dueToDate = dueToDate;
        this.doneDate = doneDate;
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

    public Date getDoneDate() {
        return this.doneDate;
    }
}
