# REST API With Flask & SQL Alchemy

> Products API using Python Flask, SQL Alchemy and Marshmallow

## Quick Start Using Virtualenv

``` bash
# Activate venv
$ python -m venv env

# Install dependencies
$ pipenv install

# Create DB
$ python
>> from app import db
>> db.create_all()
>> exit()

# Run Server (http://localhst:5000)
python app.py
```

## Endpoints

* GET     /meme
* GET     /meme/:id
* POST    /meme
* PUT     /meme/:id
* DELETE  /meme/:id