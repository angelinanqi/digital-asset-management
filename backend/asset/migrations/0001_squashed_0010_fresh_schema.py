"""Fresh-install replacement; retain all original files for applied histories.

The original 0003 casts bigint to UUID, which PostgreSQL rejects. This
replacement creates the final model state directly, without that conversion
or the temporary AssetTags table. Fully applied old histories are recognized
by Django's replacement machinery; partially applied histories need review.
"""

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    replaces = [
        ("asset", "0001_initial"),
        ("asset", "0002_tags"),
        ("asset", "0003_alter_tags_id"),
        ("asset", "0004_assettags"),
        ("asset", "0005_delete_assettags"),
        ("asset", "0006_asset_tags"),
        ("asset", "0007_alter_asset_tags"),
        ("asset", "0008_alter_asset_tags"),
        ("asset", "0009_alter_asset_tags"),
        ("asset", "0010_asset_version_no"),
    ]

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tags",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="UniqueCodeGenerator",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_datetime", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Asset",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("code", models.CharField(blank=True, max_length=100)),
                ("name", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("upload_datetime", models.DateTimeField(auto_now_add=True)),
                ("uploaded_by", models.CharField(max_length=100)),
                ("file_type", models.CharField(max_length=100)),
                ("file_size", models.FloatField()),
                ("url", models.FileField(upload_to="uploads/")),
                ("tags", models.ManyToManyField(blank=True, related_name="assets", to="asset.tags")),
                ("version_no", models.IntegerField(default=1)),
            ],
        ),
    ]
