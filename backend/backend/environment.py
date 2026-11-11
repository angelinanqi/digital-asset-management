"""Build database settings without embedding credentials in source control."""

import os

from django.core.exceptions import ImproperlyConfigured


def required_environment(name, environ=None):
    environ = os.environ if environ is None else environ
    value = environ.get(name)
    if value is None or not value.strip():
        raise ImproperlyConfigured(f"Set {name} in the environment or backend/.env.")
    return value


def database_from_environment(environ=None):
    environ = os.environ if environ is None else environ
    sslmode = environ.get("DB_SSLMODE", "verify-full")
    if sslmode not in {"disable", "allow", "prefer", "require", "verify-ca", "verify-full"}:
        raise ImproperlyConfigured("DB_SSLMODE must be a PostgreSQL SSL mode.")
    rootcert = environ.get("DB_SSLROOTCERT", "")
    if sslmode in {"verify-ca", "verify-full"} and not rootcert.strip():
        raise ImproperlyConfigured("Set DB_SSLROOTCERT when using certificate verification.")

    try:
        port = int(environ.get("DB_PORT", "5432"))
    except ValueError:
        raise ImproperlyConfigured("DB_PORT must be an integer.") from None
    if not 1 <= port <= 65535:
        raise ImproperlyConfigured("DB_PORT must be between 1 and 65535.")

    options = {"sslmode": sslmode}
    if rootcert:
        options["sslrootcert"] = rootcert

    return {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": required_environment("DB_NAME", environ),
        "USER": required_environment("DB_USER", environ),
        "PASSWORD": required_environment("DB_PASSWORD", environ),
        "HOST": required_environment("DB_HOST", environ),
        "PORT": str(port),
        "OPTIONS": options,
        "CONN_MAX_AGE": 0,
    }
