
/* Dark and light mode */

const themeButton = document.getElementById("themeToggle");

function updateThemeButton() {

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML =
            '<i class="bi bi-sun-fill"></i> Light Mode';

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeButton.innerHTML =
            '<i class="bi bi-moon-stars-fill"></i> Dark Mode';

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }
}

/* Load the saved theme */

if (localStorage.getItem("siteTheme") === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeButton();

/* Change the theme when the button is clicked */

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("siteTheme", "dark");
    } else {
        localStorage.setItem("siteTheme", "light");
    }

    updateThemeButton();

});
