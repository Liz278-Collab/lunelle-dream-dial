(() => {
  const $ = (id) => document.getElementById(id);
  const phone = $('phone'), card = $('callCard'), actions = $('actions'), hint = $('hint');
  const interfaceEl = $('phoneInterface'), content = $('interfaceContent'), sound = $('soundToggle');
  let ignores = 0, reconnectTimer;

  function setCall(copy) { card.querySelector('p').textContent = copy; card.style.opacity = '1'; actions.style.opacity = '1'; }
  function answer() {
    clearTimeout(reconnectTimer);
    phone.style.animation = 'none'; phone.style.transform = 'rotate(0deg) scale(.88)';
    card.style.opacity = '0'; actions.style.opacity = '0'; hint.style.opacity = '0';
    interfaceEl.classList.add('active'); interfaceEl.setAttribute('aria-hidden', 'false');
    content.innerHTML = `<p class="eyebrow">LUNELLE BEAUTY</p><h1>DREAM DIAL<br><em>2000</em></h1><p class="question">What does your beauty signal look like?</p><div class="connection"><small>CONNECTING...</small><div class="blocks"><i></i><i></i><i></i><i></i><i class="empty"></i><i class="empty"></i><i class="empty"></i><i class="empty"></i></div></div>`;
    setTimeout(showLost, 2400);
  }
  function showLost() {
    content.innerHTML = `<div class="lost"><p class="eyebrow">✦ SIGNAL INTERRUPTED ✦</p><h2>YOUR BEAUTY SIGNAL<br>HAS BEEN LOST...</h2><p>Find it before midnight ♡</p><button class="y2k-button start" id="startButton" type="button">START SEARCHING</button></div>`;
    $('startButton').addEventListener('click', showGame);
  }
  function showGame() { content.innerHTML = `<div class="game-placeholder"><div class="small-star">✦</div><p class="eyebrow">TRANSMISSION SAVED</p><h2>GAME 01<br><em>CHARM CATCHER</em></h2><p>coming next...</p><button class="y2k-button ignore" id="returnButton" type="button">RETURN TO CALL</button></div>`; $('returnButton').addEventListener('click', reset); }
  function ignore() {
    ignores++; card.style.opacity = '0'; actions.style.opacity = '0'; hint.textContent = ignores > 1 ? 'she is not giving up...' : 'maybe it was nothing?';
    reconnectTimer = setTimeout(() => { setCall(ignores > 1 ? 'PICK UP, BABY ♡' : 'LUNELLE IS CALLING AGAIN...'); hint.textContent = 'tap into your little universe'; }, 1450);
  }
  function reset() { interfaceEl.classList.remove('active'); interfaceEl.setAttribute('aria-hidden', 'true'); phone.style.animation = ''; phone.style.transform = ''; setCall('INCOMING CALL...'); hint.style.opacity = '1'; }
  $('answerButton').addEventListener('click', answer); $('ignoreButton').addEventListener('click', ignore); $('closeInterface').addEventListener('click', reset);
  sound.addEventListener('click', () => { const on = sound.getAttribute('aria-pressed') !== 'true'; sound.setAttribute('aria-pressed', on); sound.textContent = on ? '♪ ON' : '♪ OFF'; });
  const trail = document.querySelector('.cursor-sparkles');
  window.addEventListener('pointermove', e => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || e.pointerType === 'touch') return; const dot = document.createElement('i'); dot.textContent = Math.random() > .5 ? '✦' : '·'; dot.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;color:#fff;font-size:${Math.random()*8+8}px;text-shadow:0 0 6px #f35b8f;transition:opacity .65s,transform .65s`; trail.append(dot); requestAnimationFrame(()=>{dot.style.opacity='0';dot.style.transform='translateY(-12px) scale(.4)'}); setTimeout(()=>dot.remove(),700); });
})();
