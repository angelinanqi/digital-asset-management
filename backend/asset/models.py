from django.db import models
import uuid


# Create your models here.
class UniqueCodeGenerator(models.Model):
    """
    Generate a unique model code for each asset.

    Prefix = 'A', Suffix = 000000

    Note: Code will auto increment.

    """

    created_datetime = models.DateTimeField(auto_now_add=True)

    @classmethod
    def generate_code(cls, prefix):
        # Create a row to extract its auto-incremental ID
        instance = cls.objects.create()

        # Extract and use the PK
        suffix = f"{instance.pk}".zfill(6)

        # Create and return the code (e.g. A-000001)
        return f"{prefix}-{suffix}"


class Asset(models.Model):
    """
    Stores, handles, and holds asset data.

    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    upload_datetime = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.CharField(max_length=100)
    file_type = models.CharField(max_length=100)
    file_size = models.FloatField()
    url = models.FileField(upload_to="uploads/")

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = UniqueCodeGenerator.generate_code(prefix="A")
        super().save(*args, **kwargs)


class Tags(models.Model):
    """
    Tags for assets.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50, null=False, blank=False, unique=True)


# class AssetTags(models.Model):
#     """
#     Connect assets with their respective tags.
#     Primary key uses composite key asset id and order id.
#     """
#     pk = models.CompositePrimaryKey("asset", "tag")
#     asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
#     tag = models.ForeignKey(Tags, on_delete=models.CASCADE)