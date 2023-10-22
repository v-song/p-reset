import React, { useState } from "react";
import CreateButton from "@/components/CreateButton";
import Navbar from "@/components/Navbar";
import Entries from "@/components/entries";



function MyComponent() {
  

  return (
   <div>
    <Navbar />
    <CreateButton />
    <Entries/>
    </div>
  );
}

export default MyComponent;