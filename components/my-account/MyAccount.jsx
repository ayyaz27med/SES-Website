"use client"
import React, { useState } from "react";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import Information from "@/components/my-account/Information";
import Orers from "@/components/my-account/Orers";
import useUserDetails from "@/services/tanstack/queries/useUserDetails";
import OrderDetails from "./OrderDetails";

export default function MyAccountInfo() {
  const [activeTab, setActiveTab] = useState(1);
  const { data } = useUserDetails();
  const userDetails = data?.data;

  return (
    <div className="my-account-wrap widget-tabs">
      <AccountSidebar
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        userDetails={userDetails}
      />
      <div className="widget-content-tab wow fadeInUp w-100">
        <div
          className={`widget-content-inner ${activeTab == 1 ? "active" : ""} `}
        >
          <Information userDetails={userDetails} />
        </div>
        <div
          className={`widget-content-inner ${activeTab == 2 ? "active" : ""} `}
        >
          <Orers setActiveTab={setActiveTab} />
        </div>
        <div
          className={`widget-content-inner ${activeTab == 3 ? "active" : ""} `}
        >
          <OrderDetails />
        </div>
      </div>
    </div>
  );
}
