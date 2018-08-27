import json

from django.http import HttpResponse
from django.views import View
from django.shortcuts import render

from .utils.districts import DISTRICTS
from .models import ItemModel, DonationCommitmentModel


class InitView(View):
    def post(self, request):
        return HttpResponse(json.dumps({
            "states": list(DISTRICTS.keys()),
            "districts": DISTRICTS,
            "items": list(ItemModel.objects.values_list('name', flat=True))
        }))


class DonationView(View):
    def validate_input(self, body):
        ip = json.loads(body)
        if not ip.get('full_name') or len(ip['full_name']) < 2:
            raise Exception("Please enter a valid name")
        elif not ip.get('contact_number') or \
            len(ip['contact_number']) != 10 or \
            ip['contact_number'].isdigit() is False:
            raise Exception("Contact number has to be a 10-digit mobile number")
        elif not ip.get('state') or ip['state'] not in DISTRICTS:
            raise Exception("Invalid state")
        elif not ip.get('district') or ip['district'] not in DISTRICTS[ip['state']]:
            raise Exception("Invalid district")
        elif not ip.get('pincode') or ip['pincode'].isdigit() is False or len(ip['pincode']) != 6:
            raise Exception("Invalid PIN code")
        elif not ip.get('items') or type(ip['items']) is not list or len(ip['items']) < 0:
            raise Exception("Invalid donation items")
        return ip

    def getItem(self, name):
        item = ItemModel.objects.filter(name__iexact=name).first()
        return item or ItemModel.objects.create(name=name, crowd_sourced=True)

    def post(self, request):
        resp = {
            "msg": "something went wrong",
            "status": 500
        }
        
        try:
            ip = self.validate_input(request.body)
            items = ip.pop('items', [])

            donation = DonationCommitmentModel.objects.create(**ip)

            for item in items:
                if not item['name'] or len(item['name']) < 2:
                    raise Exception("Invalid item name")
                elif not item['count'] or item['count'].isdigit() is False:
                    raise Exception("Invalid item count")
                
                itemModel = self.getItem(item['name'])
                donation.items.add(
                    itemModel.donationitemmodel_set.create(count=item["count"]))
            
            resp['msg'] = "Your interest to donate has been recorded. Our volunteer will get in touch with you soon"
            resp['status'] = 200
        
        except Exception as e:
            resp["msg"] = str(e)
        
        return HttpResponse(json.dumps(resp), status=resp['status'])
