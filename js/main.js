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


// JavaScript to observe scrolling to the "About Me" section
document.addEventListener('DOMContentLoaded', function() {
    const aboutMeSection = document.querySelector('#AboutMe .title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    observer.observe(aboutMeSection);
});

/* start Mouse tail */

const cursorTail = document.querySelectorAll('.tail-segment');
let mouseX = 0, mouseY = 0;
let tailPositions = Array(cursorTail.length).fill({x: 0, y: 0});

// Function to track mouse movement globally
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

gsap.ticker.add(() => {
    // Update the position of the first tail segment based on the current mouse position
    tailPositions[0] = {x: mouseX, y: mouseY};

    // Update the position of each tail segment based on the previous one
    for (let i = 1; i < cursorTail.length; i++) {
        let previous = tailPositions[i - 1];
        let current = tailPositions[i];

        // Smoothly interpolate the position of each tail segment
        tailPositions[i] = {
            x: gsap.utils.interpolate(current.x, previous.x, 0.25),
            y: gsap.utils.interpolate(current.y, previous.y, 0.25)
        };
    }

    // Apply the updated positions to each tail segment
    cursorTail.forEach((segment, i) => {
        gsap.set(segment, {
            x: tailPositions[i].x,
            y: tailPositions[i].y
        });
    });
});


/* end Mouse tail */
