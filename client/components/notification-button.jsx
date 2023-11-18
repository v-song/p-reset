import React, { useEffect } from "react";
import { registerServiceWorker } from "@/utils/registerServiceWorker";

const NotificationButton = () => {
  const user_id = 1;

  // TODO: remove hard coded public key
  const handleClick = () => {
    const serviceWorkerUrl = "/service_worker.js";
    const applicationServerPublicKey =
      "BCcgG6rkXA9HmOhmn9BJv6yO4NFr5ZOZVxPYXKvDo8cjT_s2E4FxWkvpNTZBV6T1lTtvTTi3x6cYZxwewCN3nqg";
    const apiEndpoint = `http://localhost:8080/api/users/${user_id}/subscriptions`;

    registerServiceWorker(
      serviceWorkerUrl,
      applicationServerPublicKey,
      apiEndpoint
    );
  };

  return (
    <div>
      <button onClick={handleClick}>Allow Notifications</button>
    </div>
  );
};

export default NotificationButton;
