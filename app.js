function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Drawer */
const drawer = document.getElementById('drawer');
function openDrawer(){ drawer.classList.add('open'); }
let sx = 0;
drawer.addEventListener('touchstart', e => sx = e.touches[0].clientX);
drawer.addEventListener('touchmove', e => {
  if(sx - e.touches[0].clientX > 60) drawer.classList.remove('open');
});
let lastTap = 0;
drawer.addEventListener('touchend', () => {
  const now = Date.now();
  if(now - lastTap < 300) drawer.classList.remove('open');
  lastTap = now;
});
function toggleTheme(){ document.body.classList.toggle('light'); }

/* IMC */
function calcIMC(){
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value) / 100;
  if(!peso || !altura) return;

  const imc = peso / (altura * altura);
  let cls = imc < 18.5 ? "Abaixo do peso" :
            imc < 25 ? "Peso saudável" :
            imc < 30 ? "Sobrepeso" : "Obesidade";

  imcResult.innerText = imc.toFixed(1);
  imcClass.innerText = cls;
  pesoIdeal.innerText = `Peso saudável: ${(18.5*altura*altura).toFixed(1)}kg – ${(24.9*altura*altura).toFixed(1)}kg`;
}

/* Timer */
let sec=0,intv;
function startTimer(){
  if(!intv){
    intv=setInterval(()=>{
      sec++;
      timerDisplay.innerText =
        String(Math.floor(sec/60)).padStart(2,'0')+":"+String(sec%60).padStart(2,'0');
    },1000);
  }
}
function pauseTimer(){clearInterval(intv);intv=null;}
function resetTimer(){pauseTimer();sec=0;timerDisplay.innerText="00:00";}

/* Lista */
function addItem(){
  if(!itemName.value) return;
  let d=document.createElement('div');
  d.className='item';
  d.innerHTML=`<strong>${itemName.value}</strong> (${itemCat.value})
  <button onclick="this.parentElement.remove()">×</button>`;
  itemList.appendChild(d);
  itemName.value=itemQty.value='';
}

/* Notes */
function addNote(){
  if(!noteInput.value) return;
  let d=document.createElement('div');
  d.className='item';
  d.innerHTML=`${noteInput.value}
  <button onclick="this.parentElement.remove()">×</button>`;
  noteList.appendChild(d);
  noteInput.value='';
}
