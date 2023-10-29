from datetime import time
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

# Create a Flask app instance
app = Flask(__name__)
CORS(app)

# Configure the app to connect to the PostgreSQL database using SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://haram:yoon@localhost/p-reset'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create a SQLAlchemy instance
db = SQLAlchemy(app)
app.app_context().push()

print("server side working !!! :)")

# Define a User model and an Event model using SQLAlchemy's declarative syntax
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True)
    img_url = db.Column(db.String(500))
    sms = db.Column(db.Integer)
    events = db.relationship('Event', backref='user', lazy=True)
    journals = db.relationship('Journal', backref='user', lazy=True)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    header = db.Column(db.String(50))
    description = db.Column(db.String(500))
    start_time =  db.Column(db.Time)
    end_time = db.Column(db.Time)
    days = db.Column(db.ARRAY(db.String(50)))
    file = db.Column(db.String(50))
    location = db.Column(db.String(50))
    favorite = db.Column(db.Boolean)
    frequency = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    header = db.Column(db.String(50))
    description = db.Column(db.String(500))
    datetime =  db.Column(db.DateTime)
    file = db.Column(db.String(50))
    favorite = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'header': self.header,
            'description': self.description,
            'datetime': self.datetime.isoformat(),
            'file': self.file,
            'favorite': self.favorite,
            'user_id': self.user_id
        }
    
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create the User and Event tables in the database using SQLAlchemy's create_all() method
db.create_all()

# Define an app route for POST requests to add events to the database
@app.route('/api/users/<int:user_id>/events', methods=['POST', 'GET'])
@cross_origin()
def events(user_id):
    if request.method == 'POST':
        data = request.get_json()
        event = Event(header=data['header'],
                    description=data['description'],
                    start_time=time.fromisoformat(data['start_time']),
                    end_time=time.fromisoformat(data['end_time']),
                    days=data['days'],
                    file=data.get('file', ''),
                    location=data.get('location', ''),
                    favorite=data['isFavorite'],
                    frequency=data['frequency'],
                    user_id=user_id)
        db.session.add(event)
        db.session.commit()
        return jsonify({'message': 'Event added successfully!'})

    elif request.method == 'GET':
        events = Event.query.filter_by(user_id=user_id).all()
        return jsonify([event.serialize() for event in events])
    

@app.route('/api/users/<int:user_id>/journals', methods=['POST', 'GET'])
@cross_origin()
def journals(user_id):
    if request.method == 'POST':
        data = request.get_json()
        event = Journal(header=data['header'],
                    description=data['description'],
                    datetime=datetime.strptime(data['datetime'], "%Y-%m-%dT%H:%M"),
                    file=data.get('file', ''),
                    favorite=data['isFavorite'],
                    user_id=user_id)
        db.session.add(event)
        db.session.commit()
        return jsonify({'message': 'Journal added successfully!'})
    elif request.method == 'GET':
        journals = Journal.query.filter_by(user_id=user_id).order_by(Journal.datetime).all()
        print(journals)
        return jsonify([journal.serialize() for journal in journals])

# Write a print statement to show the users within the user table
users = User.query.all()
for user in users:
    print(user.email)
    

@app.route('/api/users/<int:user_id>/notifications', methods=['POST'])
@cross_origin()
def send_notification(user_id):
    if request.method == 'POST':
        data = request.get_json()
        notification = Notification(message=data['message'], user_id=user_id)
        # Code to send the notification to the user
        # You can use a library like webpush to send the notification
        # Example: webpush.send_notification(subscription_info, payload, vapid_keys)
        return jsonify({'message': 'Notification sent successfully!'})


if __name__ == '__main__':
    app.debug = True
    app.run()