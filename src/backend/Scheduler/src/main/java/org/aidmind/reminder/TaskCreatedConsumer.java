package org.aidmind.reminder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aidmind.reminder.model.Task;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.ZoneId;
import java.util.Date;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

@ApplicationScoped
public class TaskCreatedConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskCreatedConsumer.class);

    private final Scheduler scheduler;
    private final ObjectMapper objectMapper;

    @Inject
    public TaskCreatedConsumer(final Scheduler scheduler, final ObjectMapper objectMapper) {
        this.scheduler = scheduler;
        this.objectMapper = objectMapper;
    }

    @Incoming("tasks")
    public void scheduleTask(final String taskJson) {
        final Task task;
        try {
            task = this.objectMapper.readValue(taskJson, Task.class);
            final String jobIdentity = task.getTaskId() + '_' + task.getTitle() + "_job";
            final JobDetail job = this.createJob(taskJson, jobIdentity);
            final Date startDate = Date.from(task.getStartDate().atZone(ZoneId.systemDefault()).toInstant());
            final Date endDate = Date.from(task.getEndDate().atZone(ZoneId.systemDefault()).toInstant());
            final Trigger trigger = this.createTrigger(task, jobIdentity, startDate, endDate);
            this.scheduler.scheduleJob(job, trigger);
        }
        catch (JsonProcessingException e) {
            LOGGER.error("Could not deserialize " + taskJson, e);
        } catch (SchedulerException e) {
            LOGGER.error("Could not schedule job", e);
        }
    }

    private Trigger createTrigger(final Task task, final String jobIdentity, final Date startDate, final Date endDate) {
        return newTrigger()
                .withIdentity(task.getTaskId() + '_' + task.getTitle() + "_trigger")
                .withSchedule(cronSchedule(task.getFrequency()))
                .startAt(startDate)
                .endAt(endDate)
                .forJob(jobIdentity)
                .build();
    }

    private JobDetail createJob(final String taskJson, final String jobIdentity) {
        return newJob(TaskIsDuePublisher.class)
                .withIdentity(jobIdentity)
                .usingJobData("task", taskJson).build();
    }
}
