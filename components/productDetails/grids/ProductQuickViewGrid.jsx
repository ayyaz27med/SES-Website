"use client";
import safeImage from "@/utlis/safeImage";
import Image from "next/image";

export default function ProductQuickViewGrid({
  firstItem,
  slideItems = [],
}) {
  const finalItems = [firstItem, ...slideItems].filter(
    (item) => typeof item === "string" && item.trim() !== ""
  );

  return (
    <div className="tf-quick-view-image">
      <div className="wrap-quick-view wrapper-scroll-quickview">
        {finalItems.length > 0 &&
          finalItems.map((link, i) => (
            <a
              className="quickView-item item-scroll-quickview"
              key={i}
            >
              <Image
                alt={`Product image ${i}`}
                src={safeImage(link)}
                width={600}
                height={800}
              />
            </a>
          ))}
      </div>
    </div>
  );
}
