#!/bin/bash

fails=''

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

docker-compose -f docker-compose.yml -f docker-compose.ci.yml run metagenscope-service python manage.py test
inspect $? metagenscope-service

docker-compose -f docker-compose.yml -f docker-compose.ci.yml run e2e npm test
inspect $? e2e

if [ -n "${fails}" ];
  then
    echo "Tests failed: ${fails}"
    exit 1
  else
    echo "Tests passed!"
    exit 0
fi
