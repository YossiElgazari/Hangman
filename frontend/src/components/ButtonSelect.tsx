type ButtonSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

const ButtonSelect = ({ label, value, onChange, options }: ButtonSelectProps) => {

  return (
    <div className="px-2 py-4 mb-4 w-full">
      <label className="block text-gray-700 dark:text-secondary_dark50 text-body2 lg:text-body1 font-poppins font-bold mb-6">
        {label}:
      </label>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
        {options.map((option) => (
          <button
            key={option.value}
            className={`px-2 py-1 border border-primary50 dark:border-primary_dark50 sm:px-4 sm:py-2 rounded-full hover:shadow-xl transition duration-300 bg-primary50 dark:bg-primary_dark50 text-primary_dark 
              dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary_dark hover:border-primary ${
                value === option.value
                  ? 'bg-gradient-to-b from-gray-200 to-gray-500 border-primary dark:border-primary dark:from-gray-500 dark:to-gray-900 text-white hover:shadow-none'
                  : ''
              }`}
            onClick={() => onChange(option.value)} // Handle button click and trigger onChange
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonSelect;
