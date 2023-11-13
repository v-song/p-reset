# write flask code in python here
from flask_cors import CORS
import scheduler
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime


app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('application.cfg.py')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:zhou@localhost/test"
db = SQLAlchemy(app)
app.app_context().push()

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    notification_time = db.Column(db.Time)

class PushSubscription(db.Model):    
  id = db.Column(db.Integer, primary_key=True, unique=True)
  subscription_json = db.Column(db.Text, nullable=False)
db.create_all()


@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "P-reset starter page!",
        'people': ['Sumi', 'Vivien', 'Haram', 'Tara',
                   'Angie', 'Abrar', 'Mohamed', 'Grace',
                   'Sadhvi', 'Erin']
    })

@app.route('/add-habit', methods=['POST'])
def add_habit():
    data = request.json
    name = data.get('name')
    notification_time_str = data.get('notification_time')

    # Convert the notification time from string to a Python datetime.time object
    notification_time = datetime.strptime(notification_time_str, '%H:%M').time()

    # Create a new habit instance
    new_habit = Habit(name=name, notification_time=notification_time)

    # Add the new habit to the database
    db.session.add(new_habit)
    db.session.commit()

    return jsonify({"message": "Habit added successfully"}), 201

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