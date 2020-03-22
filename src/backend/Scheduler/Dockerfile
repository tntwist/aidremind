FROM maven:3.6.3-jdk-11 as build_scheduler
COPY backend/Scheduler/src /usr/src/scheduler/src
COPY backend/Scheduler/pom.xml /usr/src/scheduler
RUN mvn -f /usr/src/scheduler/pom.xml package

FROM gcr.io/distroless/java:11
COPY --from=build_scheduler /usr/src/scheduler/target/scheduler-1.0.0-SNAPSHOT-runner.jar /usr/scheduler/scheduler-1.0.0-SNAPSHOT-runner.jar
EXPOSE 8084
ENTRYPOINT [ "java", "-jar", "/usr/scheduler/scheduler-1.0.0-SNAPSHOT-runner.jar" ]
