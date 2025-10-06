import { createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ( {children}) => {

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => { 
          return prevTheme === "light" ? "dark": "light" 
        })
    }

    const value = {
        theme, toggleTheme,
    };

    return(
        <ThemeContext.Provider value={value}>
            <div className={`app-theme-${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );

}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within the theme provider");
    return context;
}