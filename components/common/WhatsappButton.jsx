"use client";

import { useRouter } from "next/navigation";

export default function WhatsappButton({ hasPaddingBottom = false }) {
  const router = useRouter();
  const handleClick = (e) => {
    router.push("https://wa.me/255710071612");
  };

  return (
    <button
      id="scroll-top"
      className={`scroll-top-button whatsapp-button show ${hasPaddingBottom ? "type-1" : ""}`}
      onClick={handleClick}
    >
      <i className="icon icon-whatsapp" />
    </button>
  );
}
