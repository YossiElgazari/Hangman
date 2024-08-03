const ScoreBar = (props: { score: number }) => {
  return (
    <p className="font-permanent text-headline4 font-semibold text-gray-700 dark:text-secondary_dark50 ">
      Score: {props.score}
    </p>
  );
};

export default ScoreBar;
