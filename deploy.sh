#!/bin/bash

git pull;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-service;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-client;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-nginx;
