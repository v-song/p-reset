import React from "react";
import Navbar from "@/components/Navbar";
import Entries from "@/components/entries";
import Head from "next/head";
import Hero from "@/components/Hero";
import Calender from "@/components/calender";


function MyComponent() {

  return (
   <div>
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>
    <Navbar />
    <Hero/>
    <Calender/>
    <Entries/>
    </div>
  )
}

export default MyComponent;