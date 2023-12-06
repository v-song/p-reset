import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Hero from "@/components/Hero";
import Calender from "@/components/CalenderDisplay";


function MyComponent() {

  return (
  <div className="radial-gradient">
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>
    <style jsx>{`
    .radial-gradient {
      background: rgb(255,239,233);
      background: radial-gradient(circle, rgba(255,239,233,1) 0%, rgba(174,232,244,1) 100%);
      min-width: 1280px;
      min-height: 807px; // Ensure it covers the full viewport height
    }
    `}</style>

    <Navbar />
    {/* <Hero/> */}
  </div>
  )
}

export default MyComponent;