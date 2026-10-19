// Dark and light mode
        var themeButton = document.getElementById("themeToggle");

        // Load the saved theme
        if (localStorage.getItem("visitPageTheme") === "dark") {
            document.body.classList.add("dark-mode");
            themeButton.innerHTML =
                '<i class="bi bi-sun-fill"></i> Light Mode';
        }

        // Change the theme when the button is clicked
        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeButton.innerHTML =
                    '<i class="bi bi-sun-fill"></i> Light Mode';

                localStorage.setItem("visitPageTheme", "dark");
            } else {
                themeButton.innerHTML =
                    '<i class="bi bi-moon-stars-fill"></i> Dark Mode';

                localStorage.setItem("visitPageTheme", "light");
            }
        });


        // Trip cost calculator
        var costForm = document.getElementById("costForm");

        costForm.addEventListener("submit", function (event) {

            event.preventDefault();

            var people = Number(document.getElementById("people").value);
            var days = Number(document.getElementById("days").value);
            var stay = Number(document.getElementById("stay").value);

            var total = people * days * stay;

            document.getElementById("costTotal").textContent =
                "M" + total.toLocaleString();

        });


        // Enquiry form
        var enquiryForm = document.getElementById("enquiryForm");

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            document.getElementById("formMessage").textContent =
                "Thank you! Your enquiry has been prepared.";

            enquiryForm.reset();

        });
