import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
    const {theme, toggleTheme} = useTheme();
    return(
        <header>
            <Link to="/">
            <h1>Adopt Me!</h1>
            </Link>
            <p>Find your perfect pet compagnion</p>

            <button onClick={()=> toggleTheme()}>
                {theme === "dark" ? "☀️" : "🌙"}
            </button>
        </header>
    );
}
export default Header;