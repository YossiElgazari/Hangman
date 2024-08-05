type VolumeControlProps = {
  label: string;
  volume: number;
  onVolumeChange: (volume: number) => void;
};

const VolumeControl = ({ label, volume, onVolumeChange }: VolumeControlProps) => {
  return (
    <div className="mb-4">
      <label className="block text-secondary dark:text-secondary_dark text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <div className="progress mx-3 relative w-full h-4">
          <div className="path bg-gray-300 dark:bg-gray-600 rounded h-full"></div>
          <div className="knob bg-gray-300 dark:bg-gray-400 rounded-full w-4 h-4 absolute" style={{ left: `${volume}%` }}></div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(parseInt(e.target.value))}
            className="w-full opacity-0 absolute top-0 left-0 h-full"
          />
        </div>
        <span className="w-12 text-center text-secondary dark:text-secondary_dark font-bold">
          {volume}%
        </span>
      </div>
    </div>
  );
};

export default VolumeControl;
