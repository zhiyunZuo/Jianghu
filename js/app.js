// ============================================================
// 江湖侠客成长模拟器 — 应用逻辑
// 账号 · 七身份皆验 · SVG水墨 · 人际往来 · 师徒书简
// 新增：用户名入江湖、个人界面、自创人设、师父随时切换、人际交往、江湖结交、主动寄语
// ============================================================

const App = function() {
  // ========== 状态 ==========
  let state = {
    view: 'auth',
    account: null,          // { username, gender }
    character: null,
    todayCultivation: null,
    libraryTab: 'all',
    libraryContainer: 'libraryGrid',
    musicBlob: null,
    characterImage: null
  };

  const STORAGE_KEY = 'jianghu_knight_save_v3';
  const ACCOUNT_KEY = 'jianghu_account_v3';

  // ========== 属性中文名 ==========
  const STAT_NAMES = {
    xiaoyi: '侠义', zhihui: '智慧', wuli: '武力',
    caiyi: '才艺', xinjing: '心境', xueshi: '学识'
  };
  const STAT_MAX = 100;

  // ========== 工具方法 ==========
  function $(id) { return document.getElementById(id); }
  function $$(sel) { return document.querySelectorAll(sel); }
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function showToast(msg, type) {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    setTimeout(() => { toast.className = 'toast'; }, 2500);
  }

  function totalStats(stats) {
    return Object.values(stats).reduce((a, b) => a + b, 0);
  }

  function getEvaluation(stats) {
    const total = totalStats(stats);
    const evals = JIANGHU_DATA.evaluations;
    for (let e of evals) {
      if (total >= e.min && total <= e.max) return e;
    }
    return evals[evals.length - 1];
  }

  // ========== 当前身份 ==========
  function getCurrentIdentity() {
    if (!state.character) return JIANGHU_DATA.identities[0];
    const id = state.character.currentIdentityId;
    return JIANGHU_DATA.identities.find(i => i.id === id) || JIANGHU_DATA.identities[0];
  }

  function getImage(imageKey) {
    if (!imageKey || !window.JIANGHU_ILLUSTRATIONS) return '';
    return JIANGHU_ILLUSTRATIONS[imageKey] || JIANGHU_ILLUSTRATIONS['default'] || '';
  }

  // ========== 季节天气 ==========
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }
  function getCurrentWeather() {
    const season = getCurrentSeason();
    let pool;
    if (season === 'spring') pool = ['sunny','sunny','cloudy','rain','mist'];
    else if (season === 'summer') pool = ['sunny','sunny','sunny','rain','cloudy'];
    else if (season === 'autumn') pool = ['sunny','sunny','cloudy','mist','rain'];
    else pool = ['snow','snow','cloudy','sunny','mist'];
    return rand(pool);
  }
  function getTimeOfDay() {
    const h = new Date().getHours();
    if (h < 6) return { name: '拂晓', isNight: true };
    if (h < 11) return { name: '清晨', isNight: false };
    if (h < 13) return { name: '正午', isNight: false };
    if (h < 17) return { name: '午后', isNight: false };
    if (h < 19) return { name: '黄昏', isNight: false };
    return { name: '夜晚', isNight: true };
  }

  // ========== 山水背景 ==========
  function initMountains() {
    const season = getCurrentSeason();
    const opacity = season === 'winter' ? 0.25 : 0.15;
    const svg = `
      <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,400 L0,280 Q100,200 200,240 Q300,180 400,220 Q500,160 600,210 Q700,150 800,200 Q900,170 1000,210 Q1100,180 1200,230 L1200,400 Z"
              fill="${season === 'winter' ? '#c8ccd8' : '#8a9a7a'}" opacity="${opacity * 0.5}"/>
        <path d="M0,400 L0,320 Q150,260 300,290 Q450,240 600,280 Q750,230 900,270 Q1050,250 1200,290 L1200,400 Z"
              fill="${season === 'winter' ? '#b0b4c4' : '#6b7b5a'}" opacity="${opacity * 0.7}"/>
        <path d="M0,400 L0,350 Q200,310 400,330 Q600,300 800,330 Q1000,310 1200,340 L1200,400 Z"
              fill="${season === 'winter' ? '#98a0b4' : '#4a5a3a'}" opacity="${opacity}"/>
        <ellipse cx="600" cy="320" rx="500" ry="30" fill="white" opacity="${season === 'winter' ? 0.3 : 0.1}"/>
      </svg>`;
    if ($('mountainBg')) $('mountainBg').innerHTML = svg;
  }

  // ========== 粒子 ==========
  function initParticles() {
    const layer = $('particleLayer');
    if (!layer) return;
    layer.innerHTML = '';
    const season = getCurrentSeason();
    const weather = state.character ? state.character.weather : getCurrentWeather();
    const seasonData = JIANGHU_DATA.seasons[season];
    if (weather === 'rain') { createParticles('rain', 60); return; }
    if (weather === 'snow') { createParticles('snow', 50); return; }
    const pt = seasonData.particles;
    createParticles(pt, pt === 'fireflies' ? 25 : 20);
  }
  function createParticles(type, count) {
    const layer = $('particleLayer');
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle particle-' + type;
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDelay = (Math.random() * 10) + 's';
      const dur = type === 'rain' ? (0.5 + Math.random()*0.8)
                : type === 'snow' ? (6 + Math.random()*6)
                : type === 'firefly' ? (4 + Math.random()*4)
                : (8 + Math.random()*8);
      p.style.animationDuration = dur + 's';
      if (type === 'petal' || type === 'leaf' || type === 'snow')
        p.style.setProperty('--drift', (Math.random()*200 - 100) + 'px');
      if (type === 'firefly') {
        p.style.setProperty('--fx', (Math.random()*60 - 30) + 'px');
        p.style.setProperty('--fy', (Math.random()*60 - 30) + 'px');
        p.style.top = (20 + Math.random()*60) + '%';
      }
      layer.appendChild(p);
    }
  }
  function updateWeatherOverlay() {
    const weather = state.character ? state.character.weather : getCurrentWeather();
    const wd = JIANGHU_DATA.weathers.find(w => w.id === weather);
    if (wd && $('weatherOverlay')) $('weatherOverlay').style.background = wd.overlay;
  }

  // ========== 账号（用户名 + 性别，无需手机号） ==========
  function loadAccount() {
    try {
      const s = localStorage.getItem(ACCOUNT_KEY);
      if (!s) return null;
      const a = JSON.parse(s);
      if (!a || !a.username) return null;
      return a;
    } catch (e) { return null; }
  }
  function saveAccount() {
    if (!state.account) return;
    try { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(state.account)); } catch (e) {}
  }
  function showAuth() {
    $$('.view').forEach(v => v.classList.remove('active'));
    $('view-auth').classList.add('active');
    state.view = 'auth';
    $('bottomNav').style.display = 'none';
    state.account = null;
    state.character = null;
  }
  function submitRegister() {
    const username = $('authUsername').value.trim();
    if (!username) { showToast('请取一侠客名'); return; }
    state.account = { username: username };
    saveAccount();
    enterAfterAuth();
  }
  function enterAfterAuth() {
    if (loadState()) {
      $('bottomNav').style.display = '';
      initMountains(); initParticles(); updateWeatherOverlay();
      switchView('home');
    } else {
      startGame(state.account.username);
    }
  }


  // ========== 开始游戏 ==========
  function startGame(name) {
    const firstIdentity = JIANGHU_DATA.identities[0];

    state.character = {
      name: name,
      username: state.account ? state.account.username : name,
      currentIdentityId: firstIdentity.id,
      experiencedIdentities: [firstIdentity.id],
      identityStats: {},
      persona: null, // 自创人设
      stats: { ...firstIdentity.startStats },
      history: [],
      library: { poetry: [], wisdom: [], martial: [] },
      dayCount: 1,
      cultivatedDates: {},
      usedIdentityContent: {},
      usedContent: { morning: [], qin: [], qi: [], shu: [], hua: [], wu: [], wisdom: [], events: [] },
      weather: getCurrentWeather(),
      season: getCurrentSeason(),
      characterImage: null,
      lastProactiveDay: null
    };
    state.character.identityStats[firstIdentity.id] = true;
    JIANGHU_DATA.identities.forEach(id => {
      state.character.usedIdentityContent[id.id] = { morning: [], core: [], body: [], wisdom: [], event: [] };
    });

    saveState();
    $('bottomNav').style.display = '';
    switchView('home');
    renderHome();
    initParticles();
    updateWeatherOverlay();
    showToast('欢迎入江湖，' + name + '！自' + firstIdentity.name + '始，七种人生皆可历。诸师皆在「交游」。', 'growth');
  }


  // ========== 身份切换 ==========
  function switchIdentity(identityId) {
    if (!state.character) return;
    const c = state.character;
    if (c.currentIdentityId === identityId) return;
    const identity = JIANGHU_DATA.identities.find(i => i.id === identityId);
    if (!identity) return;
    if (!c.identityStats[identityId]) {
      Object.entries(identity.startStats).forEach(([key, val]) => {
        c.stats[key] = Math.min(STAT_MAX, c.stats[key] + Math.floor(val * 0.5));
      });
      c.identityStats[identityId] = true;
      c.experiencedIdentities.push(identityId);
      showToast('初历「' + identity.name + '」！专精：' + identity.focus + '，绝技：' + identity.exclusiveSkill, 'growth');
    } else {
      showToast('切换至「' + identity.name + '」', 'growth');
    }
    c.currentIdentityId = identityId;
    state.todayCultivation = null; // 切换身份，当日修行内容与江湖经历随之刷新
    saveState();
    renderHome();
    if (state.view === 'cultivation') renderCultivation();
  }

  function renderIdentitySwitcher() {
    if (!state.character) return;
    const c = state.character;
    const container = $('identitySwitcher');
    if (!container) return;
    container.innerHTML = '';
    JIANGHU_DATA.identities.forEach(id => {
      const card = document.createElement('div');
      const isActive = c.currentIdentityId === id.id;
      const isExp = c.experiencedIdentities.includes(id.id);
      card.className = 'identity-card-mini' + (isActive ? ' active' : '') + (isExp ? ' experienced' : '');
      card.onclick = () => switchIdentity(id.id);
      card.innerHTML = `
        <div class="identity-mini-icon">${id.icon}</div>
        <div class="identity-mini-name">${id.name}</div>
        ${!isExp ? '<div class="identity-mini-badge">未历</div>' : ''}
        ${isActive ? '<div class="identity-mini-current">当前</div>' : ''}
      `;
      container.appendChild(card);
    });
  }

  function renderCurrentIdentityDetail() {
    if (!state.character) return;
    const identity = getCurrentIdentity();
    const container = $('currentIdentityDetail');
    if (!container) return;
    container.innerHTML = `
      <div class="identity-detail-header">
        <span class="identity-detail-icon">${identity.icon}</span>
        <span class="identity-detail-name">${identity.name}</span>
      </div>
      <div class="identity-detail-focus">专精：${identity.focus}</div>
      <div class="identity-detail-skill">绝技：${identity.exclusiveSkill}</div>
      <div class="identity-detail-desc">${identity.longDesc}</div>
    `;
  }

  // ========== 视图切换 ==========
  function switchView(viewName) {
    if (!state.character && viewName !== 'intro' && viewName !== 'create' && viewName !== 'auth') return;
    $$('.view').forEach(v => v.classList.remove('active'));
    const target = $('view-' + viewName);
    if (target) { target.classList.add('active'); state.view = viewName; }
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (navItem) navItem.classList.add('active');
    window.scrollTo(0, 0);

    if (viewName === 'home') renderHome();
    else if (viewName === 'knight') renderKnight();
    else if (viewName === 'cultivation') renderCultivation();
    else if (viewName === 'profile') renderProfile();
    else if (viewName === 'library') renderLibrary();
  }

  // ========== 江湖首页 ==========
  function renderHome() {
    if (!state.character) return;
    const c = state.character;
    const time = getTimeOfDay();
    const seasonData = JIANGHU_DATA.seasons[c.season];
    const weatherData = JIANGHU_DATA.weathers.find(w => w.id === c.weather);
    const identity = getCurrentIdentity();

    $('homeSeason').textContent = `${seasonData.name} · ${time.name}`;
    $('homeWeather').textContent = `${weatherData.name} · ${weatherData.desc}`;
    $('homeCharName').textContent = c.name;
    $('homeCharIdentity').textContent = identity.name + ' · ' + identity.focus;

    renderCharacterSilhouette();

    $('homeGreeting').textContent = getGreeting(time, seasonData);

    renderHomeStats();

    const evalData = getEvaluation(c.stats);
    $('homeEvalTitle').textContent = evalData.title;
    $('homeEvalDesc').textContent = evalData.desc;

    renderIdentitySwitcher();
    renderCurrentIdentityDetail();

    const btn = $('homeActionBtn');
    if (c.cultivatedDates[c.currentIdentityId] === todayStr()) {
      btn.textContent = '此身今日已圆满';
      btn.classList.add('done');
      btn.disabled = false; // 点击给出换身提示
    } else {
      btn.textContent = '今日修行';
      btn.classList.remove('done');
      btn.disabled = false;
    }
  }

  function renderCharacterSilhouette() {
    const c = state.character;
    const img = c.persona && c.persona.image ? c.persona.image : c.characterImage;
    if (img) {
      $('characterSilhouette').innerHTML = `<img src="${img}" style="max-width:100%; max-height:100%; border-radius:4px; object-fit:contain;" alt="画像">`;
      return;
    }
    const identity = getCurrentIdentity();
    const bodyColor = identity.color;
    const id = identity.id;
    let extra = '';
    if (id === 'jianke' || id === 'youxia') extra = `<line x1="88" y1="70" x2="95" y2="140" stroke="${bodyColor}" stroke-width="2" opacity="0.5"/><rect x="86" y="66" width="8" height="6" fill="${bodyColor}" opacity="0.4" rx="1"/>`;
    else if (id === 'qinshi') extra = `<rect x="35" y="100" width="30" height="8" fill="${bodyColor}" opacity="0.3" rx="2"/>`;
    else if (id === 'yizhe') extra = `<rect x="45" y="95" width="6" height="20" fill="${bodyColor}" opacity="0.3" rx="1"/><rect x="52" y="95" width="6" height="20" fill="${bodyColor}" opacity="0.3" rx="1"/>`;
    else if (id === 'shuyuan') extra = `<rect x="30" y="100" width="20" height="14" fill="${bodyColor}" opacity="0.25" rx="1"/>`;
    else if (id === 'yinshi') extra = `<path d="M30,130 Q40,120 50,125 Q55,115 65,120 Q75,115 85,125" stroke="${bodyColor}" stroke-width="1" fill="none" opacity="0.2"/>`;
    else if (id === 'shijia') extra = `<rect x="40" y="88" width="40" height="3" fill="${bodyColor}" opacity="0.5" rx="1"/><circle cx="60" cy="88" r="3" fill="${bodyColor}" opacity="0.4"/>`;
    $('characterSilhouette').innerHTML = `
      <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="35" rx="18" ry="22" fill="${bodyColor}" opacity="0.85"/>
        <ellipse cx="60" cy="20" rx="12" ry="8" fill="${bodyColor}" opacity="0.7"/>
        <path d="M42,55 Q42,50 60,48 Q78,50 78,55 L82,140 Q60,145 38,140 Z" fill="${bodyColor}" opacity="0.8"/>
        <path d="M42,60 Q30,90 32,120 Q36,125 40,120 L44,65 Z" fill="${bodyColor}" opacity="0.6"/>
        <path d="M78,60 Q90,90 88,120 Q84,125 80,120 L76,65 Z" fill="${bodyColor}" opacity="0.6"/>
        <rect x="40" y="95" width="40" height="6" fill="${bodyColor}" opacity="0.4" rx="2"/>
        <path d="M38,140 Q60,150 82,140 L86,170 Q60,175 34,170 Z" fill="${bodyColor}" opacity="0.7"/>
        ${extra}
      </svg>`;
  }

  function getGreeting(time, season) {
    const g = {
      '拂晓': `天色未明，晨风带${season.name}之气，万事将启。`,
      '清晨': `晨光熹微，竹影婆娑。今日修行，已为汝备下。`,
      '正午': `日上中天，院中树荫正好，正宜小憩。`,
      '午后': `午后风静，蝉鸣声声，正宜读书。`,
      '黄昏': `夕阳如金，满庭皆暖。修行不急，且看此落日。`,
      '夜晚': `月明星稀，庭灯已燃。夜深矣，汝有何疑，但问无妨。`
    };
    return g[time.name] || g['清晨'];
  }

  function renderHomeStats() {
    const c = state.character;
    const bar = $('homeStatsBar');
    bar.innerHTML = '';
    Object.entries(c.stats).forEach(([key, val]) => {
      const mini = document.createElement('div');
      mini.className = 'stat-mini';
      mini.innerHTML = `<div class="stat-mini-label">${STAT_NAMES[key]}</div><div class="stat-mini-value">${val}</div>`;
      bar.appendChild(mini);
    });
  }

  // ========== 今日修行 ==========
  function startCultivation() {
    if (!state.character) return;
    const c = state.character;
    const idId = c.currentIdentityId;
    if (c.cultivatedDates[idId] === todayStr()) {
      const remaining = JIANGHU_DATA.identities.filter(i => c.cultivatedDates[i.id] !== todayStr());
      if (remaining.length > 0) {
        showToast('「' + getCurrentIdentity().name + '」今日已圆满。可于上方换一身，再历江湖。', 'growth');
      } else {
        showToast('七身今日皆已圆满，明日再续。', 'growth');
      }
      return;
    }
    generateDailyContent();
    switchView('cultivation');
  }

  function generateDailyContent() {
    const c = state.character;
    const idId = c.currentIdentityId;
    const pool = JIANGHU_IDENTITY_CULTIVATION[idId];
    if (!c.usedIdentityContent[idId]) c.usedIdentityContent[idId] = { morning:[], core:[], body:[], wisdom:[], event:[] };
    const used = c.usedIdentityContent[idId];
    function pickUnused(arr, key, fallback) {
      if (!Array.isArray(used[key])) used[key] = [];
      let p = arr.filter((_, i) => !used[key].includes(i));
      if (p.length === 0) { used[key] = []; p = arr.slice(); }
      if (p.length === 0) return fallback || null;
      const item = rand(p);
      used[key].push(arr.indexOf(item));
      return item;
    }
    const morning = pickUnused(pool.mornings, 'morning') || rand(JIANGHU_DATA.morningActivities);
    const core = pickUnused(pool.cores, 'core') || rand(JIANGHU_DATA.wuActivities);
    const body = pickUnused(pool.bodies, 'body') || rand(JIANGHU_DATA.wuActivities);
    const wisdom = pickUnused(pool.wisdoms, 'wisdom') || rand(JIANGHU_DATA.wisdomTexts);
    const event = pickUnused(pool.events, 'event') || rand(JIANGHU_DATA.jianghuEvents);
    state.todayCultivation = { morning, core, body, wisdom, event, eventResolved:false, eventResult:null, eventChoiceIndex:null, identityId:idId };
  }

  function renderCultivation() {
    if (!state.character) return;
    const c = state.character;
    if (c.cultivatedDates[c.currentIdentityId] === todayStr() && !state.todayCultivation) {
      const idName = getCurrentIdentity().name;
      $('cultivationContent').innerHTML = `
        <div class="cultivation-complete">
          <div class="cultivation-complete-icon">🌙</div>
          <p>「${idName}」今日修行已圆满。</p>
          <p style="font-size:0.9rem; margin-top:0.5rem;">可于首页换一身，再历他样江湖。</p>
          <p style="font-size:0.85rem; margin-top:1rem; color:var(--ink-soft); font-style:italic;">「${rand(JIANGHU_DATA.nightWisdom)}」</p>
        </div>`;
      return;
    }
    if (!state.todayCultivation) {
      $('cultivationContent').innerHTML = `
        <div class="cultivation-complete">
          <div class="cultivation-complete-icon">📜</div>
          <p>今日尚未修行。</p>
          <button class="btn-primary" onclick="app.startCultivation()">开始今日修行</button>
        </div>`;
      return;
    }
    const tc = state.todayCultivation;
    const date = new Date();
    $('cultivationDate').textContent = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

    let html = '<div class="scroll-container unfurling"><div class="scroll-rod"></div><div class="scroll-content">';

    const morningImg = getImage(tc.morning.imageKey);
    html += sectionHTML(`清晨 · ${tc.morning.type}`, tc.morning.title, morningImg, tc.morning.desc, tc.morning.effects);

    const coreImg = getImage(tc.core.imageKey);
    html += sectionHTML(`上午 · ${tc.core.type}`, tc.core.title, coreImg, tc.core.desc, tc.core.effects);

    const bodyImg = getImage(tc.body.imageKey);
    html += sectionHTML(`下午 · ${tc.body.type}`, tc.body.title, bodyImg, tc.body.desc, tc.body.effects);

    const wTitle0 = tc.wisdom.source || tc.wisdom.title || '悟道';
    const wFull0 = tc.wisdom.original && tc.wisdom.explanation && tc.wisdom.masterComment;
    const wInner0 = wFull0
      ? `<div class="wisdom-original">${tc.wisdom.original}</div>
         <div class="wisdom-section-label">白话释义</div>
         <div class="wisdom-text">${tc.wisdom.explanation}</div>
         <div class="wisdom-section-label">师父点评</div>
         <div class="wisdom-text wisdom-master-quote">${tc.wisdom.masterComment}</div>
         <div class="wisdom-section-label">现实启示</div>
         <div class="wisdom-text">${tc.wisdom.modernInsight || ''}</div>`
      : `<div class="wisdom-original">${tc.wisdom.desc || ''}</div>`;
    html += `
      <div class="cultivation-section">
        <span class="section-label">傍晚 · 悟道</span>
        <h3 class="section-title">${wTitle0}</h3>
        <div class="wisdom-block">${wInner0}</div>
        <div class="section-effects">${effTags(tc.wisdom.effects)}</div>
      </div>`;

    const eventImg = getImage(tc.event.imageKey);
    if (!tc.eventResolved) {
      html += `
        <div class="cultivation-section">
          <span class="section-label">暮色 · 江湖事</span>
          <h3 class="section-title">${tc.event.title}</h3>
          ${eventImg ? `<div class="cultivation-image">${eventImg}</div>` : ''}
          <p class="event-narrative">${tc.event.narrative}</p>
          <div class="event-choices">${tc.event.choices.map((ch,i)=>`<button class="event-choice-btn" onclick="app.handleEventChoice(${i})">${ch.text}</button>`).join('')}</div>
        </div>`;
    } else {
      html += `
        <div class="cultivation-section">
          <span class="section-label">暮色 · 江湖事</span>
          <h3 class="section-title">${tc.event.title}</h3>
          ${eventImg ? `<div class="cultivation-image">${eventImg}</div>` : ''}
          <p class="event-narrative">${tc.event.narrative}</p>
          <div class="event-result">${tc.eventResult}</div>
          <div class="section-effects">${Object.entries(tc.event.choices[tc.eventChoiceIndex].effects).map(([k,v])=>`<span class="effect-tag ${v<0?'negative':''}">${STAT_NAMES[k]} ${v>0?'+':''}${v}</span>`).join('')}</div>
        </div>`;
    }

    html += `
      <div class="night-wisdom">
        <div class="night-wisdom-label">— 江湖夜语 —</div>
        <div class="night-wisdom-text">「${rand(JIANGHU_DATA.nightWisdom)}」</div>
      </div>`;

    if (tc.eventResolved) {
      html += `<div style="text-align:center; margin-top:1.5rem;"><button class="btn-primary" onclick="app.completeCultivation()">修行圆满</button></div>`;
    }
    html += '</div><div class="scroll-rod"></div></div>';
    $('cultivationContent').innerHTML = html;
  }

  function sectionHTML(label, title, img, desc, effects) {
    return `
      <div class="cultivation-section">
        <span class="section-label">${label}</span>
        <h3 class="section-title">${title}</h3>
        ${img ? `<div class="cultivation-image">${img}</div>` : ''}
        <p class="section-desc">${desc}</p>
        <div class="section-effects">${effTags(effects)}</div>
      </div>`;
  }
  function effTags(effects) {
    return Object.entries(effects).map(([k,v])=>`<span class="effect-tag">${STAT_NAMES[k]} +${v}</span>`).join('');
  }

  function handleEventChoice(idx) {
    if (!state.todayCultivation || state.todayCultivation.eventResolved) return;
    const tc = state.todayCultivation;
    const choice = tc.event.choices[idx];
    tc.eventResolved = true;
    tc.eventResult = choice.result;
    tc.eventChoiceIndex = idx;
    applyEffects(choice.effects);
    renderCultivation();
    showToast(Object.entries(choice.effects).map(([k,v])=>`${STAT_NAMES[k]} ${v>0?'+':''}${v}`).join(' · '), 'growth');
  }

  function applyEffects(effects) {
    const c = state.character;
    Object.entries(effects).forEach(([key, val]) => {
      c.stats[key] = Math.max(0, Math.min(STAT_MAX, c.stats[key] + val));
    });
    saveState();
  }

  function completeCultivation() {
    const c = state.character;
    const tc = state.todayCultivation;
    applyEffects(tc.morning.effects);
    applyEffects(tc.core.effects);
    applyEffects(tc.body.effects);
    applyEffects(tc.wisdom.effects);

    const merged = {};
    [tc.morning.effects, tc.core.effects, tc.body.effects, tc.wisdom.effects,
     tc.eventResolved ? tc.event.choices[tc.eventChoiceIndex].effects : {}].forEach(eff => {
      Object.entries(eff).forEach(([k,v]) => { merged[k] = (merged[k]||0) + v; });
    });

    c.history.unshift({
      date: todayStr(), day: c.dayCount,
      identity: getCurrentIdentity().name,
      morning: tc.morning.title, art: tc.core.title, wu: tc.body.title,
      wisdom: tc.wisdom.source || tc.wisdom.title, event: tc.event.title, effects: merged
    });

    if (!c.library.wisdom.some(w => (w.source || w.title) === (tc.wisdom.source || tc.wisdom.title))) c.library.wisdom.push(tc.wisdom);
    if (!c.library.martial.some(m => m.title === tc.body.title)) c.library.martial.push({ title: tc.body.title, text: tc.body.desc, category: '武学修炼' });
    if (c.library.poetry.length < JIANGHU_DATA.poetryCollection.length) {
      const remain = JIANGHU_DATA.poetryCollection.filter(p => !c.library.poetry.some(cp => cp.title === p.title));
      if (remain.length > 0 && Math.random() > 0.4) c.library.poetry.push(rand(remain));
    }

    c.dayCount++;
    c.cultivatedDates[c.currentIdentityId] = todayStr();
    c.weather = getCurrentWeather();
    saveState();
    state.todayCultivation = null;

    showToast('修行圆满！' + Object.entries(merged).map(([k,v])=>`${STAT_NAMES[k]} +${v}`).join(' · '), 'growth');
    setTimeout(() => { switchView('home'); renderHome(); }, 1500);
  }





  // ========== 个人界面 ==========
  function renderProfile() {
    if (!state.character) return;
    const c = state.character;
    const identity = getCurrentIdentity();

    $('profileName').textContent = c.name;
    $('profileSub').textContent = `${c.username} · 现历 ${identity.name}`;

    // 自创人设
    const personaBox = $('profilePersona');
    if (c.persona) {
      personaBox.innerHTML = `
        <div class="persona-card">
          ${c.persona.image ? `<img src="${c.persona.image}" class="persona-img" alt="人设">` : ''}
          <div class="persona-body">
            <div class="persona-name">${c.persona.name} <span class="contact-relation">${c.persona.gender}</span></div>
            <div class="persona-desc">${c.persona.desc}</div>
          </div>
          <button class="btn-secondary" onclick="app.openPersonaModal()">改</button>
        </div>`;
    } else {
      personaBox.innerHTML = `<button class="btn-secondary" onclick="app.openPersonaModal()">＋ 自创人设</button>`;
    }

    // 身份体验
    const ip = $('profileIdentity');
    const exp = c.experiencedIdentities.length, total = JIANGHU_DATA.identities.length;
    ip.innerHTML = `
      <div class="identity-progress-title">身份体验 (${exp}/${total})</div>
      <div class="identity-progress-bar"><div class="identity-progress-fill" style="width:${(exp/total)*100}%"></div></div>
      <div class="identity-progress-list">${JIANGHU_DATA.identities.map(id => {
        const e = c.experiencedIdentities.includes(id.id), cur = c.currentIdentityId === id.id;
        return `<span class="identity-progress-tag ${e?'experienced':''} ${cur?'current':''}">${id.icon} ${id.name}${cur?' (今)':''}${e&&!cur?' ✓':''}</span>`;
      }).join('')}</div>`;

    // 藏书阁（嵌于个人）
    renderLibrary('profileLibraryGrid');
  }

  function openPersonaModal() {
    const c = state.character;
    $('personaModal').style.display = 'flex';
    if (c.persona) {
      $('personaName').value = c.persona.name || '';
      $('personaDesc').value = c.persona.desc || '';
      const g = document.querySelector(`input[name="personaGender"][value="${c.persona.gender}"]`);
      if (g) g.checked = true;
    } else {
      $('personaName').value = '';
      $('personaDesc').value = '';
    }
  }
  function closePersonaModal() { $('personaModal').style.display = 'none'; }
  function savePersona() {
    const c = state.character;
    const name = $('personaName').value.trim();
    const desc = $('personaDesc').value.trim();
    const gender = document.querySelector('input[name="personaGender"]:checked');
    if (!name) { showToast('请为人设取名'); return; }
    if (!gender) { showToast('请择男女'); return; }
    c.persona = {
      name: name, desc: desc || '江湖一奇人，行迹莫测。',
      gender: gender.value,
      image: c.persona ? c.persona.image : null
    };
    saveState();
    closePersonaModal();
    renderProfile();
    switchView('profile');
    showToast('人设已成：' + name, 'growth');
  }
  function uploadPersonaImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!state.character.persona) state.character.persona = { name:'', desc:'', gender:'男', image:null };
      state.character.persona.image = e.target.result;
      saveState();
      if ($('personaModal').style.display === 'flex') {
        const prev = $('personaPreview');
        prev.innerHTML = `<img src="${e.target.result}" style="max-width:100%; max-height:140px; border-radius:6px;">`;
      }
      renderCharacterSilhouette();
      showToast('人设画像已上传');
    };
    reader.readAsDataURL(file);
  }
  // ========== 我的侠客 ==========
  function renderKnight() {
    if (!state.character) return;
    const c = state.character;
    const identity = getCurrentIdentity();
    $('knightPageSubtitle').textContent = `${c.name} · ${identity.name}`;

    const identityProgress = $('identityProgress');
    if (identityProgress) {
      const exp = c.experiencedIdentities.length, total = JIANGHU_DATA.identities.length;
      identityProgress.innerHTML = `
        <div class="identity-progress-title">身份体验进度 (${exp}/${total})</div>
        <div class="identity-progress-bar"><div class="identity-progress-fill" style="width:${(exp/total)*100}%"></div></div>
        <div class="identity-progress-list">${JIANGHU_DATA.identities.map(id => {
          const e = c.experiencedIdentities.includes(id.id), cur = c.currentIdentityId === id.id;
          return `<span class="identity-progress-tag ${e?'experienced':''} ${cur?'current':''}">${id.icon} ${id.name}${cur?' (当前)':''}${e&&!cur?' ✓':''}</span>`;
        }).join('')}</div>`;
    }

    const panel = $('knightStatsPanel');
    panel.innerHTML = '';
    Object.entries(c.stats).forEach(([key, val]) => {
      const pct = Math.min(100, (val / STAT_MAX) * 100);
      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `
        <div class="stat-label">${STAT_NAMES[key]}</div>
        <div class="stat-bar-container"><div class="stat-bar-fill" style="width:${pct}%"></div></div>
        <div class="stat-value">${val}</div>`;
      panel.appendChild(row);
    });
    const evalData = getEvaluation(c.stats);
    const evalDiv = document.createElement('div');
    evalDiv.style.cssText = 'text-align:center; margin-top:1rem; padding-top:1rem; border-top:1px dashed rgba(107,76,59,0.2);';
    evalDiv.innerHTML = `<div style="font-size:0.8rem; color:var(--ink-soft); letter-spacing:0.1em;">总属性 ${totalStats(c.stats)} · 修行 ${c.dayCount-1} 日</div>
      <div style="font-size:1rem; color:var(--gold); margin-top:0.3rem; letter-spacing:0.2em;">${evalData.title}</div>`;
    panel.appendChild(evalDiv);

    const hist = $('knightHistory');
    if (c.history.length === 0) {
      hist.innerHTML = '<div class="history-empty">尚无江湖经历。<br>开始今日修行，书汝之故事。</div>';
      return;
    }
    hist.innerHTML = '';
    c.history.slice(0, 20).forEach(h => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <div class="history-date">第 ${h.day} 日 · ${h.date}${h.identity ? ' · ' + h.identity : ''}</div>
        <div>${h.morning} · ${h.art} · ${h.wu}</div>
        <div style="font-size:0.8rem; color:var(--gold); margin-top:0.2rem;">悟：${h.wisdom || '—'}</div>
        <div style="font-size:0.8rem; margin-top:0.2rem;">遇：${h.event}</div>
        <div class="history-growth">${Object.entries(h.effects).map(([k,v])=>`<span class="growth-tag ${v<0?'negative':''}">${STAT_NAMES[k]} ${v>0?'+':''}${v}</span>`).join('')}</div>`;
      hist.appendChild(item);
    });
  }

  // ========== 藏书阁 ==========
  function renderLibrary(containerId) {
    if (!state.character) return;
    const c = state.character;
    const grid = $(containerId || 'libraryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    let items = [];
    if (state.libraryTab === 'all' || state.libraryTab === 'poetry') {
      c.library.poetry.forEach(p => items.push({ type:'poetry', title:p.title, meta:`${p.dynasty} · ${p.author}`, preview:p.text.split('\n')[0], full:p.text + '\n\n【注】' + p.note }));
    }
    if (state.libraryTab === 'all' || state.libraryTab === 'wisdom') {
      c.library.wisdom.forEach(w => {
        const wTitle = w.source || w.title || '典籍';
        const wOriginal = w.original || w.desc || '';
        const wFull = w.explanation ? `${wOriginal}\n\n【释义】${w.explanation}\n\n【师父点评】${w.masterComment}\n\n【现实启示】${w.modernInsight}` : wOriginal;
        items.push({ type:'wisdom', title:wTitle, meta:'典籍', preview:wOriginal.split('\n')[0], full:wFull });
      });
    }
    if (state.libraryTab === 'all' || state.libraryTab === 'martial') {
      c.library.martial.forEach(m => items.push({ type:'martial', title:m.title, meta:m.category||'武学', preview:m.text.substring(0,50)+'...', full:m.text }));
    }
    if (items.length === 0) { grid.innerHTML = '<div class="library-empty">藏书阁尚空。<br>每日修行，典籍自入阁。</div>'; return; }
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'library-card';
      card.onclick = () => card.classList.toggle('expanded');
      card.innerHTML = `<div class="library-card-title">${item.title}</div><div class="library-card-meta">${item.meta}</div><div class="library-card-preview">${item.preview}</div><div class="library-card-full">${item.full}</div>`;
      grid.appendChild(card);
    });
  }
  function switchLibraryTab(tab, containerId) {
    state.libraryTab = tab;
    state.libraryContainer = containerId || 'libraryGrid';
    $$(containerId === 'profileLibraryGrid' ? '.library-tab-profile' : '.library-tab').forEach(t => t.classList.remove('active'));
    const sel = document.querySelector((containerId === 'profileLibraryGrid' ? '.library-tab-profile' : '.library-tab') + `[data-tab="${tab}"]`);
    if (sel) sel.classList.add('active');
    renderLibrary(containerId);
  }

  // ========== 音乐 / 画像上传 ==========
  function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const audio = $('bgAudio');
    audio.src = url;
    audio.play().catch(() => showToast('请点击页面后播放音乐'));
    $('audioPlayer').classList.add('active');
    showToast('乐声已起');
  }
  function stopMusic() {
    const audio = $('bgAudio');
    audio.pause(); audio.src = '';
    $('audioPlayer').classList.remove('active');
  }
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      state.character.characterImage = e.target.result;
      saveState();
      renderCharacterSilhouette();
      showToast('侠客画像已更新');
    };
    reader.readAsDataURL(file);
  }

  // ========== 持久化 ==========
  function saveState() {
    if (!state.character) return;
    try {
      const toSave = { ...state.character };
      delete toSave.characterImage;
      if (toSave.persona) { const p = {...toSave.persona}; delete p.image; toSave.persona = p; }
      // 联系人中的画像不存（师父无图；自创人设图已剥离）
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) { console.warn('保存失败', e); }
  }
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return false;
      const data = JSON.parse(saved);
      if (!data || !data.name) return false;
      if (!data.currentIdentityId) data.currentIdentityId = 'youxia';
      if (!data.experiencedIdentities) data.experiencedIdentities = [data.currentIdentityId];
      if (!data.identityStats) { data.identityStats = {}; data.experiencedIdentities.forEach(id => data.identityStats[id] = true); }
      if (!data.contacts || !Array.isArray(data.contacts)) data.contacts = [];
      if (!data.lastProactiveDay) data.lastProactiveDay = null;
      if (!data.library) data.library = { poetry:[], wisdom:[], martial:[] };
      if (!data.usedContent) data.usedContent = { morning:[], qin:[], qi:[], shu:[], hua:[], wu:[], wisdom:[], events:[] };
      state.character = data;
      return true;
    } catch (e) { console.warn('加载失败', e); return false; }
  }

  // ========== 初始化 ==========
  function init() {
    initMountains();
    initParticles();
    updateWeatherOverlay();

    const account = loadAccount();
    if (account) {
      state.account = account;
      if (loadState()) {
        $('bottomNav').style.display = '';
        switchView('home');
      } else {
        startGame(state.account.username);
      }
    } else {
      showAuth();
    }

    if ($('authUsername')) $('authUsername').addEventListener('keydown', (e) => { if (e.key === 'Enter') submitRegister(); });

    setInterval(() => {
      if (state.character) {
        const ns = getCurrentSeason();
        if (ns !== state.character.season) {
          state.character.season = ns;
          initMountains(); initParticles();
        }
      }
    }, 60000);
  }

  // ========== 公开 API ==========
  return {
    init, showAuth, submitRegister,
    switchView, switchIdentity,
    startCultivation, handleEventChoice, completeCultivation,
    renderProfile, openPersonaModal, closePersonaModal, savePersona, uploadPersonaImage,
    switchLibraryTab, handleMusicUpload, handleImageUpload, stopMusic
  };
};

const app = App();
document.addEventListener('DOMContentLoaded', app.init);
