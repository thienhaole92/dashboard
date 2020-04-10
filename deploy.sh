#!/bin/sh
 
git pull origin master
sudo docker build -t sweenow-dashboard .
sudo docker stop sweenow-dashboard
sudo docker rm sweenow-dashboard
sudo docker run -d -p 4000:8080 --name sweenow-dashboard sweenow-dashboard:latest