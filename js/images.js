// ============================================================
// 江湖侠客成长模拟器 — 水墨插画库
// 每幅插画为内嵌 SVG，水墨风格，100% 可靠
// ============================================================

const JIANGHU_ILLUSTRATIONS = {

  // ========== 古琴 ==========
  guqin: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="gq-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
      <linearGradient id="gq-wood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#8b6914" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#6b4c3b" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#4a3528" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#gq-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q80,140 160,160 Q240,130 320,150 Q360,145 400,155 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.15"/>
    <!-- 案台 -->
    <rect x="40" y="160" width="320" height="12" fill="#6b4c3b" opacity="0.3" rx="2"/>
    <!-- 古琴 -->
    <ellipse cx="200" cy="130" rx="140" ry="22" fill="url(#gq-wood)" opacity="0.85"/>
    <ellipse cx="200" cy="128" rx="135" ry="18" fill="#5a3e2e" opacity="0.4"/>
    <!-- 琴弦 -->
    <line x1="70" y1="125" x2="330" y2="125" stroke="#2c1810" stroke-width="0.5" opacity="0.5"/>
    <line x1="70" y1="128" x2="330" y2="128" stroke="#2c1810" stroke-width="0.5" opacity="0.5"/>
    <line x1="70" y1="131" x2="330" y2="131" stroke="#2c1810" stroke-width="0.5" opacity="0.5"/>
    <line x1="70" y1="134" x2="330" y2="134" stroke="#2c1810" stroke-width="0.5" opacity="0.5"/>
    <line x1="70" y1="137" x2="330" y2="137" stroke="#2c1810" stroke-width="0.5" opacity="0.5"/>
    <line x1="70" y1="140" x2="330" y2="140" stroke="#2c1810" stroke-width="0.5" opacity="0.4"/>
    <line x1="70" y1="143" x2="330" y2="143" stroke="#2c1810" stroke-width="0.5" opacity="0.4"/>
    <!-- 琴徽（十三徽） -->
    <circle cx="100" cy="127" r="2" fill="#d4a017" opacity="0.6"/>
    <circle cx="140" cy="127" r="2" fill="#d4a017" opacity="0.6"/>
    <circle cx="180" cy="127" r="2.5" fill="#d4a017" opacity="0.7"/>
    <circle cx="220" cy="127" r="2" fill="#d4a017" opacity="0.6"/>
    <circle cx="260" cy="127" r="2" fill="#d4a017" opacity="0.6"/>
    <circle cx="300" cy="127" r="2.5" fill="#d4a017" opacity="0.7"/>
    <!-- 手指拨弦 -->
    <ellipse cx="210" cy="115" rx="6" ry="10" fill="#4a3528" opacity="0.3"/>
    <!-- 香炉 -->
    <circle cx="80" cy="148" r="8" fill="#6b4c3b" opacity="0.3"/>
    <path d="M76,142 Q78,132 80,135 Q82,128 84,138" stroke="#6b5544" stroke-width="1" fill="none" opacity="0.3"/>
    <!-- 印章 -->
    <rect x="340" y="140" width="20" height="20" fill="#9c3a2a" opacity="0.3" rx="1"/>
    <text x="350" y="153" font-size="8" fill="#f4ecd8" text-anchor="middle" opacity="0.6">琴</text>
  </svg>`,

  // ========== 围棋 ==========
  weiqi: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="wq-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#wq-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 棋盘 -->
    <g transform="translate(80, 40)">
      <rect x="0" y="0" width="240" height="140" fill="#e8c886" opacity="0.25" rx="2"/>
      <!-- 棋盘线 -->
      <g stroke="#2c1810" stroke-width="0.5" opacity="0.4">
        <line x1="20" y1="10" x2="220" y2="10"/>
        <line x1="20" y1="25" x2="220" y2="25"/>
        <line x1="20" y1="40" x2="220" y2="40"/>
        <line x1="20" y1="55" x2="220" y2="55"/>
        <line x1="20" y1="70" x2="220" y2="70"/>
        <line x1="20" y1="85" x2="220" y2="85"/>
        <line x1="20" y1="100" x2="220" y2="100"/>
        <line x1="20" y1="115" x2="220" y2="115"/>
        <line x1="20" y1="130" x2="220" y2="130"/>
        <line x1="20" y1="10" x2="20" y2="130"/>
        <line x1="42" y1="10" x2="42" y2="130"/>
        <line x1="64" y1="10" x2="64" y2="130"/>
        <line x1="86" y1="10" x2="86" y2="130"/>
        <line x1="108" y1="10" x2="108" y2="130"/>
        <line x1="130" y1="10" x2="130" y2="130"/>
        <line x1="152" y1="10" x2="152" y2="130"/>
        <line x1="174" y1="10" x2="174" y2="130"/>
        <line x1="196" y1="10" x2="196" y2="130"/>
        <line x1="218" y1="10" x2="218" y2="130"/>
      </g>
      <!-- 星位 -->
      <circle cx="64" cy="40" r="2" fill="#2c1810" opacity="0.5"/>
      <circle cx="130" cy="40" r="2" fill="#2c1810" opacity="0.5"/>
      <circle cx="196" cy="40" r="2" fill="#2c1810" opacity="0.5"/>
      <circle cx="64" cy="100" r="2" fill="#2c1810" opacity="0.5"/>
      <circle cx="130" cy="100" r="2" fill="#2c1810" opacity="0.5"/>
      <circle cx="196" cy="100" r="2" fill="#2c1810" opacity="0.5"/>
      <!-- 黑子 -->
      <circle cx="86" cy="55" r="7" fill="#1a1a1a" opacity="0.85"/>
      <circle cx="108" cy="70" r="7" fill="#1a1a1a" opacity="0.85"/>
      <circle cx="130" cy="55" r="7" fill="#1a1a1a" opacity="0.85"/>
      <circle cx="86" cy="85" r="7" fill="#1a1a1a" opacity="0.85"/>
      <circle cx="152" cy="85" r="7" fill="#1a1a1a" opacity="0.85"/>
      <!-- 白子 -->
      <circle cx="108" cy="55" r="7" fill="#f4ecd8" stroke="#6b5544" stroke-width="0.5" opacity="0.9"/>
      <circle cx="130" cy="70" r="7" fill="#f4ecd8" stroke="#6b5544" stroke-width="0.5" opacity="0.9"/>
      <circle cx="152" cy="70" r="7" fill="#f4ecd8" stroke="#6b5544" stroke-width="0.5" opacity="0.9"/>
      <circle cx="108" cy="85" r="7" fill="#f4ecd8" stroke="#6b5544" stroke-width="0.5" opacity="0.9"/>
      <circle cx="174" cy="70" r="7" fill="#f4ecd8" stroke="#6b5544" stroke-width="0.5" opacity="0.9"/>
    </g>
    <!-- 茶盏 -->
    <ellipse cx="340" cy="160" rx="14" ry="6" fill="#6b4c3b" opacity="0.3"/>
    <ellipse cx="340" cy="157" rx="12" ry="4" fill="#4a3528" opacity="0.2"/>
    <!-- 印章 -->
    <rect x="50" y="170" width="18" height="18" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 书法 ==========
  calligraphy: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sh-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#sh-bg)"/>
    <!-- 宣纸卷轴 -->
    <rect x="60" y="30" width="280" height="160" fill="#faf4e8" opacity="0.5" rx="2"/>
    <rect x="56" y="28" width="8" height="164" fill="#6b4c3b" opacity="0.4" rx="2"/>
    <rect x="336" y="28" width="8" height="164" fill="#6b4c3b" opacity="0.4" rx="2"/>
    <rect x="52" y="26" width="12" height="6" fill="#b8860b" opacity="0.3" rx="1"/>
    <rect x="336" y="26" width="12" height="6" fill="#b8860b" opacity="0.3" rx="1"/>
    <!-- 书法字迹 -->
    <g fill="#2c1810" opacity="0.55" font-family="serif">
      <text x="100" y="70" font-size="28" font-weight="bold">永</text>
      <text x="140" y="70" font-size="28" font-weight="bold">和</text>
      <text x="180" y="70" font-size="28" font-weight="bold">九</text>
      <text x="220" y="70" font-size="28" font-weight="bold">年</text>
      <text x="260" y="70" font-size="28" font-weight="bold">岁</text>
      <text x="300" y="70" font-size="28" font-weight="bold">在</text>
      <text x="100" y="110" font-size="28" font-weight="bold">癸</text>
      <text x="140" y="110" font-size="28" font-weight="bold">丑</text>
      <text x="180" y="110" font-size="28" font-weight="bold">暮</text>
      <text x="220" y="110" font-size="28" font-weight="bold">春</text>
      <text x="260" y="110" font-size="28" font-weight="bold">之</text>
      <text x="300" y="110" font-size="28" font-weight="bold">初</text>
      <text x="120" y="150" font-size="22">会于会稽山阴之兰亭</text>
      <text x="120" y="175" font-size="16" opacity="0.7">修禊事也</text>
    </g>
    <!-- 毛笔 -->
    <g transform="translate(330, 120) rotate(-30)">
      <rect x="0" y="0" width="4" height="50" fill="#4a3528" opacity="0.6" rx="1"/>
      <ellipse cx="2" cy="-2" rx="3" ry="12" fill="#2c1810" opacity="0.7"/>
    </g>
    <!-- 砚台 -->
    <ellipse cx="80" cy="170" rx="20" ry="8" fill="#2c1810" opacity="0.2"/>
    <ellipse cx="80" cy="167" rx="16" ry="5" fill="#1a1a1a" opacity="0.3"/>
    <!-- 印章 -->
    <rect x="290" y="155" width="16" height="16" fill="#9c3a2a" opacity="0.35" rx="1"/>
  </svg>`,

  // ========== 山水画 ==========
  landscape: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ls-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#ls-sky)"/>
    <!-- 远山层 -->
    <path d="M0,160 Q50,100 120,130 Q180,80 250,120 Q320,90 400,120 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 中山层 -->
    <path d="M0,180 Q80,130 160,155 Q230,110 310,145 Q360,140 400,155 L400,220 L0,220 Z" fill="#6b7b5a" opacity="0.2"/>
    <!-- 近山层 -->
    <path d="M0,200 Q100,160 200,180 Q300,165 400,185 L400,220 L0,220 Z" fill="#4a5a3a" opacity="0.25"/>
    <!-- 主峰 -->
    <path d="M100,200 L120,120 L140,80 L160,100 L180,70 L200,110 L220,200 Z" fill="#4a5a3a" opacity="0.3"/>
    <path d="M120,120 L140,80 L160,100 L180,70 L200,110" stroke="#2c1810" stroke-width="0.5" fill="none" opacity="0.2"/>
    <!-- 飞瀑 -->
    <path d="M155,85 Q158,120 160,160 Q162,180 160,195" stroke="#a0b8c8" stroke-width="2" fill="none" opacity="0.4"/>
    <path d="M155,85 Q158,120 160,160 Q162,180 160,195" stroke="#f4ecd8" stroke-width="1" fill="none" opacity="0.3"/>
    <!-- 小桥 -->
    <path d="M60,190 Q80,175 100,190" stroke="#6b4c3b" stroke-width="2" fill="none" opacity="0.3"/>
    <!-- 行旅小人 -->
    <g transform="translate(240, 185)">
      <ellipse cx="0" cy="-8" rx="3" ry="4" fill="#2c1810" opacity="0.3"/>
      <path d="M-2,-4 L-3,8 L3,8 L2,-4 Z" fill="#2c1810" opacity="0.25"/>
    </g>
    <g transform="translate(260, 188)">
      <ellipse cx="0" cy="-6" rx="2.5" ry="3" fill="#2c1810" opacity="0.25"/>
      <path d="M-1.5,-3 L-2,6 L2,6 L1.5,-3 Z" fill="#2c1810" opacity="0.2"/>
    </g>
    <!-- 松树 -->
    <g transform="translate(50, 170)">
      <path d="M0,30 L2,0 L4,30 Z" fill="#4a3528" opacity="0.3"/>
      <ellipse cx="2" cy="-2" rx="8" ry="4" fill="#4a6b3a" opacity="0.25"/>
    </g>
    <!-- 题款 -->
    <g transform="translate(340, 30)">
      <text x="0" y="0" font-size="10" fill="#2c1810" opacity="0.3" font-family="serif">溪山</text>
      <text x="0" y="14" font-size="10" fill="#2c1810" opacity="0.3" font-family="serif">行旅</text>
    </g>
    <!-- 印章 -->
    <rect x="340" y="50" width="14" height="14" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 太极 ==========
  taiji: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tj-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#tj-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 太极图 -->
    <g transform="translate(200, 110)">
      <circle cx="0" cy="0" r="50" fill="#f4ecd8" stroke="#2c1810" stroke-width="1.5" opacity="0.5"/>
      <path d="M0,-50 A50,50 0 0,1 0,50 A25,25 0 0,1 0,0 A25,25 0 0,0 0,-50 Z" fill="#2c1810" opacity="0.5"/>
      <circle cx="0" cy="-25" r="6" fill="#f4ecd8" opacity="0.6"/>
      <circle cx="0" cy="25" r="6" fill="#2c1810" opacity="0.6"/>
    </g>
    <!-- 人物剪影 -->
    <g transform="translate(200, 150)">
      <ellipse cx="0" cy="-50" rx="8" ry="10" fill="#4a3528" opacity="0.25"/>
      <path d="M-12,-40 Q-12,-42 0,-44 Q12,-42 12,-40 L16,10 Q0,15 -16,10 Z" fill="#4a3528" opacity="0.2"/>
      <!-- 手臂划圆 -->
      <path d="M-12,-35 Q-40,-25 -35,5 Q-30,15 -20,10" stroke="#4a3528" stroke-width="3" fill="none" opacity="0.2"/>
      <path d="M12,-35 Q40,-25 35,5 Q30,15 20,10" stroke="#4a3528" stroke-width="3" fill="none" opacity="0.2"/>
    </g>
    <!-- 气韵线 -->
    <path d="M130,100 Q160,80 190,95 Q220,70 250,85" stroke="#b8860b" stroke-width="1" fill="none" opacity="0.2"/>
    <path d="M150,130 Q180,110 210,125 Q240,100 270,115" stroke="#b8860b" stroke-width="1" fill="none" opacity="0.15"/>
    <!-- 印章 -->
    <rect x="340" y="170" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
    <text x="348" y="182" font-size="8" fill="#f4ecd8" text-anchor="middle" opacity="0.5">道</text>
  </svg>`,

  // ========== 剑术 ==========
  sword: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sw-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
      <linearGradient id="sw-blade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c0c0c0" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#e8e8e8" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#a0a0a0" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#sw-bg)"/>
    <!-- 月亮 -->
    <circle cx="80" cy="50" r="20" fill="#f4ecd8" opacity="0.3"/>
    <circle cx="80" cy="50" r="20" fill="#e8dcc0" opacity="0.2"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 人物 -->
    <g transform="translate(180, 100)">
      <ellipse cx="0" cy="-55" rx="7" ry="9" fill="#4a3528" opacity="0.25"/>
      <path d="M-10,-45 Q-10,-48 0,-50 Q10,-48 10,-45 L14,10 Q0,15 -14,10 Z" fill="#4a3528" opacity="0.2"/>
      <!-- 持剑手臂 -->
      <path d="M10,-40 L40,-60" stroke="#4a3528" stroke-width="3" opacity="0.2"/>
      <!-- 剑 -->
      <line x1="40" y1="-60" x2="90" y2="-110" stroke="url(#sw-blade)" stroke-width="3"/>
      <rect x="36" y="-58" width="8" height="6" fill="#b8860b" opacity="0.4" rx="1"/>
      <!-- 另一只手 -->
      <path d="M-10,-40 L-30,-20" stroke="#4a3528" stroke-width="3" opacity="0.2"/>
    </g>
    <!-- 剑气 -->
    <path d="M270,-10 Q290,20 310,50" stroke="#c0c0c0" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="5,3"/>
    <path d="M275,0 Q295,30 315,60" stroke="#e8e8e8" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="5,3"/>
    <!-- 飘落竹叶 -->
    <path d="M300,30 Q305,35 310,32" stroke="#4a6b3a" stroke-width="1" fill="none" opacity="0.25"/>
    <path d="M320,60 Q325,65 330,62" stroke="#4a6b3a" stroke-width="1" fill="none" opacity="0.2"/>
    <!-- 印章 -->
    <rect x="340" y="170" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 打坐 ==========
  meditation: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="md-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#md-bg)"/>
    <!-- 朝阳 -->
    <circle cx="200" cy="60" r="25" fill="#d4a017" opacity="0.15"/>
    <circle cx="200" cy="60" r="18" fill="#b8860b" opacity="0.1"/>
    <!-- 远山 -->
    <path d="M0,160 Q80,120 160,145 Q240,110 320,135 Q360,130 400,145 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#6b7b5a" opacity="0.15"/>
    <!-- 青石 -->
    <ellipse cx="200" cy="170" rx="40" ry="12" fill="#6b5544" opacity="0.2"/>
    <ellipse cx="200" cy="165" rx="35" ry="8" fill="#4a3528" opacity="0.15"/>
    <!-- 人物打坐 -->
    <g transform="translate(200, 130)">
      <!-- 头部 -->
      <ellipse cx="0" cy="-30" rx="9" ry="11" fill="#4a3528" opacity="0.25"/>
      <!-- 发髻 -->
      <ellipse cx="0" cy="-42" rx="6" ry="4" fill="#4a3528" opacity="0.2"/>
      <!-- 身体 -->
      <path d="M-18,-20 Q-18,-22 0,-24 Q18,-22 18,-20 L22,20 Q0,25 -22,20 Z" fill="#4a3528" opacity="0.2"/>
      <!-- 盘腿 -->
      <ellipse cx="0" cy="22" rx="26" ry="8" fill="#4a3528" opacity="0.15"/>
      <!-- 手结印 -->
      <ellipse cx="0" cy="-5" rx="8" ry="4" fill="#4a3528" opacity="0.15"/>
    </g>
    <!-- 气韵 -->
    <ellipse cx="200" cy="130" rx="50" ry="65" fill="none" stroke="#b8860b" stroke-width="0.5" opacity="0.1" stroke-dasharray="3,3"/>
    <ellipse cx="200" cy="130" rx="65" ry="80" fill="none" stroke="#b8860b" stroke-width="0.5" opacity="0.06" stroke-dasharray="3,3"/>
    <!-- 薄雾 -->
    <ellipse cx="100" cy="180" rx="80" ry="6" fill="white" opacity="0.08"/>
    <ellipse cx="300" cy="185" rx="80" ry="6" fill="white" opacity="0.08"/>
    <!-- 印章 -->
    <rect x="340" y="170" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 读书 ==========
  reading: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="rd-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#rd-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 书案 -->
    <rect x="80" y="140" width="240" height="12" fill="#6b4c3b" opacity="0.25" rx="2"/>
    <!-- 古书卷 -->
    <g transform="translate(120, 100)">
      <rect x="0" y="0" width="160" height="40" fill="#faf4e8" opacity="0.5" rx="2"/>
      <rect x="-4" y="-2" width="6" height="44" fill="#6b4c3b" opacity="0.3" rx="1"/>
      <rect x="158" y="-2" width="6" height="44" fill="#6b4c3b" opacity="0.3" rx="1"/>
      <!-- 文字 -->
      <g fill="#2c1810" opacity="0.35" font-family="serif" font-size="12">
        <text x="15" y="16">子曰学而时习之</text>
        <text x="15" y="32">不亦说乎有朋自</text>
      </g>
    </g>
    <!-- 人物 -->
    <g transform="translate(200, 80)">
      <ellipse cx="0" cy="0" rx="8" ry="10" fill="#4a3528" opacity="0.2"/>
      <path d="M-10,10 Q-10,8 0,6 Q10,8 10,10 L14,50 Q0,55 -14,50 Z" fill="#4a3528" opacity="0.15"/>
    </g>
    <!-- 茶盏 -->
    <ellipse cx="260" cy="138" rx="10" ry="4" fill="#6b4c3b" opacity="0.25"/>
    <ellipse cx="260" cy="136" rx="8" ry="3" fill="#4a3528" opacity="0.15"/>
    <!-- 香炉 -->
    <circle cx="100" cy="135" r="8" fill="#6b4c3b" opacity="0.25"/>
    <path d="M97,128 Q99,120 101,124 Q103,116 105,126" stroke="#6b5544" stroke-width="1" fill="none" opacity="0.25"/>
    <!-- 竹影 -->
    <g transform="translate(30, 60)" opacity="0.15">
      <rect x="0" y="0" width="3" height="120" fill="#4a6b3a"/>
      <rect x="8" y="-10" width="3" height="130" fill="#4a6b3a"/>
      <path d="M2,20 Q-5,15 -8,20" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,50 Q8,45 12,50" stroke="#4a6b3a" stroke-width="1" fill="none"/>
    </g>
    <!-- 印章 -->
    <rect x="340" y="170" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 观天地 ==========
  observe: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ob-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#e8d0a0" stop-opacity="0.4"/>
        <stop offset="60%" stop-color="#f4ecd8" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
    <rect width="400" height="220" fill="url(#ob-sky)"/>
    <!-- 日出 -->
    <circle cx="200" cy="80" r="30" fill="#d4a017" opacity="0.2"/>
    <circle cx="200" cy="80" r="22" fill="#b8860b" opacity="0.15"/>
    <circle cx="200" cy="80" r="15" fill="#9c4a2a" opacity="0.1"/>
    <!-- 云海 -->
    <ellipse cx="100" cy="120" rx="80" ry="8" fill="white" opacity="0.15"/>
    <ellipse cx="200" cy="125" rx="100" ry="10" fill="white" opacity="0.12"/>
    <ellipse cx="320" cy="120" rx="80" ry="8" fill="white" opacity="0.15"/>
    <!-- 远山从云中出 -->
    <path d="M80,120 L120,90 L140,100 L180,70 L220,110" fill="#8a9a7a" opacity="0.15"/>
    <path d="M220,110 L260,85 L300,100 L340,95 L360,120" fill="#8a9a7a" opacity="0.12"/>
    <!-- 人物立于山巅 -->
    <g transform="translate(200, 130)">
      <ellipse cx="0" cy="-15" rx="5" ry="7" fill="#4a3528" opacity="0.25"/>
      <path d="M-8,-8 Q-8,-10 0,-12 Q8,-10 8,-8 L12,20 Q0,25 -12,20 Z" fill="#4a3528" opacity="0.2"/>
      <!-- 衣袖飘 -->
      <path d="M-8,-5 Q-20,5 -25,20" stroke="#4a3528" stroke-width="2" fill="none" opacity="0.15"/>
      <path d="M8,-5 Q20,5 25,20" stroke="#4a3528" stroke-width="2" fill="none" opacity="0.15"/>
    </g>
    <!-- 下方山体 -->
    <path d="M0,150 Q100,130 200,145 Q300,125 400,145 L400,220 L0,220 Z" fill="#6b7b5a" opacity="0.15"/>
    <path d="M0,180 Q100,160 200,175 Q300,155 400,175 L400,220 L0,220 Z" fill="#4a5a3a" opacity="0.2"/>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 竹林 ==========
  bamboo: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bm-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#bm-bg)"/>
    <!-- 竹竿 -->
    <g opacity="0.25">
      <rect x="60" y="10" width="6" height="200" fill="#4a6b3a" rx="2"/>
      <rect x="120" y="20" width="5" height="190" fill="#5a7b4a" rx="2"/>
      <rect x="180" y="5" width="7" height="205" fill="#4a6b3a" rx="2"/>
      <rect x="250" y="15" width="5" height="195" fill="#5a7b4a" rx="2"/>
      <rect x="310" y="10" width="6" height="200" fill="#4a6b3a" rx="2"/>
      <!-- 竹节 -->
      <line x1="60" y1="50" x2="66" y2="50" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="60" y1="100" x2="66" y2="100" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="60" y1="150" x2="66" y2="150" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="120" y1="60" x2="125" y2="60" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="120" y1="110" x2="125" y2="110" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="180" y1="45" x2="187" y2="45" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="180" y1="95" x2="187" y2="95" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
      <line x1="180" y1="145" x2="187" y2="145" stroke="#2c1810" stroke-width="1" opacity="0.5"/>
    </g>
    <!-- 竹叶 -->
    <g opacity="0.2">
      <path d="M63,30 Q40,25 30,35 Q40,35 63,40" fill="#4a6b3a"/>
      <path d="M63,80 Q85,75 95,85 Q85,85 63,90" fill="#4a6b3a"/>
      <path d="M183,25 Q200,20 215,30 Q200,30 183,35" fill="#5a7b4a"/>
      <path d="M183,75 Q160,70 150,80 Q160,80 183,85" fill="#5a7b4a"/>
      <path d="M313,35 Q330,30 345,40 Q330,40 313,45" fill="#4a6b3a"/>
      <path d="M313,85 Q290,80 280,90 Q290,90 313,95" fill="#4a6b3a"/>
    </g>
    <!-- 人物穿行 -->
    <g transform="translate(220, 140)" opacity="0.2">
      <ellipse cx="0" cy="-20" rx="6" ry="8" fill="#4a3528"/>
      <path d="M-8,-12 Q-8,-14 0,-16 Q8,-14 8,-12 L12,25 Q0,30 -12,25 Z" fill="#4a3528"/>
    </g>
    <!-- 地面落叶 -->
    <ellipse cx="100" cy="200" rx="60" ry="5" fill="#4a3528" opacity="0.08"/>
    <ellipse cx="300" cy="205" rx="60" ry="5" fill="#4a3528" opacity="0.08"/>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.25" rx="1"/>
  </svg>`,

  // ========== 客栈 ==========
  inn: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="in-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#e8c886" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#in-bg)"/>
    <!-- 远山 -->
    <path d="M0,100 Q80,80 160,90 Q240,70 320,85 Q360,82 400,90 L400,120 L0,120 Z" fill="#8a9a7a" opacity="0.1"/>
    <!-- 客栈屋顶 -->
    <path d="M80,100 L100,60 L300,60 L320,100 Z" fill="#6b4c3b" opacity="0.25"/>
    <path d="M90,100 L100,65 L300,65 L310,100 Z" fill="#4a3528" opacity="0.2"/>
    <!-- 屋檐 -->
    <path d="M70,100 L80,95 L320,95 L330,100 Z" fill="#4a3528" opacity="0.3"/>
    <!-- 柱子 -->
    <rect x="90" y="100" width="8" height="80" fill="#6b4c3b" opacity="0.25"/>
    <rect x="302" y="100" width="8" height="80" fill="#6b4c3b" opacity="0.25"/>
    <!-- 墙 -->
    <rect x="98" y="100" width="204" height="80" fill="#e8c886" opacity="0.15"/>
    <!-- 灯笼 -->
    <g transform="translate(120, 75)">
      <line x1="0" y1="-15" x2="0" y2="0" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <ellipse cx="0" cy="5" rx="8" ry="10" fill="#c14a35" opacity="0.3"/>
      <ellipse cx="0" cy="5" rx="6" ry="8" fill="#d4a017" opacity="0.2"/>
    </g>
    <g transform="translate(280, 75)">
      <line x1="0" y1="-15" x2="0" y2="0" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <ellipse cx="0" cy="5" rx="8" ry="10" fill="#c14a35" opacity="0.3"/>
      <ellipse cx="0" cy="5" rx="6" ry="8" fill="#d4a017" opacity="0.2"/>
    </g>
    <!-- 门 -->
    <rect x="170" y="120" width="60" height="60" fill="#4a3528" opacity="0.3" rx="2"/>
    <line x1="200" y1="120" x2="200" y2="180" stroke="#2c1810" stroke-width="0.5" opacity="0.3"/>
    <!-- 招牌 -->
    <rect x="160" y="50" width="80" height="20" fill="#6b4c3b" opacity="0.3" rx="2"/>
    <text x="200" y="64" font-size="10" fill="#f4ecd8" text-anchor="middle" opacity="0.5" font-family="serif">悦来客栈</text>
    <!-- 地面 -->
    <rect x="0" y="180" width="400" height="40" fill="#6b5544" opacity="0.08"/>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`,

  // ========== 月夜 ==========
  moonNight: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mn-bg" cx="70%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#2c3050" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#f4ecd8" stop-opacity="0.3"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#mn-bg)"/>
    <!-- 明月 -->
    <circle cx="300" cy="50" r="28" fill="#f4ecd8" opacity="0.4"/>
    <circle cx="300" cy="50" r="25" fill="#faf4e8" opacity="0.3"/>
    <circle cx="295" cy="45" r="3" fill="#e8dcc0" opacity="0.2"/>
    <circle cx="308" cy="55" r="2" fill="#e8dcc0" opacity="0.15"/>
    <!-- 月晕 -->
    <circle cx="300" cy="50" r="40" fill="none" stroke="#f4ecd8" stroke-width="0.5" opacity="0.1"/>
    <circle cx="300" cy="50" r="50" fill="none" stroke="#f4ecd8" stroke-width="0.5" opacity="0.06"/>
    <!-- 远山 -->
    <path d="M0,140 Q80,110 160,130 Q240,100 320,120 Q360,115 400,130 L400,220 L0,220 Z" fill="#4a3528" opacity="0.15"/>
    <!-- 庭院 -->
    <rect x="0" y="170" width="400" height="50" fill="#4a3528" opacity="0.08"/>
    <!-- 庭院灯笼 -->
    <g transform="translate(80, 100)">
      <line x1="0" y1="0" x2="0" y2="20" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <ellipse cx="0" cy="30" rx="8" ry="12" fill="#d4a017" opacity="0.3"/>
      <ellipse cx="0" cy="30" rx="6" ry="9" fill="#c14a35" opacity="0.2"/>
    </g>
    <g transform="translate(200, 105)">
      <line x1="0" y1="0" x2="0" y2="15" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <ellipse cx="0" cy="25" rx="7" ry="10" fill="#d4a017" opacity="0.25"/>
    </g>
    <!-- 人物 -->
    <g transform="translate(150, 130)" opacity="0.2">
      <ellipse cx="0" cy="-15" rx="6" ry="8" fill="#2c1810"/>
      <path d="M-8,-7 Q-8,-9 0,-11 Q8,-9 8,-7 L12,30 Q0,35 -12,30 Z" fill="#2c1810"/>
    </g>
    <!-- 树影 -->
    <g transform="translate(340, 80)" opacity="0.2">
      <path d="M0,90 L2,20 L4,90 Z" fill="#2c1810"/>
      <ellipse cx="2" cy="18" rx="15" ry="8" fill="#2c1810"/>
      <ellipse cx="-5" cy="30" rx="8" ry="5" fill="#2c1810" opacity="0.7"/>
      <ellipse cx="10" cy="35" rx="8" ry="5" fill="#2c1810" opacity="0.7"/>
    </g>
    <!-- 星星 -->
    <circle cx="80" cy="30" r="1" fill="#f4ecd8" opacity="0.4"/>
    <circle cx="120" cy="50" r="0.8" fill="#f4ecd8" opacity="0.3"/>
    <circle cx="200" cy="25" r="1" fill="#f4ecd8" opacity="0.4"/>
    <circle cx="250" cy="40" r="0.8" fill="#f4ecd8" opacity="0.3"/>
    <circle cx="350" cy="80" r="0.8" fill="#f4ecd8" opacity="0.3"/>
  </svg>`,

  // ========== 古寺 ==========
  temple: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tp-bg" cx="50%" cy="60%" r="60%">
        <stop offset="0%" stop-color="#e8dcc0" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#d8c8a8" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#tp-bg)"/>
    <!-- 雾气 -->
    <ellipse cx="200" cy="100" rx="200" ry="12" fill="white" opacity="0.15"/>
    <ellipse cx="100" cy="120" rx="120" ry="8" fill="white" opacity="0.12"/>
    <!-- 远山 -->
    <path d="M0,100 Q80,70 160,85 Q240,60 320,75 Q360,72 400,85 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.1"/>
    <!-- 寺庙屋顶 -->
    <path d="M120,100 L140,70 L260,70 L280,100 Z" fill="#6b4c3b" opacity="0.2"/>
    <path d="M110,100 L120,95 L280,95 L290,100 Z" fill="#4a3528" opacity="0.25"/>
    <!-- 屋檐翘角 -->
    <path d="M110,100 Q100,95 95,100" stroke="#4a3528" stroke-width="1.5" fill="none" opacity="0.25"/>
    <path d="M290,100 Q300,95 305,100" stroke="#4a3528" stroke-width="1.5" fill="none" opacity="0.25"/>
    <!-- 墙体 -->
    <rect x="120" y="100" width="160" height="70" fill="#d8c8a8" opacity="0.2"/>
    <!-- 柱子 -->
    <rect x="125" y="100" width="6" height="70" fill="#6b4c3b" opacity="0.2"/>
    <rect x="269" y="100" width="6" height="70" fill="#6b4c3b" opacity="0.2"/>
    <!-- 门 -->
    <rect x="180" y="115" width="40" height="55" fill="#4a3528" opacity="0.3" rx="1"/>
    <circle cx="188" cy="145" r="2" fill="#b8860b" opacity="0.3"/>
    <circle cx="212" cy="145" r="2" fill="#b8860b" opacity="0.3"/>
    <!-- 油灯 -->
    <g transform="translate(140, 110)">
      <line x1="0" y1="0" x2="0" y2="-5" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <circle cx="0" cy="3" r="4" fill="#d4a017" opacity="0.3"/>
    </g>
    <g transform="translate(260, 110)">
      <line x1="0" y1="0" x2="0" y2="-5" stroke="#6b4c3b" stroke-width="1" opacity="0.3"/>
      <circle cx="0" cy="3" r="4" fill="#d4a017" opacity="0.3"/>
    </g>
    <!-- 台阶 -->
    <path d="M100,170 L300,170 L290,180 L110,180 Z" fill="#6b5544" opacity="0.15"/>
    <path d="M110,180 L290,180 L280,190 L120,190 Z" fill="#6b5544" opacity="0.12"/>
    <!-- 地面荒草 -->
    <g transform="translate(60, 185)" opacity="0.2">
      <path d="M0,0 Q2,-5 0,-10" stroke="#4a6b3a" stroke-width="0.8" fill="none"/>
      <path d="M5,0 Q7,-3 5,-8" stroke="#4a6b3a" stroke-width="0.8" fill="none"/>
    </g>
    <g transform="translate(330, 185)" opacity="0.2">
      <path d="M0,0 Q2,-5 0,-10" stroke="#4a6b3a" stroke-width="0.8" fill="none"/>
      <path d="M5,0 Q7,-3 5,-8" stroke="#4a6b3a" stroke-width="0.8" fill="none"/>
    </g>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`,

  // ========== 溪流 ==========
  stream: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="st-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#st-bg)"/>
    <!-- 山 -->
    <path d="M0,120 Q50,80 100,100 Q140,70 180,90" fill="#8a9a7a" opacity="0.12"/>
    <path d="M220,90 Q260,70 300,95 Q340,75 400,100 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.1"/>
    <!-- 溪流 -->
    <path d="M150,110 Q160,130 155,150 Q150,170 160,190 Q170,200 160,220" stroke="#a0b8c8" stroke-width="8" fill="none" opacity="0.15"/>
    <path d="M150,110 Q160,130 155,150 Q150,170 160,190 Q170,200 160,220" stroke="#c8d8e0" stroke-width="4" fill="none" opacity="0.1"/>
    <!-- 溪边石头 -->
    <ellipse cx="130" cy="150" rx="15" ry="8" fill="#6b5544" opacity="0.2"/>
    <ellipse cx="130" cy="148" rx="12" ry="5" fill="#4a3528" opacity="0.15"/>
    <ellipse cx="180" cy="170" rx="12" ry="7" fill="#6b5544" opacity="0.2"/>
    <ellipse cx="175" cy="195" rx="10" ry="6" fill="#6b5544" opacity="0.15"/>
    <!-- 水纹 -->
    <ellipse cx="155" cy="130" rx="8" ry="2" fill="none" stroke="#a0b8c8" stroke-width="0.5" opacity="0.2"/>
    <ellipse cx="158" cy="145" rx="6" ry="1.5" fill="none" stroke="#a0b8c8" stroke-width="0.5" opacity="0.15"/>
    <ellipse cx="162" cy="165" rx="7" ry="2" fill="none" stroke="#a0b8c8" stroke-width="0.5" opacity="0.2"/>
    <!-- 柳树 -->
    <g transform="translate(80, 80)" opacity="0.2">
      <path d="M0,40 L2,0 L4,40 Z" fill="#4a3528"/>
      <path d="M2,0 Q-5,10 -10,25" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,0 Q5,10 10,25" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,0 Q-8,15 -15,35" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,0 Q8,15 15,35" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,0 Q0,20 -5,40" stroke="#4a6b3a" stroke-width="1" fill="none"/>
      <path d="M2,0 Q4,20 9,40" stroke="#4a6b3a" stroke-width="1" fill="none"/>
    </g>
    <!-- 草地 -->
    <ellipse cx="100" cy="200" rx="80" ry="8" fill="#4a6b3a" opacity="0.08"/>
    <ellipse cx="300" cy="200" rx="80" ry="8" fill="#4a6b3a" opacity="0.08"/>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`,

  // ========== 药草 ==========
  herb: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="hb-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#hb-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <!-- 药篓 -->
    <g transform="translate(100, 100)">
      <ellipse cx="0" cy="40" rx="30" ry="8" fill="#6b4c3b" opacity="0.2"/>
      <path d="M-30,40 Q-30,10 0,5 Q30,10 30,40 Z" fill="#e8c886" opacity="0.25"/>
      <path d="M-28,40 Q-28,12 0,7 Q28,12 28,40 Z" fill="#d8b876" opacity="0.2"/>
      <!-- 编织纹 -->
      <g stroke="#6b4c3b" stroke-width="0.5" opacity="0.15" fill="none">
        <path d="M-25,15 Q0,10 25,15"/>
        <path d="M-27,25 Q0,20 27,25"/>
        <path d="M-28,35 Q0,30 28,35"/>
        <line x1="-15" y1="5" x2="-15" y2="40"/>
        <line x1="0" y1="3" x2="0" y2="40"/>
        <line x1="15" y1="5" x2="15" y2="40"/>
      </g>
      <!-- 药草露出 -->
      <path d="M-10,5 Q-8,-15 -5,-5" stroke="#4a6b3a" stroke-width="1" fill="none" opacity="0.3"/>
      <path d="M5,5 Q8,-20 12,-8" stroke="#4a6b3a" stroke-width="1" fill="none" opacity="0.3"/>
      <path d="M0,5 Q3,-25 7,-10" stroke="#5a7b4a" stroke-width="1" fill="none" opacity="0.25"/>
      <ellipse cx="-5" cy="-5" rx="3" ry="2" fill="#4a6b3a" opacity="0.2"/>
      <ellipse cx="10" cy="-8" rx="3" ry="2" fill="#5a7b4a" opacity="0.2"/>
    </g>
    <!-- 药材散落 -->
    <g transform="translate(220, 120)">
      <!-- 人参形 -->
      <path d="M0,30 Q-2,20 0,10 Q2,0 0,-5" stroke="#9c4a2a" stroke-width="2" fill="none" opacity="0.25"/>
      <path d="M0,20 Q-8,15 -12,18" stroke="#9c4a2a" stroke-width="1.5" fill="none" opacity="0.2"/>
      <path d="M0,15 Q8,10 12,13" stroke="#9c4a2a" stroke-width="1.5" fill="none" opacity="0.2"/>
      <path d="M0,25 Q-5,22 -8,25" stroke="#9c4a2a" stroke-width="1" fill="none" opacity="0.2"/>
      <path d="M0,28 Q5,25 8,28" stroke="#9c4a2a" stroke-width="1" fill="none" opacity="0.2"/>
      <ellipse cx="0" cy="-5" rx="4" ry="3" fill="#4a6b3a" opacity="0.2"/>
    </g>
    <!-- 研钵 -->
    <g transform="translate(300, 130)">
      <ellipse cx="0" cy="15" rx="18" ry="6" fill="#4a3528" opacity="0.2"/>
      <path d="M-18,15 Q-18,-5 0,-8 Q18,-5 18,15" fill="#6b4c3b" opacity="0.2"/>
      <ellipse cx="0" cy="-5" rx="14" ry="4" fill="#2c1810" opacity="0.15"/>
      <!-- 杵 -->
      <rect x="-1" y="-25" width="3" height="20" fill="#6b4c3b" opacity="0.25" rx="1"/>
      <ellipse cx="0" cy="-27" rx="4" ry="3" fill="#4a3528" opacity="0.25"/>
    </g>
    <!-- 人物 -->
    <g transform="translate(180, 80)" opacity="0.15">
      <ellipse cx="0" cy="0" rx="6" ry="8" fill="#4a3528"/>
      <path d="M-8,8 Q-8,6 0,4 Q8,6 8,8 L12,50 Q0,55 -12,50 Z" fill="#4a3528"/>
    </g>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`,

  // ========== 内功 ==========
  inner: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="in2-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
      <radialGradient id="in2-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#d4a017" stop-opacity="0.3"/>
        <stop offset="50%" stop-color="#b8860b" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#b8860b" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#in2-bg)"/>
    <!-- 远山 -->
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.1"/>
    <!-- 光晕 -->
    <ellipse cx="200" cy="120" rx="80" ry="90" fill="url(#in2-glow)"/>
    <!-- 经脉线 -->
    <g stroke="#d4a017" stroke-width="1" fill="none" opacity="0.15">
      <!-- 督脉 -->
      <path d="M200,50 Q200,80 200,120 Q200,160 200,180"/>
      <!-- 任脉（前方弧线） -->
      <path d="M200,50 Q175,80 175,120 Q175,160 200,180" stroke-dasharray="3,3"/>
    </g>
    <!-- 丹田 -->
    <circle cx="200" cy="130" r="6" fill="#d4a017" opacity="0.4"/>
    <circle cx="200" cy="130" r="12" fill="none" stroke="#d4a017" stroke-width="0.5" opacity="0.2"/>
    <circle cx="200" cy="130" r="20" fill="none" stroke="#d4a017" stroke-width="0.5" opacity="0.1"/>
    <!-- 周天循环 -->
    <ellipse cx="200" cy="120" rx="30" ry="60" fill="none" stroke="#b8860b" stroke-width="0.5" opacity="0.1" stroke-dasharray="2,2"/>
    <!-- 人物轮廓 -->
    <g transform="translate(200, 100)" opacity="0.15">
      <ellipse cx="0" cy="-50" rx="7" ry="9" fill="#4a3528"/>
      <ellipse cx="0" cy="-62" rx="5" ry="3" fill="#4a3528"/>
      <path d="M-12,-40 Q-12,-42 0,-44 Q12,-42 12,-40 L16,30 Q0,35 -16,30 Z" fill="#4a3528"/>
      <ellipse cx="0" cy="35" rx="22" ry="6" fill="#4a3528" opacity="0.7"/>
    </g>
    <!-- 气流粒子 -->
    <circle cx="200" cy="70" r="1.5" fill="#d4a017" opacity="0.4"/>
    <circle cx="195" cy="95" r="1" fill="#d4a017" opacity="0.3"/>
    <circle cx="205" cy="110" r="1.5" fill="#d4a017" opacity="0.35"/>
    <circle cx="198" cy="150" r="1" fill="#d4a017" opacity="0.3"/>
    <circle cx="200" cy="170" r="1.5" fill="#d4a017" opacity="0.25"/>
    <circle cx="180" cy="100" r="1" fill="#d4a017" opacity="0.2"/>
    <circle cx="220" cy="140" r="1" fill="#d4a017" opacity="0.2"/>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`,

  // ========== 默认/通用 ==========
  default: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="df-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#f4ecd8" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#e8dcc0" stop-opacity="0.2"/>
      </radialGradient>
    </defs>
    <rect width="400" height="220" fill="url(#df-bg)"/>
    <path d="M0,160 Q80,120 160,145 Q240,110 320,135 Q360,130 400,145 L400,220 L0,220 Z" fill="#8a9a7a" opacity="0.12"/>
    <path d="M0,180 Q100,150 200,165 Q300,140 400,160 L400,220 L0,220 Z" fill="#6b7b5a" opacity="0.15"/>
    <!-- 松树 -->
    <g transform="translate(200, 120)">
      <path d="M-3,40 L-1,-10 L1,-10 L3,40 Z" fill="#4a3528" opacity="0.2"/>
      <ellipse cx="0" cy="-15" rx="25" ry="8" fill="#4a6b3a" opacity="0.2"/>
      <ellipse cx="0" cy="-5" rx="20" ry="6" fill="#4a6b3a" opacity="0.15"/>
      <ellipse cx="0" cy="5" rx="15" ry="5" fill="#4a6b3a" opacity="0.12"/>
    </g>
    <!-- 印章 -->
    <rect x="340" y="180" width="16" height="16" fill="#9c3a2a" opacity="0.2" rx="1"/>
  </svg>`
};

// 使插画库全局可用
if (typeof window !== 'undefined') {
  window.JIANGHU_ILLUSTRATIONS = JIANGHU_ILLUSTRATIONS;
}
