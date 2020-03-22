package org.aidmind.reminder.service;

import org.aidmind.reminder.model.Subscription;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.enterprise.context.Dependent;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.util.List;

@RegisterRestClient
@Dependent
public interface SubscriptionService {
    @GET
    @Produces("application/json")
    List<Subscription> getByTaskId(@QueryParam("taskId") Integer taskId);
}
