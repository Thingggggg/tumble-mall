const weed = document.getElementById("weed");
const field = document.getElementById("field");

/* 🌾 BUILD TUMBLEWEED */
function createWeed(){
  for(let i = 0; i < 80; i++){
    const twig = document.createElement("div");
    twig.className = "twig";

    const angle = Math.random() * 360;
    const radius = Math.random() * 50;
    const length = 40 + Math.random() * 40;

    twig.style.height = length + "px";

    const x = 60 + Math.cos(angle * Math.PI/180) * radius;
    const y = 60 + Math.sin(angle * Math.PI/180) * radius;

    twig.style.left = x + "px";
    twig.style.top = y + "px";

    twig.style.transform = `rotate(${angle}deg)`;

    weed.appendChild(twig);
  }
}
createWeed();

/* 🌬️ PHYSICS */
let x = 50;
let y = 200;

let velocityX = 2.5;
let velocityY = 0;
let rotation = 0;

const gravity = 0.25;
const ground = window.innerHeight - 120;
const maxSpeed = 4;

/* 🎯 LOOP */
function animate(){

  // 💨 wind (controlled)
  velocityX += (Math.random() - 0.5) * 0.05;

  if(velocityX > maxSpeed) velocityX = maxSpeed;
  if(velocityX < 1.5) velocityX = 1.5;

  x += velocityX;

  // ⬇️ gravity
  velocityY += gravity;
  y += velocityY;

  // 💥 bounce
  if(y > ground){
    y = ground;
    velocityY *= -0.5;

    rotation += velocityX * 0.8;
  }

  // 🌀 gentle tumble
  rotation += velocityX * 0.15;

  weed.style.left = x + "px";
  weed.style.top = y + "px";
  weed.style.transform = `scale(0.5) rotate(${rotation}deg)`; // 🔥 keep scale here too

  createDust(x, y);

  requestAnimationFrame(animate);
}

/* 🌫️ dust */
function createDust(x,y){
  if(Math.random() < 0.15){
    const d = document.createElement("div");
    d.className = "dust";

    d.style.left = (x + 40) + "px";
    d.style.top = (y + 80) + "px";

    field.appendChild(d);
    setTimeout(()=>d.remove(),1200);
  }
}

animate();
