# write flask code in python here
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime, time
from apscheduler.schedulers.background import BackgroundScheduler
from pywebpush import webpush, WebPushException
import pytz
from sqlalchemy.sql import extract





app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('application.cfg.py')
CORS(app)

vapid_private_key = app.config['VAPID_PRIVATE_KEY']
vapid_claim = app.config["VAPID_CLAIM_EMAIL"]


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:zhou@localhost/test"
db = SQLAlchemy(app)
app.app_context().push()


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(50), nullable=False)
    # email = db.Column(db.String(50), unique=True)
    # img_url = db.Column(db.String(500))
    # sms = db.Column(db.Integer)
    # events = db.relationship('Event', backref='user', lazy=True)
    # journals = db.relationship('Journal', backref='user', lazy=True)
    habits = db.relationship('Habit', backref='user', lazy=True)


class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    time =  db.Column(db.Time)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'time': self.time.strftime("%H:%M"),  # Format time as a string
            'user_id': self.user_id
        }


class PushSubscription(db.Model):    
  id = db.Column(db.Integer, primary_key=True, unique=True)
  subscription_json = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

db.create_all()

@app.route('/api/users/<int:user_id>/habits', methods=['POST', 'GET'])
@cross_origin()  # React's URL

def habits(user_id):
    if request.method == 'POST':
        data = request.get_json()
        habit_time = datetime.strptime(data['time'], '%H:%M').time()
        habit = Habit(name=data["name"], time=habit_time, user_id=user_id)
        db.session.add(habit)
        db.session.commit()
        return jsonify({'message': 'Event added successfully!'})

    elif request.method == 'GET':
        habits = Habit.query.filter_by(user_id=user_id).all()
        
        print(habits)
        return jsonify([habit.serialize() for habit in habits])
    


# Initialize scheduler
scheduler = BackgroundScheduler()

def send_notifications():

    with app.app_context():
        now = datetime.now(pytz.utc).time()
        current_time = time(now.hour, now.minute)
        print(now)
        print(current_time)
        
        habits = Habit.query.filter(
            extract('hour', Habit.time) == current_time.hour,
            extract('minute', Habit.time) == current_time.minute
        ).all()

        for habit in habits:
            # Fetch the user's subscription info
            subscription = PushSubscription.query.filter_by(user_id=habit.user_id).first()
            print(subscription)
            subscription_info = json.loads(subscription.subscription_json)

            # subscription = PushSubscription.query.first()

            if subscription:
                try:
                    # Send the notification
                    webpush(
                        subscription_info=subscription_info,
                        data=json.dumps({"title": "Habit Reminder", "body": habit.name}),
                        vapid_private_key=vapid_private_key,
                        vapid_claims = {"sub": "mailto:{}".format(vapid_claim)}
                    )
                except WebPushException as e:
                    print(f"Web push failed: {e}")

scheduler.add_job(send_notifications, 'cron', second=0)
scheduler.start()

@app.route("/api/users/<int:user_id>/subscriptions", methods=["POST"])
@cross_origin()
def create_push_subscription(user_id):
    json_data = request.get_json()
    subscription = PushSubscription.query.filter_by(
        subscription_json=json_data['subscription_json'], user_id=user_id).first()
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