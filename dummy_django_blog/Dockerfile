FROM python:3.15-rc-alpine3.22 AS builder

RUN apk add --no-cache \
    libpq \
    bash \
    sqlite \
    gcc \
    musl-dev \
    python3-dev \
    make

WORKDIR /build

COPY ./requirements.txt .

RUN pip install -U pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


FROM python:3.15-rc-alpine3.22

RUN apk add --no-cache libpq bash sqlite

RUN mkdir -p /home/dummy-operator \
    && addgroup -S dummy-operator \
    && adduser -S dummy-operator -G dummy-operator

ENV HOME=/home/dummy-operator
ENV APP_HOME=/home/dummy-operator/web

RUN mkdir -p $APP_HOME /var/log/gunicorn $APP_HOME/staticfiles

WORKDIR $APP_HOME

COPY --from=builder /install /usr/local

COPY . $APP_HOME

RUN chown -R dummy-operator:dummy-operator $APP_HOME

USER dummy-operator
