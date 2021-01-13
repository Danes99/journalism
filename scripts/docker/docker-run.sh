#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Script variables
NETWORK_NAME=rtdashboard

# Create Docker Network, if does not exist
docker network create $NETWORK_NAME

# Stop bls & dao Docker containers, if running
echo -e "\nStoping BLS Docker container..."
docker stop bls
echo -e "\nStoping DAO Docker container..."
docker stop dao

# Run DAO container
docker run \
  --name=dao \
  --rm \
  -d \
  --network=$NETWORK_NAME \
  -p 81:81 \
  dao

# Run BLS container
docker run \
  --name=bls \
  --rm \
  -d \
  --network=$NETWORK_NAME \
  -p 80:80 \
  -e DAO_BASE_URL=dao \
  bls


# The -d flag is for detaching the docker app
# and put it in the background.
# -d --> non blocking