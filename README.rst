Noah's Arc - Rebuilding after the Flood
#######################################

.. contents:: 


How to Run the Project
======================
#. Make sure you have ``pipenv`` installed
#. Create a MySQL database for this app
#. Make sure you set all environment variables mentioned in ``env.dev.sh`` ::

    $ source env.dev.sh # Only after you edit the variables to match your environment

#. Install all dependencies ::

    $ pipenv install

#. Run migrations ::

    $ python manage.py migrate

#. Run the web server ::

    $ python manage.py runserver

#. Run webpack ::

    $ cd noah_frontend && yarn dev

To avoid double-templating (first by Django templates and then by React DOM), the frontend of noah is completely served as completely static files. A development server is setup using Django's static file server and can be accessed at http://localhost:8000/index.html


Notes and Guidelines
====================
#. While writing Django views, try to keep the business and core logic separate from the views, use the services package to house the logic
#. How to authenticate a view

  - This app uses a custom and simple token based authentication system
  - Use the decorator function ``services.auth.AuthenticationService.is_authenticated_request``
  - Any view using the above decorator will be passed an argument with the authenticated ``UserProfileModel`` object ::

        >>> authService = AuthenticationService()
        >>> class ExampleView(View):
            @authService.is_authenticated_request
            def post(self, request):
                return JsonResponse({"authenticated": True}, status=200)
