# write flask code in python here
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from webpush_handler import trigger_push_notifications_for_subscriptions

app = Flask(__name__, instance_relative_config=True)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://" 
app.config.from_pyfile('application.cfg.py')

CORS(app)
app.app_context().push()


db = SQLAlchemy(app)

class PushSubscription(db.Model):    
  id = db.Column(db.Integer, primary_key=True, unique=True)
  subscription_json = db.Column(db.Text, nullable=False)

db.create_all()

@app.route("/")
def home_page():
    return render_template("index.html")

@app.route("/api/push-subscriptions", methods=["POST"])
def create_push_subscription():
    json_data = request.get_json()
    subscription = PushSubscription.query.filter_by(
        subscription_json=json_data['subscription_json']
    ).first()
    if subscription is None:
        subscription = PushSubscription(
            subscription_json=json_data['subscription_json']
        )
        db.session.add(subscription)
        db.session.commit()
    return jsonify({
        "status": "success"
    })

@app.route("/admin")
def admin_page():
    return render_template("admin.html")


@app.route("/admin-api/trigger-push-notifications", methods=["POST"])
def trigger_push_notifications():
    json_data = request.get_json()
    subscriptions = PushSubscription.query.all()
    results = trigger_push_notifications_for_subscriptions(
        subscriptions,
        json_data.get('title'),
        json_data.get('body')
    )
    return jsonify({
        "status": "success",
        "result": results
    })

if __name__ == "__main__":
    app.run(host='localhost', port=5000)
