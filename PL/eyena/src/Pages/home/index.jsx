import { SEO } from "../../components/SEO";
import { HeroSection } from "./heroSection";

export const HomePage = () => {
  return (
    <main>
      <SEO
        title="Eyena"
        description="Eyena is mainly focused on providing the best quality glasses to our customers. We have a wide range of glasses."
      />
      <HeroSection />
    </main>
  );
};
