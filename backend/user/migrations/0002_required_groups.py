from django.db import migrations


def create_required_groups(apps, schema_editor):
    group_model = apps.get_model("auth", "Group")
    for name in ("Viewer", "Editor"):
        group_model.objects.using(schema_editor.connection.alias).get_or_create(name=name)


class Migration(migrations.Migration):
    dependencies = [("user", "0001_initial")]

    operations = [
        # Never delete groups or memberships when reversing this seed step.
        migrations.RunPython(create_required_groups, migrations.RunPython.noop),
    ]
