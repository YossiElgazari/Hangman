type XButtonProps = {
  handleClose: () => void;
  dataTestId?: string;
};

const XButton = ({ handleClose, dataTestId }: XButtonProps) => {
  return (
    <button
      className="absolute top-4 right-4 text-gray-500 dark:text-secondary_dark hover:text-gray-700 dark:hover:text-secondary_dark50 leading-none"
      onClick={handleClose} // Call handleClose when button is clicked
      data-testid={dataTestId}
    >
      &#x2715; {/* Unicode character for 'x' symbol */}
    </button>
  );
};

export default XButton;
