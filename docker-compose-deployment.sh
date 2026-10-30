#!/bin/bash

set -eu

source .env
IMAGE_NAME="$DOCKER_HUB_USER/public_repo"

function display_arg_error {
  echo "[INFO] You would either build, tag&publish, run or stop locally: "
  echo -e "$0 build"
  echo -e "$0 publish"
  echo -e "$0 run"
  echo -e "$0 down"
  echo "[INFO] On cloud, we only make a straight run after app update"
  echo -e "$0 cloud"
}

function update_application {
  docker compose -f docker-compose.dev.yml exec django python manage.py makemigrations authentication --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py makemigrations blog --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py migrate --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py collectstatic --no-input --clear
  docker compose -f docker-compose.dev.yml exec django python manage.py init_app 
}

if [ ${#args[@]} -eq 0 ]
then
  display_arg_error
else
  case $1 in
    "build" )
      echo "[INFO] We (re)build images and (re)initialize the application."
      docker compose -f docker-compose.dev.yml down -v
      sleep 1s
      docker compose -f docker-compose.dev.yml build
      sleep 1s
      ;;
    "publish" )
      echo "[INFO] We tag and (re)publish images on DockerHub."
      docker login -u $DOCKER_HUB_USER docker.io --password $DOCKER_HUB_PASSWORD
      docker tag dummy_django_app_on_render-nginx:latest $IMAGE_NAME:dummy_django_app_on_render_nginx
      docker tag dummy_django_app_on_render-django:latest $IMAGE_NAME:dummy_django_app_on_render_django
      docker push $IMAGE_NAME:dummy_django_app_on_render_django
      docker push $IMAGE_NAME:dummy_django_app_on_render_nginx
      ;;
    "run" )
      if [[ "$RUNNING_ENV" == "dev" ]]; then
        echo "[INFO] We (re)start application with local images."
        docker compose -f docker-compose.dev.yml down -v
        docker compose -f docker-compose.dev.yml up -d
        update_application
      elif [[ "$RUNNING_ENV" == "prod" ]]; then
        echo "[INFO] We (re)start application with the dockerhub images."
        docker compose -f docker-compose.prod.yml down -v
        docker compose -f docker-compose.prod.yml up -d
        update_application
      else
        echo "[ERROR] RUNNING_ENV variable is not set correctly in .env file. It should be either 'dev' or 'prod'."
        exit 1
      fi
    	;;
    "cloud" )
      # Création d'un environnement virtuel qui pourra être utilisé par Render
      python -m venv venv
      source venv/bin/activate
      pip install -r dummy_django_blog/requirements.txt
      cd ./dummy_django_blog/
      python manage.py makemigrations authentication --noinput
      python manage.py makemigrations blog --noinput
      python manage.py migrate --noinput
      python manage.py collectstatic --no-input --clear
      python manage.py init_app
      gunicorn dummy_django_blog.wsgi:application --bind 0.0.0.0:8000
      ;;
    "down_dev" )
      docker compose -f docker-compose.dev.yml down -v
      ;;
    "down_prod" )
      docker compose -f docker-compose.prod.yml down -v
      ;;
  esac
fi
