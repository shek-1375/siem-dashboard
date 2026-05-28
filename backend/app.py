from flask import Flask
from flask_cors import CORS
from logs import logs
app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return {
        "message": "SIEM Backend Running"
    }

@app.route("/logs")
def get_logs():
    return logs

if __name__ == "__main__":
    app.run(debug=True)