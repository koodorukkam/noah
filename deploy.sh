exit_if_error() {
    if [ $? -ne 0 ]; then
        echo FAILED
        echo EXITING
        exit 1
    else
        echo SUCCESS
    fi
}

# Python environment dependencies
pipenv install
pipenv shell

# Run migrations
python manage.py migrate
exit_if_error

# Install and compile frontend bundle
cd noah_frontend
yarn install
yarn prod
cd -

# Kill daemons
echo "KILLING DAEMONS"
ps aux | grep gunicorn | awk '{print $2}' | while read s; do kill -9 "$s"; done

# Verify
ps aux | grep gunicorn

# Start daemons
gunicorn noah.wsgi:application \
     --name noah \
     --workers 5 \
     --user ubuntu \
     --bind=unix:/tmp/gunicorn.sock \
     --timeout 600 \
     --daemon

# Verify
sleep 1
ps aux | grep gunicorn
