// Dark and light mode

        const themeButton = document.getElementById("themeToggle");

        function updateThemeButton() {
            if (document.body.classList.contains("dark-mode")) {
                themeButton.innerHTML =
                    '<i class="bi bi-sun-fill"></i> Light Mode';
            } else {
                themeButton.innerHTML =
                    '<i class="bi bi-moon-stars-fill"></i> Dark Mode';
            }
        }

        try {
            if (localStorage.getItem("shopTheme") === "dark") {
                document.body.classList.add("dark-mode");
            }
        } catch (error) {
            // The page can still work if storage is unavailable.
        }

        updateThemeButton();

        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            updateThemeButton();

            try {
                const theme = document.body.classList.contains("dark-mode")
                    ? "dark"
                    : "light";

                localStorage.setItem("shopTheme", theme);
            } catch (error) {
                // The theme still changes for this page view.
            }
        });


        // Product search and filters

        const searchInput = document.getElementById("productSearch");
        const filterButtons = document.querySelectorAll(".filter-btn");
        const products = document.querySelectorAll(".product-item");
        const noResults = document.getElementById("shopNoResults");

        let selectedCategory = "All";

        function filterProducts() {
            const searchText = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            products.forEach(function (product) {
                const name = product.dataset.name;
                const category = product.dataset.category;

                const matchesSearch = name.includes(searchText);

                const matchesCategory =
                    selectedCategory === "All" ||
                    category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    product.classList.remove("d-none");
                    visibleCount++;
                } else {
                    product.classList.add("d-none");
                }
            });

            if (visibleCount === 0) {
                noResults.classList.remove("d-none");
            } else {
                noResults.classList.add("d-none");
            }
        }

        searchInput.addEventListener("input", filterProducts);

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {

                filterButtons.forEach(function (item) {
                    item.classList.remove("active");
                    item.setAttribute("aria-pressed", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");

                selectedCategory = button.dataset.filter;

                filterProducts();
            });
        });


        // Shopping cart

        let cart = [];

        const cartCount = document.getElementById("cartCount");
        const cartItems = document.getElementById("cartItems");
        const cartTotal = document.getElementById("cartTotal");

        function updateCart() {
            cartCount.textContent = cart.length;

            let total = 0;

            cart.forEach(function (item) {
                total += item.price;
            });

            cartTotal.textContent = "M" + total;

            cartItems.innerHTML = "";

            if (cart.length === 0) {
                cartItems.innerHTML =
                    '<p class="text-muted">Your cart is empty.</p>';
                return;
            }

            cart.forEach(function (item, index) {
                const row = document.createElement("div");

                row.className =
                    "d-flex justify-content-between align-items-center gap-2 mb-2";

                const itemName = document.createElement("span");
                itemName.textContent = item.name + " - M" + item.price;

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.type = "button";
                removeButton.className =
                    "btn btn-sm btn-outline-secondary";

                removeButton.addEventListener("click", function () {
                    cart.splice(index, 1);
                    updateCart();
                });

                row.appendChild(itemName);
                row.appendChild(removeButton);

                cartItems.appendChild(row);
            });
        }

        const addButtons = document.querySelectorAll(".add-cart");

        addButtons.forEach(function (button) {
            button.addEventListener("click", function () {

                const name = button.dataset.name;
                const price = Number(button.dataset.price);

                cart.push({
                    name: name,
                    price: price
                });

                updateCart();

                button.textContent = "Added!";
                button.disabled = true;

                setTimeout(function () {
                    button.textContent = "Add to Cart";
                    button.disabled = false;
                }, 900);
            });
        });

        // View cart button

        document.getElementById("viewCart").addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is empty.");
            } else {
                alert(
                    "You have " + cart.length +
                    " item(s) in your cart. Total: " +
                    cartTotal.textContent
                );
            }
        });

        updateCart();
