"use client";

import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, alt, ...props }) {
    const [imgSrc, setImgSrc] = useState(src || "/fallback.jpg");

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc("/fallback.jpg")}
            loading="eager"
            fill
            priority
        />
    );
}