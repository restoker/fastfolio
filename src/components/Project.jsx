'use client';
import React from 'react'
import ImageTrail from './ImageTrail'

const Project = () => {
    const images = Array.from(
        { length: 35 },
        (_, i) => `/assets/img${i + 1}.jpeg`
    );
    return (
        <>
            <section className="trail-container relative w-svw h-svh flex justify-center items-center overflow-hidden">
                <p>( Move your cursor around and see the magic unfold )</p>
                <ImageTrail images={images} />
            </section>
        </>
    )
}

export default Project