import { NextPage } from "next";
import Container from "./components/global/Container";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import AboutSection from "./components/HomePage/AboutSection";
import ContactSection from "./components/HomePage/ContactSection";
import HeroSection from "./components/HomePage/HeroSection";
import TeamSection from "./components/HomePage/TeamSection";

const Home: NextPage = () => {
  return (
    <div className="w-full h-full bg-primary-dark">
      <Navbar />
      <Container>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
