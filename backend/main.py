from flask import Flask, json, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/status')
def status():
  return 'ok'


@app.route('/message', methods=['post'])
def message():
  print(request.json)
  return jsonify(request.json)

