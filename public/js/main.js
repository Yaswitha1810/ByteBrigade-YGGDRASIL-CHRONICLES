const navItems = document.querySelector(".nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector(".close__nav-btn");
const link = document.querySelector("a");
const form = document.querySelector("form");

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

//open links
link.addEventListener('click',()=>{

});

//submit forms
form.addEventListener("submit",()=>{
    
});
