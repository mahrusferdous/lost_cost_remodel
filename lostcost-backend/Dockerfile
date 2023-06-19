FROM openjdk:11-jdk-alpine

COPY target/my-app.jar /app/my-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/my-app.jar"]