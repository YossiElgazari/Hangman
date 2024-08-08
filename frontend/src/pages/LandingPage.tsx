import { useEffect, useRef, useState, useCallback } from "react";
import CategoryModal from "../components/CategoryModal";
import AboutModal from "../components/AboutModal";
import AboutMeModal from "../components/AboutMeModal";
import MyButton from "../components/MyButton";
import text from "../assets/hangmantext.png";
import textshadow from "../assets/textshadow.png";
import gsap from "gsap";
import ParticlesBackground from "../components/ParticlesBackground";
import { useGameState } from "../hooks/useGameState";
import LeaderBoard from "../components/LeaderBoard";
import LeaderBoardModal from "../components/LeaderBoardModal";
import { wakeTheServer } from "../service/api";

const LandingPage = () => {
  const { startGame } = useGameState();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMeModalOpen, setIsMeModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLImageElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const meButtonRef = useRef<HTMLButtonElement>(null);

  const initializeGSAPAnimations = useCallback(() => {
    const img = imgRef.current;
    const shadow = shadowRef.current;
    const playButton = playButtonRef.current;
    const aboutButton = aboutButtonRef.current;
    const meButton = meButtonRef.current;

    const tl = gsap.timeline({
      defaults: { duration: 1, opacity: 0, scale: 3 },
    });
    const tl2 = gsap.timeline({
      defaults: { duration: 0.8, opacity: 0, scale: 1.5 },
    });
    const tl3 = gsap.timeline({ defaults: { opacity: 1, scale: 1 } });

    if (img && shadow && playButton && aboutButton && meButton) {
      // Animation for the main image and its shadow
      tl.set(img, { opacity: 0, y: 300, scale: 3 })
        .set(shadow, { opacity: 0, scale: 1, y: 300 })
        .to(img, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        })
        .to(
          shadow,
          {
            opacity: 0.7,
            scale: 1,
            duration: 1,
            y: 0,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1"
        );

      // Animation for the buttons
      tl2
        .set(playButton, { opacity: 0, scale: 2, y: 300 })
        .set(aboutButton, { opacity: 0, scale: 2, y: 300 })
        .set(meButton, { opacity: 0, scale: 2, y: 300 })
        .to(playButton, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          y: 0,
          ease: "elastic.in(1, 0.5)",
        })
        .to(
          aboutButton,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            y: 0,
            ease: "elastic.in(1, 0.5)",
          },
          "-=0.6"
        )
        .to(
          meButton,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            y: 0,
            ease: "elastic.in(1, 0.5)",
          },
          "-=0.6"
        );

      tl.then(() => {
        // Animation for floating effect
        tl3
          .set(img, { opacity: 1, scale: 1, y: 0 })
          .set(shadow, { opacity: 0.7, duration: 1 })
          .to(img, {
            duration: 1,
            y: -10,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          })
          .to(shadow, {
            duration: 1,
            opacity: 0.7,
            scale: 1.05,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
      });

      // Hover animations for the buttons
      const addHoverAnimation = (element: HTMLElement) => {
        element.addEventListener("mouseenter", () =>
          gsap.to(element, { scale: 1.1, duration: 0.2 })
        );
        element.addEventListener("mouseleave", () =>
          gsap.to(element, { scale: 1, duration: 0.2 })
        );
      };

      tl2.then(() => {
        addHoverAnimation(playButton);
        addHoverAnimation(aboutButton);
        addHoverAnimation(meButton);
      });
    }
  }, []);

  useEffect(() => {
    wakeTheServer(); // Wake up the server
    initializeGSAPAnimations();
  }, [initializeGSAPAnimations]);

  const openModal = useCallback((setModalState: (state: boolean) => void) => {
    setModalState(true);
  }, []);

  const closeModal = useCallback((setModalState: (state: boolean) => void) => {
    setModalState(false);
  }, []);

  const handleStartGame = useCallback(
    (selectedWord: {
      word: string;
      difficulty: string;
      hint: string;
      category: string;
    }) => {
      gsap.to(".landing-page", {
        duration: 0.8,
        scale: 0.01,
        opacity: 0,
        ease: "back.in(1.7)",
        onComplete: () => startGame(selectedWord), // Start game after animation completes
      });
    },
    [startGame]
  );

  return (
    <>
      <div className="landing-page flex flex-col h-full items-center  p-4 md:p-8" data-testid="landing-page">
      <div className="flex flex-col justify-center items-center relative">
      <ParticlesBackground />

  <img
    ref={imgRef}
    src={text}
    className="self-center w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] 2k:max-w-[32rem] pointer-events-none"
    alt="Hangman Game"
    draggable="false"
    onContextMenu={(e) => e.preventDefault()}
  />
  <img
    src={textshadow}
    ref={shadowRef}
    className="self-center w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] 2k:max-w-[32rem] opacity-0 pointer-events-none"
    alt="Shadow"
    draggable="false"
    onContextMenu={(e) => e.preventDefault()}
  />
</div>

        <div className="flex flex-col p-2  items-center flex-grow justify-center">
          <MyButton
            ref={playButtonRef}
            onClick={() => openModal(setIsCategoryModalOpen)}
            size="large"
            className="opacity-0 hover:float-button mb-2 lg:mb-4"            
            dataTestId="play-now-button"
          >
            Play Now
          </MyButton>
          <MyButton
            ref={aboutButtonRef}
            onClick={() => openModal(setIsAboutModalOpen)}
            size="large"
            className="opacity-0 hover:float-button mb-2 lg:mb-4"
            dataTestId="about-game-button"
          >
            About The Game
          </MyButton>
          <MyButton
            ref={meButtonRef}
            onClick={() => openModal(setIsMeModalOpen)}
            size="large"
            className="opacity-0 hover:float-button mb-2 lg:mb-4"
            dataTestId="about-me-button"
          >
            About Me
          </MyButton>
        </div>
      </div>
      {isCategoryModalOpen && (
        <CategoryModal
          closeModal={(selectedWord) => {
            if (selectedWord) {
              closeModal(setIsCategoryModalOpen);
              handleStartGame(selectedWord);
            } else {
              closeModal(setIsCategoryModalOpen);
            }
          }}
        />
      )}
      {isAboutModalOpen && (
        <AboutModal closeModal={() => closeModal(setIsAboutModalOpen)} />
      )}
      {isMeModalOpen && (
        <AboutMeModal closeModal={() => closeModal(setIsMeModalOpen)} />
      )}
      <LeaderBoard dataTestId="leaderboard-button" onClick={() => openModal(setIsLeaderboardOpen)} />
      {isLeaderboardOpen && (
        <LeaderBoardModal onClose={() => closeModal(setIsLeaderboardOpen)} />
      )}
    </>
  );
};

export default LandingPage;
