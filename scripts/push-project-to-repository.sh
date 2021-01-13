#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Moving to server directory
cd `dirname "$0"`
cd ..

# Compulsory commit message
while [ -z "$commitMessage" ]
do
   echo -n "Please enter a commit message: "
   read commitMessage
done

# Upload the project to the repository
git add .
git commit -m "$commitMessage "
git push