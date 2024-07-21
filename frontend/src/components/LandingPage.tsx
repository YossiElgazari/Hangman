
type LandingPageProps = {
  onStart: () => void;
};

const LandingPage = ({ onStart }: LandingPageProps) => {


  return (
    <div className="h-screen w-screen bg-primary flex flex-col items-center p-4">
      <h1 className="text-secondary xl:text-headline1 md:text-headline2 font-permanent text-center">
        Hangman
      </h1>
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* <img src={logo} alt="Hangman Logo" className="w-64 h-64" /> */} 
        <div className="mb-8 w-full flex items-center justify-center h-64">
          
        </div>
        <button
          className="bg-silver hover:bg-secondary50 hover:text-silver border-4 border-shade1 text-secondary font-bold py-2 px-4 rounded-full transition duration-300"
          onClick={onStart}
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
