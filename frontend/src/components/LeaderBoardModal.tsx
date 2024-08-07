import { useEffect, useState } from "react";
import { fetchTopScores } from "../service/api";
import MyButton from "./MyButton";

type LeaderboardEntry = {
  username: string;
  score: number;
};

type LeaderboardModalProps = {
  onClose: () => void;
};

const LeaderBoardModal = ({ onClose }: LeaderboardModalProps) => {
  const [LeaderBoard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchTopScores();
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching LeaderBoard:", error);
      }
    };

    fetchData();
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay to allow fade-out animation
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className={`fixed z-20 inset-0 bg-secondary50 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      data-testid="leaderboard-modal"
    >
      <div
        className="LeaderBoard-modal bg-primary dark:bg-primary_dark border-4 border-primary_dark dark:border-primary rounded-3xl w-[36rem] text-center p-4 px-8 transition-transform duration-300 transform"
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <h2 className="absolute bg-primary dark:bg-primary_dark -top-8 left-[50%] -translate-x-1/2 border-4 border-primary_dark dark:border-primary rounded-2xl text-primary_dark50 dark:text-primary50 font-semibold font-outfit p-2 text-headline4 tracking-widest">
          LEADERBOARD
        </h2>
        <div className="flex flex-col items-center mt-6 mb-4 w-full">
          {LeaderBoard.map((entry, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between rounded-xl bg-primary50 dark:bg-primary_dark50 bg-opacity-50 py-1 text-primary_dark50 dark:text-primary50 font-outfit font-medium text-headline5 px-4 mb-2"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10">
                  {index === 0 || index === 1 || index === 2 ? (
                    <img
                      src={`/${index + 1}medal.svg`}
                      alt={`${index + 1}medal`}
                      className={`${
                        index === 0
                          ? "w-10 h-10"
                          : index === 1
                          ? "w-9 h-9"
                          : "w-8 h-8"
                      }`}
                    />
                  ) : (
                    <span className="w-8 h-8 flex items-center justify-center text-center">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span>{entry.username}</span>
              </div>
              <span className="w-24">{entry.score}</span>
            </div>
          ))}
        </div>
        <MyButton
          dataTestId="close-leaderboard-modal"
          onClick={handleClose}
          size="small"
        >
          Close
        </MyButton>
      </div>
    </div>
  );
};

export default LeaderBoardModal;
