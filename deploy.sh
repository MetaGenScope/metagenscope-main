#!/bin/bash

set -x;
docker-compose -f docker-compose.prod.yml down;
docker-compose -f docker-compose.prod.yml pull;
docker-compose -f docker-compose.prod.yml run --rm metagenscope-service python manage.py db upgrade;

# --rm only removes metagenscope-service but we need all to be down before recreating
docker-compose -f docker-compose.prod.yml down;

docker-compose -f docker-compose.prod.yml up --no-deps -d --force-recreate;
