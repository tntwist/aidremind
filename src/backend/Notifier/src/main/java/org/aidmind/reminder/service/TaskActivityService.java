package org.aidmind.reminder.service;

import org.aidmind.reminder.model.TaskActivity;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.enterprise.context.Dependent;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;

@RegisterRestClient
@Dependent
public interface TaskActivityService {
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    TaskActivity create(TaskActivity taskActivity);
}
