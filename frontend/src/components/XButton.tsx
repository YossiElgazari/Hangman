type XButtonProps = {
  handleClose: () => void;
};

const XButton = ({ handleClose }: XButtonProps) => {
  return (
    <button
      className="absolute top-4 right-4 text-gray-500 dark:text-secondary_dark hover:text-gray-700 dark:hover:text-secondary_dark50 leading-none"
      onClick={handleClose}
    >
      &#x2715;
    </button>
  );
};

export default XButton;
