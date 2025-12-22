"use client";

import Image from "next/image";

export default function ContentLoader({ image, height = '500px' }) {
    return (
        <div className="content-loader" style={{ minHeight: height}}>
            <Image
                src={image}
                alt="Loading..."
                width={200}
                height={200}
                priority
            />
        </div>
    );
}
