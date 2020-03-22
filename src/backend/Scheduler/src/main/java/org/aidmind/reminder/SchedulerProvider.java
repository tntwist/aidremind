package org.aidmind.reminder;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Produces;

@ApplicationScoped
public class SchedulerProvider {

    @Produces
    public Scheduler scheduler() throws SchedulerException {
        final SchedulerFactory schedulerFactory = new org.quartz.impl.StdSchedulerFactory();
        final Scheduler scheduler = schedulerFactory.getScheduler();
        scheduler.start();
        return scheduler;
    }
}
