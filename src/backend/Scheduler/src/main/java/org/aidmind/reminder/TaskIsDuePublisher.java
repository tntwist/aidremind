package org.aidmind.reminder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aidmind.reminder.model.Task;
import org.apache.qpid.jms.JmsConnectionFactory;
import org.eclipse.microprofile.config.ConfigProvider;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import javax.jms.*;

public class TaskIsDuePublisher implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        Connection connection = null;
        try {
            connection = createConnection();
            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue("task-is-due");
            MessageProducer producer = session.createProducer(queue);
            Task task = (Task) jobExecutionContext.getJobDetail().getJobDataMap().get("task");
            ObjectMapper objectMapper = new ObjectMapper();
            producer.send(session.createTextMessage(objectMapper.writeValueAsString(task)));
        } catch (JMSException | JsonProcessingException e) {
            throw new JobExecutionException(e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException e) {
                    throw new JobExecutionException(e);
                }
            }
        }
    }

    private Connection createConnection() throws JMSException {
        String connectionUrl = ConfigProvider.getConfig().getValue("quarkus.qpid-jms.url", String.class);
        Connection connection = null;
        ConnectionFactory connectionFactory = new JmsConnectionFactory(connectionUrl);
        connection = connectionFactory.createConnection();
        return connection;
    }
}
