from datetime import time
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
                    start_time=time.fromisoformat(data.get('start_time', '00:00')),
                    end_time=time.fromisoformat(data.get('end_time', '00:00')),
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

# Write a print statement to show the users within the user table
users = User.query.all()
for user in users:
    print(user.email)

if __name__ == '__main__':
    app.debug = True
    app.run()
