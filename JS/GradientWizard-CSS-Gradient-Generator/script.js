const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const addColorIcon = document.getElementById("addColorButtonIcon");
var deg = document.getElementById("degree");
const mainColor = document.querySelector("main");
const code = document.getElementById("code");
const currDeg = document.querySelector(".current-degree");
currDeg.innerHTML = `${deg.value}°`;

var is3Color = false;
var isRadialGradient = false;
var degValue = 0;

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
}

function updateGradientPre(degValue) {
  if (!is3Color) {
    mainColor.style.background = `linear-gradient(${degValue}deg, ${color1.value} 35%, ${color2.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${degValue}deg, ${color1.value} 35%, ${color2.value} 100%);`;
  } else {
    mainColor.style.background = `linear-gradient(${degValue}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${degValue}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%);`;
  }
  deg.value = degValue;
  currDeg.innerHTML = `${degValue}°`;
  if (isRadialGradient) {
    toggleRadialGradient();
  }
}
async function copyCode() {
  try {
    await navigator.clipboard.writeText(code.value);
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
  } else {
    color3.style.display = "block";
    is3Color = true;
    addColorIcon.classList.remove("fa-plus");
    addColorIcon.classList.add("fa-minus");
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
