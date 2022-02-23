import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Container from "../components/global/Container";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import AboutSection from "../components/HomePage/AboutSection";
import ContactSection from "../components/HomePage/ContactSection";
import HeroSection from "../components/HomePage/HeroSection";
import TeamSection from "../components/HomePage/TeamSection";

const Home: NextPage = () => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);

  const checkUserLoggedIn = () => {
    if (window.localStorage.getItem("authToken") !== undefined) {
      //decode jwt then redirect user
    }
    setIsLogged(true);
  };

  useEffect(() => {
    checkUserLoggedIn();
    console.log("is logged : ", isLogged);
    if (isLogged) router.push("/profile");
  }, []);

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
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default Home;
