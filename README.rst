Noah's Arc - Rebuilding after the Flood
#######################################

.. contents:: 


How to Run the Project
======================
#. Make sure you have ``pipenv`` installed
#. Create a MySQL database for this app
#. Make sure you set all environment variables mentioned in ``env.dev.sh``
#. Install all dependencies ::

    $ pipenv install

#. Run migrations ::

    $ python manage.py migrate

#. Run the web server ::

    $ python manage.py runserver

#. Run webpack ::

    $ cd noah_frontend && yarn dev

