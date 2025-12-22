"use client";

import Image from "next/image";

export default function FullScreenLoader({ image, size = 120 }) {
    return (
        <div className="fullscreen-loader">
            <Image
                src={image}
                alt="Loading..."
                width={size}
                height={size}
                priority
            />
        </div>
    );
}
