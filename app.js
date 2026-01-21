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

function closeDrawer(){
  drawer.classList.remove('open');
}

/* Fecha ao clicar fora */
document.addEventListener('click', e=>{
  if(drawer.classList.contains('open') && !drawer.contains(e.target) && !e.target.closest('.menu-btn')){
    closeDrawer();
  }
});

/* Swipe para fechar */
let startX = 0;
drawer.addEventListener('touchstart', e=>{
  startX = e.touches[0].clientX;
});

drawer.addEventListener('touchmove', e=>{
  if(startX - e.touches[0].clientX > 70){
    closeDrawer();
  }
});

/* Double tap para fechar */
let lastTap = 0;
drawer.addEventListener('touchend', ()=>{
  const now = Date.now();
  if(now - lastTap < 300){
    closeDrawer();
  }
  lastTap = now;
});

/* ========= TEMA ========= */
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

  let categoria =
    imc < 18.5 ? "Abaixo do peso" :
    imc < 25 ? "Peso saudável" :
    imc < 30 ? "Sobrepeso" : "Obesidade";

  const pesoMin = (18.5 * altura * altura).toFixed(1);
  const pesoMax = (24.9 * altura * altura).toFixed(1);

  let tmb = sexo === "masculino"
    ? 88.36 + (13.4 * peso) + (4.8 * alturaCm) - (5.7 * idade)
    : 447.6 + (9.2 * peso) + (3.1 * alturaCm) - (4.3 * idade);

  document.getElementById('imcResult').innerText = imc.toFixed(1);
  document.getElementById('imcClass').innerText = `Categoria: ${categoria}`;
  document.getElementById('pesoIdeal').innerText =
    `Peso saudável: ${pesoMin}kg – ${pesoMax}kg • ${Math.round(tmb)} kcal/dia`;
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
    timerDisplay.innerText = `${min}:${sec}`;
  },1000);
}

function pauseTimer(){
  clearInterval(interval);
  interval = null;
}

function resetTimer(){
  pauseTimer();
  seconds = 0;
  timerDisplay.innerText = "00:00";
}

/* ========= LISTA DE COMPRAS (SALVA) ========= */
function loadItems(){
  itemList.innerHTML = localStorage.getItem("items") || "";
}

function saveItems(){
  localStorage.setItem("items", itemList.innerHTML);
}

function addItem(){
  const name = itemName.value;
  const cat = itemCat.value;
  if(!name) return;

  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <strong>${name}</strong> (${cat})
    <button onclick="this.parentElement.remove(); saveItems()">×</button>
  `;

  itemList.appendChild(div);
  itemName.value = "";
  saveItems();
}

loadItems();

/* ========= NOTAS (SALVA) ========= */
function loadNotes(){
  noteList.innerHTML = localStorage.getItem("notes") || "";
}

function saveNotes(){
  localStorage.setItem("notes", noteList.innerHTML);
}

function addNote(){
  const text = noteInput.value;
  if(!text) return;

  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    ${text}
    <button onclick="this.parentElement.remove(); saveNotes()">×</button>
  `;

  noteList.appendChild(div);
  noteInput.value = "";
  saveNotes();
}

loadNotes();

/* ========= PLANNER DE TREINO ========= */
function generateWorkout(){
  const goal = goalSelect.value;
  const days = Number(daysSelect.value);
  const time = Number(timeSelect.value);

  let treino = [];

  if(goal === "massa"){
    treino = ["Peito + Tríceps", "Costas + Bíceps", "Pernas + Ombros"];
  }

  if(goal === "emagrecer"){
    treino = ["Full Body + Cardio", "Pernas + HIIT", "Superiores + Cardio"];
  }

  if(goal === "manter"){
    treino = ["Superiores", "Inferiores", "Core + Cardio"];
  }

  let result = `<strong>${days}x por semana • ${time} min</strong><br><br>`;
  for(let i=0;i<days;i++){
    result += `Dia ${i+1}: ${treino[i % treino.length]}<br>`;
  }

  plannerResult.innerHTML = result;
}
