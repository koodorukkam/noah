import json
from xlsxwriter.workbook import Workbook
from dateutil.parser import parse as date_parser

from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from django.shortcuts import render
from django.urls import reverse

from ..utils.districts import DISTRICTS
from ..models import ItemModel, DonationCommitmentModel


class InitView(View):
    def post(self, request):
        return HttpResponse(json.dumps({
            "states": list(DISTRICTS.keys()),
            "districts": DISTRICTS,
            "items": list(ItemModel.objects.filter(crowd_sourced=False).values_list('name', flat=True))
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
                elif int(item['count']) <= 0:
                    continue
                
                itemModel = self.getItem(item['name'])
                donation.items.add(
                    itemModel.donationitemmodel_set.create(count=item["count"]))
            
            if donation.items.count() == 0:
                donation.delete()
                resp["msg"] = "Please select at least 1 item to donate"
            
            else:
                resp['msg'] = "Your interest to donate has been recorded. Our volunteer will get in touch with you soon"
                resp['status'] = 200
        
        except Exception as e:
            resp["msg"] = str(e)
        
        return HttpResponse(json.dumps(resp), status=resp['status'])


class ExportView(View):
    titles = [
        "full_name", "contact_number",
        "state", "district", "pincode",
        "item", "count", "timestamp"
    ]

    def parseDate(self, dateString):
        try:
            return date_parser(dateString).date()
        
        except Exception as e:
            print(str(e))
            return None

    def getData(self, start_date, end_date):
        model = DonationCommitmentModel.objects

        if start_date:
            model = model.filter(created_at__gte=start_date)
        
        if end_date:
            model = model.filter(created_at__lte=end_date)

        for donation in model.all():
            for item in donation.items.all():
                yield [
                    donation.full_name,
                    donation.contact_number,
                    donation.state,
                    donation.district,
                    donation.pincode,
                    item.item.name,
                    item.count,
                    donation.created_at.isoformat()
                ]

    def writeListAsRow(self, sheet, index, row):
        for i, datum in enumerate(row):
            sheet.write(index, i, datum)

    def createXLSX(self, response, rows):
        book = Workbook(response, {'in_memory': True})
        sheet = book.add_worksheet('Sheet')

        self.writeListAsRow(sheet, 0, self.titles)

        [
            self.writeListAsRow(sheet, i+1, row)
            for i, row in enumerate(rows)
        ]

        book.close()

    def get(self, request):       
        if request.user.is_authenticated is False or request.user.is_superuser is False:
            return HttpResponseRedirect("/admin/login/?next=%s" % reverse("donations-export"))

        start_date = self.parseDate(request.GET.get('start_date'))
        end_date = self.parseDate(request.GET.get('end_date'))

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = "attachment; filename=export.xlsx"

        rows = self.getData(
            start_date=start_date, end_date=end_date)
        self.createXLSX(response, rows)

        return response
