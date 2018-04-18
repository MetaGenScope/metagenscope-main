# MetaGenScope

> MetaGenScope microservice stack.

MetaGenScope runs as a collection of microservices using Docker. This makes it very easy to ensure a consistent environment across development and deployment machines.

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    1. [What's Included](#whats-included)
1. [Running Locally](#running-locally)
    1. [Docker Machine](#docker-machine)
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

You will need to have the Docker suite installed:

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Docker Machine](https://docs.docker.com/machine/install-machine/) (optional)

### What's Included

**Compose files**

+ `docker-compose.yml` - The base Compose file
+ `docker-compose.swagger.yml` - Adds swagger-ui service for API documentation.
+ `docker-compose.prod.yml` - Tweaks base settings to be production-ready.

**Nginx Image**

`./nginx` contains a custom Nginx Docker image with a MetaGenScope `nginx.conf` site configuration. This serves the application stack over `http://` on port 8080 -- the expectation being that a TLS endpoint (ex. Nginx reverse proxy) will sit in front of MetaGenScope.

**CircleCI**

`./.circleci` contains CircleCI configuration to continuously deploy to the staging server, www.emptyfish.net.

## Running Locally

To develop locally, pull the three project repos into the same directory. This way changes made to the server or client codebase will trigger a rebuild in the respective local docker machine containers.

```
+-- MetaGenScope
|   +-- metagenscope-main
|   +-- metagenscope-server
|   +-- metagenscope-client
```

The first thing you will need to do is build the Docker image locally. This will take a few minutes on first run but will be much faster after component image layers are cached.

Optional: explicitly set back-end service URL:

```sh
$ export REACT_APP_METAGENSCOPE_SERVICE_URL=http://localhost:8080
```

Build the images:

```sh
$ docker-compose build
```

Start the containers:

```sh
$ docker-compose up -d
```

Provision the database:

```sh
$ docker-compose run metagenscope-service python manage.py recreate_db
$ docker-compose run metagenscope-service python manage.py seed_db
```

And finally, connect to the machine at `http://localhost:8080/`.

### Docker Machine

Optionally, you can create a `dev` Docker machine to work on:

```sh
$ docker-machine create -d virtualbox dev
$ eval "$(docker-machine env dev)"
```

Make note of the IP address of the machine (usually `192.168.99.100`):

```sh
$ docker-machine ip dev
```

Then continue with the steps above:

```sh
$ export REACT_APP_METAGENSCOPE_SERVICE_URL=http://192.168.99.100:8080
$ docker-compose build
$ docker-compose up -d
$ docker-compose run metagenscope-service python manage.py recreate_db
$ docker-compose run metagenscope-service python manage.py seed_db
```

Connecting to the machine at `http://192.168.99.100:8080/`.

## Development

MetaGenScope uses the GitFlow branching strategy along with Pull Requests for code reviews. Check out [this post](https://devblog.dwarvesf.com/post/git-best-practices/) by the Dwarves Foundation for more information.

## Testing

Testing is done per-service in their own repositories. This allows each service to be tested and deployed independent of the main repository.

## Deploying

First, connect to the production machine and clone _just this repository_ (you do not need `metagenscope-server` and `metagenscope-client`).

Next, set production environment variables in a `.env` file:

```
SECRET_KEY=AVerySecretKeyIndeed
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
MONGO_INITDB_ROOT_USERNAME=metagenscope
MONGO_INITDB_ROOT_PASSWORD=metagenscope
```

Spin up the containers:

```sh
$ docker-compose -f docker-compose.prod.yml up -d
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
