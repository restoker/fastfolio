import Hero from "@/components/Hero";
import ImageTrail from "@/components/ImageTrail";
import Project from "@/components/Project";
import { idImages } from "../../data/projects";
// import Image from "next/image";

export default function Home() {
  const images = Array.from(
    { length: 35 },
    (_, i) => `https://cdn.cosmos.so/${idImages[i].idImg}?format=jpeg`
  );
  return (
    <main>
      <section className="relative h-svh w-svw">
        <Hero />
      </section>
      {/* <Project /> */}
      <section className="trail-container relative w-svw h-svh flex justify-center items-center overflow-hidden bg-zinc-950 text-white">
        <p>( Move your cursor around and see the magic unfold )</p>
        <ImageTrail images={images} />
      </section>

      <section className="relative h-svh w-svw">
        <h1>Wrapping Up</h1>
      </section>
    </main>
  );
}
