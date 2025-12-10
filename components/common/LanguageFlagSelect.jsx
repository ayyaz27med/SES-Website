"use client";

import safeImage from "@/utlis/safeImage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const optionsData = [
  { value: "swahili", thumbnail: "/images/country/tz.png", text: "Swahili" },
  { value: "english", thumbnail: "/images/country/uk.png", text: "English" },
];

export default function LanguageFlagSelect({
  topStart = false,
  light = false,
  value,
  onChange,
  placeholder = "Select Language",
}) {
  const [isDDOpen, setIsDDOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDDOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedItem = optionsData.find((o) => o.value === value) || null;

  return (
    <div
      ref={wrapperRef}
      className={`dropdown bootstrap-select image-select center style-default language-select ${light ? "color-white" : ""
        } dropup`}
    >
      {/* TOGGLE BUTTON */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setIsDDOpen(!isDDOpen)}
        className={`btn dropdown-toggle btn-light ${isDDOpen ? "show" : ""}`}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              {!selectedItem ? (
                <span className="">{placeholder}</span>
              ) : (
                <>
                  <Image
                    src={safeImage(selectedItem.thumbnail)}
                    width="20"
                    height="14"
                    alt="flag"
                  />
                  {selectedItem.text}
                </>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* DROPDOWN MENU */}
      <div
        className={`dropdown-menu ${isDDOpen ? "show" : ""}`}
        style={{
          position: "absolute",
          inset: topStart ? "" : "auto auto 0px 0px",
          transform: `translate(0px, ${topStart ? 22 : -20}px)`,
          minHeight: 0,
        }}
        data-popper-placement={`${!topStart ? "top" : "bottom"}-start`}
      >
        <div className="inner show" style={{ overflowY: "auto", minHeight: 0 }}>
          <ul className="dropdown-menu inner show" role="presentation">
            {optionsData.map((elm, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(elm.value);
                  setIsDDOpen(false);
                }}
              >
                <a
                  className={`dropdown-item ${value === elm.value ? "active selected" : ""
                    }`}
                >
                  <span className="text">
                    <Image
                      src={safeImage(elm.thumbnail)}
                      width="20"
                      height="14"
                      alt="flag"
                    />
                    {elm.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
