package org.aidmind.reminder.model;

import java.time.LocalDateTime;

public class Task {
    private final Integer taskId;
    private final Integer categoryId;
    private final String title;
    private final String description;
    private final String frequency;
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;

    public Task(final Integer taskId, final Integer categoryId, final String title, final String description, final String frequency, final LocalDateTime startDate, final LocalDateTime endDate) {
        this.taskId = taskId;
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getTaskId() {
        return this.taskId;
    }

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public LocalDateTime getStartDate() {
        return this.startDate;
    }

    public LocalDateTime getEndDate() {
        return this.endDate;
    }
}
