"""Opt-in local PostgreSQL tests; Django creates a uniquely named test database.

Use only with a disposable local PostgreSQL instance and a CREATEDB login.
These variables deliberately do not reuse the application's DB_* credentials.
"""

import os
import uuid

from django.core.exceptions import ImproperlyConfigured

from .test_settings import *  # noqa: F403


host = os.environ.get("TEST_POSTGRES_HOST", "127.0.0.1")
if host not in {"127.0.0.1", "localhost", "::1"}:
    raise ImproperlyConfigured("PostgreSQL tests must use a disposable local instance.")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": os.environ.get("TEST_POSTGRES_USER", "postgres"),
        "PASSWORD": os.environ.get("TEST_POSTGRES_PASSWORD", ""),
        "HOST": host,
        "PORT": os.environ.get("TEST_POSTGRES_PORT", "5432"),
        "OPTIONS": {"sslmode": "disable"},
        "TEST": {"NAME": f"test_dam_{uuid.uuid4().hex}"},
    },
}
