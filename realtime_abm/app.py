from flask import Flask, render_template, Response, request
from flask.ext.bootstrap import Bootstrap
import redis
import datetime

app = Flask(__name__)
app.secret_key = "AD1244"
red = redis.StrictRedis()
Bootstrap(app)

@app.route("/")
def home():
    return render_template('base.html')

@app.route("/grafico")
def grafico():
    return render_template('grafico.html')

@app.route("/chat")
def chat():
    return render_template('chat.html')

def event_stream():
    pubsub = red.pubsub()
    pubsub.subscribe('chat')
    for message in pubsub.listen():
        yield 'data: %s\n\n' % message['data']

@app.route('/stream')
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

@app.route('/enviar', methods=['POST'])
def enviar():
    data = request.json
    user = "anonimo"
    now = datetime.datetime.now().replace(microsecond=0).time()
    red.publish('chat', u'[%s] %s: %s' % (now.isoformat(), user, data['mensaje']))
    return "done"


if __name__ == "__main__":
    app.run(debug=True, threaded=True)
