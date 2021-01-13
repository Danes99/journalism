#!/bin/bash
# Does it have execute permissions? Try a chmod +x scriptname and then ./scriptname
clear

# Force overwrite
git fetch origin master
git reset --hard origin/master

# https://itsyndicate.org/blog/how-to-use-git-force-pull-properly/