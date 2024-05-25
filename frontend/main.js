document.addEventListener("DOMContentLoaded", (event) => {
  const navItems = document.querySelector(".nav__items");
  const openNavBtn = document.querySelector("#open_nav-btn");
  const closeNavBtn = document.querySelector("#close_nav-btn");

  // Function to open the navigation
  const openNav = () => {
    navItems.style.display = "flex";
    openNavBtn.style.display = "none";
    closeNavBtn.style.display = "inline-block";
  };

  // Function to close the navigation
  const closeNav = () => {
    navItems.style.display = "none";
    openNavBtn.style.display = "inline-block";
    closeNavBtn.style.display = "none";
  };

  // Event listener for opening navigation
  openNavBtn.addEventListener("click", openNav);

  // Event listener for closing navigation
  closeNavBtn.addEventListener("click", closeNav);

  const sidebar = document.querySelector("aside");
  const showSidebarBtn = document.querySelector("#show__sidebar-btn");
  const hideSidebarBtn = document.querySelector("#hide__sidebar-btn");

  // Function to show the sidebar on small devices
  const showSidebar = () => {
    sidebar.style.left = "0";
    showSidebarBtn.style.display = "none";
    hideSidebarBtn.style.display = "inline-block";
  };

  // Function to hide the sidebar on small devices
  const hideSidebar = () => {
    sidebar.style.left = "-100%";
    showSidebarBtn.style.display = "inline-block";
    hideSidebarBtn.style.display = "none";
  };

  // Event listener for showing the sidebar
  showSidebarBtn.addEventListener("click", showSidebar);

  // Event listener for hiding the sidebar
  hideSidebarBtn.addEventListener("click", hideSidebar);
});
