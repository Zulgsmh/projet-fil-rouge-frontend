import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getToken } from "../api/auth/authAPI";
import { tokenNeedsRefresh } from "../api/token/tokenAPI";
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
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = getToken();
    if (token === "" && router.pathname === "/profile") {
      alert("Please log in to access this page.");
      router.push("/");
    }
    if (token !== "") {
      const tokenNeedRefresh = tokenNeedsRefresh(token);
      if (tokenNeedRefresh) {
        window.localStorage.removeItem("authToken");
        setUser(undefined);
        window.alert("Your access has expired. Please log in again.");
        router.push("/");
      } else {
        setUser(jwtDecode(token));
        router.push("/profile");
      }
    }
  }, []);

  return (
    <div className="w-full h-full bg-primary-dark overflow-x-hidden">
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
