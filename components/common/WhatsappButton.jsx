"use client";

export default function WhatsappButton({ hasPaddingBottom = false }) {
  const handleClick = () => {
    window.open("https://wa.me/255710071612", "_blank");
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
