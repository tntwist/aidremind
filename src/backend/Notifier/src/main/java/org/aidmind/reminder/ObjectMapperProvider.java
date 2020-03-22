package org.aidmind.reminder;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Produces;

@ApplicationScoped
public class ObjectMapperProvider {

    @Produces
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
