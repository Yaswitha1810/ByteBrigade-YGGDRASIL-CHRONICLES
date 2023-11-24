const navItems = document.querySelector(".nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector(".close__nav-btn");

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

const getImagePreview = (event) =>{
    var image = URL.createObjectURL(event.target.files[0]);
    var imageDiv = document.getElementById("preview");
    var newImg = document.createElement("img");
    imageDiv.innerHTML = " ";
    newImg.src = image ;
    newImg.width = "70%" ;
    imageDiv.appendChild(newImg);
};

openNavBtn.addEventListener("click", openNav);
closeNavBtn.addEventListener("click", closeNav);


