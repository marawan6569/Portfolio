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


const numberOfPoints = 8; // Number of points in the tail
const canvas = document.getElementById('line-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Points array to store positions
const points = [];
const minLineWidth = 1; // Minimum width of the line
const maxLineWidth = 10; // Maximum width of the line

// Initialize points array with positions
for (let i = 0; i < numberOfPoints; i++) {
    points.push({ x: 0, y: 0 });
}

let mouseX = 0;
let mouseY = 0;

// Track mouse movement
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Draw lines on the canvas with varying widths
function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.strokeStyle = '#F77F00'; // Line color
    ctx.lineCap = 'round'; // Rounded line cap

    for (let i = 1; i < numberOfPoints; i++) {
        const prevPoint = points[i - 1];
        const currPoint = points[i];

        // Calculate the line width based on the position
        const lineWidth = maxLineWidth * ((numberOfPoints - i) / numberOfPoints) + minLineWidth;

        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(currPoint.x, currPoint.y);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

// Animate the points using GSAP
gsap.ticker.add(() => {
    points[0].x += (mouseX - points[0].x) * 0.2;
    points[0].y += (mouseY - points[0].y) * 0.2;

    // Move each point towards the position of the previous one
    for (let i = 1; i < numberOfPoints; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.2;
        points[i].y += (points[i - 1].y - points[i].y) * 0.2;
    }

    // Draw the connecting lines
    drawLines();
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


/* end Mouse tail */


/* start skills */

const rawBtn = document.querySelector('.raw-btn'),
      prettyBtn = document.querySelector('.pretty-btn'),
      visualizeBtn = document.querySelector('.visualize-btn');

// Select views
const rawView = document.querySelector('.views > .view.raw'),
      prettyView = document.querySelector('.views > .view.pretty'),
      visualizeView = document.querySelector('.views > .view.visualize');

function resetViews() {

    // Buttons
    rawBtn.classList.remove('primary-btn');
    rawBtn.classList.add('light-btn');

    prettyBtn.classList.remove('primary-btn');
    prettyBtn.classList.add('light-btn');

    visualizeBtn.classList.remove('primary-btn');
    visualizeBtn.classList.add('light-btn');

    // Views
    rawView.classList.remove('opened');
    rawView.classList.add('closed');

    prettyView.classList.remove('opened');
    prettyView.classList.add('closed');

    visualizeView.classList.remove('opened');
    visualizeView.classList.add('closed');

}

// Event listeners for buttons
rawBtn.addEventListener('click', function() {
    resetViews(); // Reset buttons and views
    rawBtn.classList.remove('light-btn');
    rawBtn.classList.add('primary-btn');

    rawView.classList.add('opened');
    rawView.classList.remove('closed');

});

prettyBtn.addEventListener('click', function() {
    resetViews();
    prettyBtn.classList.remove('light-btn');
    prettyBtn.classList.add('primary-btn');

    prettyView.classList.add('opened');
    prettyView.classList.remove('closed');


});

visualizeBtn.addEventListener('click', function() {
    resetViews();
    visualizeBtn.classList.remove('light-btn');
    visualizeBtn.classList.add('primary-btn');

    visualizeView.classList.add('opened');
    visualizeView.classList.remove('closed');


});
/* end skills */