import React, { useEffect } from "react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";

const NotificationButton = () => {
  const user_id = 1;

  //   const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  // TODO: remove hard coded public key
  const handleClick = () => {
    const serviceWorkerUrl = "/service_worker.js";
    const applicationServerPublicKey =
      "BCcgG6rkXA9HmOhmn9BJv6yO4NFr5ZOZVxPYXKvDo8cjT_s2E4FxWkvpNTZBV6T1lTtvTTi3x6cYZxwewCN3nqg";
    const apiEndpoint = `http://localhost:8080/api/${user_id}/push-subscriptions`;

    registerServiceWorker(
      serviceWorkerUrl,
      applicationServerPublicKey,
      apiEndpoint
    );
  };

  return (
    <div>
      <h1 className="font-bold">Webpush Demo</h1>
      <button onClick={handleClick}>Allow Notifications</button>
    </div>
  );
};

export default NotificationButton;
