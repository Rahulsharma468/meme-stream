from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os

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

  def __init__(self, name, url, caption):
    self.name = name
    self.url = url
    self.caption = caption

# Meme Schema
class MemeSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'url', 'caption')

# Init schema
meme_schema = MemeSchema()
memes_schema = MemeSchema(many=True)

# Create a Meme
@app.route('/memes', methods=['POST'])
def add_meme():
  if not "name" in request.json:
    result = {
      "error": "name is required"
    }
    return jsonify(result), 400
  
  if not "url" in request.json:
    result = {
      "error": "url is required"
    }
    return jsonify(result), 400
  
  if not "caption" in request.json:
    result = {
      "error": "caption is required"
    }
    return jsonify(result), 400
  
  name = request.json['name']
  url = request.json['url']
  caption = request.json['caption']

  new_meme = Meme(name, url, caption)

  db.session.add(new_meme)
  db.session.commit()

  result = meme_schema.dump(new_meme)
  del result['name']
  del result['url']
  del result['caption']

  return jsonify(result)

# Get All Memes
@app.route('/memes', methods=['GET'])
def get_memes():
  all_memes = Meme.query.all()
  result = memes_schema.dump(all_memes)
  result = result[::-1]
  if len(result) > 100:
    result = result[:100]
  print(result)
  return jsonify(result)

# Get Single Memes
@app.route('/memes/<id>', methods=['GET'])
def get_meme(id):
  meme = Meme.query.get(id)
  if meme is None:
    result = {
      "error": "Id not found"
    }
    return jsonify(result), 404
  return meme_schema.jsonify(meme)

# Update a Meme
@app.route('/memes/<id>', methods=['PUT'])
def update_meme(id):
  meme = Meme.query.get(id)

  if meme is None:
    result = {
      "error": "Id not found"
    }
    return jsonify(result), 404

  if "name" in request.json:
    meme.name = request.json['name']
  if "url" in request.json:
    meme.url = request.json['url']
  if "caption" in request.json:
    meme.caption = request.json['caption']

  db.session.commit()

  return meme_schema.jsonify(meme)

# Delete Meme
@app.route('/memes/<id>', methods=['DELETE'])
def delete_meme(id):
  meme = Meme.query.get(id)
  if meme is None:
    result = {
      "error": "Id not found"
    }
    return jsonify(result), 404
  db.session.delete(meme)
  db.session.commit()

  return meme_schema.jsonify(meme)

# Run Server
if __name__ == '__main__':
  app.run(debug=True)

# app.run(debug=True)