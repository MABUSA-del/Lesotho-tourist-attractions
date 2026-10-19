
/* Dark and light mode */

const themeButton = document.getElementById("homeThemeToggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML =
            '<i class="bi bi-sun-fill"></i> <span>Light Mode</span>';

    } else {

        themeButton.innerHTML =
            '<i class="bi bi-moon-stars-fill"></i> <span>Dark Mode</span>';

    }

});
