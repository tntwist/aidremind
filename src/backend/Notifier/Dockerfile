FROM maven:3.6.3-jdk-11 as build_notifier
COPY backend/Notifier/src /usr/src/notifier/src
COPY backend/Notifier/pom.xml /usr/src/notifier
RUN mvn -f /usr/src/notifier/pom.xml package

FROM gcr.io/distroless/java:11
COPY --from=build_notifier /usr/src/notifier/target/notifier-1.0.0-SNAPSHOT-runner.jar /usr/notifier/notifier-1.0.0-SNAPSHOT-runner.jar
EXPOSE 8083
ENTRYPOINT [ "java", "-jar", "/usr/notifier/notifier-1.0.0-SNAPSHOT-runner.jar" ]
