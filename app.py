from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
import datetime

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Meme Class/Model
class Meme(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  url = db.Column(db.String(500))
  caption = db.Column(db.String(500))
  date = db.Column(db.String(500))

  def __init__(self, name, url, caption, date):
    self.name = name
    self.url = url
    self.caption = caption
    self.date = date

# Meme Schema
class MemeSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'url', 'caption', 'date')

# Init schema
meme_schema = MemeSchema()
memes_schema = MemeSchema(many=True)

# Create a Meme
@app.route('/meme', methods=['POST'])
def add_meme():
  name = request.json['name']
  url = request.json['url']
  caption = request.json['caption']
  date = datetime.datetime.now().strftime("%b-%d-%Y, %H:%M")
  print("dddddddddddddddddd")
  print(date)

  new_meme = Meme(name, url, caption, date)

  db.session.add(new_meme)
  db.session.commit()

  return meme_schema.jsonify(new_meme)

# Get All Memes
@app.route('/meme', methods=['GET'])
def get_memes():
  all_memes = Meme.query.all()
  result = memes_schema.dump(all_memes)
  print(result)
  return jsonify(result)

# Get Single Memes
@app.route('/meme/<id>', methods=['GET'])
def get_meme(id):
  meme = Meme.query.get(id)
  return meme_schema.jsonify(meme)

# Update a Meme
@app.route('/meme/<id>', methods=['PUT'])
def update_meme(id):
  meme = Meme.query.get(id)

  name = request.json['name']
  url = request.json['url']
  caption = request.json['caption']

  meme.name = name
  meme.url = url
  meme.caption = caption

  db.session.commit()

  return meme_schema.jsonify(meme)

# Delete Meme
@app.route('/meme/<id>', methods=['DELETE'])
def delete_meme(id):
  meme = Meme.query.get(id)
  db.session.delete(meme)
  db.session.commit()

  return meme_schema.jsonify(meme)

# Run Server
if __name__ == '__main__':
  app.run(debug=True)