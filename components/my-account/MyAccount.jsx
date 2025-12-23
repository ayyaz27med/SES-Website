"use client";
import React, { Suspense, useEffect, useState } from "react";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import Information from "@/components/my-account/Information";
import Orers from "@/components/my-account/Orers";
import useUserDetails from "@/services/tanstack/queries/useUserDetails";
import OrderDetails from "./OrderDetails";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/store/session";
import FullScreenLoader from "../common/FullScreenLoader";

export default function MyAccountInfo() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "1";
  const [activeTab, setActiveTab] = useState(Number(tabFromUrl) || 1);
  const { id } = useSession();
  const { data, isLoading } = useUserDetails(id);
  const userDetails = data?.data;

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(Number(tabFromUrl))
    }
  }, [tabFromUrl])

  if (isLoading && !userDetails) {
    return <FullScreenLoader image="/images/loaders/bubu-dudu-sseeyall.gif" />;
  }

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
          <Suspense fallback={<div>Loading...</div>}>
            <OrderDetails />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
