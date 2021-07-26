import useTheme from "../Hooks/useTheme";

function Header() {
    const [theme, setTheme] = useTheme(localStorage.getItem('IMAGE_ROTATER_THEME') === null ? 'normal' : localStorage.getItem('IMAGE_ROTATER_THEME'));

    return (
        <header className="header">
            {
                theme === 'fancy' ? <img id="accenture-logo" src="../img/accenture.png" alt="Accenture Logo" /> : 'Image Rotator'
            }
            <img onClick={() => {
                setTheme(theme === "fancy" ? "normal" : "fancy");
                localStorage.setItem('IMAGE_ROTATER_THEME', theme === "fancy" ? "normal" : "fancy")
            }} src={`../img/${theme}.jpg`} alt="Squidward" className="switch-theme" />
        </header>
    );
}

export default Header;
