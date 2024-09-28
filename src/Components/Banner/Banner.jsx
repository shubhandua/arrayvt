import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  Instagram,
  PlayFill,
} from "react-bootstrap-icons";

import bannerMan from "../../assets/img/banner/banner-man.png";
import scrollDown from "../../assets/img/banner/scroll-down.png";
import dial from "../../assets/img/banner/dial.png";
import VideoPlay from "../Shared/VideoPlay/VideoPlay";

const socalIcon = [
  { id: 1, icon: <Facebook /> },
  { id: 2, icon: <Twitter /> },
  { id: 3, icon: <Linkedin /> },
  { id: 4, icon: <Globe /> },
  { id: 5, icon: <Instagram /> },
];

// Array of words for the word carousel
const wordArray = ["Future", "B2B SaaS", "Cybersecurity", "Ed Tech", "AI"];

const Banner = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [position, setPosition] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Handle scrolling to make the bannerMan image scroll slower
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bannerManImage = document.querySelector(".banner__thumb img");

      // Adjust the translateY to move the image slower (dividing by a larger number slows the movement)
      bannerManImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!position) {
      setPosition(true);
    }
  }, [position]);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  // Word carousel logic with fade-in/out effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Start fading out

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordArray.length);
        setFadeOut(false); // Fade in the new word after fade out
      }, 800); // Half a second for the fade-out effect
    }, 2500); // Change word every 3 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <section id="home">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="banner__content">
              <Link to={""} className="bn__currently">
                <span className="d-block">Vision needs</span>
                <span className="d-flex gap-4 align-items-center">
                  Liquidity
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </Link>
              <h1>
                <span className="hone"> Empowering</span>
                <span
                  className={`d-block designers word-carousel ${fadeOut ? "fade-out" : "fade-in"}`}
                  data-text={wordArray[currentWordIndex]}
                  style={{ minWidth: '200px', display: 'inline-block' }} // Add min-width to avoid word jumps
                >
                  {wordArray[currentWordIndex]}
                </span>
                <span className="hone">Founders</span>
              </h1>
              <div className="video__area">
                <div onClick={openLightbox} className="video__80 video-btn">
                  <i>
                    <PlayFill />
                  </i>
                </div>
                <span className="proces">Latest News</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className={`banner__thumb  ${position ? "right_up_animat" : "right_up"}`}
            >
              <img src={bannerMan} alt="man-img" />
            </div>
          </div>
        </div>
      </div>
      <div className="banner__leftinfo">
        <div className="left__infomobile">
          <Link to={""}>
            <img src={dial} alt="img" />
          </Link>
          <Link to={""}>(+1)-510-717XXXX</Link>
        </div>
        <div className="right__infoscroll">
          <Link className="scroll">scroll down</Link>
          <Link className="scroll__bar">
            <img src={scrollDown} alt="img" />
          </Link>
        </div>
      </div>
      <div className="banner__rightinfo">
        <div className="right__infoscroll">
          <Link to={""} className="scroll">
            Follow Us
          </Link>
          <Link to={""} className="scroll__bar">
            <img src={scrollDown} alt="img" />
          </Link>
        </div>
        <div className="banner__xlsocial">
          <ul className="banner__soci d-grid justify-content-center">
            {socalIcon.map(({ icon, id }) => {
              return (
                <li key={id}>
                  <Link to={""}>
                    <i>{icon}</i>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {lightboxOpen && (
        <VideoPlay
          setLightboxOpen={setLightboxOpen}
          url="https://youtu.be/4U0j2oYsFDU"
        />
      )}
    </section>
  );
};

export default Banner;
