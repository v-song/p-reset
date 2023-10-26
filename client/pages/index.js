import React from "react";
import CreateButton from "@/components/CreateButton";
import Navbar from "@/components/Navbar";
import Entries from "@/components/Entries";
import Head from "next/head";



function MyComponent() {
  

  return (
   <div>
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>
    <Navbar />
    <CreateButton />
    <Entries/>
    </div>
  );
}

export default MyComponent;