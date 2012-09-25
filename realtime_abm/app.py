from flask import Flask, render_template
from flask.ext.bootstrap import Bootstrap

app = Flask(__name__)
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

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
