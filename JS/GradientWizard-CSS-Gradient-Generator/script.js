const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const addColorIcon = document.getElementById("addColorButtonIcon");
var deg = document.getElementById("degree");
const mainColor = document.querySelector("body");
const code = document.getElementById("code");
const currDeg = document.querySelector(".current-degree");
const rotateIcon = document.getElementById("rotateIcon");
let prevScrollPos = window.pageYOffset;
currDeg.innerHTML = `${deg.value}°`;

var is3Color = false;
var isRadialGradient = false;
var degValue = 0;

const navbar = document.querySelector(".nav");

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Show navbar if scrolling up
    navbar.style.top = "0";
  } else {
    // Hide navbar if scrolling down
    navbar.style.top = "-100%"; // Adjust the value to hide the navbar completely
  }
  prevScrollPos = currentScrollPos;
};

function updateGradient() {
  if (!is3Color && !isRadialGradient) {
    mainColor.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%);`;
  } else if (is3Color && !isRadialGradient) {
    mainColor.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${deg.value}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%);`;
  } else if (!is3Color && isRadialGradient) {
    mainColor.style.background = `radial-gradient(circle, ${color1.value} 0%, ${color2.value} 100%)`;
    code.innerHTML = `background: radial-gradient(circle, ${color1.value} 0%, ${color2.value} 100%);`;
  } else if (is3Color && isRadialGradient) {
    mainColor.style.background = `radial-gradient(circle, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%)`;
    code.innerHTML = `background: radial-gradient(circle, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%);`;
  }
  currDeg.innerHTML = `${deg.value}°`;
  rotateIcon.style.transform = `rotate(${deg.value * 2}deg)`;
}

function updateGradientPre(degValue) {
  if (!is3Color) {
    deg.value = degValue;
    updateGradient();
  } else {
    deg.value = degValue;
    updateGradient();
  }
  currDeg.innerHTML = `${degValue}°`;
  if (isRadialGradient) {
    toggleRadialGradient();
  }
}

async function copyCode() {
  try {
    // console.log(code.textContent);
    await navigator.clipboard.writeText(code.textContent);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

function toggle3Color() {
  if (is3Color) {
    color3.style.display = "none";
    is3Color = false;
    addColorIcon.classList.remove("fa-minus");
    addColorIcon.classList.add("fa-plus");
    updateGradient();
  } else {
    color3.style.display = "block";
    is3Color = true;
    addColorIcon.classList.remove("fa-plus");
    addColorIcon.classList.add("fa-minus");
    updateGradient();
  }
}

function toggleRadialGradient() {
  const radialGradientButton = document.getElementById("radialGradientButton");
  if (isRadialGradient) {
    isRadialGradient = false;
    radialGradientButton.style.border = "2px solid transparent";
  } else {
    isRadialGradient = true;
    radialGradientButton.style.border = "2px solid #fff";
  }
  updateGradient();
}

function randomColors() {
  if (is3Color) {
    color1.value = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    color2.value = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    color3.value = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    if (
      color1.value !== color2.value &&
      color2.value !== color3.value &&
      color1.value !== color3.value
    ) {
      deg.value = Math.floor(Math.random() * 360);
      updateGradient();
    } else {
      randomColors();
    }
  } else {
    color1.value = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    color2.value = hexCodes[Math.floor(Math.random() * hexCodes.length)];
    if (color1.value !== color2.value) {
      deg.value = Math.floor(Math.random() * 360);
      updateGradient();
    } else {
      randomColors();
    }
  }
}

function redirect(url) {
  window.open(url, "_blank");
}
