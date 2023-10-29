# write flask code in python here
from flask import Flask, redirect, request, jsonify, session, make_response
from flask_cors import CORS
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from flask_session import Session
from datetime import datetime
from dotenv import load_dotenv
import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'None'

# Configure session to use filesystem
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_COOKIE_NAME'] = 'session'

Session(app)

app.secret_key = 'c085ce0c5c21a4d774591a20b981013e'

CLIENT_ID = os.environ.get('CLIENT_ID', '00000')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET', '00000')
REDIRECT_URI = 'http://localhost:8080/google/callback'


@app.route('/google/login', methods=['GET'])
def google_login():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uris": [REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
            }
        },
        scopes=["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.profile"],
    )

    flow.redirect_uri = REDIRECT_URI
    authorization_url, state = flow.authorization_url(prompt='consent', access_type='offline')
    session['state'] = state
    return redirect(authorization_url)

@app.route('/google/callback')
def google_callback():
    state = session['state']
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uris": [REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
            }
        },
        state=state,
        scopes=["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.profile"],
    )
    flow.redirect_uri = REDIRECT_URI
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)
    credentials = flow.credentials
    
    session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes,
    }

    return redirect('http://localhost:3000')


@app.route('/user_info')
def get_user_info():
    print(session)
    credentials = session.get("credentials")
    if not credentials:
        return jsonify({"error": "Not authenticated"}), 401
    
    creds = Credentials(**credentials)
    service = build('oauth2', 'v2', credentials=creds)
    print(credentials)
    user_info = service.userinfo().get().execute()
    
    return jsonify(user_info)

@app.route('/events', methods=['GET'])
def get_events():
    credentials = session.get('credentials')
    if not credentials:
        return jsonify({"error": "Not authenticated"}), 401

    creds = Credentials(**credentials)
    service = build('calendar', 'v3', credentials=creds)

    # Get the current time in RFC3339 format
    now = datetime.utcnow().isoformat() + 'Z'

    events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=10, singleEvents=True,
                                              orderBy='startTime').execute()
        
    
    events = events_result.get('items', [])
    
    return jsonify(events)


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('credentials', None)
    return redirect('http://localhost:3000')


if __name__ == "__main__":
    app.run(debug=True, port=8080)