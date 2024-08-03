import SettingsMenu from './SettingsMenu';
import Switch from './Switch';

const Navbar = () => {
    return (
        <nav className="z-30 w-full flex justify-between items-center p-2">
            <SettingsMenu />
            <Switch />
        </nav>     
    );
};

export default Navbar;