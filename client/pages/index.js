import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Hero from "@/components/Hero";
import Calender from "@/components/CalenderDisplay";
import Insights from "@/components/Insights";


function MyComponent() {

  return (
  <div className="radial-gradient h-screen">
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
    <div className="flex m-8 gap-8 ">
      <div className="relative flex-1">
        <p className="z-2 h-full bg-[#CEB7B7] rounded-[20px] px-6 py-4 text-[#4E3506] text-[36px]">Welcome back, User!</p>
        <p className="absolute left-0 right-0 bottom-0 top-20 z-3 bg-[#FFF6E9] rounded-[20px] px-6 py-4 text-[#A48888] text-[16px] "></p>
      </div>
      <div className="flex-1">
        <Insights></Insights>
      </div>
    </div>
    

    {/* <Hero/> */}
  </div>
  )
}

export default MyComponent;