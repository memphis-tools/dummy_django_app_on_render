FROM python:3.14.8-alpine AS builder

RUN apk add --no-cache \
    libpq \
    bash \
    sqlite \
    gcc \
    musl-dev \
    make

WORKDIR /build

COPY ./requirements.txt .

RUN pip install -U pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


FROM python:3.14.8-alpine

RUN apk add --no-cache libpq bash sqlite

RUN addgroup -S dummy-operator \
    && adduser -S dummy-operator -G dummy-operator

ENV HOME=/home/dummy-operator
ENV APP_HOME=/home/dummy-operator/web

RUN mkdir -p $APP_HOME /var/log/gunicorn $APP_HOME/staticfiles

WORKDIR $APP_HOME

COPY --from=builder /install /usr/local

COPY . $APP_HOME

RUN chown -R dummy-operator:dummy-operator $APP_HOME

USER dummy-operator
