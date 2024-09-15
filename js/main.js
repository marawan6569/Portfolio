const SideMenuButtons = document.querySelectorAll(".menu-btn");

function ToggleSideMenu(){
    const menu = document.querySelector(".navbar > ul.links");

    if (menu.classList.contains("closed")) {
        menu.classList.remove("closed");
        menu.classList.add("opened");

        // Listen for clicks outside the menu to close it
        document.addEventListener('click', closeMenuOnOutsideClick);
    } else {
        menu.classList.add("closed");
        menu.classList.remove("opened");

        // Remove the outside click listener if menu is closed
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// Function to close the menu if clicked outside
function closeMenuOnOutsideClick(event) {
    const menu = document.querySelector(".navbar > ul.links"),
          isClickInside = event.target === menu;
    // const isClickInside = menu.contains(event.target) || [...SideMenuButtons].some(btn => btn.contains(event.target));

    if (!isClickInside && menu.classList.contains("opened")) {
        menu.classList.add("closed");
        menu.classList.remove("opened");

        // Remove the outside click listener once the menu is closed
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// Event listener for side menu buttons
SideMenuButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();  // Stop propagation to prevent immediate closing
        ToggleSideMenu();
    });
});