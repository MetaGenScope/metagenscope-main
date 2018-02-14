# MetaGenScope

> MetaGenScope microservice stack.

MetaGenScope runs as a collection of microservices using Docker. This makes it very easy to ensure a consistent environment across development and deployment machines.

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [What's Included](#whats-included)
1. [Running Locally](#running-locally)
1. [Testing](#testing)
    1. [Writing Tests](#writing-tests)
    1. [Standalone](#standalone)
    1. [Dockerized](#dockerized)
1. [Deploying](#deploying)
1. [Meta](#meta)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**Docker**

You will need to have [Docker installed](https://docs.docker.com/engine/installation/) on your system to continue.

You should create a `dev` Docker machine to work on:

```sh
$ docker-machine create -d virtualbox dev
$ eval "$(docker-machine env dev)"
```

Make note of the IP address of the machine (usually `192.168.99.100`):

```sh
$ docker-machine ip dev
```

**Github Token**

You will need to get a [Github token](https://github.com/settings/tokens) to be allow Docker Compose to access the MetaGenScope image definitions.

### What's Included

**Compose files**

+ `docker-compose.yml` - The base Compose file
+ `docker-compose.swagger.yml` - Adds swagger-ui service for API documentation.
+ `docker-compose.ci.yml` - Adds end-to-end test runner service.
+ `docker-compose.prod.yml` - Tweaks base settings to be production-ready.

**Nginx Image**

`./nginx` contains two custom Nginx Docker images each with MetaGenScope `nginx.conf` site configurations. `Dockerfile-local` serves assets over `http://`. `Dockerfile` serves assets over `https://` and is configured for use with the staging site, `emptyfish.net`.

**End-to-End Tests**

`./e2e` contains end-to-end tests written with [Testcafe](https://github.com/DevExpress/testcafe) as well as service definition for running from within Docker Compose swarm.

**CircleCI**

`./.circleci` contains CircleCI end-to-end test configuration.

## Running Locally

To develop locally, pull the three project repos into the same directory. This way changes made to the server or client codebase will trigger a rebuild in the respective local docker machine containers.

```
+-- MetaGenScope
|   +-- metagenscope-main
|   +-- metagenscope-server
|   +-- metagenscope-client
|   +-- metagenscope-worker
```

The first thing you will need to do is build the Docker image locally. This will take a few minutes on first run but will be much faster after components are cached.

Configure the environment:

```sh
$ export REACT_APP_METAGENSCOPE_SERVICE_URL=http://192.168.99.100:5001
```

Build the images:

```sh
$ docker-compose build
```

Start the containers:

```sh
$ docker-compose up -d
```

And finally, connect to the machine at `https://192.168.99.100/`.

## Testing

End-to-end tests live in `./e2e`:

```sh
$ cd e2e
```

To develop or run tests you will need to instal the node dependencies:

```sh
$ npm install
```

### Writing Tests

To begin writing tests either check out [Testcafe's documentation](https://devexpress.github.io/testcafe/documentation/getting-started/#creating-a-test) or take a look at existing tests in `./e2e/tests`.

Lint your code before committing (this will checked by the CI):

```sh
$ npm run lint
```

### Standalone

End-to-end tests can be run standalone against an already-running stack (development, staging, or production).

Point the tests at the MetaGenScope stack:

```sh
$ export TEST_URL=http://staging-server
```

Execute tests:

```sh
$ cd e2e
$ npm install
$ npm run test
```

### Dockerized

To spin up a MetaGenScope stack and have the end-to-end test-runner service execute the tests make sure you are in the root directory of this repo.

Configure the environment:

```sh
$ export GITHUB_TOKEN=YourGithubTokenHere
$ export REACT_APP_METAGENSCOPE_SERVICE_URL=http://192.168.99.100
```

Start Docker:

```sh
$ docker-compose -f docker-compose.ci.yml up --build -d
```

Kick off test-runner service:

```sh
$ sh test.sh
```

## Deploying

First, connect to the production machine and clone this repository.

Next, set production environment variables in a `.env` file:

```
GITHUB_TOKEN=YourGithubTokenHere
SECRET_KEY=AVerySecretKeyIndeed
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
REACT_APP_METAGENSCOPE_SERVICE_URL=http://metagenscope.com
```

Spin up the containers:

```sh
$ docker-compose -f docker-compose.prod.yml up -d --build
```

Create and seed the database the first time it is deployed:

```sh
$ docker-compose -f docker-compose.prod.yml run metagenscope-service python manage.py recreate_db
$ docker-compose -f docker-compose.prod.yml run metagenscope-service python manage.py seed_db
```

## Meta

### Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository][project-tags].

### Release History

See [`CHANGELOG.md`](CHANGELOG.md)

### Authors

* **Benjamin Chrobot** - _Initial work_ - [bchrobot](https://github.com/bchrobot)

See also the list of [contributors][contributors] who participated in this project.

### License

This project is licensed under the MIT License - see the [`LICENSE.md`](LICENSE.md) file for details.


[project-tags]: https://github.com/bchrobot/metagenscope-main/tags
[contributors]: https://github.com/bchrobot/metagenscope-main/contributors
