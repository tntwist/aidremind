package org.aidmind.reminder.model;

import java.time.LocalDateTime;

public class Task {
    private long id;
    private long categoryId;
    private String title;
    private String description;
    private String frequency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Task(long id, long categoryId, String title, String description, String frequency, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public long getId() {
        return id;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getFrequency() {
        return frequency;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }
}
