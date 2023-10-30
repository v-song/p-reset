# write flask code in python here
from flask_cors import CORS

from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from webpush_handler import trigger_push_notifications_for_subscriptions

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('application.cfg.py')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:zhou@localhost/test"
db = SQLAlchemy(app)
app.app_context().push()


class PushSubscription(db.Model):    
  id = db.Column(db.Integer, primary_key=True, unique=True)
  subscription_json = db.Column(db.Text, nullable=False)
db.create_all()


@app.route("/register")
def home_page():
    return render_template("index.html")

# make api requests
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "P-reset starter page!",
        'people': ['Sumi', 'Vivien', 'Haram', 'Tara'
                   'Angie', 'Abrar', 'Mohamed', 'Grace',
                   'Sadhvi', 'Erin']
    })

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


if __name__ == "__main__":
    app.run(debug=True, port=8080)