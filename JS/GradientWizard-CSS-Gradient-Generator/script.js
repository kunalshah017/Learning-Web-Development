const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
var deg = document.getElementById("degree");
const body = document.querySelector("body");

function updateDegree() {
  body.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%)`;
  const code = document.getElementById("code");
  code.value = `background: linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%);`;
}

function changeColor() {
  body.style.background = `linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%)`;
  console.log(body.style.background);
  const code = document.getElementById("code");
  code.value = `background: linear-gradient(${deg.value}deg, ${color1.value} 35%, ${color2.value} 100%);`;
}
