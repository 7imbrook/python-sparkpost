from flask import Flask, json, request

app = Flask(__name__)

@app.route('/status')
def status():
  return 'ok'


@app.route('/message', methods=['post'])
def message():
  print(request.json)
  return '...'
