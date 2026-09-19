(() => {
  const shell = document.getElementById('gameShell');
  const intro = document.querySelector('[data-screen="intro"]');
  const asset = 'assets/homepage-v2/LUNELLE_homepage_v2_asset_pack/';
  const sourceWidth = 1060;
  const sourceHeight = 1484;
  const croppedWidth = sourceWidth;
  const croppedHeight = sourceHeight;
  const hotspots = { answer:[21.7,85.8,32.1,4.1], ignore:[55.1,85.8,22.2,4.1], my_lunelle:[2.2,6.6,16,10], dreams:[2.2,18.2,16,10], beauty:[2.2,29.4,16,10], music:[2.2,40.2,16,10], about_me:[2.2,51.2,16,10] };
  const hotspot = (name, label) => { const [left, top, width, height] = hotspots[name]; return `<button class="master-hotspot ${name}" style="--l:${left}%;--t:${top}%;--w:${width}%;--h:${height}%" aria-label="${label}" type="button"></button>`; };
  // Shared large-CTA factory: master artwork stays untouched while a real button
  // supplies the consistent Lunelle press and sparkle interaction.
  const LunellePrimaryButton = ({ label, ariaLabel, variant = 'pink', className = '', style = '', id = '' }) => `<button${id ? ` id="${id}"` : ''} class="lunelle-primary-button ${variant} ${className}" style="${style}" aria-label="${ariaLabel}" type="button">${label}</button>`;
  const actionButton = (name, label, ariaLabel) => { const [left, top, width, height] = hotspots[name]; return `<button class="master-hotspot game-action-button ${name}" style="--l:${left}%;--t:${top}%;--w:${width}%;--h:${height}%" aria-label="${ariaLabel}" type="button"><span class="button-bottom" aria-hidden="true"></span><span class="button-face">${label}</span></button>`; };
  intro.innerHTML = `
    <div class="game-viewport">
      <div class="ambient-background" aria-hidden="true"></div>
      <div class="master-stage" id="masterStage" aria-label="Lunelle Page 01 incoming call">
        <div class="stage-content">
          <div class="master-art-crop"><img class="master-art" id="masterArt" src="${asset}homepage-master-v2.jpg" alt="Lunelle Dream Dial 2000 incoming call game screen" /></div>
          <div class="phone-position-wrapper" id="phoneHero" aria-hidden="true"><div class="phone-vibration-wrapper" id="phoneVibration"><i class="phone-screen-glow"></i><img class="phone-image" src="assets/homepage-v2/homepage-phone.png" alt="" /></div></div>
          <div class="ambient-sparkles" aria-hidden="true"><i>✦</i><i>✧</i><i>♡</i><i>✦</i><i>✧</i><i>♡</i><i>✦</i></div>
          <div class="click-sparkle-layer" aria-hidden="true"></div>
          <div class="interaction-layer" aria-label="Page 01 controls">
            ${hotspot('my_lunelle','My LUNELLE')}${hotspot('dreams','Dreams')}${hotspot('beauty','Beauty')}${hotspot('music','Music')}${hotspot('about_me','About Me')}
            ${actionButton('answer','♡ ANSWER THE CALL ♡','Answer the call')}${actionButton('ignore','IGNORE','Ignore the call')}
          </div>
          <div class="icon-tooltip" id="iconTooltip" hidden>Coming soon ♡</div>
          <section class="master-popup" id="ignorePopup" hidden role="dialog" aria-modal="true"><div class="popup-title"><span class="popup-heart">♡</span> LUNELLE.exe <i>×</i></div><p id="ignoreMessage"></p><div class="popup-actions"><button class="win-button popup-action-button" id="popupAnswer" type="button">好嘛，接一下 ♡</button><button class="win-button popup-action-button" id="ignoreAgain" type="button">就不接 &gt;_&lt;</button></div></section>
        </div>
      </div>
    </div>`;
  const page2 = document.createElement('section');
  page2.className = 'screen p2-screen'; page2.dataset.screen = 'page2';
  page2.innerHTML = `
    <div class="p2-viewport">
      <div class="p2-ambient" aria-hidden="true"></div>
      <div class="p2-stage" id="page2Stage" aria-label="Lunelle connecting screen">
        <div class="p2-stage-content">
          <img class="p2-master-art" src="assets/page02-v2/page02-master.jpg" alt="Lunelle connecting to the beauty channel" />
          <i class="p2-connecting-glow" aria-hidden="true"></i>
          <i class="p2-heart-signal" aria-hidden="true"></i>
          <div class="p2-progress-live" id="page2Progress" aria-hidden="true"><i></i></div>
          <div class="p2-ambient-sparkles" aria-hidden="true"><i>✦</i><i>✧</i><i>♡</i><i>✦</i><i>✧</i></div>
          <div class="p2-click-sparkle-layer" aria-hidden="true"></div>
          <span class="p2-connected-status" id="connectedStatus" aria-live="polite" hidden>CONNECTED ♡</span>
          <button class="p2-start-hotspot start-game-button" id="startGame" aria-label="Start game" type="button"><span class="button-bottom" aria-hidden="true"></span><span class="button-face">START GAME</span></button>
        </div>
      </div>
    </div>`;
  const mission01 = document.createElement('section');
  mission01.className = 'screen m1-screen'; mission01.dataset.screen = 'mission01';
  mission01.innerHTML = `
    <div class="m1-viewport">
      <div class="m1-ambient" aria-hidden="true"></div>
      <div class="m1-stage" id="mission01Stage" aria-label="Mission 01 beauty signal catcher">
        <div class="m1-stage-content">
          <img class="m1-master-art" src="assets/mission01-v2/LUNELLE_mission01_v2_asset_pack/mission01-master-v2.jpg" alt="Lunelle Mission 01 catch your beauty signal" />
          <div class="m1-falling-layer" id="fallingLayer" aria-hidden="true"></div>
          <div class="m1-success-layer" id="missionSuccessLayer" aria-hidden="true"></div>
          <div class="m1-score-pop-layer" id="scorePopLayer" aria-hidden="true"></div>
          <img class="m1-bag" id="catcherBag" src="assets/mission01-v2/mission01-beauty-bag.png" alt="Lunelle beauty bag catcher" draggable="false" />
          <b class="m1-timer-value" id="timerValue" aria-live="polite">00:15</b>
          <b class="m1-score-value" id="scoreValue" aria-live="polite">000</b>
          <span class="m1-countdown" id="missionCountdown" aria-live="assertive" hidden></span>
          <section class="m1-result-popup" id="missionResult" hidden role="dialog" aria-modal="true"><div class="popup-title">♡ Mission 01 <i>×</i></div><b>SIGNAL COLLECTED! ♡</b><span id="finalScore">SCORE: 000</span>${LunellePrimaryButton({ id: 'missionNext', label: 'NEXT MISSION', ariaLabel: 'Continue to the next mission', className: 'm1-next-button', style: '' })}</section>
        </div>
      </div>
    </div>`;
  const mission02 = document.createElement('section');
  mission02.className = 'screen m2-screen'; mission02.dataset.screen = 'mission02';
  const mission02Options = [
    ['color', 'cherry', 'CHERRY', 4.2], ['color', 'baby-pink', 'BABY PINK', 14.0], ['color', 'icy-blue', 'ICY BLUE', 24.0],
    ['finish', 'gloss', 'GLOSS', 36.9], ['finish', 'glitter', 'GLITTER', 46.4], ['finish', 'pearl', 'PEARL', 56.1],
    ['mood', 'angel', 'ANGEL', 68.8], ['mood', 'dream', 'DREAM', 78.5], ['mood', 'rebel', 'REBEL', 88.1]
  ];
  mission02.innerHTML = `
    <div class="m2-viewport">
      <div class="m2-ambient" aria-hidden="true"></div>
      <div class="m2-stage" id="mission02Stage" aria-label="Mission 02, choose your beauty recipe">
        <div class="m2-stage-content">
          <img class="m2-master-art" src="assets/mission02/mission02-master.jpg" alt="Lunelle Mission 02 choose your beauty recipe" />
          <i class="m2-progress-two" id="mission02ProgressTwo" aria-hidden="true">✓</i>
          <i class="m2-compact-pulse" id="mission02CompactPulse" aria-hidden="true"></i>
          <div class="m2-title-flash color" aria-hidden="true"></div><div class="m2-title-flash finish" aria-hidden="true"></div><div class="m2-title-flash mood" aria-hidden="true"></div>
          <div class="m2-click-sparkle-layer" id="mission02Sparkles" aria-hidden="true"></div>
          <div class="m2-selection-layer" aria-label="Choose one color, finish, and mood">
            ${mission02Options.map(([group, value, label, left]) => `<button class="m2-option" type="button" data-group="${group}" data-value="${value}" style="--l:${left}%" aria-label="${group}: ${label}" aria-pressed="false"><span aria-hidden="true">♡</span></button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  const mission03 = document.createElement('section');
  mission03.className = 'screen m3-screen'; mission03.dataset.screen = 'mission03';
  mission03.innerHTML = `
    <div class="m3-viewport">
      <div class="m3-ambient" aria-hidden="true"></div>
      <div class="m3-stage" id="mission03Stage" aria-label="Mission 03 hidden beauty signal search">
        <div class="m3-stage-content">
          <img class="m3-master-art" src="assets/mission03/mission03-master.jpg" alt="Lunelle Mission 03 find hidden beauty signals" />
          <div class="m3-click-sparkle-layer" id="mission03Sparkles" aria-hidden="true"></div>
          <b class="m3-found-counter" id="mission03Counter" aria-live="polite">0/3<i>♡</i></b>
          <i class="m3-progress-three" id="mission03ProgressThree" aria-hidden="true">✓</i>
          <div class="m3-mirror" id="mission03Mirror" role="application" aria-label="Drag the heart mirror to search for hidden beauty signals" tabindex="0">
            <img src="assets/mission03/heart-mirror.png" alt="" draggable="false" />
            <div class="m3-lens" aria-hidden="true"><i class="m3-hidden-heart" id="mission03Heart">♥</i></div>
          </div>
        </div>
      </div>
    </div>`;
  const passGenerating = document.createElement('section');
  passGenerating.className = 'screen pg-screen'; passGenerating.dataset.screen = 'pass-generating';
  passGenerating.innerHTML = `
    <div class="pg-viewport">
      <div class="pg-ambient" aria-hidden="true"></div>
      <div class="pg-stage" id="passGeneratingStage" aria-label="Generating your Lunelle Pass">
        <div class="pg-stage-content">
          <img class="pg-master-art" src="assets/pass-generating/pass-generating-master.jpg" alt="Lunelle Pass generating screen" />
          <i class="pg-heart-pulse" aria-hidden="true"></i>
          <div class="pg-progress-shine" aria-hidden="true"><i></i></div>
          <i class="pg-printer-slot-glow" aria-hidden="true"></i>
          <div class="pg-ticket-clip" id="printedTicketClip" aria-hidden="true"><img class="pg-ticket" src="assets/pass-generating/printed-ticket.png" alt="" /></div>
          <div class="pg-sparkle-layer" id="passGeneratingSparkles" aria-hidden="true"></div>
          <button class="pg-ready-button" id="passReadyButton" type="button" hidden>YOUR LOOK IS READY! ♡</button>
        </div>
      </div>
    </div>`;
  const resultReveal = document.createElement('section');
  resultReveal.className = 'screen rr-screen'; resultReveal.dataset.screen = 'result-reveal';
  resultReveal.innerHTML = `
    <div class="rr-viewport">
      <div class="rr-ambient" aria-hidden="true"></div>
      <div class="rr-stage" id="resultRevealStage" aria-label="Your Lunelle character result">
        <div class="rr-stage-content">
          <img class="rr-master-base" id="resultMaster" src="" alt="Your personalized Lunelle character result" />
          <img class="rr-polaroid-overlay" id="resultPolaroid" src="" alt="" aria-hidden="true" />
          <img class="rr-panel-overlay" id="resultPanel" src="" alt="" aria-hidden="true" />
          <div class="rr-sparkle-layer" id="resultSparkles" aria-hidden="true"></div>
          <button class="rr-save-button" id="saveBeautyId" type="button" aria-label="Save my Beauty ID"><span>♡ SAVE MY BEAUTY ID ♡</span></button>
          <div class="rr-save-scrim" id="resultSaveScrim" aria-hidden="true"></div>
          <section class="rr-save-popup" id="resultSavePopup" hidden role="dialog" aria-modal="true" aria-labelledby="resultSaveTitle">
            <div class="rr-save-popup-title"><span>♡</span> LUNELLE.EXE <i>×</i></div>
            <div class="rr-save-popup-body">
              <b id="resultSaveTitle">BEAUTY ID SAVED! ♡</b>
              <p>你的美丽频道已成功锁定！<br><br>专属 LUNELLE PASS<br>已送达，请查收 ♡</p>
              <button class="rr-check-pass-button" id="checkMyPass" type="button">CHECK MY PASS →</button>
            </div>
          </section>
        </div>
      </div>
    </div>`;
  const lunellePass = document.createElement('section');
  lunellePass.className = 'screen lp-screen'; lunellePass.dataset.screen = 'lunelle-pass';
  lunellePass.innerHTML = `
    <div class="lp-viewport">
      <div class="lp-ambient" aria-hidden="true"></div>
      <div class="lp-stage" id="lunellePassStage" aria-label="Your personalized Lunelle Pass">
        <div class="lp-stage-content">
          <img class="lp-master-art" id="lunellePassMaster" src="" alt="Your personalized Lunelle Pass" />
          <div class="lp-sparkle-layer" id="lunellePassSparkles" aria-hidden="true"></div>
          <button class="lp-action-button lp-save-button" id="saveLunellePass" type="button" aria-label="Save my Lunelle Pass"><span>⇩ &nbsp; SAVE MY PASS</span></button>
          <button class="lp-action-button lp-location-button" id="viewLunelleLocation" type="button" aria-label="View location"><span>● &nbsp; VIEW LOCATION &nbsp;→</span></button>
          <span class="lp-location-note" id="passLocationNote" aria-live="polite" hidden>LOCATION COMING SOON ♡</span>
          <span class="lp-saved-note" id="savedLunellePass" aria-live="polite" hidden>SAVED! ♡</span>
        </div>
      </div>
    </div>`;
  const placeholder = document.createElement('section');
  placeholder.className = 'screen p3-placeholder'; placeholder.dataset.screen = 'mission03-placeholder';
  placeholder.innerHTML = '<div class="placeholder-window"><div class="popup-title">♡ Mission 03 <i>×</i></div><b>MISSION 03</b><small>CONNECTING YOUR NEXT DREAM… ♡</small></div>';
  shell.append(page2, mission01, mission02, mission03, passGenerating, resultReveal, lunellePass, placeholder);
  const screens = [...document.querySelectorAll('[data-screen]')];
  // Assigned after the shared audio controller is created. Keeping this indirection
  // also makes non-standard navigation paths unable to leak the intro ringtone.
  let stopIntroAudioForNavigation = () => {};
  const go = (name) => { screens.forEach((screen) => screen.classList.toggle('is-active', screen.dataset.screen === name)); shell.dataset.currentScreen = name; if (name !== 'intro') stopIntroAudioForNavigation(); if (name === 'page2') window.requestAnimationFrame(startPage02Progress); };
  go('intro');
  const stage = document.getElementById('masterStage');
  const art = document.getElementById('masterArt');
  const answer = intro.querySelector('.answer');
  const ignore = intro.querySelector('.ignore');
  const popup = document.getElementById('ignorePopup');
  const message = document.getElementById('ignoreMessage');
  const popupAnswer = document.getElementById('popupAnswer');
  const ignoreAgain = document.getElementById('ignoreAgain');
  const tooltip = document.getElementById('iconTooltip');
  const sparkleLayer = intro.querySelector('.click-sparkle-layer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phoneHero = document.getElementById('phoneHero');
  const phoneVibration = document.getElementById('phoneVibration');
  const audio = (() => {
    let context, musicTimer, soundOn = true, noteIndex = 0;
    let bgmBus, ringBus, effectsBus, busesConnected = false;
    let introStarted = false, introRinging = false, introCancelled = false, ringEndTimer;
    const melodyScale = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33, 659.25];
    // A 26-bar original miniature score: intro (2), A (7), B (7), A-prime (7), turnaround (3).
    // Eight light steps per bar at 320ms produces a seamless ~66.5 second game-world loop.
    const musicBars = [
      { r:130.81, m:[-1,-1,2,-1,4,-1,5,-1], p:0 }, { r:146.83, m:[-1,4,-1,2,-1,1,2,-1], p:0 },
      { r:130.81, m:[2,-1,4,5,4,-1,2,-1], p:1 }, { r:164.81, m:[1,2,-1,4,2,-1,1,-1], p:1 }, { r:146.83, m:[4,-1,5,7,5,-1,4,2], p:1 }, { r:196.00, m:[2,-1,4,5,-1,4,2,-1], p:1 }, { r:130.81, m:[5,4,-1,2,4,-1,5,-1], p:1 }, { r:164.81, m:[7,-1,5,4,2,-1,4,-1], p:1 }, { r:146.83, m:[2,4,5,-1,4,2,-1,1], p:2 },
      { r:174.61, m:[4,-1,6,7,-1,6,4,-1], p:1 }, { r:146.83, m:[2,4,-1,5,7,-1,5,4], p:2 }, { r:196.00, m:[5,-1,7,8,7,-1,5,-1], p:1 }, { r:164.81, m:[4,2,-1,1,2,-1,4,5], p:1 }, { r:220.00, m:[6,-1,5,4,-1,2,4,-1], p:2 }, { r:174.61, m:[7,6,-1,4,5,-1,7,-1], p:1 }, { r:130.81, m:[4,-1,2,1,2,-1,4,-1], p:0 },
      { r:130.81, m:[2,4,-1,5,4,2,-1,5], p:2, a:7 }, { r:164.81, m:[1,-1,2,4,2,1,-1,4], p:1 }, { r:146.83, m:[4,5,-1,7,5,4,2,-1], p:2, a:5 }, { r:196.00, m:[2,4,5,-1,7,5,4,2], p:1 }, { r:130.81, m:[5,-1,4,2,4,5,-1,7], p:2, a:7 }, { r:164.81, m:[7,5,-1,4,2,4,5,-1], p:1 }, { r:146.83, m:[2,4,5,4,-1,2,1,-1], p:2 },
      { r:196.00, m:[5,-1,4,2,-1,1,2,-1], p:0 }, { r:164.81, m:[4,-1,2,1,-1,2,4,-1], p:0, a:4 }, { r:130.81, m:[5,4,2,-1,-1,2,-1,-1], p:0 }
    ];
    const ramp = (bus, value, seconds = .12) => {
      if (!context || !bus) return;
      const now = context.currentTime;
      bus.gain.cancelScheduledValues(now);
      bus.gain.setValueAtTime(bus.gain.value, now);
      bus.gain.linearRampToValueAtTime(value, now + seconds);
    };
    const prepare = () => {
      try {
        context ||= new (window.AudioContext || window.webkitAudioContext)();
        bgmBus ||= context.createGain(); ringBus ||= context.createGain(); effectsBus ||= context.createGain();
        if (!busesConnected) {
          bgmBus.connect(context.destination); ringBus.connect(context.destination); effectsBus.connect(context.destination);
          bgmBus.gain.value = 0; ringBus.gain.value = 0; effectsBus.gain.value = soundOn ? 1 : 0;
          busesConnected = true;
        }
      } catch (_) { return false; }
      return true;
    };
    const tone = (frequency, duration, gain, type = 'sine', delay = 0, destination) => {
      if (!context || context.state !== 'running') return;
      const oscillator = context.createOscillator(); const volume = context.createGain(); const now = context.currentTime + delay;
      oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, now); volume.gain.setValueAtTime(.0001, now); volume.gain.exponentialRampToValueAtTime(gain, now + .015); volume.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(volume).connect(destination || effectsBus || context.destination); oscillator.start(now); oscillator.stop(now + duration + .03);
    };
    const musicStep = () => {
      if (!soundOn || !context || context.state !== 'running') return;
      const stepIndex = noteIndex % 8; const barIndex = Math.floor(noteIndex / 8) % musicBars.length; const bar = musicBars[barIndex]; const melody = bar.m[stepIndex];
      if (stepIndex === 0) tone(bar.r, .56, .105, 'sine', 0, bgmBus);
      if (melody >= 0) tone(melodyScale[melody], stepIndex === 7 ? .31 : .22, .15, barIndex < 2 ? 'sine' : 'triangle', 0, bgmBus);
      if (bar.p > 0 && (stepIndex === 0 || stepIndex === 4)) tone(108, .055, .034, 'sine', 0, bgmBus);
      if (bar.p > 1 && (stepIndex === 2 || stepIndex === 6)) tone(880, .028, .015, 'square', 0, bgmBus);
      if (bar.a === stepIndex) tone(melodyScale[Math.min(9, (melody >= 0 ? melody : 5) + 2)], .16, .055, 'sine', .025, bgmBus);
      noteIndex += 1;
    };
    const startMusic = (fade = true) => {
      if (!context || context.state !== 'running' || !soundOn) return;
      if (!musicTimer) { musicStep(); musicTimer = window.setInterval(musicStep, 320); }
      ramp(bgmBus, .2, fade ? .65 : .08);
    };
    const endIntroRing = (startBgm = true, quick = false, cancelPending = false) => {
      window.clearTimeout(ringEndTimer);
      if (cancelPending) introCancelled = true;
      if (!introRinging) {
        if (startBgm) {
          if (context?.state === 'running') startMusic(true);
          else context?.resume?.().then(() => startMusic(true)).catch(() => {});
        }
        return;
      }
      introRinging = false;
      ramp(ringBus, 0, quick ? .1 : .22);
      if (startBgm) startMusic(true);
    };
    const startIntroSequence = (onRingStart, onRingEnd) => {
      if (introStarted || introCancelled) return false;
      if (!prepare()) return false;
      const begin = () => {
        if (!context || context.state !== 'running' || introStarted || introCancelled) return false;
        introStarted = true; introRinging = true;
        ramp(ringBus, soundOn ? .18 : 0, .06);
        onRingStart?.();
        ringEndTimer = window.setTimeout(() => { endIntroRing(true); onRingEnd?.(); }, 4000);
        return true;
      };
      if (context.state === 'running') return begin();
      context.resume?.().then(begin).catch(() => {});
      return false;
    };
    return {
      startIntroSequence,
      toggle: () => {
        soundOn = !soundOn;
        if (!prepare()) return soundOn;
        ramp(effectsBus, soundOn ? 1 : 0, .1);
        ramp(ringBus, soundOn && introRinging ? .18 : 0, .1);
        if (soundOn) { if (introStarted && !introRinging) startMusic(true); } else { ramp(bgmBus, 0, .1); }
        return soundOn;
      },
      ring: () => { if (!context || context.state !== 'running' || !soundOn) return; tone(582, .075, .09, 'square', 0, ringBus); tone(742, .075, .07, 'square', .12, ringBus); },
      sparkle: () => { if (!context || context.state !== 'running' || !soundOn) return; tone(880, .09, .045, 'sine'); tone(1174.66, .15, .035, 'triangle', .075); },
      stopIntroRing: (startBgm = true) => endIntroRing(startBgm, true, true),
      isSoundOn: () => soundOn
    };
  })();
  let ringBursts = []; let incomingCallActive = false;
  const ringOnce = () => { if (answer.disabled) return; phoneVibration.classList.remove('is-ringing'); requestAnimationFrame(() => phoneVibration.classList.add('is-ringing')); window.setTimeout(() => phoneVibration.classList.remove('is-ringing'), 230); audio.ring(); };
  const clearIncomingCallVisuals = () => { ringBursts.forEach((timer) => window.clearTimeout(timer)); ringBursts = []; incomingCallActive = false; phoneVibration.classList.remove('is-ringing'); };
  const startIncomingCall = () => {
    if (incomingCallActive) return;
    audio.startIntroSequence(() => { incomingCallActive = true; [0,390,900,1290,1800,2190,2700,3090,3510].forEach((delay) => { ringBursts.push(window.setTimeout(ringOnce, delay)); }); }, clearIncomingCallVisuals);
  };
  const stopIncomingCall = () => { clearIncomingCallVisuals(); audio.stopIntroRing(true); };
  stopIntroAudioForNavigation = stopIncomingCall;
  let ignores = 0;
  const press = (button) => { button.classList.remove('pressed'); requestAnimationFrame(() => button.classList.add('pressed')); window.setTimeout(() => button.classList.remove('pressed'), 280); };
  const burst = (event, count = 7, tone = 'pink', burstStage = stage, burstLayer = sparkleLayer) => {
    if (reducedMotion) return;
    const stageBox = burstStage.getBoundingClientRect();
    const targetBox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || targetBox.left + targetBox.width / 2;
    const y = event.clientY || targetBox.top + targetBox.height / 2;
    const burstEl = document.createElement('span');
    burstEl.className = `sparkle-burst ${tone}`; burstEl.style.left = `${x - stageBox.left}px`; burstEl.style.top = `${y - stageBox.top}px`;
    const glyphs = ['✦','✧','♡','✦','✧','♡','✦','✧'];
    for (let index = 0; index < count; index += 1) { const particle = document.createElement('i'); const angle = (Math.PI * 2 * index / count) + (Math.random() * .35); const distance = 20 + Math.random() * 30; particle.textContent = glyphs[index % glyphs.length]; particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`); particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`); particle.style.setProperty('--delay', `${index * 22}ms`); burstEl.append(particle); }
    burstLayer.append(burstEl); window.setTimeout(() => burstEl.remove(), 720);
  };
  const connect = (event) => { if (answer.disabled) return; startIncomingCall(); stopIncomingCall(); popup.hidden = true; answer.disabled = true; ignore.disabled = true; burst(event, 9, 'pink'); stage.classList.add('answer-signal'); window.setTimeout(() => { stage.classList.remove('answer-signal'); stage.classList.add('connecting'); window.setTimeout(() => go('page2'), 430); }, 430); };
  const showIgnoreDialog = (step) => {
    ignores = step; popup.classList.toggle('is-angry', step === 2); popup.hidden = false; ignoreAgain.hidden = step === 3;
    if (step === 1) { message.textContent = '哈？！你居然不接我电话？！(｡•́︿•̀｡)\n\n我可是特地从少女频道打来的诶……\n\n再给你一次机会！♡'; popupAnswer.textContent = '好嘛，接一下 ♡'; ignoreAgain.textContent = '就不接 >_<'; }
    if (step === 2) { message.textContent = '……哼！我生气了！(˘･з･˘)\n\n真的不接吗？\n\n里面可是有你的美妆秘密诶……♡'; popupAnswer.textContent = '好啦好啦，接！'; ignoreAgain.textContent = '还是不要'; }
    if (step === 3) { message.textContent = '拒绝无效 ♡\n\n本频道决定再打一次。\n\nRING RING RING... ☎︎'; popupAnswer.textContent = '接听 ♡'; }
  };
  const extraPhoneRing = () => { ringOnce(); window.setTimeout(ringOnce, 180); const box = phoneHero.getBoundingClientRect(); burst({ currentTarget: phoneHero, clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 }, 5, 'pink'); };
  const openIgnore = (event) => { burst(event, 7, 'blue'); window.setTimeout(() => showIgnoreDialog(1), 260); };
  const bindLunellePrimaryButton = (button, action) => {
    let pointerActive = false;
    let suppressClickUntil = 0;
    const release = () => button.classList.remove('is-pressed');
    button.addEventListener('pointerdown', (event) => { if (button.disabled) return; startIncomingCall(); pointerActive = true; button.setPointerCapture?.(event.pointerId); button.classList.add('is-pressed'); });
    const actionEvent = (event) => ({ currentTarget: button, clientX: event.clientX, clientY: event.clientY });
    button.addEventListener('pointerup', (event) => { if (!pointerActive) return; const savedEvent = actionEvent(event); pointerActive = false; suppressClickUntil = Date.now() + 420; release(); window.setTimeout(() => action(savedEvent), 135); });
    button.addEventListener('pointercancel', () => { if (!pointerActive) return; pointerActive = false; release(); });
    button.addEventListener('click', (event) => { if (Date.now() < suppressClickUntil || button.disabled) return; const savedEvent = actionEvent(event); button.classList.add('is-pressed'); window.setTimeout(() => { release(); window.setTimeout(() => action(savedEvent), 135); }, 85); });
  };
  bindLunellePrimaryButton(answer, connect);
  bindLunellePrimaryButton(ignore, openIgnore);
  bindLunellePrimaryButton(popupAnswer, connect);
  bindLunellePrimaryButton(ignoreAgain, () => { popup.hidden = true; if (ignores === 1) { window.setTimeout(() => showIgnoreDialog(2), 250); return; } window.setTimeout(() => { showIgnoreDialog(3); extraPhoneRing(); }, 250); });
  intro.querySelectorAll('.master-hotspot:not(.answer):not(.ignore)').forEach((button) => button.addEventListener('click', (event) => { startIncomingCall(); press(button); burst(event, 6); button.classList.add('icon-bounce'); const stageBox = stage.getBoundingClientRect(); const box = button.getBoundingClientRect(); tooltip.style.left = `${Math.min(box.left - stageBox.left + box.width + 4, stageBox.width - 95)}px`; tooltip.style.top = `${box.top - stageBox.top + 4}px`; tooltip.textContent = button.classList.contains('music') ? `♪ ${audio.toggle() ? 'ON' : 'OFF'}` : 'Coming soon ♡'; tooltip.hidden = false; window.setTimeout(() => { button.classList.remove('icon-bounce'); tooltip.hidden = true; }, 1000); }));
  const page2Stage = document.getElementById('page2Stage');
  const startGame = document.getElementById('startGame');
  const page2Sparkles = page2.querySelector('.p2-click-sparkle-layer');
  const page2Progress = document.getElementById('page2Progress');
  const page2ProgressFill = page2Progress.querySelector('i');
  const connectedStatus = document.getElementById('connectedStatus');
  let progressTimer;
  const startPage02Progress = () => {
    window.clearTimeout(progressTimer); page2ProgressFill.style.transition = 'none'; page2ProgressFill.style.width = '3%';
    const checkpoints = [[18,350,120],[36,450,100],[52,300,160],[68,550,120],[83,350,90],[94,450,110],[100,250,0]];
    let index = 0;
    const advance = () => {
      if (index >= checkpoints.length || !page2.classList.contains('is-active')) return;
      const [value, duration, pause] = checkpoints[index]; page2ProgressFill.style.transition = `width ${duration}ms ease-out`; page2ProgressFill.style.width = `${value}%`; index += 1;
      progressTimer = window.setTimeout(advance, duration + pause);
    };
    window.requestAnimationFrame(() => { progressTimer = window.setTimeout(advance, 90); });
  };
  let startLocked = false;
  const finishStartGame = (event) => {
    if (startLocked) return;
    startLocked = true;
    burst(event, 8, 'pink', page2Stage, page2Sparkles);
    window.setTimeout(() => { connectedStatus.hidden = false; connectedStatus.classList.add('is-visible'); }, 320);
    window.setTimeout(() => { go('mission01'); window.setTimeout(startMissionCountdown, 20); }, 420);
  };
  bindLunellePrimaryButton(startGame, finishStartGame);
  const missionStage = document.getElementById('mission01Stage');
  const catcherBag = document.getElementById('catcherBag');
  const fallingLayer = document.getElementById('fallingLayer');
  const successLayer = document.getElementById('missionSuccessLayer');
  const scorePopLayer = document.getElementById('scorePopLayer');
  const timerValue = document.getElementById('timerValue');
  const scoreValue = document.getElementById('scoreValue');
  const countdown = document.getElementById('missionCountdown');
  const missionResult = document.getElementById('missionResult');
  const finalScore = document.getElementById('finalScore');
  const missionNext = document.getElementById('missionNext');
  const dropAssets = [
    ['lipgloss', 'drop-lipgloss.png'], ['digitalCharm', 'drop-digital-charm.png'], ['cd', 'drop-cd.png'],
    ['sunglasses', 'drop-sunglasses.png'], ['star', 'drop-star.png'], ['bow', 'drop-bow.png']
  ];
  const mission01Profile = { missionWeight: .3, lipglossCount: 0, digitalCharmCount: 0, cdCount: 0, sunglassesCount: 0, starCount: 0, bowCount: 0 };
  window.LunelleMission01Profile = mission01Profile;
  const missionState = { active: false, ended: false, score: 0, bagX: 50, items: [], collected: { lipglossCount: 0, digitalCharmCount: 0, cdCount: 0, sunglassesCount: 0, starCount: 0, bowCount: 0 }, dropDeck: [], spawnAt: 0, nextChoiceAt: 0, endAt: 0, frame: 0 };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const updateBag = () => { catcherBag.style.left = `${missionState.bagX}%`; };
  const updateScore = () => { scoreValue.textContent = String(missionState.score).padStart(3, '0'); };
  const missionBurst = (x, y, count = 5) => {
    if (reducedMotion) return;
    const burstEl = document.createElement('span'); burstEl.className = 'sparkle-burst pink'; burstEl.style.left = `${x}%`; burstEl.style.top = `${y}%`;
    const glyphs = ['✦', '✧', '♡', '✦', '✧', '♡', '✦'];
    for (let index = 0; index < count; index += 1) { const particle = document.createElement('i'); const angle = (Math.PI * 2 * index / count) + (Math.random() * .25); const distance = 16 + Math.random() * 23; particle.textContent = glyphs[index % glyphs.length]; particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`); particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`); particle.style.setProperty('--delay', `${index * 18}ms`); burstEl.append(particle); }
    successLayer.append(burstEl); window.setTimeout(() => burstEl.remove(), 600);
  };
  const scorePop = () => { const pop = document.createElement('b'); pop.className = 'm1-score-pop'; pop.textContent = '+10'; pop.style.left = `${missionState.bagX}%`; scorePopLayer.append(pop); window.setTimeout(() => pop.remove(), 620); };
  const removeItem = (item) => { item.node.remove(); missionState.items = missionState.items.filter((entry) => entry !== item); };
  const catchItem = (item) => {
    if (item.caught) return;
    item.caught = true; missionState.score += 10; missionState.collected[`${item.type}Count`] += 1; updateScore();
    item.node.classList.add('is-caught'); item.node.style.setProperty('--catch-x', `${missionState.bagX - item.x}%`); item.node.style.setProperty('--catch-y', `${75.5 - item.y}%`);
    catcherBag.classList.remove('is-catching'); requestAnimationFrame(() => catcherBag.classList.add('is-catching'));
    missionBurst(missionState.bagX, 72.5, 6); scorePop(); window.setTimeout(() => removeItem(item), 330);
  };
  const randomBetween = (min, max) => min + Math.random() * (max - min);
  const shuffledDropDeck = () => {
    const deck = [...dropAssets];
    for (let index = deck.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [deck[index], deck[swap]] = [deck[swap], deck[index]]; }
    return deck;
  };
  const nextDrop = () => { if (!missionState.dropDeck.length) missionState.dropDeck = shuffledDropDeck(); return missionState.dropDeck.pop(); };
  const difficultyFor = (seconds) => {
    if (seconds > 11) return { name: 'easy', interval: [700, 850], duration: [2.4, 2.8], cap: 3, pairChance: 0 };
    if (seconds > 6) return { name: 'rush', interval: [380, 520], duration: [1.55, 2], cap: 6, pairChance: .5 };
    return { name: 'chaos', interval: [220, 340], duration: [.95, 1.35], cap: 8, pairChance: .7 };
  };
  const createDrop = ([type, file], x, phase, speed = randomBetween(phase.duration[0], phase.duration[1])) => {
    const item = { type, x, y: 30, size: 7 + Math.random() * 3.5, speed, rotation: -5 + Math.random() * 10, caught: false, node: document.createElement('img') };
    item.node.className = 'm1-falling-item'; item.node.src = `assets/mission01/LUNELLE_mission01_asset_pack/drops/${file}`; item.node.alt = ''; item.node.style.width = `${item.size}%`; item.node.style.left = `${item.x}%`; item.node.style.top = `${item.y}%`; item.node.style.setProperty('--rotate', `${item.rotation}deg`); fallingLayer.append(item.node); missionState.items.push(item);
  };
  const spawnWave = (phase) => {
    if (missionState.items.length >= phase.cap) return;
    const canPair = phase.pairChance > 0 && missionState.items.length <= phase.cap - 2 && Math.random() < phase.pairChance;
    if (canPair) {
      const leftX = randomBetween(16, 21); const rightX = randomBetween(79, 84); const first = nextDrop(); const second = nextDrop(); const speed = randomBetween(phase.duration[0], phase.duration[1]);
      if (Math.random() < .5) { createDrop(first, leftX, phase, speed); createDrop(second, rightX, phase, speed + randomBetween(-.04, .04)); } else { createDrop(first, rightX, phase, speed); createDrop(second, leftX, phase, speed + randomBetween(-.04, .04)); }
      return;
    }
    createDrop(nextDrop(), randomBetween(22, 78), phase);
  };
  const spawnForcedChoice = (phase, triple = false) => {
    const needed = triple ? 3 : 2;
    if (missionState.items.length > phase.cap - needed) { spawnWave(phase); return; }
    const choices = [nextDrop(), nextDrop(), nextDrop()]; const speed = randomBetween(phase.duration[0], phase.duration[1]);
    if (triple) {
      [randomBetween(13, 18), randomBetween(47, 53), randomBetween(82, 87)].forEach((x, index) => createDrop(choices[index], x, phase, speed + randomBetween(-.04, .04)));
      return;
    }
    createDrop(choices[0], randomBetween(16, 21), phase, speed); createDrop(choices[1], randomBetween(79, 84), phase, speed + randomBetween(-.04, .04));
  };
  const finishMission = () => {
    if (missionState.ended) return;
    missionState.ended = true; missionState.active = false; cancelAnimationFrame(missionState.frame); missionState.items.forEach((item) => item.node.classList.add('is-fading'));
    window.setTimeout(() => { missionState.items.forEach((item) => item.node.remove()); missionState.items = []; Object.assign(mission01Profile, missionState.collected); finalScore.textContent = `SCORE: ${String(missionState.score).padStart(3, '0')}`; missionResult.hidden = false; }, 400);
  };
  const missionLoop = (now) => {
    if (!missionState.active) return;
    const seconds = Math.max(0, Math.ceil((missionState.endAt - now) / 1000)); timerValue.textContent = `00:${String(seconds).padStart(2, '0')}`; timerValue.classList.toggle('is-urgent', seconds <= 3);
    if (now >= missionState.endAt) { timerValue.textContent = '00:00'; finishMission(); return; }
    if (now >= missionState.spawnAt) {
      const phase = difficultyFor(seconds); const forcedChoice = seconds <= 10 && now >= missionState.nextChoiceAt;
      if (forcedChoice) { spawnForcedChoice(phase, seconds <= 5 && Math.random() < .52); missionState.nextChoiceAt = now + randomBetween(1000, 1800); } else { spawnWave(phase); }
      missionState.spawnAt = now + randomBetween(phase.interval[0], phase.interval[1]);
    }
    const elapsed = Math.max(0, now - (missionState.lastFrame || now)); missionState.lastFrame = now;
    missionState.items.slice().forEach((item) => {
      if (item.caught) return;
      item.y += (elapsed / 1000) * (54 / item.speed); item.node.style.top = `${item.y}%`;
      const withinBag = Math.abs(item.x - missionState.bagX) < (10.8 + item.size * .32); const atBag = item.y > 69 && item.y < 79;
      if (withinBag && atBag) catchItem(item); else if (item.y > 86) removeItem(item);
    });
    missionState.frame = requestAnimationFrame(missionLoop);
  };
  const beginMission = () => { missionState.active = true; missionState.ended = false; missionState.score = 0; missionState.items = []; missionState.dropDeck = shuffledDropDeck(); missionState.lastFrame = 0; missionState.endAt = performance.now() + 15000; missionState.spawnAt = performance.now() + randomBetween(700, 850); missionState.nextChoiceAt = performance.now() + 5000; updateScore(); timerValue.textContent = '00:15'; missionState.frame = requestAnimationFrame(missionLoop); };
  const startMissionCountdown = () => {
    sessionStorage.removeItem('lunelle.finalPersona'); finalPersona = null;
    cancelAnimationFrame(missionState.frame); missionState.active = false; missionState.ended = false; missionState.score = 0; missionState.items.forEach((item) => item.node.remove()); missionState.items = []; Object.keys(missionState.collected).forEach((key) => { missionState.collected[key] = 0; }); missionResult.hidden = true; missionState.bagX = 50; updateBag(); updateScore(); timerValue.textContent = '00:15';
    const sequence = ['READY?', '3', '2', '1', 'GO! ♡']; let index = 0;
    const showNext = () => { if (index >= sequence.length) { countdown.hidden = true; beginMission(); return; } countdown.textContent = sequence[index]; countdown.hidden = false; countdown.classList.remove('is-visible'); requestAnimationFrame(() => countdown.classList.add('is-visible')); const wait = index === 0 ? 650 : 620; index += 1; window.setTimeout(showNext, wait); };
    window.setTimeout(showNext, 500);
  };
  const moveBagFromEvent = (event) => { const box = missionStage.getBoundingClientRect(); missionState.bagX = clamp(((event.clientX - box.left) / box.width) * 100, 16, 84); updateBag(); };
  let draggingBag = false;
  catcherBag.addEventListener('pointerdown', (event) => { draggingBag = true; catcherBag.setPointerCapture?.(event.pointerId); moveBagFromEvent(event); event.preventDefault(); });
  catcherBag.addEventListener('pointermove', (event) => { if (!draggingBag) return; moveBagFromEvent(event); event.preventDefault(); });
  catcherBag.addEventListener('pointerup', () => { draggingBag = false; }); catcherBag.addEventListener('pointercancel', () => { draggingBag = false; });
  bindLunellePrimaryButton(missionNext, () => go('mission02'));
  const mission02Stage = document.getElementById('mission02Stage');
  const mission02Sparkles = document.getElementById('mission02Sparkles');
  const mission02ProgressTwo = document.getElementById('mission02ProgressTwo');
  const mission02CompactPulse = document.getElementById('mission02CompactPulse');
  const mission02Profile = { selectedColor: null, selectedFinish: null, selectedMood: null, missionWeight: .5 };
  window.LunelleMission02Profile = mission02Profile;
  let mission02Complete = false;
  const mission02FlashTitle = (group) => {
    const title = mission02.querySelector(`.m2-title-flash.${group}`);
    if (!title || title.dataset.seen) return;
    title.dataset.seen = 'true'; title.classList.remove('is-flashing'); requestAnimationFrame(() => title.classList.add('is-flashing'));
  };
  const mission02Burst = (event, count = 5, tone = 'pink') => burst(event, count, tone, mission02Stage, mission02Sparkles);
  const mission02CompleteRecipe = () => {
    if (mission02Complete) return;
    mission02Complete = true;
    mission02CompactPulse.classList.remove('is-complete'); mission02ProgressTwo.classList.remove('is-complete');
    requestAnimationFrame(() => { mission02CompactPulse.classList.add('is-complete'); mission02ProgressTwo.classList.add('is-complete'); });
    const compactBox = mission02CompactPulse.getBoundingClientRect();
    mission02Burst({ currentTarget: mission02CompactPulse, clientX: compactBox.left + compactBox.width / 2, clientY: compactBox.top + compactBox.height / 2 }, 9, 'pink');
    window.setTimeout(() => go('mission03'), 1080);
  };
  const selectMission02Option = (event) => {
    if (mission02Complete) return;
    const button = event.currentTarget; const group = button.dataset.group; const value = button.dataset.value;
    mission02.querySelectorAll(`.m2-option[data-group="${group}"]`).forEach((option) => { option.classList.remove('is-selected'); option.setAttribute('aria-pressed', 'false'); });
    button.classList.remove('is-tapped'); requestAnimationFrame(() => button.classList.add('is-tapped'));
    button.classList.add('is-selected'); button.setAttribute('aria-pressed', 'true');
    mission02Profile[`selected${group[0].toUpperCase()}${group.slice(1)}`] = value;
    mission02FlashTitle(group); mission02Burst(event, 5, group === 'mood' ? 'blue' : 'pink');
    if (mission02Profile.selectedColor && mission02Profile.selectedFinish && mission02Profile.selectedMood) mission02CompleteRecipe();
  };
  mission02.querySelectorAll('.m2-option').forEach((button) => {
    button.addEventListener('pointerdown', () => { button.classList.add('is-pressing'); });
    button.addEventListener('pointerup', () => { button.classList.remove('is-pressing'); });
    button.addEventListener('pointercancel', () => { button.classList.remove('is-pressing'); });
    button.addEventListener('click', selectMission02Option);
  });
  const mission03Stage = document.getElementById('mission03Stage');
  const heartMirror = document.getElementById('mission03Mirror');
  const mission03Heart = document.getElementById('mission03Heart');
  const mission03Counter = document.getElementById('mission03Counter');
  const mission03ProgressThree = document.getElementById('mission03ProgressThree');
  const mission03Sparkles = document.getElementById('mission03Sparkles');
  const mission03Candidates = [
    { zone: 'upper-middle', x: 48, y: 42 }, { zone: 'upper-middle', x: 56, y: 43 },
    { zone: 'middle-left', x: 17, y: 56 }, { zone: 'middle-left', x: 20, y: 58 },
    { zone: 'middle-right', x: 84, y: 56 }, { zone: 'middle-right', x: 80, y: 59 },
    { zone: 'lower-left', x: 15, y: 67 }, { zone: 'lower-left', x: 19, y: 68 },
    { zone: 'lower-middle', x: 51, y: 69 }, { zone: 'lower-middle', x: 54, y: 68 },
    { zone: 'lower-right', x: 84, y: 67 }, { zone: 'lower-right', x: 80, y: 69 }
  ];
  const mission03MinimumDistance = 32;
  const mission03State = { active: [], found: 0, mirrorLeft: 35.5, mirrorTop: 48, dragging: false, pointerOffsetX: 0, pointerOffsetY: 0, previousLens: null, lastFoundAt: 0, complete: false };
  const shuffled = (items) => { const copy = [...items]; for (let index = copy.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [copy[index], copy[swap]] = [copy[swap], copy[index]]; } return copy; };
  const updateMission03Mirror = () => { heartMirror.style.left = `${mission03State.mirrorLeft}%`; heartMirror.style.top = `${mission03State.mirrorTop}%`; };
  const updateMission03Counter = () => { mission03Counter.textContent = `${mission03State.found}/3`; const heart = document.createElement('i'); heart.textContent = '♡'; mission03Counter.append(heart); mission03Counter.classList.remove('is-updating'); requestAnimationFrame(() => mission03Counter.classList.add('is-updating')); };
  const mission03Distance = (first, second) => Math.hypot(first.x - second.x, (first.y - second.y) * .8);
  const chooseMission03Signals = () => {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      const selection = [];
      shuffled(mission03Candidates).forEach((candidate) => {
        if (selection.length === 3 || selection.some((point) => point.zone === candidate.zone)) return;
        if (selection.every((point) => mission03Distance(point, candidate) >= mission03MinimumDistance)) selection.push(candidate);
      });
      if (selection.length === 3) return selection.map((point) => ({ ...point, found: false }));
    }
    return [mission03Candidates[0], mission03Candidates[6], mission03Candidates[10]].map((point) => ({ ...point, found: false }));
  };
  const resetMission03 = () => {
    mission03State.active = chooseMission03Signals(); mission03State.found = 0; mission03State.mirrorLeft = 35.5; mission03State.mirrorTop = 48; mission03State.previousLens = null; mission03State.lastFoundAt = performance.now(); mission03State.complete = false;
    mission03Heart.style.opacity = '0'; mission03Heart.style.left = '50%'; mission03Heart.style.top = '48.5%'; mission03Heart.style.setProperty('--signal-scale', '.75'); mission03Stage.classList.remove('is-leaving'); heartMirror.classList.remove('is-warm', 'is-finding', 'is-complete'); mission03ProgressThree.classList.remove('is-complete'); updateMission03Mirror(); updateMission03Counter();
    heartMirror.classList.remove('is-hinting'); requestAnimationFrame(() => heartMirror.classList.add('is-hinting'));
  };
  const mission03Burst = (count = 6) => { const box = heartMirror.getBoundingClientRect(); burst({ currentTarget: heartMirror, clientX: box.left + box.width * .5, clientY: box.top + box.height * .37 }, count, 'pink', mission03Stage, mission03Sparkles); };
  const completeMission03 = () => {
    if (mission03State.complete) return;
    mission03State.complete = true; calculateFinalPersona(); heartMirror.classList.remove('is-complete'); mission03ProgressThree.classList.remove('is-complete');
    requestAnimationFrame(() => { heartMirror.classList.add('is-complete'); mission03ProgressThree.classList.add('is-complete'); }); mission03Burst(3);
    window.setTimeout(() => { mission03Stage.classList.add('is-leaving'); mission03Burst(3); }, 720);
    window.setTimeout(() => go('pass-generating'), 1180);
  };
  const findMission03Signal = (point) => {
    if (point.found) return;
    point.found = true; mission03State.lastFoundAt = performance.now(); mission03State.found += 1; mission03Heart.classList.add('is-found'); heartMirror.classList.remove('is-finding'); heartMirror.classList.remove('is-found'); requestAnimationFrame(() => heartMirror.classList.add('is-found')); updateMission03Counter(); mission03Burst(mission03State.found === 3 ? 6 : 5); audio.sparkle();
    window.setTimeout(() => { mission03Heart.classList.remove('is-found'); mission03Heart.style.opacity = '0'; if (mission03State.found === 3) completeMission03(); }, 460);
  };
  const lensPosition = () => { const stageBox = mission03Stage.getBoundingClientRect(); const mirrorBox = heartMirror.getBoundingClientRect(); return { stageBox, mirrorBox, x: ((mirrorBox.left + mirrorBox.width * .5 - stageBox.left) / stageBox.width) * 100, y: ((mirrorBox.top + mirrorBox.height * .363 - stageBox.top) / stageBox.height) * 100 }; };
  const distanceToSegment = (point, start, end) => { const dx = end.x - start.x; const dy = end.y - start.y; const length = dx * dx + dy * dy; if (!length) return Math.hypot((point.x - end.x) * 1.05, point.y - end.y); const ratio = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / length)); return Math.hypot((point.x - (start.x + dx * ratio)) * 1.05, point.y - (start.y + dy * ratio)); };
  const scanMission03 = () => {
    if (!mission03.classList.contains('is-active') || mission03State.complete) return;
    const lens = lensPosition(); const previous = mission03State.previousLens || lens; let closest; let closestDistance = Infinity; let sweepDistance = Infinity;
    mission03State.active.filter((point) => !point.found).forEach((point) => { const distance = Math.hypot((point.x - lens.x) * 1.05, point.y - lens.y); const pathDistance = distanceToSegment(point, previous, lens); if (Math.min(distance, pathDistance) < Math.min(closestDistance, sweepDistance)) { closest = point; closestDistance = distance; sweepDistance = pathDistance; } });
    mission03State.previousLens = { x: lens.x, y: lens.y };
    const lensWidth = (lens.mirrorBox.width / lens.stageBox.width) * 100 * .68; const revealRadius = lensWidth * .78; const foundRadius = lensWidth * .48; const nearbyDistance = Math.min(closestDistance, sweepDistance); const warmth = closest ? Math.max(0, Math.min(1, 1 - nearbyDistance / revealRadius)) : 0; heartMirror.classList.toggle('is-warm', warmth > .05); heartMirror.style.setProperty('--warmth', warmth.toFixed(2));
    if (!closest || closestDistance > revealRadius) { mission03Heart.style.opacity = '0'; heartMirror.classList.remove('is-finding'); if (closest && sweepDistance <= foundRadius) findMission03Signal(closest); return; }
    const relativeX = 50 + ((closest.x - lens.x) / (lens.mirrorBox.width / lens.stageBox.width)) / .68 * 100; const relativeY = 48.5 + ((closest.y - lens.y) / (lens.mirrorBox.height / lens.stageBox.height)) / .48 * 100;
    const revealLevel = Math.max(0, Math.min(1, 1 - closestDistance / revealRadius)); mission03Heart.style.left = `${relativeX}%`; mission03Heart.style.top = `${relativeY}%`; mission03Heart.style.opacity = String(.25 + revealLevel * .75); mission03Heart.style.setProperty('--signal-scale', String(.8 + revealLevel * .2)); heartMirror.classList.toggle('is-finding', closestDistance <= foundRadius);
    if (closestDistance <= foundRadius || sweepDistance <= foundRadius) findMission03Signal(closest);
  };
  const moveMission03Mirror = (event) => {
    const stageBox = mission03Stage.getBoundingClientRect(); const mirrorBox = heartMirror.getBoundingClientRect(); const left = ((event.clientX - stageBox.left - mission03State.pointerOffsetX) / stageBox.width) * 100; const top = ((event.clientY - stageBox.top - mission03State.pointerOffsetY) / stageBox.height) * 100; const maxLeft = 100 - (mirrorBox.width / stageBox.width) * 100; const maxTop = 58;
    mission03State.mirrorLeft = clamp(left, 0, maxLeft); mission03State.mirrorTop = clamp(top, 31, maxTop); updateMission03Mirror(); scanMission03();
  };
  heartMirror.addEventListener('pointerdown', (event) => { if (mission03State.complete) return; const box = heartMirror.getBoundingClientRect(); mission03State.dragging = true; mission03State.pointerOffsetX = event.clientX - box.left; mission03State.pointerOffsetY = event.clientY - box.top; heartMirror.setPointerCapture?.(event.pointerId); mission03State.previousLens = lensPosition(); heartMirror.classList.remove('is-hinting'); event.preventDefault(); });
  heartMirror.addEventListener('pointermove', (event) => { if (!mission03State.dragging) return; moveMission03Mirror(event); event.preventDefault(); });
  heartMirror.addEventListener('pointerup', (event) => { mission03State.dragging = false; heartMirror.releasePointerCapture?.(event.pointerId); }); heartMirror.addEventListener('pointercancel', (event) => { mission03State.dragging = false; heartMirror.releasePointerCapture?.(event.pointerId); });
  // The Mission 03 route is initialized whenever it becomes visible.
  const mission03Observer = new MutationObserver(() => { if (mission03.classList.contains('is-active') && !mission03.dataset.started) { mission03.dataset.started = 'true'; resetMission03(); } if (!mission03.classList.contains('is-active')) mission03.dataset.started = ''; });
  mission03Observer.observe(mission03, { attributes: true, attributeFilter: ['class'] });
  const passStage = document.getElementById('passGeneratingStage');
  const passTicketClip = document.getElementById('printedTicketClip');
  const passReadyButton = document.getElementById('passReadyButton');
  const passSparkles = document.getElementById('passGeneratingSparkles');
  const unlockIrl = document.getElementById('unlockIrl');
  const bonusModal = document.getElementById('bonusModal');
  bonusModal.hidden = true;
  const resultRevealStage = document.getElementById('resultRevealStage');
  const resultMaster = document.getElementById('resultMaster');
  const resultPolaroid = document.getElementById('resultPolaroid');
  const resultPanel = document.getElementById('resultPanel');
  const saveBeautyId = document.getElementById('saveBeautyId');
  const resultSparkles = document.getElementById('resultSparkles');
  const resultSaveScrim = document.getElementById('resultSaveScrim');
  const resultSavePopup = document.getElementById('resultSavePopup');
  const checkMyPass = document.getElementById('checkMyPass');
  const resultArtwork = {
    cosmicCherry: 'assets/results/LUNELLE_Result_cosmic_cherry_asset_pack/cosmic-cherry-master.jpg',
    angelMilk: 'assets/results/LUNELLE_Result_angel_milk_asset_pack/angel-milk-master.jpg',
    icyBlue: 'assets/results/LUNELLE_Result_icy_blue_asset_pack/icy-blue-master.jpg',
    pinkPop: 'assets/results/LUNELLE_Result_pink_pop_asset_pack/pink-pop-master.jpg'
  };
  const passAssets = {
    pinkPop: { master: 'assets/passes/pink_pop/pink_pop-master.jpg', beautyType: 'PINK POP', shade: 'PINK JELLY #09', ratio: '1144 / 1375' },
    angelMilk: { master: 'assets/passes/angel_milk/angel_milk-master.jpg', beautyType: 'ANGEL MILK', shade: 'ANGEL PEARL #02', ratio: '1144 / 1375' },
    icyBlue: { master: 'assets/passes/icy_blue/icy_blue-master.jpg', beautyType: 'ICY BLUE', shade: 'ICY SHIMMER #04', ratio: '1144 / 1375' },
    cosmicCherry: { master: 'assets/passes/cosmic_cherry/cosmic_cherry-master.jpg', beautyType: 'COSMIC CHERRY', shade: 'COSMIC GLOSS #07', ratio: '1145 / 1374' }
  };
  let finalPersona = null;
  const calculateFinalPersona = () => {
    const saved = sessionStorage.getItem('lunelle.finalPersona'); if (saved && resultArtwork[saved]) { finalPersona = saved; return finalPersona; }
    const scores = { cosmicCherry: 0, angelMilk: 0, icyBlue: 0, pinkPop: 0 };
    const formulas = {
      cosmicCherry: { color: 'cherry', finish: 'glitter', mood: 'dream' }, angelMilk: { color: 'baby-pink', finish: 'pearl', mood: 'angel' },
      icyBlue: { color: 'icy-blue', finish: 'gloss', mood: 'dream' }, pinkPop: { color: 'baby-pink', finish: 'glitter', mood: 'rebel' }
    };
    Object.entries(formulas).forEach(([persona, formula]) => { if (mission02Profile.selectedColor === formula.color) scores[persona] += 3; if (mission02Profile.selectedFinish === formula.finish) scores[persona] += 2; if (mission02Profile.selectedMood === formula.mood) scores[persona] += 2; if (mission02Profile.selectedColor === formula.color && mission02Profile.selectedFinish === formula.finish && mission02Profile.selectedMood === formula.mood) scores[persona] += 6; });
    scores.pinkPop += mission01Profile.lipglossCount; scores.angelMilk += mission01Profile.bowCount + mission01Profile.digitalCharmCount; scores.icyBlue += mission01Profile.cdCount; scores.cosmicCherry += mission01Profile.starCount + mission01Profile.sunglassesCount;
    const highest = Math.max(...Object.values(scores)); const tied = Object.keys(scores).filter((persona) => scores[persona] === highest); finalPersona = tied[Math.floor(Math.random() * tied.length)]; sessionStorage.setItem('lunelle.finalPersona', finalPersona); return finalPersona;
  };
  const renderResultReveal = () => { const persona = calculateFinalPersona(); const artwork = resultArtwork[persona]; resultRevealStage.style.aspectRatio = persona === 'cosmicCherry' ? '1122 / 1402' : '1121 / 1403'; resultMaster.src = artwork; resultPolaroid.src = artwork; resultPanel.src = artwork; resultMaster.alt = `Your Lunelle character result: ${persona}`; };
  const lunellePassStage = document.getElementById('lunellePassStage');
  const lunellePassMaster = document.getElementById('lunellePassMaster');
  const lunellePassSparkles = document.getElementById('lunellePassSparkles');
  const saveLunellePass = document.getElementById('saveLunellePass');
  const viewLunelleLocation = document.getElementById('viewLunelleLocation');
  const savedLunellePass = document.getElementById('savedLunellePass');
  const passLocationNote = document.getElementById('passLocationNote');
  const currentPersistedPersona = () => {
    const stored = sessionStorage.getItem('lunelle.finalPersona');
    return passAssets[stored] ? stored : 'cosmicCherry';
  };
  const renderLunellePass = () => {
    const persona = currentPersistedPersona();
    const currentPass = passAssets[persona];
    lunellePassStage.style.aspectRatio = currentPass.ratio;
    lunellePassMaster.src = currentPass.master;
    lunellePassMaster.alt = `Lunelle Pass: ${currentPass.beautyType}, ${currentPass.shade}`;
    lunellePass.dataset.persona = persona;
  };
  let passTimers = [];
  const clearPassTimers = () => { passTimers.forEach((timer) => window.clearTimeout(timer)); passTimers = []; };
  const completePassGenerating = () => {
    passStage.classList.remove('is-printing'); passStage.classList.add('is-complete');
    const box = passTicketClip.getBoundingClientRect(); burst({ currentTarget: passTicketClip, clientX: box.left + box.width / 2, clientY: box.top + box.height * .2 }, 7, 'pink', passStage, passSparkles);
    passTimers.push(window.setTimeout(() => { passReadyButton.hidden = false; passReadyButton.classList.remove('is-visible'); requestAnimationFrame(() => passReadyButton.classList.add('is-visible')); }, 700));
  };
  const startPassGenerating = () => {
    clearPassTimers(); passReadyButton.hidden = true; passReadyButton.classList.remove('is-visible'); passStage.className = 'pg-stage is-entering';
    requestAnimationFrame(() => passStage.classList.add('is-loading'));
    passTimers.push(window.setTimeout(() => passStage.classList.add('is-starting'), 1650));
    passTimers.push(window.setTimeout(() => { passStage.classList.remove('is-starting'); passStage.classList.add('is-printing'); }, 2000));
    passTimers.push(window.setTimeout(completePassGenerating, 9000));
  };
  const passObserver = new MutationObserver(() => { if (passGenerating.classList.contains('is-active') && !passGenerating.dataset.started) { passGenerating.dataset.started = 'true'; startPassGenerating(); } if (!passGenerating.classList.contains('is-active')) { passGenerating.dataset.started = ''; clearPassTimers(); } });
  passObserver.observe(passGenerating, { attributes: true, attributeFilter: ['class'] });
  passReadyButton.addEventListener('click', () => { if (passReadyButton.hidden) return; go('result-reveal'); });
  const resultObserver = new MutationObserver(() => { if (resultReveal.classList.contains('is-active') && !resultReveal.dataset.started) { resultReveal.dataset.started = 'true'; renderResultReveal(); resultSavePopup.hidden = true; resultSavePopup.classList.remove('is-visible', 'is-closing'); resultSaveScrim.classList.remove('is-visible'); resultRevealStage.classList.remove('is-revealing', 'is-leaving'); requestAnimationFrame(() => resultRevealStage.classList.add('is-revealing')); window.setTimeout(() => audio.sparkle(), 550); } if (!resultReveal.classList.contains('is-active')) resultReveal.dataset.started = ''; });
  resultObserver.observe(resultReveal, { attributes: true, attributeFilter: ['class'] });
  const resultFileNames = { pinkPop: 'Pink-Pop', angelMilk: 'Angel-Milk', icyBlue: 'Icy-Blue', cosmicCherry: 'Cosmic-Cherry' };
  const downloadResultArtwork = (persona) => {
    const triggerDownload = (href, name) => { const download = document.createElement('a'); download.href = href; download.download = name; document.body.append(download); download.click(); download.remove(); };
    const exportCanvas = (image) => {
      try {
        const canvas = document.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d'); context.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) { triggerDownload(resultArtwork[persona], `LUNELLE-Beauty-ID-${resultFileNames[persona]}.jpg`); return; }
          const objectUrl = URL.createObjectURL(blob); triggerDownload(objectUrl, `LUNELLE-Beauty-ID-${resultFileNames[persona]}.png`); window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        }, 'image/png');
      } catch { triggerDownload(resultArtwork[persona], `LUNELLE-Beauty-ID-${resultFileNames[persona]}.jpg`); }
    };
    if (resultMaster.complete && resultMaster.naturalWidth) { exportCanvas(resultMaster); return; }
    const image = new Image(); image.onload = () => exportCanvas(image); image.onerror = () => triggerDownload(resultArtwork[persona], `LUNELLE-Beauty-ID-${resultFileNames[persona]}.jpg`); image.src = resultArtwork[persona];
  };
  const saveResultBeautyId = (event) => {
    const persona = finalPersona || sessionStorage.getItem('lunelle.finalPersona') || 'cosmicCherry';
    downloadResultArtwork(persona); burst(event, 7, 'pink', resultRevealStage, resultSparkles);
    window.setTimeout(() => { resultSavePopup.hidden = false; resultSavePopup.classList.remove('is-visible'); resultSaveScrim.classList.add('is-visible'); requestAnimationFrame(() => resultSavePopup.classList.add('is-visible')); const box = resultSavePopup.getBoundingClientRect(); burst({ currentTarget: resultSavePopup, clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 }, 4, 'pink', resultRevealStage, resultSparkles); audio.sparkle(); }, 400);
  };
  bindLunellePrimaryButton(saveBeautyId, saveResultBeautyId);
  bindLunellePrimaryButton(checkMyPass, (event) => { burst(event, 6, 'pink', resultRevealStage, resultSparkles); window.setTimeout(() => { resultSavePopup.classList.add('is-closing'); resultSaveScrim.classList.remove('is-visible'); resultRevealStage.classList.add('is-leaving'); }, 285); window.setTimeout(() => go('lunelle-pass'), 570); });
  const passObserverFinal = new MutationObserver(() => {
    if (lunellePass.classList.contains('is-active') && !lunellePass.dataset.started) {
      lunellePass.dataset.started = 'true'; renderLunellePass(); lunellePassStage.classList.remove('is-revealing'); requestAnimationFrame(() => lunellePassStage.classList.add('is-revealing'));
      window.setTimeout(() => { const box = lunellePassStage.getBoundingClientRect(); burst({ currentTarget: lunellePassStage, clientX: box.left + box.width * .52, clientY: box.top + box.height * .42 }, 5, 'pink', lunellePassStage, lunellePassSparkles); audio.sparkle(); }, 520);
    }
    if (!lunellePass.classList.contains('is-active')) lunellePass.dataset.started = '';
  });
  passObserverFinal.observe(lunellePass, { attributes: true, attributeFilter: ['class'] });
  const saveCurrentPass = (event) => { const persona = currentPersistedPersona(); burst(event, 7, 'pink', lunellePassStage, lunellePassSparkles); const download = document.createElement('a'); download.href = passAssets[persona].master; download.download = `lunelle-${persona}-pass.jpg`; download.click(); savedLunellePass.hidden = false; savedLunellePass.classList.remove('is-visible'); requestAnimationFrame(() => savedLunellePass.classList.add('is-visible')); window.setTimeout(() => { savedLunellePass.hidden = true; }, 1250); };
  const showLocationPending = (event) => { burst(event, 6, 'blue', lunellePassStage, lunellePassSparkles); passLocationNote.hidden = false; passLocationNote.classList.remove('is-visible'); requestAnimationFrame(() => passLocationNote.classList.add('is-visible')); window.setTimeout(() => { passLocationNote.hidden = true; }, 1400); };
  bindLunellePrimaryButton(saveLunellePass, saveCurrentPass);
  bindLunellePrimaryButton(viewLunelleLocation, showLocationPending);
  // Try immediately; browsers that block autoplay retry this exact flow on the
  // first interaction anywhere in the game, not only on the Music icon.
  startIncomingCall();
  document.addEventListener('pointerdown', () => startIncomingCall(), { once: true, capture: true });
})();
