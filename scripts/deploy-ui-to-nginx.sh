#!/bin/bash
# Does it have execute permissions?
# Try a chmod +x scriptname and then ./scriptname
clear

# Moving to ui directory
cd `dirname "$0"`
cd ../ui

# Does package-lock.json exist ?
FILE=./package-lock.json
if test -f "$FILE"; then
    echo "$FILE exists."
    # The npm ci command, helps provide faster, 
    # reliable, reproducible builds for production environments.
    # npm ci
else
  echo "$FILE does not exist."
  npm i
fi

# Does node_modules exist ?
FOLDER=./node_modules
if test -r "$FOLDER"; then
    echo "$FOLDER exists."
else
  echo "$FILE does not exist."
  npm ci
fi

# Build compiled React.js Application
npm run build

# Move compiled React.js application (build) 
# from ./ui to the ./bls/public/build
# remame it ./ui
cd ../nginx
rm -rf ./nginx
mv ../ui/build ./

# https://reactjs.org/docs/optimizing-performance.html