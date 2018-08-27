from django.contrib import admin

from .models import ItemModel, DonationCommitmentModel, DonationItemModel

admin.site.register(ItemModel)
admin.site.register(DonationItemModel)
admin.site.register(DonationCommitmentModel)
