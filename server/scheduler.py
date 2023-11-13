from apscheduler.schedulers.background import BackgroundScheduler
from pywebpush import webpush, WebPushException
from datetime import datetime
from models import db, Habit, PushSubscription
import pytz
import json

scheduler = BackgroundScheduler()

def send_notifications():
    # Get the current time
    now = datetime.now(pytz.utc)

    # Fetch all habits whose notification time matches the current time
    habits = Habit.query.filter(
        db.func.hour(Habit.notification_time) == now.hour,
        db.func.minute(Habit.notification_time) == now.minute
    ).all()

    for habit in habits:
        # Fetch the user's subscription info
        subscription = PushSubscription.query.filter_by(user_id=habit.user_id).first()
        if subscription:
            try:
                # Send the notification
                webpush(
                    subscription_info=subscription.subscription_info,
                    data=json.dumps({"title": "Habit Reminder", "body": habit.name}),
                    vapid_private_key="your_vapid_private_key",
                    vapid_claims={"sub": "mailto:youremail@example.com"}
                )
            except WebPushException as e:
                print(f"Web push failed: {e}")

scheduler.add_job(send_notifications, 'interval', minutes=1)
scheduler.start()
