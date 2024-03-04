const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const addColorIcon = document.getElementById("addColorButtonIcon");
var deg = document.getElementById("degree");
const bodyColor = document.querySelector("body");
bodyColor.style.background =
  "linear-gradient(25deg,rgba(2, 0, 36, 1) 0%,rgba(9, 9, 121, 1) 35%,rgba(0, 212, 255, 1) 100%)";
const code = document.getElementById("code");
const currDeg = document.querySelector(".current-degree");
const rotateIcon = document.getElementById("rotateIcon");
const savedGradientsList = document.getElementById("savedGradientsList");
let prevScrollPos = window.pageYOffset;
currDeg.innerHTML = `${deg.value}°`;

var is3Color = false;
var isRadialGradient = false;
var degValue = 0;

const navbar = document.querySelector(".nav");

loadGradientData();

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
    bodyColor.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%);`;
  } else if (is3Color && !isRadialGradient) {
    bodyColor.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%)`;
    code.innerHTML = `background: linear-gradient(${deg.value}deg, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%);`;
  } else if (!is3Color && isRadialGradient) {
    bodyColor.style.background = `radial-gradient(circle, ${color1.value} 0%, ${color2.value} 100%)`;
    code.innerHTML = `background: radial-gradient(circle, ${color1.value} 0%, ${color2.value} 100%);`;
  } else if (is3Color && isRadialGradient) {
    bodyColor.style.background = `radial-gradient(circle, ${color1.value} 0%, ${color2.value} 50%, ${color3.value} 100%)`;
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

function saveGradient() {
  const currentGradient = bodyColor.style.background;

  const li = document.createElement("li");
  li.innerHTML = `<div class="saved-gradient-color"
  style="background:${currentGradient}" onclick="openGradient(event)">
</div>
<div class="saved-gradient-buttons">
  <button><i class="fas fa-copy" title="Copy" onclick="copyLikedGradient(event)"></i></button>
  <button><i class="fas fa-trash" title="Delete" onclick="deleteGradient(event)"></i></button>
</div>`;
  console.log(currentGradient);
  savedGradientsList.appendChild(li);

  // Scroll to the bottom of the list
  savedGradientsList.scrollTop = savedGradientsList.scrollHeight;
  saveGradientData();
}

const openGradient = (e) => {
  const gradient = e.target.style.background;
  bodyColor.style.background = gradient;
  code.innerHTML = `background: ${gradient};`;
};

const copyLikedGradient = (e) => {
  const gradient =
    e.target.parentElement.parentElement.parentElement.querySelector(
      ".saved-gradient-color"
    );
  bodyColor.style.background = gradient.style.background;
  code.innerHTML = `background: ${gradient.style.background};`;
  copyCode();
};

const deleteGradient = (e) => {
  e.target.parentElement.parentElement.parentElement.remove();
  saveGradientData();
};

function saveGradientData() {
  localStorage.setItem("savedGradients", savedGradientsList.innerHTML);
}

function loadGradientData() {
  savedGradientsList.innerHTML = localStorage.getItem("savedGradients");
}

function downloadGradientImage() {
  // Create a temporary canvas element
  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  // Draw the background gradient onto the canvas
  var gradient = ctx.createLinearGradient(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );
  gradient.addColorStop(0, color1.value); // Replace 'blue' with your gradient start color
  gradient.addColorStop(1, color2.value); // Replace 'green' with your gradient end color
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Convert canvas to data URL
  var dataURL = canvas.toDataURL();

  // Create a temporary link element
  var link = document.createElement("a");
  link.download = "background_gradient.png";
  link.href = dataURL;

  // Simulate click on the link to trigger download
  link.click();
}

//Creating dynamic link that automatically click
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link);
}

//Your modified code.
function printToFile(div) {
  html2canvas(div, {
    onrendered: function (canvas) {
      var myImage = canvas.toDataURL("image/png");
      //create your own dialog with warning before saving file
      //beforeDownloadReadMessage();
      //Then download file
      downloadURI("data:" + myImage, "yourImage.png");
    },
  });
}
