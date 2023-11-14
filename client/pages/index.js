import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Hero from "@/components/Hero";
import Calender from "@/components/Calender";


function MyComponent() {

  return (
   <div>
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>
    <Navbar />
    <Hero/>
    <Calender/>
    </div>
  )
}

export default MyComponent;