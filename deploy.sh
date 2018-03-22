#!/bin/bash

set -x;
docker-compose -f docker-compose.prod.yml pull;
docker-compose -f docker-compose.prod.yml run metagenscope-service python manage.py db upgrade;
docker-compose -f docker-compose.prod.yml up --no-deps -d --force-recreate;
