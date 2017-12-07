#!/bin/bash

set -x;
docker-compose -f docker-compose.prod.yml up --no-deps -d metagenscope-service;
docker-compose -f docker-compose.prod.yml up --no-deps -d web-service;
docker-compose -f docker-compose.prod.yml up --no-deps -d nginx;
