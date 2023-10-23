from flask import Flask, jsonify, request, redirect, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Boolean, ARRAY, Time, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import time


app = Flask(__name__) 
app.secret_key = 'unsafe'

DATABASE_URL = 'postgresql://temp:temp@127.0.0.1:5432/journals'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL  # need to set up database
db = SQLAlchemy(app)
CORS(app, resources={r"http://127.0.0.1:8080/add_entry": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"http://127.0.0.1:8080/get_entries": {"origins": "http://localhost:3000"}})


# create engine
engine = create_engine(DATABASE_URL)
connection = engine.connect()

# Define your "blank" table model
Base = declarative_base()

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)


class Notification(Base):
    __tablename__ = 'notifications'
    id = Column(Integer, primary_key=True)
    message = Column(String(200))
    created_at = Column(DateTime, default=datetime.now)

# ... (other model definitions remain unchanged)

# Route for getting notifications
@app.route("/api/notifications", methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    notifications_data = [{'id': n.id, 'message': n.message, 'created_at': n.created_at} for n in notifications]
    return jsonify({'notifications': notifications_data})

# Function to add a notification to the database
def add_notification_to_db(message):
    new_notification = Notification(message=message)
    db.session.add(new_notification)
    db.session.commit()

# ... (other routes and functions remain unchanged)

if __name__ == "__main__":
    app.run(debug=True, port=8080)


if __name__ == "__main__":
    app.run(debug=True, port=8080)