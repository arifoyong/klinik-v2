FROM mysql:8.0

COPY ./create-local-db.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/create-local-db.sql" ]