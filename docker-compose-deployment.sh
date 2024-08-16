#!/bin/bash

IMAGE_NAME=memphistools/public_repo

args=("$@")
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
  export IS_TESTING=False
  docker compose -f docker-compose.dev.yml exec django python manage.py makemigrations authentication --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py makemigrations blog --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py migrate --noinput
  docker compose -f docker-compose.dev.yml exec django python manage.py collectstatic --no-input --clear
  docker compose -f docker-compose.dev.yml exec django python manage.py init_app
}

# Exécution conditionnelle basée sur les arguments fournis.
if [ ${#args[@]} -eq 0 ]
then
  display_arg_error
else
  case $1 in
    "build" )
      source .env
      echo "[INFO] We (re)build images and (re)initialize the application."
      docker compose -f docker-compose.dev.yml down -v
      sleep 1s
      docker compose -f docker-compose.dev.yml build
      sleep 1s
      ;;
    "publish" )
      source .env
      echo "[INFO] We tag and (re)publish images on DockerHub."
      docker login -u $DOCKER_HUB_USER docker.io --password $DOCKER_HUB_PASSWORD
      docker tag dummy_django_app_on_render-nginx:latest memphistools/public_repo:dummy_django_app_on_render_nginx
      docker tag dummy_django_app_on_render-django:latest memphistools/public_repo:dummy_django_app_on_render_django
      docker push memphistools/public_repo:dummy_django_app_on_render_django
      docker push memphistools/public_repo:dummy_django_app_on_render_nginx
      ;;
    "run_dev" )
      source .env
      echo "[INFO] We (re)start application with local images."
      docker compose -f docker-compose.dev.yml down -v
      docker compose -f docker-compose.dev.yml up -d
      update_application
    	;;
    "run_prod" )
      source .env
      echo "[INFO] We (re)start application with the dockerhub images."
      docker compose -f docker-compose.prod.yml down -v
      docker compose -f docker-compose.prod.yml up -d
      update_application
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
      export IS_TESTING=False
      python manage.py init_app
      echo "DEBUG RENDER SIR, DIR CONTENT BELOW"
      ls -l media
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
