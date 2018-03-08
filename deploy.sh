#!/bin/bash

set -x;
docker-compose -f docker-compose.prod.yml pull;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-service;
docker-compose -f docker-compose.prod.yml exec metagenscope-service python manage.py db upgrade;
docker-compose -f docker-compose.prod.yml up --no-deps -d web-service;
docker-compose -f docker-compose.prod.yml up --no-deps --force-recreate -d nginx;
