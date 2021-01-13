#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Moving to front-end directory
cd `dirname "$0"`
cd ../front

# Does package-lock.json exist ?
FILE=./package-lock.json
if test -f "$FILE"; then
    echo "$FILE exists."
    # The npm ci command, helps provide faster, 
    # reliable, reproducible builds for production environments.
    npm ci
else
  echo "$FILE does not exist."
  npm i
fi

# Build compiled React.js Application
npm run build

# Move compiled React.js application (build) 
# from ./ui to the ./bls/public/build
# remame it ./ui
cd ../bls/public/build
rm -rf dashboard/
mv ../../../front/build ./dashboard