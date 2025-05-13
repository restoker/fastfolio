'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import React, { useRef } from 'react'
import SplitType from 'split-type';
import { idImages, projectsData } from '../../data/projects';

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Hero = () => {
    const overlayRef = useRef(null);
    const loaderRef = useRef(null);
    useGSAP(() => {
        const projectsContainer = document.querySelector(".projects");
        const locationsContainer = document.querySelector(".locations");
        const gridImages = gsap.utils.toArray(".img");
        const heroImage = document.querySelector(".img.hero-img");
        const images = gridImages.filter((img) => img !== heroImage);

        const introCopy = new SplitType(".intro-copy h3", {
            types: "words",
            absolute: false,
        });

        const titleHeading = new SplitType(".title h1", {
            types: "words",
            absolute: false,
        });

        const allImageSources = Array.from(
            { length: 35 },
            (_, i) => {
                // console.log(`https://cdn.cosmos.so/${idImages[i].idImg}?format=jpeg`);
                return `https://cdn.cosmos.so/${idImages[i].idImg}?format=jpeg`;
            }
            // (_, i) => `/img/img${i + 1}.jpeg`
        );

        const getRandomImageSet = () => {
            const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 9);
        };

        function initializeDynamicContent() {
            projectsData.forEach((project) => {
                const projectItem = document.createElement("div");
                projectItem.className = "project-item";

                const projectName = document.createElement("p");
                projectName.textContent = project.name;

                const directorName = document.createElement("p");
                directorName.textContent = project.director;

                projectItem.appendChild(projectName);
                projectItem.appendChild(directorName);

                projectsContainer.appendChild(projectItem);
            });

            projectsData.forEach((project) => {
                const locationItem = document.createElement("div");
                locationItem.className = "location-item";

                const locationName = document.createElement("p");
                locationName.textContent = project.location;

                locationItem.appendChild(locationName);
                locationsContainer.appendChild(locationItem);
            });
        }

        function startImageRotation() {
            const totalCycles = 20;

            for (let cycle = 0; cycle < totalCycles; cycle++) {
                const randomImages = getRandomImageSet();

                gsap.to(
                    {},
                    {
                        duration: 0,
                        delay: cycle * 0.10,
                        onComplete: () => {
                            gridImages.forEach((img, index) => {
                                const imgElement = img.querySelector("img");

                                if (cycle === totalCycles - 1 && img === heroImage) {
                                    // imgElement.style.position = 'absolute';
                                    // imgElement.style.top = '0px';
                                    imgElement.src = "https://cdn.cosmos.so/b27736ab-e86a-4f3a-946a-f0145ba6b259?format=jpeg";
                                    gsap.set(".hero-img img", { scale: 2 });
                                } else {
                                    imgElement.src = randomImages[index];
                                }
                            });
                        },
                    }
                );
            }
        }

        function setupInitialStates() {
            gsap.set("nav", {
                y: "-125%",
            });

            gsap.set(introCopy.words, {
                y: "110%",
            });

            gsap.set(titleHeading.words, {
                y: "110%",
            });
        }

        function init() {
            initializeDynamicContent();
            setupInitialStates();
            createAnimationTimelines();
        }

        init();

        function createAnimationTimelines() {
            const overlayTimeline = gsap.timeline();
            const imagesTimeline = gsap.timeline();
            const textTimeline = gsap.timeline();

            overlayTimeline.to(".logo-line-1", {
                backgroundPosition: "0% 0%",
                color: "#fff",
                duration: 1,
                ease: "none",
                delay: 0.5,
                onComplete: () => {
                    gsap.to(".logo-line-2", {
                        backgroundPosition: "0% 0%",
                        color: "#fff",
                        duration: 1,
                        ease: "none",
                    });
                },
            });

            overlayTimeline.to([".projects-header", ".project-item"], {
                opacity: 1,
                duration: 0.10,
                stagger: 0.075,
                delay: 1,
            });

            overlayTimeline.to(
                [".locations-header", ".location-item"],
                {
                    opacity: 1,
                    duration: 0.15,
                    stagger: 0.075,
                },
                "<"
            );

            overlayTimeline.to(".project-item", {
                color: "#fff",
                duration: 0.10,
                stagger: 0.075,
            });

            overlayTimeline.to(
                ".location-item",
                {
                    color: "#fff",
                    duration: 0.10,
                    stagger: 0.075,
                },
                "<"
            );

            overlayTimeline.to([".projects-header", ".project-item"], {
                opacity: 0,
                duration: 0.10,
                stagger: 0.075,
            });

            overlayTimeline.to(
                [".locations-header", ".location-item"],
                {
                    opacity: 0,
                    duration: 0.10,
                    stagger: 0.075,
                },
                "<"
            );

            overlayTimeline.to(".overlay", {
                opacity: 0,
                duration: 0.5,
                delay: 1,
            });

            imagesTimeline.to(".img", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                delay: 2.5,
                stagger: 0.03,
                ease: "hop",
                onStart: () => {
                    setTimeout(() => {
                        startImageRotation();
                        gsap.to(".loader", { opacity: 0, duration: 0.3 });
                    }, 700);
                },
            });

            imagesTimeline.to(images, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 1,
                delay: 2.5,
                stagger: 0.03,
                ease: "hop",
            });

            imagesTimeline.to(".hero-img", {
                y: -50,
                duration: 1,
                ease: "hop",
            });

            imagesTimeline.to(".hero-img", {
                scale: 4,
                clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
                duration: 1.5,
                ease: "hop",
                onStart: () => {
                    gsap.to(".hero-img img", {
                        scale: 1,
                        duration: 1.5,
                        ease: "hop",
                    });

                    gsap.to(".banner-img", { scale: 1, delay: 0.5, duration: 0.5 });
                    gsap.to("nav", { y: "0%", duration: 1, ease: "hop", delay: 0.25 });
                },
                onComplete: () => gsap.set(".hero-img", { position: 'relative', zIndex: 10, top: '0px' }),

            });

            imagesTimeline.to(
                ".banner-img-1",
                {
                    left: "40%",
                    rotate: -20,
                    duration: 1.5,
                    delay: 0.5,
                    ease: "hop",
                },
                "<"
            );

            imagesTimeline.to(
                ".banner-img-2",
                {
                    left: "60%",
                    rotate: 20,
                    duration: 1.5,
                    ease: "hop",
                },
                "<"
            );

            textTimeline.to(titleHeading.words, {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                delay: 9.5,
                ease: "power3.out",
            });

            textTimeline.to(
                introCopy.words,
                {
                    y: "0%",
                    duration: 1,
                    stagger: 0.1,
                    delay: 0.25,
                    ease: "power3.out",
                    // onComplete: () => loaderRef.current.element.remove()
                },
                "<"
            );
        }
    }, [])

    return (
        <div className='relative h-svh w-full overflow-hidden'>
            <div className="overlay h-full w-full fixed top-0 left-0">
                <div className="projects">
                    <div className="projects-header">
                        <p className='uppercase text-sm'>Project</p>
                        <p className='uppercase text-sm'>Director</p>
                    </div>
                </div>
                <div ref={loaderRef} className="loader">
                    <h1 className="logo-line-1">Restoker</h1>
                    <h1 className="logo-line-2">Dev</h1>
                </div>
                <div className="locations">
                    <div className="locations-header">
                        <p className='uppercase text-sm'>Location</p>
                    </div>
                </div>
            </div>

            <div className="image-grid">
                <div className="grid-row">
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/05b61623-2cf0-423e-a0bd-03f561b9edb6?format=jpeg" alt="" />
                    </div>
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/2118afcd-4aa8-47bc-95bc-fd37ba048e08?format=jpeg" alt="" />
                    </div>
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/cb8e4328-2c70-4852-bcdc-607ec8727884?format=jpeg" alt="" />
                    </div>
                </div>
                <div className="grid-row">
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/7c57bbef-2e1e-4996-aa5d-199bcdc65ad9?format=jpeg" alt="" />
                    </div>
                    <div className="img hero-img absolute top-0">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/b27736ab-e86a-4f3a-946a-f0145ba6b259?format=jpeg" alt="" />
                    </div>
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/05b61623-2cf0-423e-a0bd-03f561b9edb6?format=jpeg" alt="" />
                    </div>
                </div>
                <div className="grid-row">
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/964fa2aa-c378-44a9-adb2-f816e71a85f8?format=jpeg" alt="" />
                    </div>
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/0f3b1ad4-8d9f-41f9-8a4b-0a4de695d300?format=jpeg" alt="" />
                    </div>
                    <div className="img">
                        <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/1adabc9c-fdb5-419e-b860-810235372e93?format=jpeg" alt="" />
                    </div>
                </div>
            </div>

            <nav className='fixed w-full z-30 mix-blend-difference'>
                <div className="links">
                    <a className='uppercase text-sm text-white' href="#">Index</a>
                    <a className='uppercase text-sm text-white' href="#">Work</a>
                </div>
                <div className="nav-logo mix-blend-difference">
                    <a className='uppercase text-sm text-white' href="#">Restoker<br />Dev</a>
                </div>
                <div className="links">
                    <a className='uppercase text-sm text-white' href="#">About</a>
                    <a className='uppercase text-sm text-white' href="#">Contact</a>
                </div>
            </nav>

            <div className="banner-img banner-img-1">
                <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/afaef11c-11a7-4201-8c3b-b47b2c99bf13?format=jpeg" alt="" />
            </div>
            <div className="banner-img banner-img-2">
                <img className='h-full w-full object-cover' src="https://cdn.cosmos.so/7555242e-7189-4200-80a4-cf3e4894858f?format=jpeg" alt="" />
            </div>

            <div className="intro-copy">
                <h3>Creative Solutions</h3>
                <h3>Impactful Results</h3>
            </div>

            <div className="title overflow-hidden">
                <h1>Fullstack Js</h1>
                <h1>Developer </h1>
            </div>
        </div>
    )
}

export default Hero