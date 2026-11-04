const robo = document.getElementById("robo");
const bracoDireito = document.getElementById("bracoDireito");
const visor = document.getElementById("visor");
const status = document.getElementById("status");

let posX = 180;
let posY = 180;
const passo = 20;
let movimentoInterval = null;

// Função para mover o robô em uma direção
function mover(direcao) {
  if (direcao === "cima" && posY > 0) posY -= passo;
  if (direcao === "baixo" && posY < 340) posY += passo;
  if (direcao === "esquerda" && posX > 0) posX -= passo;
  if (direcao === "direita" && posX < 360) posX += passo;
  robo.style.top = posY + "px";
  robo.style.left = posX + "px";
}

// Função para caminhar continuamente
function caminhar() {
  status.innerHTML = "Robô caminhando...";
  pararMovimento(); // evita duplicar intervalos
  movimentoInterval = setInterval(() => {
    mover("cima");
  }, 500);
}

// Função para parar o robô
function stop() {
  status.innerHTML = "Robô parado.";
  pararMovimento();
}

// Função para girar à direita
function girarDireita() {
  status.innerHTML = "Robô girando à direita...";
  robo.style.transform = "rotate(90deg)";
  setTimeout(() => {
    robo.style.transform = "rotate(0deg)";
    status.innerHTML = "Robô voltou à posição normal.";
  }, 2000);
}

// Função para girar à esquerda
function girarEsquerda() {
  status.innerHTML = "Robô girando à esquerda...";
  robo.style.transform = "rotate(-90deg)";
  setTimeout(() => {
    robo.style.transform = "rotate(0deg)";
    status.innerHTML = "Robô voltou à posição normal.";
  }, 2000);
}

// Função para medir temperatura
function medirTemperatura() {
  bracoDireito.classList.remove("medir");
  void bracoDireito.offsetWidth; // força reflow
  bracoDireito.classList.add("medir");

  const temp = (35 + Math.random() * 3).toFixed(1);
  visor.textContent = temp + "°C";
  visor.style.opacity = 1;

  document.getElementById("tempPaciente").value = temp;
  document.getElementById("dataMedicao").value = new Date().toLocaleString();

  status.innerHTML = `Temperatura medida: ${temp} °C`;

  setTimeout(() => {
    visor.style.opacity = 0;
  }, 4000);
}

// Função auxiliar para parar intervalos
function pararMovimento() {
  if (movimentoInterval) {
    clearInterval(movimentoInterval);
    movimentoInterval = null;
  }
}
