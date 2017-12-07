#!/bin/bash

set -x;
git pull;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-service;
docker-compose -f docker-compose.prod.yml up --no-deps -d web-service;
docker-compose -f docker-compose.prod.yml up --no-deps -d nginx;
