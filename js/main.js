const SideMenuButtons = document.querySelectorAll(".menu-btn");

function ToggleSideMenu(){
    const menu = document.querySelector(".navbar > ul.links");
    if (menu.classList.contains("closed"))
    {
        menu.classList.remove("closed")
        menu.classList.add("opened")
    }
    else
    {
        menu.classList.add("closed")
        menu.classList.remove("opened")
    }
}
SideMenuButtons.forEach(btn => {
    btn.addEventListener("click", ToggleSideMenu)
})