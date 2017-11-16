# MetaGenScope

> MetaGenScope microservice stack.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

MetaGenScope runs as a collection of Docker microservices. This makes it very easy to ensure a consistent environment across development and deployment machines. You will need to have [Docker installed](https://docs.docker.com/engine/installation/) on your system to continue.

### Installing and Running

The first thing you will need to do is build the Docker image locally. This will take a few minutes on first run but will be much faster after components are cached.

```sh
$ docker-compose build
```

Start the container as a daemon:

```sh
$ docker-compose up -d
```

Grab the IP address of the machine (usually `192.168.99.100`):

```sh
$ docker-machine ip dev
```

And finally, connect to the machine at `https://192.168.99.100:5001/ping`.

## Deploying

Switch to production Docker machine ([create it](https://docs.docker.com/machine/examples/ocean/) first, if you haven't):

```sh
$ docker-machine env production
$ eval $(docker-machine env production)
```

Set production environment variables:

```sh
$ cp production-variables.env.dist .env
$ vi .env
```

Spin up the containers, create the database, seed, and run the tests to make sure it's all working:

```sh
$ docker-compose -f docker-compose-prod.yml up -d
$ docker-compose -f docker-compose-prod.yml run metagenscope-service python manage.py recreate_db
$ docker-compose -f docker-compose-prod.yml run metagenscope-service python manage.py seed_db
$ docker-compose -f docker-compose-prod.yml run metagenscope-service python manage.py test
```

## Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository][project-tags].

## Release History

See [`CHANGELOG.md`](CHANGELOG.md)

## Authors

* **Benjamin Chrobot** - _Initial work_ - [bchrobot](https://github.com/bchrobot)

See also the list of [contributors][contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [`LICENSE.md`](LICENSE.md) file for details.


[project-tags]: https://github.com/bchrobot/metagenscope-main/tags
[contributors]: https://github.com/bchrobot/metagenscope-main/contributors
