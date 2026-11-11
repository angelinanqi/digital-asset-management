from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    help = "Create the Viewer and Editor groups if missing; retain memberships and permissions."

    @transaction.atomic
    def handle(self, *args, **options):
        for name in ("Viewer", "Editor"):
            _, created = Group.objects.get_or_create(name=name)
            self.stdout.write(f"{name}: {'created' if created else 'already exists'}")
