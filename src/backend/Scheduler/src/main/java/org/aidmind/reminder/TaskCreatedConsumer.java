package org.aidmind.reminder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aidmind.reminder.model.Task;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.ZoneId;
import java.util.Date;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

@ApplicationScoped
public class TaskCreatedConsumer {

    private final Scheduler scheduler;
    private final ObjectMapper objectMapper;

    @Inject
    public TaskCreatedConsumer(final Scheduler scheduler, final ObjectMapper objectMapper) {
        this.scheduler = scheduler;
        this.objectMapper = objectMapper;
    }

    @Incoming("task-created")
    public void scheduleTask(final Task task) throws JsonProcessingException, SchedulerException {

        final String taskJson = this.objectMapper.writeValueAsString(task);

        final String jobIdentity = task.getId() + '_' + task.getTitle() + "_job";
        final JobDetail job = newJob(TaskIsDuePublisher.class)
                .withIdentity(jobIdentity)
                .usingJobData("task", taskJson).build();

        final Date startDate = Date.from(task.getStartDate().atZone(ZoneId.systemDefault()).toInstant());
        final Date endDate = Date.from(task.getEndDate().atZone(ZoneId.systemDefault()).toInstant());
        final Trigger trigger = newTrigger()
                .withIdentity(task.getId() + '_' + task.getTitle() + "_trigger")
                .withSchedule(cronSchedule(task.getFrequency()))
                .startAt(startDate)
                .endAt(endDate)
                .forJob(jobIdentity)
                .build();

        this.scheduler.scheduleJob(job, trigger);
    }
}
