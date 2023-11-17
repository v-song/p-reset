import React, { useEffect, useState } from "react";
import NotificationButton from "@/components/notification-button";
import HabitForm from "@/components/habit-form";

function index() {
  return (
    <div>
      <NotificationButton />
      <HabitForm />
    </div>
  );
}

export default index;
