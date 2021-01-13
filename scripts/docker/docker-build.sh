#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Script variables
NETWORK_NAME=rtdashboard

# Create Docker Network if does not exist
docker network create $NETWORK_NAME

# Stop bls & dao Docker containers, if running
echo -e "\nStoping BLS Docker container..."
docker stop bls
echo -e "\nStoping DAO Docker container..."
docker stop dao

# Remove Docker images bls & dao if exists
echo -e "\nRemoving BLS Docker image:"
docker rmi bls
echo -e "\nRemoving DAO Docker image:"
docker rmi dao

# Moving to server directory
cd `dirname "$0"`
cd ..

# Build Business Logic Service (BLS) Docker image
cd bls
echo -e "\nBuilding BLS Docker image:"
docker build -t bls .

# Build Data Access Object (DAO) Docker image
cd ../dao
echo -e "\nBuilding DAO Docker image:"
docker build -t dao .

cd ..

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