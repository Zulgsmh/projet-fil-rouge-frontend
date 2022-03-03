import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getToken } from "../api/auth/authAPI";
import { checkIfTokenExistsAndValid } from "../api/token/tokenAPI";
import Container from "../components/global/Container";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import AboutSection from "../components/HomePage/AboutSection";
import ContactSection from "../components/HomePage/ContactSection";
import HeroSection from "../components/HomePage/HeroSection";
import TeamSection from "../components/HomePage/TeamSection";
import { userState } from "../store/store";

const Home: NextPage = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = getToken();
    if (token === "") return;
    const tokenExistsAndValid = checkIfTokenExistsAndValid(token);
    if (tokenExistsAndValid) {
      setUser(jwtDecode(token));
      router.push("/profile");
    }
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
    </div>
  );
};

export default Home;
