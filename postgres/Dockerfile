FROM postgres:13-alpine

# COPY .sql files to create tables on build
# https://stackoverflow.com/questions/38713597/create-table-in-postgresql-docker-image
COPY ./sql/*.sql /docker-entrypoint-initdb.d/