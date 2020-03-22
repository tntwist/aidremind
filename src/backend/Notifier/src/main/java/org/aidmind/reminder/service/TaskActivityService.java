package org.aidmind.reminder.service;

import org.aidmind.reminder.model.TaskActivity;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.enterprise.context.Dependent;
import javax.ws.rs.*;

@RegisterRestClient
@Dependent
public interface TaskActivityService {
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    TaskActivity create(TaskActivity taskActivity);

    @GET
    @Produces("application/json")
    TaskActivity getById(@PathParam("taskActivityId") Integer taskActivityId);

    @PUT
    @Produces("application/json")
    @Consumes("application/json")
    TaskActivity update(@PathParam("taskActivityId") Integer taskActivityId, TaskActivity taskActivity);
}
