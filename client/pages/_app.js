import "@/styles/globals.css";
import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  // useEffect(() => {
  //   const serviceWorkerUrl = "/service-worker.js";
  //   const applicationServerPublicKey = publicVapidKey;
  //   const apiEndpoint = "http://localhost:8080/api/push-subscriptions";

  //   registerServiceWorker(
  //     serviceWorkerUrl,
  //     applicationServerPublicKey,
  //     apiEndpoint
  //   );
  // }, []);

  return <Component {...pageProps} />;
}
