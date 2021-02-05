# REST API With Flask & SQL Alchemy

> Products API using Python Flask, SQL Alchemy and Marshmallow

## Quick Start Using Virtualenv

``` bash
# Activate venv
$ python -m venv env

Activate the created environment now

# Install dependencies
$ pip install -r requirements.txt

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
