const navItems = documnet.querySelector(".nav__items");
const openNavBtn = documnet.querySelector("#open__nav-btn");
const closeNavBtn = documnet.querySelector(".close__nav-btn");


//open nav dropdown
const openNav = () => {
    navItems.style.display = 'flex';
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'inline-block';
}

//open nav dropdown
const closeNav = () => {
    navItems.style.display = 'none';
    openNavBtn.style.display = 'inline-block';
    closeNavBtn.style.display = 'none';
}

openNavBtn.addEventListener("click", openNav);
closeNavBtn.addEventListener("click", openNav);

