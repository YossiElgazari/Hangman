import SettingsMenu from './SettingsMenu';
import Switch from './Switch';
import Volume from './Volume';

const Navbar = () => {
    return (
        <nav className="z-20 w-full flex items-center justify-between p-2">
            <div className="flex items-center z-20">
                <SettingsMenu />
                <Volume />
            </div>
            <div className="z-20">
                <Switch />
            </div>
        </nav>        
    );
};

export default Navbar;