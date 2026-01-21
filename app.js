/* ========= NAVEGAÇÃO ========= */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>{
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* ========= DRAWER ========= */
const drawer = document.getElementById('drawer');

function openDrawer(){
  drawer.classList.add('open');
}

function closeDrawer(){  // FUNÇÃO PARA O X
  drawer.classList.remove('open');
}

// Swipe para fechar
let startX = 0;
drawer.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
});

drawer.addEventListener('touchmove', e=>{
  if(startX - e.touches[0].clientX > 70){
    drawer.classList.remove('open');
  }
});

// Double tap para fechar
let lastTap = 0;
drawer.addEventListener('touchend', ()=>{
  const now = Date.now();
  if(now - lastTap < 300){
    drawer.classList.remove('open');
  }
  lastTap = now;
});

function toggleTheme(){
  document.body.classList.toggle('light');
}

/* ========= CALCULADORA FITNESS ========= */
function calcIMC(){
  const sexo = document.getElementById('sexo').value;
  const idade = parseInt(document.getElementById('idade').value);
  const peso = parseFloat(document.getElementById('peso').value);
  const alturaCm = parseFloat(document.getElementById('altura').value);

  if(!sexo || !idade || !peso || !alturaCm){
    alert("Preencha todos os campos");
    return;
  }

  const altura = alturaCm / 100;
  const imc = peso / (altura * altura);

  let categoria = "";
  if(imc < 18.5){
    categoria = "Abaixo do peso";
  } else if(imc < 25){
    categoria = "Peso saudável";
  } else if(imc < 30){
    categoria = "Sobrepeso";
  } else {
    categoria = "Obesidade";
  }

  const pesoMin = (18.5 * altura * altura).toFixed(1);
  const pesoMax = (24.9 * altura * altura).toFixed(1);

  // TMB (Harris-Benedict)
  let tmb = 0;
  if(sexo === "masculino"){
    tmb = 88.36 + (13.4 * peso) + (4.8 * alturaCm) - (5.7 * idade);
  } else {
    tmb = 447.6 + (9.2 * peso) + (3.1 * alturaCm) - (4.3 * idade);
  }

  document.getElementById('imcResult').innerText = imc.toFixed(1);
  document.getElementById('imcClass').innerText = `Categoria: ${categoria}`;
  document.getElementById('pesoIdeal').innerText =
    `Peso saudável estimado: ${pesoMin}kg – ${pesoMax}kg | Calorias/dia: ${Math.round(tmb)} kcal`;
}

/* ========= TIMER ========= */
let seconds = 0;
let interval = null;

function startTimer(){
  if(interval) return;
  interval = setInterval(()=>{
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2,'0');
    const sec = String(seconds % 60).padStart(2,'0');
    document.getElementById('timerDisplay').innerText = `${min}:${sec}`;
  },1000);
}

function pauseTimer(){
  clearInterval(interval);
  interval = null;
}

function resetTimer(){
  pauseTimer();
  seconds = 0;
  document.getElementById('timerDisplay').innerText = "00:00";
}

/* ========= LISTA DE COMPRAS ========= */
function addItem(){
  const name = document.getElementById('itemName').value;
  const cat = document.getElementById('itemCat').value;

  if(!name) return;

  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <strong>${name}</strong> (${cat})
    <button onclick="this.parentElement.remove()">×</button>
  `;

  document.getElementById('itemList').appendChild(div);
  document.getElementById('itemName').value = "";
  document.getElementById('itemQty').value = "";
}

/* ========= NOTAS ========= */
function addNote(){
  const text = document.getElementById('noteInput').value;
  if(!text) return;

  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    ${text}
    <button onclick="this.parentElement.remove()">×</button>
  `;

  document.getElementById('noteList').appendChild(div);
  document.getElementById('noteInput').value = "";
}

function generateWorkout() {
  const goal = document.getElementById("goal").value;
  const days = document.getElementById("days").value;
  const time = document.getElementById("time").value;

  let treino = "";

  if (goal === "massa") {
    treino = `
      <strong>Foco: Hipertrofia</strong><br><br>
      Dia 1: Peito + Tríceps<br>
      Dia 2: Costas + Bíceps<br>
      Dia 3: Pernas + Ombros
    `;
  }

  if (goal === "emagrecer") {
    treino = `
      <strong>Foco: Queima de Gordura</strong><br><br>
      Dia 1: Full Body + Cardio<br>
      Dia 2: Pernas + HIIT<br>
      Dia 3: Superiores + Cardio
    `;
  }

  if (goal === "manter") {
    treino = `
      <strong>Foco: Manutenção</strong><br><br>
      Dia 1: Superiores<br>
      Dia 2: Inferiores<br>
      Dia 3: Cardio + Core
    `;
  }

  document.getElementById("plannerResult").innerHTML = `
    <strong>${days}x por semana • ${time} min</strong><br><br>
    ${treino}
  `;
}
