"""Django settings"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
import dj_database_url


try:
    load_dotenv(".envrc")
except FileNotFoundError as err:
    print("File .envrc not found sir")
    sys.exit(1)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "0").lower() in ["1", "true"]

ALLOWED_HOSTS = [""]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
    # Database
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get('DATABASE_URL'),
            conn_max_age=600
        )
    }
else:
    if os.getenv("ALLOWED_HOSTS"):
        ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(",")
    else:
        ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
    # Database
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / ('db.sqlite3'),
        }
    }

CSRF_TRUSTED_ORIGINS = [f"http://{ALLOWED_HOSTS[0]}:5555"]

# Set a 15 * 60 duration for session cookie (15 minutes)
SESSION_COOKIE_AGE = os.getenv("SESSION_COOKIE_AGE", 900)
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# On fixe que le lien pour reset mot de passe, n'est valide que 5 minutes
PASSWORD_RESET_TIMEOUT = timedelta(minutes=5).total_seconds()

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "authentication",
    "blog",
    "django_bootstrap_icons",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "dummy_django_blog.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR.joinpath("templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "dummy_django_blog.context_processors.media_url"
            ],
        },
    },
]

WSGI_APPLICATION = "dummy_django_blog.wsgi.application"


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 6}
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
    {
        "NAME": "authentication.validators.MustContainsOneDigit",
    },
]

# Internationalization
LANGUAGE_CODE = "fr-fr"
TIME_ZONE = os.getenv("TIME_ZONE", "Europe/Paris")
USE_I18N = True
USE_TZ = False

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
MAX_UPLOAD_SIZE = 5242880
LOGIN_URL = "login"
LOGOUT_URL = "home"
LOGIN_REDIRECT_URL = "feed"
LOGOUT_REDIRECT_URL = "home"
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
AUTH_USER_MODEL = "authentication.User"

STATICFILES_DIRS = [BASE_DIR.joinpath("static")]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

if not DEBUG and RENDER_EXTERNAL_HOSTNAME is not None:
    STORAGES = {
        'staticfiles': {
            'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
        },
        'default': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
        },
    }

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "localhost")
EMAIL_PORT = os.getenv("EMAIL_PORT", 25)
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", False) in ["1", "true"]
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "noreply@dummy-django.dev")

IMAGE_PREFERED_SIZE = (600, 400)
