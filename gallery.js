const themeButton = document.getElementById("galleryThemeToggle");
const searchInput = document.getElementById("gallerySearchInput");
const filterButtons = document.querySelectorAll(".gallery-filter-button");
const photos = document.querySelectorAll(".gallery-photo-item");
const noResults = document.getElementById("galleryNoResults");
const moreButton = document.getElementById("galleryLoadMore");

let selectedCategory = "All";

// Dark and light mode
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.innerHTML = '<i class="bi bi-sun-fill"></i> <span>Light Mode</span>';
    } else {
        themeButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i> <span>Dark Mode</span>';
    }
});

// Search and filter photos
function filterPhotos() {
    let count = 0;
    const searchText = searchInput.value.toLowerCase();

    photos.forEach(function (photo) {
        const category = photo.dataset.category;
        const name = photo.dataset.name.toLowerCase();

        const categoryMatch = selectedCategory === "All" || category === selectedCategory;
        const searchMatch = name.includes(searchText);

        if (categoryMatch && searchMatch) {
            photo.classList.remove("d-none");
            count++;
        } else {
            photo.classList.add("d-none");
        }
    });

    if (count === 0) {
        noResults.classList.remove("d-none");
        moreButton.classList.add("d-none");
    } else {
        noResults.classList.add("d-none");
        moreButton.classList.remove("d-none");
    }
}

// Category filter buttons
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.filter;
        filterPhotos();
    });
});

// Search as the user types
searchInput.addEventListener("input", filterPhotos);

// Load More button
moreButton.addEventListener("click", function () {
    moreButton.textContent = "You're all caught up";
    moreButton.disabled = true;
});
