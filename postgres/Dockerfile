# The images postgres:alpine-13.2 does not work on ARM achitecture (e.g. Raspberry Pi)
# On an ARM architecture, use postgres:13.2
FROM postgres:13.2

# COPY .sql files to create tables on build
# https://stackoverflow.com/questions/38713597/create-table-in-postgresql-docker-image
COPY ./sql/*.sql /docker-entrypoint-initdb.d/