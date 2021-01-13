#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Script variables
NETWORK_NAME=rtdashboard

# Stop bls & dao Docker containers, if running
echo -e "\nStoping BLS Docker container..."
docker stop bls
echo -e "\nStoping DAO Docker container..."
docker stop dao