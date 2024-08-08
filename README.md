![Screenshot](https://img.shields.io/badge/python-v3.11-blue?logo=python&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/docker-v26.1.4-blue?logo=docker&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/django-v4.2-blue?logo=django&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/gunicorn-v22.0-blue?logo=gunicorn&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/render--blue?logo=render&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/circleci--blue?logo=circleci&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/coveralls--blue?logo=coveralls&logoColor=yellow)
[![Coverage Status](https://coveralls.io/repos/github/memphis-tools/dummy_django_app_on_render/badge.svg?branch=main)](https://coveralls.io/github/memphis-tools/dummy_django_app_on_render?branch=main)
[![CircleCI]()](https://dl.circleci.com/status-badge/redirect/gh/memphis-tools/dummy_django_app_on_render/tree/main)


# DUMMY APP FOR LEARNING PURPOSES

**This is dummy django blog application.**

In the cloud context, application is hosted on [Render](https://render.com/) as a Python app. Docker, Gunicorn, Nginx are not needed.

Because of a free plan we no static volumes. We use a dummy sqlite database. Also there are a lot of latencies.

Locally you will run the application using Docker (with Gunicorn and Nginx).

The CI-CD chain consists in using [Circle-ci](https://circleci.com/).

So a dummy Django application for learning purposes, to practise. Focus is set on the backend, do not pay attention to the frontend (HTML, CSS & Javascript).

Also more tests and logging will be added later on.

## TECHNOLOGIES
---------------
Python 3.11 and later

Sqlite3

Gunicorn

Nginx

Docker (docker-compose), DockerHub

Circle-CI

Coveralls

# HOW USE IT ?
    git clone https://github.com/memphis-tools/dummy_django_app_on_render.git

    cd dummy_django_app_on_render

    poetry install

    source $(poetry env info --path)/bin/activate

## EXECUTION PREQUISITES
For a local usage set an envrc file such like this:

    export SECRET_KEY="superSecretKey"
    export ALLOWED_HOSTS="192.168.1.5"
    export DEBUG=False
    export TIME_ZONE="Europe/Paris"
    export DOCKER_HUB_USER='yourDockerhubUsername'
    export DOCKER_HUB_PASSWORD='yourDockerhubPassword'
    export IS_TESTING=False

The Django settings.py will load the file (with load_dotenv).

## RUN IT
To avoid manual commands, use the dummy "docker-compose-deployment.sh".

To build the images locally:

    ./docker-compose-deployment.sh build

To publish the built images on Dockerhub:

    ./docker-compose-deployment.sh publish

To run the local images and stop app:

    ./docker-compose-deployment.sh run_dev

    ./docker-compose-deployment.sh down_dev

To run the Dockerhub images and stop app:

    ./docker-compose-deployment.sh run_prod

    ./docker-compose-deployment.sh down_prod

Once running locally you can reach the application at: http://localhost:5555/

The './docker-compose-deployment.sh cloud' command is only run by Render.

## TO TEST IT

    coverage run -m pytest dummy_django_blog/

    coverage report
