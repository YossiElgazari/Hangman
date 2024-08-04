import leaderboardIcon from "/leaderboard.svg";

type LeaderBoardProps = {
  onClick: () => void;
};

const LeaderBoard = ({ onClick }: LeaderBoardProps) => {
  return (
    <div>
      <div className="bottom-2 right-2 absolute">
        <img
          src={leaderboardIcon}
          alt="LeaderBoard"
          onClick={onClick}
          className="w-14 h-14 hover:opacity-50 cursor-pointer dark:invert"
        />
      </div>
    </div>
  );
};

export default LeaderBoard;
