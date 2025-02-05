const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("on");

  if (toggle.classList.contains("on")) {
    console.log("The switch is ON");
  } else {
    console.log("The switch is OFF");
  }
});