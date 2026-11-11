"""Isolated tests: never use backend/.env database credentials or media files."""

import os
from unittest.mock import patch


# Supply settings import placeholders, then replace the database before setup.
with patch.dict(os.environ, {
    "DJANGO_SECRET_KEY": "test-only-key-not-for-a-running-application",
    "DB_NAME": "unused",
    "DB_USER": "unused",
    "DB_PASSWORD": "unused",
    "DB_HOST": "unused.invalid",
    "DB_PORT": "5432",
    "DB_SSLMODE": "disable",
    "DB_SSLROOTCERT": "",
}):
    from .settings import *  # noqa: F403

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
