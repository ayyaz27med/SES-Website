"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "@/store/session";
import ToastHelper from "@/helpers/toastHelper";
import useUploadProfileImage from "@/services/tanstack/mutations/useUploadProfileImage";
import { queryClient } from "@/utlis/queryClient";
import { queryKeys } from "@/services/tanstack/queries";

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  userDetails,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { clearSession, setUser } = useSession();
  const [preview, setPreview] = useState(userDetails?.profile_photo);

  const { mutate: uploadProfileImage, isPending: isUploadingProfileImage } =
    useUploadProfileImage({
      onSuccess: async (data) => {
        const { data: userData, message, status } = data;
        setUser(userData);
        if (!status) {
          ToastHelper.error(message || "Profile photo update failed");
          setPreview(userDetails?.profile_photo);
          return;
        }
        ToastHelper.success(message || "User Profile Photo updated successfully");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userDetails],
        });
      },
      onError: (error) => {
        console.error("Error: ", error);
        ToastHelper.error(error || "Profile photo update failed");
      },
    });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("photo", file);
    uploadProfileImage(formData);
  };

  const handleLogout = () => {
    clearSession();
    ToastHelper.success("Logout Successful");
    router.push("/");
  };

  return (
    <div className="wrap-sidebar-account">
      <div className="sidebar-account">
        <div className="account-avatar">
          <label className="image cursor-pointer position-relative">
            <Image
              src={preview || userDetails?.profile_photo || "/images/avatar/user-account.jpg"}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <div className="position-relative">
              <svg className="profile-edit-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <input type="file" accept="image/*" hidden onChange={handleUpload} />
          </label>
          <h6 className="mb_4">{userDetails?.name}</h6>
          <div className="body-text-1">+{userDetails?.mobile_country_code} {userDetails?.mobile_no}</div>
        </div>
        <ul className="my-account-nav">
          <li>
            <div
              onClick={() => {
                setActiveTab(1);
                router.push("/my-account");
              }}
              className={`my-account-nav-item ${activeTab == 1 ? "active" : ""
                } `}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Account Details
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setActiveTab(2);
                router.push("/my-account");
              }}
              role="button"
              className={`my-account-nav-item ${activeTab == 2 ? "active" : ""
                } `}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5078 10.8734V6.36686C16.5078 5.17166 16.033 4.02541 15.1879 3.18028C14.3428 2.33514 13.1965 1.86035 12.0013 1.86035C10.8061 1.86035 9.65985 2.33514 8.81472 3.18028C7.96958 4.02541 7.49479 5.17166 7.49479 6.36686V10.8734M4.11491 8.62012H19.8877L21.0143 22.1396H2.98828L4.11491 8.62012Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Your Orders
            </div>
          </li>
          <li>
            <div
              role="button"
              className={`my-account-nav-item ${pathname == "/login" ? "active" : ""
                } `}
              onClick={handleLogout}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
