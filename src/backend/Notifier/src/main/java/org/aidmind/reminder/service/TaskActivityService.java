package org.aidmind.reminder.service;

import org.aidmind.reminder.model.TaskActivity;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.enterprise.context.Dependent;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@RegisterRestClient
@Dependent
public interface TaskActivityService {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    TaskActivity create(TaskActivity taskActivity);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    TaskActivity getById(@PathParam("taskActivityId") Integer taskActivityId);

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    TaskActivity update(@PathParam("taskActivityId") Integer taskActivityId, TaskActivity taskActivity);
}
