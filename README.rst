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
