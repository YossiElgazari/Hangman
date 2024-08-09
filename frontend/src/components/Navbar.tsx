import SettingsMenu from './SettingsMenu';
import Switch from './Switch';
import Volume from './Volume';

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between bg-transparent p-2 h-[56px]">
            <div className="flex items-center z-20">
                <SettingsMenu /> {/* Component for settings menu */}
                <Volume /> {/* Component for volume control */}
            </div>
            <div className="z-10 ml-auto">
                <Switch /> {/* Component for switch/toggle */}
            </div>
        </nav>
    );
};

export default Navbar;
