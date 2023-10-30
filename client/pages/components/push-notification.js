import React from "react";

function PushNotificationComponent() {
  const pushMessage = () => {
    console.log("sub_token", localStorage.getItem("sub_token"));
    $.ajax({
      type: "POST",
      url: "/push_v1/",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ sub_token: localStorage.getItem("sub_token") }),
      success: function (data) {
        console.log("success", data);
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log("error", errorThrown);
      },
    });
  };

  return (
    <div>
      <header>
        <h1>WebPush Notification</h1>
      </header>

      <main>
        <p>Welcome to the webpush notification...</p>
        <p>
          <button
            disabled
            className="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          >
            Enable Push Messaging
          </button>
        </p>
        <section className="subscription-details js-subscription-details is-invisible">
          <p>Once you've subscribed your user...</p>
          <pre>
            <code className="js-subscription-json"></code>
          </pre>

          <hr />
          <p>You can test push notification below.</p>
          <button
            type="submit"
            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            onClick={pushMessage}
          >
            Test Push Notification
          </button>
        </section>
      </main>

      {/* External scripts can be added like this if necessary */}
      {/* <script src="/path_to_your_script.js"></script> */}
    </div>
  );
}

export default PushNotificationComponent;
