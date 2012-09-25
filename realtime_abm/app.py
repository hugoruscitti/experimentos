from flask import Flask, render_template, Response, request
from flask.ext.bootstrap import Bootstrap
import redis
import datetime

app = Flask(__name__)
app.secret_key = 'asdf'
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
        print message
        yield 'data: %s\n\n' % message['data']

@app.route('/enviar', methods=['POST'])
def enviar():
    message = request.form['m']
    user = "anonimo"
    now = datetime.datetime.now().replace(microsecond=0).time()
    red.publish('chat', u'[%s] %s: %s' % (now.isoformat(), user, message))
    print now, message
    return {}



@app.route('/stream')
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
