// ============================================================
// 江湖 · 侠客修行 — 应用逻辑（统一视觉系统版）
// 保留：账号 / 七身份 / 今日修行 / 藏书阁 / 人设 / 切换人生
// 视觉：现代高级 UI 骨架 × 东方材质；七身份抽象反馈；入江湖仪式感；统一点击反馈
// 约束：七张身份大图仅用于「侠客 / 个人」页沉浸式背景，其余页面一律不出现
// ============================================================

const App = function() {
  // ========== 状态 ==========
  let state = {
    view: 'auth',
    account: null,
    character: null,
    todayCultivation: null,
    libraryTab: 'all',
    libraryContainer: 'libraryGrid',
    selectedIdentityId: 'youxia',
    soundOn: true
  };

  const STORAGE_KEY = 'jianghu_knight_save_v4';
  const ACCOUNT_KEY = 'jianghu_account_v4';

  // ========== 七身份视觉配置 ==========
  // 注意：img 字段已移除。大图仅由 setPersonaBg 在 personal 视图加载。
  // 强调色为「墨色倾向」：低饱和、可在宣纸上阅读
  const IDENTITY_VISUALS = {
    youxia: { accent:'#8a6a3a', motto:'四海为家，自由无拘', material:'旅行手札', music:'youxia' },
    shijia: { accent:'#8a5a38', motto:'门第有承，礼法在心', material:'世家手札', music:'shijia' },
    shuyuan:{ accent:'#4d7268', motto:'案上诗书，窗前山水', material:'线装书',   music:'shuyuan' },
    yizhe:  { accent:'#4f7a58', motto:'草木为药，仁心为灯', material:'医案药笺', music:'yizhe' },
    qinshi: { accent:'#4a5568', motto:'弦上知音，清风明月', material:'琴谱素笺', music:'qinshi' },
    jianke: { accent:'#3f464f', motto:'一剑霜寒，快意恩仇', material:'剑谱残页', music:'jianke' },
    yinshi: { accent:'#5c7460', motto:'结庐人境，心远地偏', material:'山水册页', music:'yinshi' }
  };
  const IDENTITY_EN = {
    youxia:'Wanderer', shijia:'Noble', shuyuan:'Scholar', yizhe:'Healer',
    qinshi:'Zither', jianke:'Swordsman', yinshi:'Hermit'
  };
  // 七身份在画卷中的落点（沿极淡山水路径自然分布）
  const IDENTITY_POINTS = {
    youxia:{x:'8%',y:'62%'},   shijia:{x:'21%',y:'38%'}, shuyuan:{x:'34%',y:'58%'},
    yizhe:{x:'47%',y:'30%'},   qinshi:{x:'60%',y:'56%'}, jianke:{x:'73%',y:'34%'},
    yinshi:{x:'88%',y:'60%'}
  };
  // 空间中只显示极简二字名
  const IDENTITY_SHORT = { youxia:'游侠', shijia:'世家', shuyuan:'书院', yizhe:'医者',
    qinshi:'琴师', jianke:'剑客', yinshi:'隐士' };
  // 今日修行五章节（对应古卷上的五个印记）
  const CULT_STAGES = [
    { key:'morning', node:'晨课',   time:'清晨', art:'morning'  },
    { key:'core',    node:'技艺',   time:'上午', art:'forenoon' },
    { key:'body',    node:'武学',   time:'下午', art:'afternoon'},
    { key:'wisdom',  node:'悟道',   time:'傍晚', art:'dusk'     },
    { key:'event',   node:'江湖事', time:'暮色', art:'night'    }
  ];

  // ========== 七身份抽象符号（细线 SVG，非人物图） ==========
  const IDENTITY_MARKS = {
    youxia:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 26 C20 20 28 32 40 26 C50 21 56 28 60 24"/><path d="M8 36 C20 30 28 42 40 36 C50 31 56 38 60 34"/><path d="M8 46 C20 40 28 52 40 46 C50 41 56 48 60 44"/></svg>`,
    shijia:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="32" cy="28" r="15"/><rect x="26" y="22" width="12" height="12"/><path d="M14 52 V44 M50 52 V44 M14 44 H50"/></svg>`,
    shuyuan:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M32 14 V50"/><path d="M32 18 C22 16 14 18 12 22 C20 22 26 24 32 26"/><path d="M32 18 C42 16 50 18 52 22 C44 22 38 24 32 26"/><path d="M16 34 H28 M16 40 H28 M36 34 H48 M36 40 H48" opacity=".7"/></svg>`,
    yizhe:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M32 54 V30"/><path d="M32 36 C24 32 18 34 16 26 C26 26 32 30 32 36"/><path d="M32 30 C40 26 46 28 48 20 C38 20 32 24 32 30"/><circle cx="32" cy="14" r="2.4" fill="currentColor" stroke="none"/></svg>`,
    qinshi:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="32" cy="32" r="6"/><circle cx="32" cy="32" r="14"/><circle cx="32" cy="32" r="22"/></svg>`,
    jianke:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 52 L52 12"/><path d="M44 12 L54 12 L54 22" opacity=".8"/><path d="M16 48 L24 56 M48 16 L56 24" opacity=".5"/></svg>`,
    yinshi:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 46 L20 28 L30 40 L40 24 L58 46 Z"/><path d="M10 52 H54" opacity=".6"/><path d="M14 40 C22 38 28 42 36 40" opacity=".5"/></svg>`
  };

  // ========== 属性中文名 ==========
  const STAT_NAMES = {
    xiaoyi:'侠义', zhihui:'智慧', wuli:'武力',
    caiyi:'才艺', xinjing:'心境', xueshi:'学识'
  };
  const STAT_MAX = 100;

  // ========== 工具 ==========
  function $(id){ return document.getElementById(id); }
  function $$(sel){ return document.querySelectorAll(sel); }
  function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function todayStr(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function showToast(msg,type){ const t=$('toast'); if(!t) return; t.textContent=msg; t.className='toast show'+(type?' '+type:''); setTimeout(()=>{ t.className='toast'; },2500); }
  function totalStats(s){ return Object.values(s).reduce((a,b)=>a+b,0); }
  function getEvaluation(s){ const total=totalStats(s); const ev=JIANGHU_DATA.evaluations; for(let e of ev){ if(total>=e.min&&total<=e.max) return e; } return ev[ev.length-1]; }

  function getCurrentIdentity(){
    if(!state.character) return JIANGHU_DATA.identities[0];
    const id=state.character.currentIdentityId;
    return JIANGHU_DATA.identities.find(i=>i.id===id)||JIANGHU_DATA.identities[0];
  }

  // ========== 身份主题（强调色 + 背景 data 属性） ==========
  function applyIdentityTheme(id){
    const v=IDENTITY_VISUALS[id]||IDENTITY_VISUALS.youxia;
    document.body.dataset.identity = id;
    document.documentElement.style.setProperty('--id-accent', v.accent);
    document.documentElement.style.setProperty('--id-accent-soft', hexA(v.accent,.5));
  }
  function hexA(hex,a){ const n=parseInt(hex.slice(1),16); const r=(n>>16)&255,g=(n>>8)&255,b=n&255; return `rgba(${r},${g},${b},${a})`; }

  // ========== 季节 / 天气 / 时间 ==========
  function getCurrentSeason(){
    const m=new Date().getMonth()+1;
    if(m>=3&&m<=5) return 'spring';
    if(m>=6&&m<=8) return 'summer';
    if(m>=9&&m<=11) return 'autumn';
    return 'winter';
  }
  function getCurrentWeather(){
    const s=state.character?state.character.season:getCurrentSeason();
    const pool = s==='spring'?['sunny','sunny','cloudy','rain','mist']
              : s==='summer'?['sunny','sunny','sunny','rain','cloudy']
              : s==='autumn'?['sunny','sunny','cloudy','mist','rain']
              : ['snow','snow','cloudy','sunny','mist'];
    return rand(pool);
  }
  function getTimeOfDay(){
    const h=new Date().getHours();
    if(h<6) return {name:'拂晓',isNight:true};
    if(h<11) return {name:'清晨',isNight:false};
    if(h<13) return {name:'正午',isNight:false};
    if(h<17) return {name:'午后',isNight:false};
    if(h<19) return {name:'黄昏',isNight:false};
    return {name:'夜晚',isNight:true};
  }

  // ========== 场景分级（时间 + 季节色温） ==========
  // 宣纸上的色温：极淡，只做冷暖倾向，不做大面积渐变
  const TIME_TINT = {
    '拂晓':['rgba(72,94,132,.10)','rgba(44,56,82,.10)'],
    '清晨':['rgba(96,126,152,.08)','rgba(60,84,104,.09)'],
    '正午':['rgba(238,236,222,0)','rgba(124,122,102,.05)'],
    '午后':['rgba(196,168,116,.10)','rgba(140,120,86,.08)'],
    '黄昏':['rgba(198,138,74,.14)','rgba(150,104,62,.10)'],
    '夜晚':['rgba(48,60,96,.16)','rgba(30,40,70,.17)']
  };
  const SEASON_BOTTOM = { spring:'rgba(120,150,110,.07)', summer:'rgba(96,140,124,.07)', autumn:'rgba(170,124,64,.08)', winter:'rgba(140,160,180,.08)' };
  function buildGrade(timeName, season){
    const t=TIME_TINT[timeName]||TIME_TINT['清晨'];
    const sb=SEASON_BOTTOM[season]||SEASON_BOTTOM.spring;
    return `radial-gradient(120% 80% at 50% 0%, ${t[0]}, transparent 55%), linear-gradient(180deg, transparent 42%, ${sb} 100%), linear-gradient(180deg, transparent 48%, ${t[1]})`;
  }

  // ========== 场景切换（核心视觉：无大图，仅色温/粒子/主题） ==========
  function updateScene(identityId, timeName, weatherId){
    applyIdentityTheme(identityId);
    document.body.dataset.time = timeName || getTimeOfDay().name;
    const season = state.character?state.character.season:getCurrentSeason();
    const tn = timeName || getTimeOfDay().name;
    if($('bgGrade')) $('bgGrade').style.background = buildGrade(tn, season);
    // 个人页沉浸式身份图（仅当处于 personal 视图时显示）
    if(state.view==='knight' || state.view==='profile'){ setPersonaBg(identityId); }
    AudioEngine.setIdentity((IDENTITY_VISUALS[identityId]||IDENTITY_VISUALS.youxia).music);
    AudioEngine.setWeather(weatherId || (state.character?state.character.weather:getCurrentWeather()));
    initParticles();
  }

  // ========== 个人页身份图（唯一使用大图之处） ==========
  function setPersonaBg(id){
    const el=$('personaBg'); if(!el) return;
    el.style.backgroundImage = `url('images/${id}.jpg')`;
  }

  // ========== 粒子 ==========
  function initParticles(){
    const layer=$('particleLayer'); if(!layer) return;
    layer.innerHTML='';
    const season=state.character?state.character.season:getCurrentSeason();
    const weather=state.character?state.character.weather:getCurrentWeather();
    if(weather==='rain'){ createParticles('rain',60); return; }
    if(weather==='snow'){ createParticles('snow',50); return; }
    const pt=JIANGHU_DATA.seasons[season].particles;
    createParticles(pt, pt==='fireflies'?26:22);
  }
  function createParticles(type,count){
    const layer=$('particleLayer'); if(!layer) return;
    for(let i=0;i<count;i++){
      const p=document.createElement('div');
      p.className='particle particle-'+type;
      p.style.left=(Math.random()*100)+'%';
      p.style.animationDelay=(Math.random()*10)+'s';
      const dur = type==='rain'?(0.5+Math.random()*0.8)
                : type==='snow'?(6+Math.random()*6)
                : type==='firefly'?(4+Math.random()*4)
                : (8+Math.random()*8);
      p.style.animationDuration=dur+'s';
      if(type==='petal'||type==='leaf'||type==='snow') p.style.setProperty('--drift',(Math.random()*200-100)+'px');
      if(type==='firefly'){ p.style.setProperty('--fx',(Math.random()*60-30)+'px'); p.style.setProperty('--fy',(Math.random()*60-30)+'px'); p.style.top=(20+Math.random()*60)+'%'; }
      layer.appendChild(p);
    }
  }

  // ========== 视差（微 3D 空间感） ==========
  function bindParallax(){
    window.addEventListener('mousemove',(e)=>{
      const x=(e.clientX/window.innerWidth-0.5);
      const y=(e.clientY/window.innerHeight-0.5);
      ['bgFar','bgCloud','bgMist'].forEach(id=>{
        const el=$(id); if(!el) return;
        const depth=parseFloat(el.dataset.depth||'0.03');
        el.style.transform=`translate(${-x*depth*140}px, ${-y*depth*140}px)`;
      });
      const pb=$('personaBg');
      if(pb && document.body.classList.contains('view-personal')) pb.style.transform=`scale(1.0) translate(${-x*10}px, ${-y*10}px)`;
    },{passive:true});
  }

  // ========== 账号 ==========
  function loadAccount(){
    try{ const s=localStorage.getItem(ACCOUNT_KEY); if(!s) return null; const a=JSON.parse(s); if(!a||!a.username) return null; return a; }
    catch(e){ return null; }
  }
  function saveAccount(){ if(!state.account) return; try{ localStorage.setItem(ACCOUNT_KEY, JSON.stringify(state.account)); }catch(e){} }

  function showAuth(){
    $$('.view').forEach(v=>v.classList.remove('active'));
    $('view-auth').classList.add('active');
    state.view='auth'; state.account=null; state.character=null;
    $('bottomNav').style.display='none';
    document.body.classList.add('aura-on'); document.body.classList.remove('view-personal');
    renderIdentitySelect();
  }

  function submitRegister(){
    const username=$('authUsername').value.trim();
    if(!username){ showToast('请取一侠客名'); return; }
    state.account={ username:username };
    saveAccount();
    firstGestureAudio();
    triggerRitual(state.selectedIdentityId, ()=>enterAfterAuth());
  }

  function enterAfterAuth(){
    if(loadState()){
      $('bottomNav').style.display='';
      const time=getTimeOfDay();
      const id=state.character.currentIdentityId;
      updateScene(id, time.name, state.character.weather);
      switchView('home');
    } else {
      startGame(state.account.username);
    }
  }

  // ========== 开始游戏 ==========
  function startGame(name){
    const firstId=state.selectedIdentityId || 'youxia';
    const firstIdentity=JIANGHU_DATA.identities.find(i=>i.id===firstId)||JIANGHU_DATA.identities[0];
    state.character={
      name:name, username:state.account?state.account.username:name,
      currentIdentityId:firstIdentity.id, experiencedIdentities:[firstIdentity.id],
      identityStats:{}, persona:null, stats:{...firstIdentity.startStats},
      history:[], library:{poetry:[],wisdom:[],martial:[]}, dayCount:1,
      cultivatedDates:{}, usedIdentityContent:{},
      usedContent:{morning:[],qin:[],qi:[],shu:[],hua:[],wu:[],wisdom:[],events:[]},
      weather:getCurrentWeather(), season:getCurrentSeason()
    };
    state.character.identityStats[firstIdentity.id]=true;
    JIANGHU_DATA.identities.forEach(id=>{ state.character.usedIdentityContent[id.id]={morning:[],core:[],body:[],wisdom:[],event:[]}; });
    saveState();
    $('bottomNav').style.display='';
    const time=getTimeOfDay();
    updateScene(firstIdentity.id, time.name, state.character.weather);
    switchView('home'); renderHome();
    showToast('欢迎入江湖，'+name+'！自「'+firstIdentity.name+'」始，七种人生皆可历。','growth');
  }

  // ========== 入江湖 · 身份选择（画卷中的七个墨色落点） ==========
  function renderIdentitySelect(){
    const list=$('identityList'); if(!list) return;
    list.innerHTML='';
    JIANGHU_DATA.identities.forEach(id=>{
      const p=IDENTITY_POINTS[id.id]||{x:'50%',y:'50%'};
      const node=document.createElement('button');
      node.className='id-node'+(id.id===state.selectedIdentityId?' active':'');
      node.dataset.id=id.id;
      node.style.setProperty('--x', p.x);
      node.style.setProperty('--y', p.y);
      node.innerHTML=`<span class="bloom"></span><i class="node-dot"></i>`
        + `<span class="node-name">${IDENTITY_SHORT[id.id]||id.name}</span>`;
      node.addEventListener('click',(e)=>{ fxAt(e.clientX,e.clientY,'wave'); selectIdentity(id.id); });
      list.appendChild(node);
    });
    const space=$('identitySpace'); if(space) space.classList.add('has-active');
    previewIdentity(state.selectedIdentityId, true);
  }
  function previewIdentity(id, force){
    const identity=JIANGHU_DATA.identities.find(i=>i.id===id)||JIANGHU_DATA.identities[0];
    const v=IDENTITY_VISUALS[id]||IDENTITY_VISUALS.youxia;
    applyIdentityTheme(id);
    const mk=$('idDetailMark'), d=$('idDetailName'), m=$('idDetailMotto'), f=$('idDetailMeta'), de=$('idDetailDesc');
    if(mk) mk.innerHTML=IDENTITY_MARKS[id]||'';
    if(d) d.textContent=identity.name;
    if(m) m.textContent=v.motto;
    if(f) f.innerHTML=`专精 <b>${identity.focus}</b> · 绝技 <b>${identity.exclusiveSkill}</b>`;
    if(de) de.textContent=identity.longDesc.replace(/\n/g,' ');
    const colo=$('identityDetail');
    if(colo && !force){ colo.classList.remove('colo-fade'); void colo.offsetWidth; colo.classList.add('colo-fade'); }
    const grade=buildGrade(getTimeOfDay().name, getCurrentSeason());
    if($('bgGrade')) $('bgGrade').style.background=grade;
    AudioEngine.setIdentity(v.music);
    if(force){ $$('.id-node').forEach(r=>r.classList.toggle('active', r.dataset.id===id)); }
  }
  function selectIdentity(id){
    state.selectedIdentityId=id;
    $$('.id-node').forEach(r=>r.classList.toggle('active', r.dataset.id===id));
    previewIdentity(id, true);
    inkResponse(id);
    const nf=$('nameField'); if(nf) nf.classList.add('revealed');
  }

  // ========== 入江湖仪式感动画 ==========
  function triggerRitual(id, done){
    const identity=JIANGHU_DATA.identities.find(i=>i.id===id)||JIANGHU_DATA.identities[0];
    const v=IDENTITY_VISUALS[id]||IDENTITY_VISUALS.youxia;
    applyIdentityTheme(id);
    const ov=$('ritualOverlay'); if(!ov){ done&&done(); return; }
    $('ritualName').textContent=identity.name;
    $('ritualMotto').textContent=v.motto;
    ov.classList.add('show');
    document.body.classList.remove('aura-on');
    setTimeout(()=>{ ov.classList.remove('show'); done&&done(); }, 1150);
  }

  // ========== 身份切换 ==========
  function switchIdentity(identityId){
    if(!state.character) return;
    const c=state.character;
    if(c.currentIdentityId===identityId) return;
    const identity=JIANGHU_DATA.identities.find(i=>i.id===identityId); if(!identity) return;
    if(!c.identityStats[identityId]){
      Object.entries(identity.startStats).forEach(([k,val])=>{ c.stats[k]=Math.min(STAT_MAX, c.stats[k]+Math.floor(val*0.5)); });
      c.identityStats[identityId]=true; c.experiencedIdentities.push(identityId);
      showToast('初历「'+identity.name+'」！专精：'+identity.focus+'，绝技：'+identity.exclusiveSkill,'growth');
    } else {
      showToast('切换至「'+identity.name+'」','growth');
    }
    c.currentIdentityId=identityId;
    state.todayCultivation=null;
    saveState();
    updateScene(identityId, getTimeOfDay().name, c.weather);
    renderHome();
    if(state.view==='cultivation') renderCultivation();
  }

  function renderIdentitySwitcher(){
    if(!state.character) return;
    const c=state.character; const container=$('identitySwitcher'); if(!container) return;
    container.innerHTML='';
    JIANGHU_DATA.identities.forEach(id=>{
      const card=document.createElement('div');
      const isActive=c.currentIdentityId===id.id;
      const isExp=c.experiencedIdentities.includes(id.id);
      card.className='identity-card-mini'+(isActive?' active':'')+(isExp?' experienced':'');
      card.onclick=()=>switchIdentity(id.id);
      card.innerHTML=`<i class="mini-dot"></i><span class="identity-mini-name">${IDENTITY_SHORT[id.id]||id.name}</span>`;
      container.appendChild(card);
    });
  }

  // ========== 视图切换 ==========
  function switchView(viewName){
    if(!state.character && viewName!=='auth') return;
    $$('.view').forEach(v=>v.classList.remove('active'));
    const target=$('view-'+viewName);
    if(target){ target.classList.add('active'); state.view=viewName; }
    $$('.nav-item').forEach(n=>n.classList.remove('active'));
    const navItem=document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if(navItem) navItem.classList.add('active');
    // 仅 personal 视图显示身份大图背景
    const personal = (viewName==='knight'||viewName==='profile');
    document.body.classList.toggle('view-personal', personal);
    if(!personal) document.body.classList.remove('aura-on');
    window.scrollTo(0,0);
    if(viewName==='home') renderHome();
    else if(viewName==='knight') renderKnight();
    else if(viewName==='cultivation') renderCultivation();
    else if(viewName==='profile') renderProfile();
    else if(viewName==='library'){ renderLibrary(); moveTabInk('mainTabInk','.library-tab'); }
  }

  // ========== 江湖首页 ==========
  function renderHome(){
    if(!state.character) return;
    const c=state.character;
    const time=getTimeOfDay();
    const seasonData=JIANGHU_DATA.seasons[c.season];
    const weatherData=JIANGHU_DATA.weathers.find(w=>w.id===c.weather);
    const identity=getCurrentIdentity();
    updateScene(c.currentIdentityId, time.name, c.weather);

    if($('homeTime')) $('homeTime').textContent=`${seasonData.name} · ${time.name} · ${weatherData.name}`;
    if($('homeIdentityName')) $('homeIdentityName').textContent=identity.name;
    if($('homeChar')) $('homeChar').textContent=`${c.name} · 第 ${c.dayCount} 日`;
    if($('homeGreeting')) $('homeGreeting').textContent=getGreeting(time, seasonData);
    renderHomeStats();
    renderIdentitySwitcher();

    const btn=$('homeActionBtn');
    if(btn){
      const done=c.cultivatedDates[c.currentIdentityId]===todayStr();
      btn.classList.toggle('done', done);
      const txt=btn.querySelector('.ch-text');
      if(txt) txt.textContent=done?'今日已圆满':'今 日 修 行';
    }
  }

  function getGreeting(time, season){
    const g={
      '拂晓':`天色未明，晨风带${season.name}之气，万事将启。`,
      '清晨':`晨光熹微，竹影婆娑。今日修行，已为汝备下。`,
      '正午':`日上中天，院中树荫正好，正宜小憩。`,
      '午后':`午后风静，蝉鸣声声，正宜读书。`,
      '黄昏':`夕阳如金，满庭皆暖。修行不急，且看此落日。`,
      '夜晚':`月明星稀，庭灯已燃。夜深矣，汝有何疑，但问无妨。`
    };
    return g[time.name]||g['清晨'];
  }

  function renderHomeStats(){
    const c=state.character; const bar=$('homeMiniStats'); if(!bar) return;
    bar.innerHTML='';
    Object.entries(c.stats).forEach(([k,v])=>{
      const m=document.createElement('div'); m.className='stat-mini';
      m.innerHTML=`<div class="stat-mini-label">${STAT_NAMES[k]}</div><div class="stat-mini-value">${v}</div>`;
      bar.appendChild(m);
    });
  }

  // ========== 今日修行 ==========
  function startCultivation(){
    if(!state.character) return;
    const c=state.character; const idId=c.currentIdentityId;
    if(c.cultivatedDates[idId]===todayStr()){
      const remaining=JIANGHU_DATA.identities.filter(i=>c.cultivatedDates[i.id]!==todayStr());
      showToast(remaining.length>0?'「'+getCurrentIdentity().name+'」今日已圆满。可于上方换一身，再历江湖。':'七身今日皆已圆满，明日再续。','growth');
      return;
    }
    generateDailyContent();
    updateScene(idId, getTimeOfDay().name, c.weather);
    state.cultStage=0;
    inkTransition(null, null, ()=>switchView('cultivation'));
  }

  // ========== 段首细线插图（保留原有简约插图，作为文字锚点） ==========
  const SEG_ART = {
    morning:`<svg viewBox="0 0 300 84" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="150" cy="34" r="15"/><path d="M40 64 H260"/><path d="M70 64 C100 46 130 46 150 64 C170 46 200 46 230 64"/><path d="M78 30 V64 M222 30 V64" opacity=".45"/></svg>`,
    forenoon:`<svg viewBox="0 0 300 84" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M150 16 V68"/><path d="M150 22 C128 18 110 22 104 30 C124 30 140 34 150 40"/><path d="M150 22 C172 18 190 22 196 30 C176 30 160 34 150 40"/><path d="M112 46 H142 M158 46 H188 M112 54 H142 M158 54 H188" opacity=".6"/></svg>`,
    afternoon:`<svg viewBox="0 0 300 84" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M150 68 V40"/><path d="M150 42 C120 40 108 22 124 14 C140 26 150 30 150 42 C150 30 160 26 176 14 C192 22 180 40 150 42"/><path d="M210 30 C228 26 240 34 250 30 M210 38 C228 34 240 42 250 38" opacity=".5"/></svg>`,
    dusk:`<svg viewBox="0 0 300 84" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M110 50 A40 40 0 0 1 190 50 Z"/><path d="M60 58 H240 M80 64 H220 M100 70 H200" opacity=".55"/></svg>`,
    night:`<svg viewBox="0 0 300 84" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M168 24 A20 20 0 1 0 188 44 A16 16 0 1 1 168 24 Z"/><path d="M70 60 L120 40 L150 52 L182 36 L236 60" opacity=".8"/><path d="M84 56 C108 52 128 60 152 56" opacity=".4"/></svg>`
  };
  function segArt(k){ return SEG_ART[k]||SEG_ART.night; }

  function generateDailyContent(){
    const c=state.character; const idId=c.currentIdentityId;
    const pool=JIANGHU_IDENTITY_CULTIVATION[idId];
    if(!c.usedIdentityContent[idId]) c.usedIdentityContent[idId]={morning:[],core:[],body:[],wisdom:[],event:[]};
    const used=c.usedIdentityContent[idId];
    function pickUnused(arr,key,fallback){
      if(!Array.isArray(used[key])) used[key]=[];
      let p=arr.filter((_,i)=>!used[key].includes(i));
      if(p.length===0){ used[key]=[]; p=arr.slice(); }
      if(p.length===0) return fallback||null;
      const item=rand(p); used[key].push(arr.indexOf(item)); return item;
    }
    const morning=pickUnused(pool.mornings,'morning')||rand(JIANGHU_DATA.morningActivities);
    const core=pickUnused(pool.cores,'core')||rand(JIANGHU_DATA.wuActivities);
    const body=pickUnused(pool.bodies,'body')||rand(JIANGHU_DATA.wuActivities);
    const wisdom=pickUnused(pool.wisdoms,'wisdom')||rand(JIANGHU_DATA.wisdomTexts);
    const event=pickUnused(pool.events,'event')||rand(JIANGHU_DATA.jianghuEvents);
    state.todayCultivation={morning,core,body,wisdom,event,eventResolved:false,eventResult:null,eventChoiceIndex:null,identityId:idId};
  }

  function renderCultivation(){
    if(!state.character) return;
    const c=state.character;
    const carrier=$('cultivationContent'); if(!carrier) return;
    const v=IDENTITY_VISUALS[c.currentIdentityId]||IDENTITY_VISUALS.youxia;
    carrier.dataset.material=v.material;
    updateScene(c.currentIdentityId, getTimeOfDay().name, c.weather);
    if($('cultIdentity')) $('cultIdentity').textContent=getCurrentIdentity().name+' · '+v.material;
    const date=new Date();
    if($('cultivationDate')) $('cultivationDate').textContent=`${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;

    const tl=$('cultTimeline');
    if(c.cultivatedDates[c.currentIdentityId]===todayStr() && !state.todayCultivation){
      if(tl) tl.innerHTML='';
      carrier.innerHTML=`<div class="cultivation-complete">「${getCurrentIdentity().name}」今日修行已圆满。`
        + `<br><span style="font-size:.9rem;">可于首页换一身，再历他样江湖。</span>`
        + `<p style="margin-top:1.6rem;font-style:italic;color:var(--ink-500);">「${rand(JIANGHU_DATA.nightWisdom)}」</p></div>`;
      return;
    }
    if(!state.todayCultivation){
      if(tl) tl.innerHTML='';
      carrier.innerHTML=`<div class="cultivation-complete">今日尚未修行。`
        + `<div class="cult-foot"><button class="jx-btn" onclick="app.startCultivation(event)"><span>展 卷</span><i class="seal"></i></button></div></div>`;
      return;
    }
    const tc=state.todayCultivation;
    // 水墨时间轴：五个章节印记
    if(tl){
      tl.innerHTML='<span class="tl-line" id="tlLine"></span>' + CULT_STAGES.map((s,i)=>
        `<button class="tl-node${i===state.cultStage?' active':''}" data-stage="${i}" onclick="app.pickStage(${i},event)">`
        + `<i class="d"></i><span class="n">${s.node}</span></button>`).join('');
    }
    let html='';
    html+=panelHTML(0, '清晨 · 晨课', tc.morning.title, `<p class="panel-body">${tc.morning.desc}</p>`, effTags(tc.morning.effects));
    html+=panelHTML(1, '上午 · 技艺', tc.core.title,    `<p class="panel-body">${tc.core.desc}</p>`,    effTags(tc.core.effects));
    html+=panelHTML(2, '下午 · 武学', tc.body.title,    `<p class="panel-body">${tc.body.desc}</p>`,    effTags(tc.body.effects));

    const wTitle=tc.wisdom.source||tc.wisdom.title||'悟道';
    const wFull=tc.wisdom.original&&tc.wisdom.explanation&&tc.wisdom.masterComment;
    const wInner=wFull
      ? `<div class="wisdom-original">${tc.wisdom.original}</div>`
        + `<div class="wisdom-label">白话释义</div><div class="wisdom-text">${tc.wisdom.explanation}</div>`
        + `<div class="wisdom-label">师父点评</div><div class="wisdom-text wisdom-master">${tc.wisdom.masterComment}</div>`
        + `<div class="wisdom-label">现实启示</div><div class="wisdom-text">${tc.wisdom.modernInsight||''}</div>`
      : `<div class="wisdom-original">${tc.wisdom.desc||''}</div>`;
    html+=panelHTML(3, '傍晚 · 悟道', wTitle, wInner, effTags(tc.wisdom.effects));

    let evInner=`<p class="event-narrative">${tc.event.narrative}</p>`;
    if(!tc.eventResolved){
      evInner+=tc.event.choices.map((ch,i)=>
        `<button class="jx-choice" onclick="app.handleEventChoice(${i},event)">${ch.text}</button>`).join('');
    } else {
      evInner+=`<div class="event-result">${tc.eventResult}</div>`
        + `<div class="cult-foot"><button class="jx-confirm" onclick="app.completeCultivation(event)">`
        + `<span>修 行 圆 满</span><i class="seal"></i></button></div>`;
    }
    html+=panelHTML(4, '暮色 · 江湖事', tc.event.title, evInner,
      tc.eventResolved ? Object.entries(tc.event.choices[tc.eventChoiceIndex].effects)
        .map(([k,val])=>`<span class="effect-tag${val<0?' negative':''}">${STAT_NAMES[k]} ${val>0?'+':''}${val}</span>`).join('') : '');

    html+=`<div class="night-wisdom"><div class="night-wisdom-label">— 江 湖 夜 语 —</div>`
      + `<div class="night-wisdom-text">「${rand(JIANGHU_DATA.nightWisdom)}」</div></div>`;
    carrier.innerHTML=html;
    showStage(state.cultStage||0, true);
  }

  function effTags(effects){ return Object.entries(effects).map(([k,v])=>`<span class="effect-tag">${STAT_NAMES[k]} ${v>0?'+':''}${v}</span>`).join(''); }

  // 章节纸页（展开一页古籍）
  function panelHTML(i, label, title, inner, effects){
    const st=CULT_STAGES[i]||{art:'night'};
    return `<div class="cult-panel" data-stage="${i}">`
      + `<div class="panel-art">${segArt(st.art)}</div>`
      + `<span class="panel-label">${label}</span>`
      + `<h3 class="panel-title">${title}</h3>`
      + inner
      + (effects?`<div class="panel-effects">${effects}</div>`:'')
      + `</div>`;
  }
  // 时间轴节点 → 内容展开
  function showStage(i, silent){
    state.cultStage=i;
    $$('.tl-node').forEach(n=>n.classList.toggle('active', Number(n.dataset.stage)===i));
    $$('.cult-panel').forEach(p=>p.classList.toggle('show', Number(p.dataset.stage)===i));
    if(silent) return;
    const line=$('tlLine');
    if(line){ line.classList.add('flash'); setTimeout(()=>line.classList.remove('flash'),520); }
  }
  function pickStage(i, ev){
    const node=ev?ev.currentTarget:null;
    if(node){ const d=node.querySelector('.d'); if(d){ d.style.animation='none'; void d.offsetWidth; d.style.animation=''; } }
    if(ev) fxAt(ev.clientX, ev.clientY, 'wave');
    showStage(i);
  }

  function handleEventChoice(idx, ev){
    if(!state.todayCultivation||state.todayCultivation.eventResolved) return;
    const tc=state.todayCultivation; const choice=tc.event.choices[idx];
    tc.eventResolved=true; tc.eventResult=choice.result; tc.eventChoiceIndex=idx;
    // 墨线自左向右生长 → 小范围墨迹扩散 → 文字加深
    const el=ev?ev.currentTarget:null;
    if(el) el.classList.add('chosen');
    if(ev) fxAt(ev.clientX, ev.clientY, 'ink');
    applyEffects(choice.effects);
    showToast(Object.entries(choice.effects).map(([k,v])=>`${STAT_NAMES[k]} ${v>0?'+':''}${v}`).join(' · '),'growth');
    setTimeout(()=>{ renderCultivation(); showStage(4, true); }, 480);
  }

  function applyEffects(effects){
    const c=state.character;
    Object.entries(effects).forEach(([k,v])=>{ c.stats[k]=Math.max(0,Math.min(STAT_MAX,c.stats[k]+v)); });
    saveState();
  }

  function completeCultivation(ev){
    const c=state.character; const tc=state.todayCultivation;
    applyEffects(tc.morning.effects); applyEffects(tc.core.effects); applyEffects(tc.body.effects); applyEffects(tc.wisdom.effects);
    const merged={};
    [tc.morning.effects,tc.core.effects,tc.body.effects,tc.wisdom.effects, tc.eventResolved?tc.event.choices[tc.eventChoiceIndex].effects:{}].forEach(eff=>{
      Object.entries(eff).forEach(([k,v])=>{ merged[k]=(merged[k]||0)+v; });
    });
    c.history.unshift({ date:todayStr(), day:c.dayCount, identity:getCurrentIdentity().name,
      morning:tc.morning.title, art:tc.core.title, wu:tc.body.title,
      wisdom:tc.wisdom.source||tc.wisdom.title, event:tc.event.title, effects:merged });
    if(!c.library.wisdom.some(w=>(w.source||w.title)===(tc.wisdom.source||tc.wisdom.title))) c.library.wisdom.push(tc.wisdom);
    if(!c.library.martial.some(m=>m.title===tc.body.title)) c.library.martial.push({title:tc.body.title,text:tc.body.desc,category:'武学修炼'});
    if(c.library.poetry.length<JIANGHU_DATA.poetryCollection.length){
      const remain=JIANGHU_DATA.poetryCollection.filter(p=>!c.library.poetry.some(cp=>cp.title===p.title));
      if(remain.length>0&&Math.random()>0.4) c.library.poetry.push(rand(remain));
    }
    c.dayCount++; c.cultivatedDates[c.currentIdentityId]=todayStr(); c.weather=getCurrentWeather();
    saveState(); state.todayCultivation=null;
    if(ev) fxAt(ev.clientX, ev.clientY, 'seal');
    showToast('修行圆满！'+Object.entries(merged).map(([k,v])=>`${STAT_NAMES[k]} ${v>0?'+':''}${v}`).join(' · '),'growth');
    setTimeout(()=>{
      inkTransition(ev?ev.clientX:null, ev?ev.clientY:null, ()=>{ switchView('home'); renderHome(); });
    },900);
  }

  // ========== 个人界面 ==========
  function renderProfile(){
    if(!state.character) return;
    const c=state.character; const identity=getCurrentIdentity();
    if($('profileName')) $('profileName').textContent=c.name;
    if($('profileSub')) $('profileSub').textContent=`${c.username} · 现历 ${identity.name}`;
    const personaBox=$('profilePersona');
    if(c.persona){
      personaBox.innerHTML=`<div class="persona-row"><div><div class="persona-line">${c.persona.name}</div>`
        + `<div class="persona-desc">${c.persona.desc}</div></div>`
        + `<button class="jx-link" onclick="app.openPersonaModal()">重题</button></div>`;
    } else {
      personaBox.innerHTML=`<button class="jx-link" onclick="app.openPersonaModal()">＋ 题 一 人 设</button>`;
    }
    const ip=$('profileIdentity'); const exp=c.experiencedIdentities.length, total=JIANGHU_DATA.identities.length;
    ip.innerHTML=`<div class="id-progress-title">已历 ${exp} / ${total}</div><div class="id-dots">`
      + JIANGHU_DATA.identities.map(id=>{
          const e=c.experiencedIdentities.includes(id.id), cur=c.currentIdentityId===id.id;
          return `<span class="id-dot-item${e?' experienced':''}${cur?' current':''}"><i class="d"></i>${IDENTITY_SHORT[id.id]||id.name}</span>`;
        }).join('') + `</div>`;
    renderLibrary('profileLibraryGrid');
    moveTabInk('profileTabInk','.library-tab-profile');
  }

  function openPersonaModal(){
    const c=state.character; $('personaModal').style.display='flex';
    if(c.persona){ $('personaName').value=c.persona.name||''; $('personaDesc').value=c.persona.desc||''; }
    else { $('personaName').value=''; $('personaDesc').value=''; }
  }
  function closePersonaModal(){ $('personaModal').style.display='none'; }
  function savePersona(){
    const c=state.character; const name=$('personaName').value.trim(); const desc=$('personaDesc').value.trim();
    if(!name){ showToast('请为人设取名'); return; }
    c.persona={ name:name, desc:desc||'江湖一奇人，行迹莫测。', gender:c.persona?c.persona.gender:'', image:c.persona?c.persona.image:null };
    saveState(); renderProfile();
    // 落印：印章落下后收起题字纸
    sealDrop($('personaSaveBtn'));
    setTimeout(()=>{ closePersonaModal(); showToast('人设已成：'+name,'growth'); },640);
  }

  // ========== 我的侠客 ==========
  function renderKnight(){
    if(!state.character) return;
    const c=state.character; const identity=getCurrentIdentity();
    if($('knightName')) $('knightName').textContent=c.name;
    if($('knightPageSubtitle')) $('knightPageSubtitle').textContent=`第 ${c.dayCount} 日 · ${identity.name}`;
    const ip=$('identityProgress');
    if(ip){ const exp=c.experiencedIdentities.length, total=JIANGHU_DATA.identities.length;
      ip.innerHTML=`<div class="id-progress-title">已历 ${exp} / ${total}</div><div class="id-dots">`
        + JIANGHU_DATA.identities.map(id=>{
            const e=c.experiencedIdentities.includes(id.id), cur=c.currentIdentityId===id.id;
            return `<span class="id-dot-item${e?' experienced':''}${cur?' current':''}"><i class="d"></i>${IDENTITY_SHORT[id.id]||id.name}</span>`;
          }).join('') + `</div>`;
    }
    const panel=$('knightStatsPanel'); if(panel){
      panel.innerHTML='';
      Object.entries(c.stats).forEach(([k,v])=>{
        const pct=Math.min(100,(v/STAT_MAX)*100);
        const row=document.createElement('div'); row.className='stat-row';
        row.innerHTML=`<div class="stat-label">${STAT_NAMES[k]}</div>`
          + `<div class="stat-ink"><i style="width:${pct}%"></i></div>`
          + `<div class="stat-value">${v}</div>`;
        panel.appendChild(row);
      });
      const evalData=getEvaluation(c.stats); const ed=document.createElement('div');
      ed.className='stat-foot';
      ed.innerHTML=`<div class="foot-meta">总属性 ${totalStats(c.stats)} · 修行 ${c.dayCount-1} 日</div>`
        + `<div class="foot-title">${evalData.title}</div>`;
      panel.appendChild(ed);
    }
    const hist=$('knightHistory');
    if(hist){
      if(c.history.length===0){ hist.innerHTML='<div class="history-empty">尚无江湖经历。<br>开始今日修行，书汝之故事。</div>'; }
      else {
        hist.innerHTML='';
        c.history.slice(0,20).forEach(h=>{
          const item=document.createElement('div'); item.className='history-item';
          item.innerHTML=`<div class="history-date">第 ${h.day} 日 · ${h.date}${h.identity?' · '+h.identity:''}</div>`
            + `<div class="history-line">${h.morning} · ${h.art} · ${h.wu}</div>`
            + `<div class="history-line" style="color:var(--ink-500);">悟：${h.wisdom||'—'}　遇：${h.event}</div>`
            + `<div class="history-growth">${Object.entries(h.effects).map(([k,v])=>`<span class="growth-tag${v<0?' negative':''}">${STAT_NAMES[k]} ${v>0?'+':''}${v}</span>`).join('')}</div>`;
          hist.appendChild(item);
        });
      }
    }
  }

  // ========== 藏书阁 ==========
  function renderLibrary(containerId){
    if(!state.character) return;
    const c=state.character; const grid=$(containerId||'libraryGrid'); if(!grid) return;
    grid.innerHTML=''; let items=[];
    if(state.libraryTab==='all'||state.libraryTab==='poetry') c.library.poetry.forEach(p=>items.push({type:'poetry',title:p.title,meta:`${p.dynasty} · ${p.author}`,preview:p.text.split('\n')[0],full:p.text+'\n\n【注】'+p.note}));
    if(state.libraryTab==='all'||state.libraryTab==='wisdom') c.library.wisdom.forEach(w=>{ const wt=w.source||w.title||'典籍'; const wo=w.original||w.desc||''; const wf=w.explanation?`${wo}\n\n【释义】${w.explanation}\n\n【师父点评】${w.masterComment}\n\n【现实启示】${w.modernInsight}`:wo; items.push({type:'wisdom',title:wt,meta:'典籍',preview:wo.split('\n')[0],full:wf}); });
    if(state.libraryTab==='all'||state.libraryTab==='martial') c.library.martial.forEach(m=>items.push({type:'martial',title:m.title,meta:m.category||'武学',preview:m.text.substring(0,50)+'...',full:m.text}));
    if(items.length===0){ grid.innerHTML='<div class="library-empty">藏书阁尚空。<br>每日修行，典籍自入阁。</div>'; return; }
    items.forEach(item=>{
      const card=document.createElement('div'); card.className='library-card';
      card.onclick=(e)=>{ card.classList.toggle('expanded'); fxAt(e.clientX,e.clientY,'ink'); };
      card.innerHTML=`<div class="library-card-title">${item.title}</div><div class="library-card-meta">${item.meta}</div><div class="library-card-preview">${item.preview}</div><div class="library-card-full">${item.full}</div>`;
      grid.appendChild(card);
    });
  }
  function switchLibraryTab(tab,containerId){
    state.libraryTab=tab; state.libraryContainer=containerId||'libraryGrid';
    const isProfile = containerId==='profileLibraryGrid';
    const sel0 = isProfile?'.library-tab-profile':'.library-tab';
    $$(sel0).forEach(t=>t.classList.remove('active'));
    const sel=document.querySelector(sel0+`[data-tab="${tab}"]`);
    if(sel) sel.classList.add('active');
    renderLibrary(containerId);
    moveTabInk(isProfile?'profileTabInk':'mainTabInk', sel0);
  }
  // 分类墨线：像毛笔一样移动到新的位置
  function moveTabInk(inkId, sel){
    const ink=$(inkId); if(!ink) return;
    const active=document.querySelector(sel+'.active');
    if(!active || !active.offsetParent){ return; }
    const parent=ink.parentElement; if(!parent) return;
    const pr=parent.getBoundingClientRect(), ar=active.getBoundingClientRect();
    ink.style.left=(ar.left-pr.left)+'px';
    ink.style.width=ar.width+'px';
  }

  // ========== 环境音（Web Audio 生成式，无需上传） ==========
  const AudioEngine=(function(){
    let ctx,master,reverb,windGain,windSrc,pluckTimer,enabled=true,currentScale='youxia';
    const SCALES={
      youxia:[196,220,261.63,293.66,329.63],
      shijia:[174.61,196,261.63,293.66,349.23],
      shuyuan:[196,261.63,293.66,329.63,392],
      yizhe:[220,261.63,293.66,329.63,392],
      qinshi:[261.63,293.66,329.63,392,440],
      jianke:[146.83,196,220,261.63,293.66],
      yinshi:[174.61,196,220,261.63,293.66]
    };
    function makeNoise(sec){ const len=Math.floor(ctx.sampleRate*sec); const b=ctx.createBuffer(1,len,ctx.sampleRate); const d=b.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; return b; }
    function makeImpulse(sec,decay){ const len=Math.floor(ctx.sampleRate*sec); const b=ctx.createBuffer(2,len,ctx.sampleRate); for(let c=0;c<2;c++){const d=b.getChannelData(c); for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);} return b; }
    function ensure(){
      if(ctx) return;
      const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      ctx=new AC();
      master=ctx.createGain(); master.gain.value=0; master.connect(ctx.destination);
      reverb=ctx.createConvolver(); reverb.buffer=makeImpulse(2.6,2.4);
      const rg=ctx.createGain(); rg.gain.value=0.5; reverb.connect(rg); rg.connect(master);
      windSrc=ctx.createBufferSource(); windSrc.buffer=makeNoise(4); windSrc.loop=true;
      const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=430;
      windGain=ctx.createGain(); windGain.gain.value=0.05;
      windSrc.connect(lp); lp.connect(windGain); windGain.connect(master);
      const lfo=ctx.createOscillator(); lfo.frequency.value=0.07; const lg=ctx.createGain(); lg.gain.value=0.035;
      lfo.connect(lg); lg.connect(windGain.gain); lfo.start(); windSrc.start();
    }
    function pluck(freq,when,gv){
      const o=ctx.createOscillator(); o.type='triangle'; o.frequency.value=freq;
      const o2=ctx.createOscillator(); o2.type='sine'; o2.frequency.value=freq*2.001;
      const g=ctx.createGain(); g.gain.setValueAtTime(0,when); g.gain.linearRampToValueAtTime(gv,when+0.01); g.gain.exponentialRampToValueAtTime(0.0001,when+2.6);
      const g2=ctx.createGain(); g2.gain.setValueAtTime(0,when); g2.gain.linearRampToValueAtTime(gv*0.3,when+0.01); g2.gain.exponentialRampToValueAtTime(0.0001,when+1.2);
      o.connect(g); g.connect(reverb); g.connect(master);
      o2.connect(g2); g2.connect(reverb); g2.connect(master);
      o.start(when); o.stop(when+2.7); o2.start(when); o2.stop(when+1.3);
    }
    function schedule(){
      if(!ctx||!enabled) return;
      const sc=SCALES[currentScale]||SCALES.youxia;
      pluck(sc[Math.floor(Math.random()*sc.length)], ctx.currentTime+0.05, 0.11);
      if(Math.random()<0.4) pluck(sc[Math.floor(Math.random()*sc.length)]*(Math.random()<0.5?1:0.5), ctx.currentTime+0.35, 0.05);
      pluckTimer=setTimeout(schedule, 2200+Math.random()*3600);
    }
    function start(){ ensure(); if(!ctx) return; if(ctx.state==='suspended') ctx.resume(); enabled=true; master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0.32, ctx.currentTime+2.5); if(!pluckTimer) schedule(); }
    function stop(){ enabled=false; if(ctx) master.gain.linearRampToValueAtTime(0, ctx.currentTime+1.2); if(pluckTimer){ clearTimeout(pluckTimer); pluckTimer=null; } }
    function toggle(){ if(enabled){ stop(); return false; } start(); return true; }
    function setIdentity(id){ if(SCALES[id]) currentScale=id; }
    function setWeather(w){ if(!ctx) return; const map={rain:0.11,snow:0.04,sunny:0.05,mist:0.07,cloudy:0.06,wind:0.10}; const t=map[w]; if(t!=null) windGain.gain.value=t; }
    return { start, stop, toggle, setIdentity, setWeather, isEnabled:()=>enabled };
  })();

  function firstGestureAudio(){
    if(state.soundOn) AudioEngine.start();
  }
  function toggleSound(){
    state.soundOn=AudioEngine.toggle();
    const icon=$('soundIcon'); if(icon) icon.textContent=state.soundOn?'音':'静';
    showToast(state.soundOn?'环境音已起':'环境音已静');
  }

  // ========== 水墨回应：七身份各异的抽象反馈（非人物、非大场景） ==========
  function inkResponse(id){
    const layer=$('inkFx'); if(!layer) return;
    const box=document.createElement('div'); box.className='inkfx';
    let html='';
    switch(id){
      case 'youxia': // 流动墨线，横向如风
        html='<i class="fx-wind" style="--t:34%"></i>'
           + '<i class="fx-wind" style="--t:50%;animation-delay:.12s"></i>'
           + '<i class="fx-wind" style="--t:66%;animation-delay:.24s"></i>';
        break;
      case 'shijia': // 规整对称的玉印结构
        html='<i class="fx-jade"></i>';
        break;
      case 'shuyuan': // 纸页墨线渐次出现
        html='<i class="fx-page" style="--t:38%"></i>'
           + '<i class="fx-page" style="--t:46%;animation-delay:.1s"></i>'
           + '<i class="fx-page" style="--t:54%;animation-delay:.2s"></i>'
           + '<i class="fx-page" style="--t:62%;animation-delay:.3s"></i>';
        break;
      case 'yizhe': // 柔和墨点扩散
        html='<i class="fx-dot" style="--x:36%;--y:44%"></i>'
           + '<i class="fx-dot" style="--x:54%;--y:38%"></i>'
           + '<i class="fx-dot" style="--x:64%;--y:54%;animation-delay:.12s"></i>'
           + '<i class="fx-dot" style="--x:44%;--y:60%;animation-delay:.18s"></i>'
           + '<i class="fx-dot" style="--x:58%;--y:50%"></i>';
        break;
      case 'qinshi': // 同心水波与弦线
        html='<i class="fx-ring"></i>'
           + '<i class="fx-ring" style="animation-delay:.14s"></i>'
           + '<i class="fx-ring" style="animation-delay:.3s"></i>';
        break;
      case 'jianke': // 短促锐利的光痕切线
        html='<i class="fx-cut" style="--t:44%"></i>'
           + '<i class="fx-cut" style="--t:53%;animation-delay:.08s"></i>';
        break;
      case 'yinshi': // 山影自雾中显现
        html='<i class="fx-mist"></i><i class="fx-ridge"></i>';
        break;
    }
    box.innerHTML=html;
    layer.appendChild(box);
    setTimeout(()=>box.remove(),1400);
  }

  // ========== 点击反馈（墨扩散 / 水波 / 印记 / 细线） ==========
  function fxAt(x,y,type){
    const layer=$('rippleLayer'); if(!layer) return;
    const s=document.createElement('span');
    s.className='fx-'+type;
    s.style.left=(x||window.innerWidth/2)+'px';
    s.style.top=(y||window.innerHeight/2)+'px';
    layer.appendChild(s);
    setTimeout(()=>s.remove(),900);
  }

  // ========== 水墨转场：墨滴落纸 → 铺开 → 自墨雾中显现 ==========
  function inkTransition(x, y, cb){
    const ov=$('inkTransition'); if(!ov){ cb&&cb(); return; }
    ov.style.setProperty('--ix',(x||window.innerWidth/2)+'px');
    ov.style.setProperty('--iy',(y||window.innerHeight/2)+'px');
    ov.classList.remove('lift');
    ov.classList.add('drop');
    setTimeout(()=>{
      cb&&cb();
      ov.classList.add('lift');
      setTimeout(()=>{ ov.classList.remove('drop','lift'); },640);
    },560);
  }
  function go(viewName){
    if(viewName===state.view) return;
    inkTransition(null,null,()=>switchView(viewName));
  }

  // ========== 落印（确认类操作） ==========
  function sealDrop(el){
    if(el){ el.classList.add('sealing'); setTimeout(()=>el.classList.remove('sealing'),700); }
    const layer=$('inkFx');
    if(layer&&el){
      const r=el.getBoundingClientRect();
      fxAt(r.left+r.width/2, r.top+r.height/2, 'seal');
    }
  }

  // ========== 统一点击反馈（墨色扩散 / 水波 / 印记 / 细线） ==========
  function attachClickFx(){
    // 点击反馈变体：按元素分化（seal 印记亮 / line 细线展开 / ink 墨扩散 / ripple 金涟漪）
    const FX={
      '.jx-btn':'seal', '.jx-confirm':'seal', '.jx-chapter':'seal',
      '.library-tab':'line', '.jx-link':'line',
      '.nav-item':'ink', '.history-item':'ink'
    };
    const SEL=Object.keys(FX).join(',');
    document.addEventListener('click',(e)=>{
      const el=e.target.closest(SEL); if(!el) return;
      let type='ink'; for(const sel in FX){ if(el.matches(sel)){ type=FX[sel]; break; } }
      fxAt(e.clientX, e.clientY, type);
    }, true);
  }

  // ========== 持久化 ==========
  function saveState(){
    if(!state.character) return;
    try{
      const toSave={ ...state.character };
      delete toSave.characterImage;
      if(toSave.persona){ const p={...toSave.persona}; delete p.image; toSave.persona=p; }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }catch(e){ console.warn('保存失败',e); }
  }
  function loadState(){
    try{
      const saved=localStorage.getItem(STORAGE_KEY); if(!saved) return false;
      const data=JSON.parse(saved); if(!data||!data.name) return false;
      if(!data.currentIdentityId) data.currentIdentityId='youxia';
      if(!data.experiencedIdentities) data.experiencedIdentities=[data.currentIdentityId];
      if(!data.identityStats){ data.identityStats={}; data.experiencedIdentities.forEach(id=>data.identityStats[id]=true); }
      if(!data.library) data.library={poetry:[],wisdom:[],martial:[]};
      if(!data.usedContent) data.usedContent={morning:[],qin:[],qi:[],shu:[],hua:[],wu:[],wisdom:[],events:[]};
      state.character=data; return true;
    }catch(e){ console.warn('加载失败',e); return false; }
  }

  // ========== 初始化 ==========
  function init(){
    bindParallax();
    attachClickFx();
    const account=loadAccount();
    if(account){
      state.account=account;
      if(loadState()){
        $('bottomNav').style.display='';
        const time=getTimeOfDay();
        updateScene(state.character.currentIdentityId, time.name, state.character.weather);
        switchView('home');
      } else {
        startGame(state.account.username);
      }
    } else {
      showAuth();
    }
    if($('authUsername')) $('authUsername').addEventListener('keydown',(e)=>{ if(e.key==='Enter') submitRegister(); });
    // 首次任意交互启动环境音
    const gesture=()=>{ firstGestureAudio(); window.removeEventListener('pointerdown',gesture); };
    window.addEventListener('pointerdown',gesture,{once:true});

    setInterval(()=>{
      if(state.character){
        const ns=getCurrentSeason();
        if(ns!==state.character.season){ state.character.season=ns; saveState(); updateScene(state.character.currentIdentityId, getTimeOfDay().name, state.character.weather); if(state.view==='home') renderHome(); }
      }
    },60000);

    // 载入淡入
    const veil=$('enterVeil'); if(veil) setTimeout(()=>veil.classList.add('gone'),300);

    // 分类墨线：布局变化 / 字体加载后重新对准
    const reInk=()=>requestAnimationFrame(()=>{
      moveTabInk('mainTabInk','.library-tab');
      moveTabInk('profileTabInk','.library-tab-profile');
    });
    window.addEventListener('resize', reInk);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(reInk);
  }

  return {
    init, showAuth, submitRegister,
    switchView, go, switchIdentity, selectIdentity,
    startCultivation, handleEventChoice, completeCultivation, pickStage,
    renderProfile, openPersonaModal, closePersonaModal, savePersona,
    switchLibraryTab, toggleSound
  };
};

const app=App();
document.addEventListener('DOMContentLoaded', app.init);
