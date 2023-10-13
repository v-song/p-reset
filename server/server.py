# write flask code in python here
from flask import Flask, jsonify, request, redirect, flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String


app = Flask(__name__) 
app.secret_key = 'unsafe'

DATABASE_URL = 'postgresql://temp:temp@127.0.0.1:5432/journals'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL  # need to set up database
db = SQLAlchemy(app)
CORS(app)

# create engine
engine = create_engine(DATABASE_URL)
connection = engine.connect()

# Define your "blank" table model
Base = declarative_base()

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)


# make journalEntry through sqlAlchemy -- takes id, title, and content
class JournalEntry(Base):
    __tablename__ = 'all_entries'
    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    header = Column(String(500))
    description = Column(String(500))


# Create a new instance of the Blank model with the data you want to add
# new_entry = JournalEntry(id=12113213, title="journal 1", content="this is my first journal entry")

# Add the new instance to the session
# session.add(new_entry)

# Commit the changes to the database
# session.commit()

# Query the database for all journal entries
entries = session.query(JournalEntry).all()


for row in entries:
    print(f"ID: {row.id}, Title: {row.title}, Header: {row.header}, Description: {row.description}")


# make route for add netry endpoint
@app.route('/add_entry', methods=['POST'])
def add_entry():
    # Get the title and content from the form data
    title = request.get_json['name']
    header = request.get_json['header']
    description = request.get_json['description']
    request.headers.add('Access-Control-Allow-Origin', '*')


    # Create a new JournalEntry object with the form data
    new_entry = JournalEntry(title=title, header=header, description=description)

    # Add the new entry to the database session
    db.session.add(new_entry)
    db.session.commit()

    # Redirect the user to the home page
    flash('added to database')
    return redirect('http://localhost:3000')

# make api requests
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "P-reset starter page!",
        'people': ['Sumi', 'Vivien', 'Haram', 'Tara'
                   'Angie', 'Abrar', 'Mohamed', 'Grace',
                   'Sadhvi', 'Erin']
    })

# make route for api/journal endpoint
@app.route("/api/journal", methods=['POST'])
def add_journal_entry():
    data = request.get_json()
    title = data['title']
    content = data['content']
    entry = JournalEntry(title=title, content=content)
    db.session.commit()
    # db.session.add(entry)
    db.session.commit()
    return 'added to database'

if __name__ == "__main__":
    app.run(debug=True, port=8080)

    