FROM rabbitmq:3.8-management

ENV RABBITMQ_DEFAULT_USER=test
ENV RABBITMQ_DEFAULT_PASS=test

EXPOSE 5672
EXPOSE 15672