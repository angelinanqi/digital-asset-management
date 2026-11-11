from django.core.exceptions import ImproperlyConfigured
from django.test import SimpleTestCase

from .environment import database_from_environment, required_environment


class DatabaseEnvironmentTests(SimpleTestCase):
    def environment(self, **overrides):
        values = {
            "DB_NAME": "placeholder_database",
            "DB_USER": "placeholder_role",
            "DB_PASSWORD": "  literal#${not_interpolated}  ",
            "DB_HOST": "placeholder.invalid",
            "DB_SSLROOTCERT": "C:/placeholder/ca.crt",
        }
        values.update(overrides)
        return values

    def test_database_uses_verified_ssl_and_preserves_password(self):
        values = self.environment()
        database = database_from_environment(values)
        self.assertEqual(database["PASSWORD"], values["DB_PASSWORD"])
        self.assertEqual(database["OPTIONS"], {
            "sslmode": "verify-full", "sslrootcert": "C:/placeholder/ca.crt",
        })
        self.assertEqual(database["PORT"], "5432")

    def test_missing_credentials_do_not_fall_back_to_existing_local_database(self):
        values = self.environment()
        del values["DB_HOST"]
        with self.assertRaisesMessage(ImproperlyConfigured, "Set DB_HOST"):
            database_from_environment(values)

    def test_verified_ssl_requires_certificate_path(self):
        with self.assertRaisesMessage(ImproperlyConfigured, "DB_SSLROOTCERT"):
            database_from_environment(self.environment(DB_SSLROOTCERT=""))

    def test_local_ssl_can_be_explicitly_disabled(self):
        database = database_from_environment(self.environment(DB_SSLMODE="disable", DB_SSLROOTCERT=""))
        self.assertEqual(database["OPTIONS"], {"sslmode": "disable"})

    def test_invalid_port_and_ssl_mode_fail_without_echoing_values(self):
        for overrides in ({"DB_PORT": "not-a-port"}, {"DB_PORT": "0"}, {"DB_SSLMODE": "invalid"}):
            with self.subTest(overrides=overrides), self.assertRaises(ImproperlyConfigured):
                database_from_environment(self.environment(**overrides))

    def test_secret_is_required(self):
        with self.assertRaisesMessage(ImproperlyConfigured, "DJANGO_SECRET_KEY"):
            required_environment("DJANGO_SECRET_KEY", {})
