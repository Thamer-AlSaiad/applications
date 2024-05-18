import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import hero00 from "/images/hero00.png";
import hero01 from "/images/hero01.png";
import hero02 from "/images/hero02.png";
import hero03 from "/images/hero03.png";
import hero04 from "/images/hero04.png";
import hero05 from "/images/hero05.png";

const heroImages = [hero00, hero01, hero02, hero03, hero04, hero05];
const heroBackgrounds = [
  "#19376D",
  "#1F6E8C",
  "#252B48",
  "#301E67",
  "#03001C",
  "#1B2430",
];

export const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[calc(100vh-66px)]">
      <div
        className="px-8 lg:px-20 pt-4 w-full h-full flex justify-between items-center transition-all duration-1000 ease-cubic"
        style={{ backgroundColor: heroBackgrounds[currentImage] }}
      >
        <div className="hidden md:block md:basis-1/2 text-secondary">
          <h2 className="text-8xl font-bold mb-4">Eyena</h2>
          <p className="text-xl">
            Discover your perfect pair of glasses with us! Explore our unique
            collection of stylish frames, from classic to trendy designs. we&apos;ve
            got you covered. Shop now and see the world in style!
          </p>
          <div className="mt-8">
            <Link
              to="/explore"
              className="px-4 py-2 text-center transition border border-secondary rounded-md hover:bg-secondary hover:text-primary"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="basis-full md:basis-1/2 h-full relative">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={
                "absolute left-0 top-0 w-full h-full transition-opacity duration-700 ease-cubic select-none " +
                (currentImage === index ? "opacity-100" : "opacity-0")
              }
            >
              <img
                src={heroImages[index]}
                alt="hero"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
