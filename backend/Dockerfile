# base
FROM python:3.9-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

# dev stage
FROM base AS dev

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# prod stage
FROM base AS prod

RUN mkdir -p /app/static /app/media

# add user
RUN useradd -m -u 1000 django && chown -R django:django /app

# entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER django

ENTRYPOINT ["/entrypoint.sh"]

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "config.wsgi:application"]

