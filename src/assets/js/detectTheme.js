try {
    const storedTheme = localStorage.getItem("theme")
    
    if (storedTheme) {
        document.documentElement.dataset.theme = storedTheme
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.dataset.theme = "dark";
    } else {
        document.documentElement.dataset.theme = "light";
    }
} catch (e) {
    console.error(e)
}
