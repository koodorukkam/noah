from django.db import models

from ..utils.districts import DISTRICTS


class ItemModel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    crowd_sourced = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}{" (Custom)" if self.crowd_sourced else ""}'


class DonationItemModel(models.Model):
    item = models.ForeignKey(ItemModel, on_delete=models.CASCADE)
    count = models.IntegerField()

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.item} ({self.count})'


class DonationCommitmentModel(models.Model):
    full_name = models.CharField(max_length=1000)
    contact_number = models.CharField(max_length=10)

    state = models.CharField(max_length=1000)
    district = models.CharField(max_length=1000)
    pincode = models.CharField(max_length=1000)

    items = models.ManyToManyField(DonationItemModel)

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.state}, {self.district}, {self.full_name}'
