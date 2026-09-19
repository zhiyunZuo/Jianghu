# 江湖侠客成长模拟器

水墨风文字养成小游戏。取一用户名，择男女，入此江湖；七种身份（江湖游侠、世家弟子、书院学子、医者、琴师、剑客、隐士）皆可历，五位师尊皆在「交游」中，可随时问安论道、书信往来；亦有江湖偶遇、自创人设、藏书阁。

## 本地运行

```bash
# 在项目根目录起一个静态服务器即可
python -m http.server 8000
# 浏览器打开 http://127.0.0.1:8000/index.html
```

双击 `index.html` 也能直接玩（存档存于本机浏览器）。

## 部署（GitHub Pages）

仓库根目录即站点根目录，直接对 `main` 分支启用 GitHub Pages 即可：
Settings → Pages → Source: Deploy from a branch → Branch: `main` → `/root`。

## 目录结构

- `index.html` — 页面骨架与视图
- `css/style.css` — 水墨主题样式
- `js/images.js` — SVG 水墨插图
- `js/data.js` — 通用数据（身份、师尊、季节、天气、诗词…）
- `js/data-relations.js` — 交游数据
- `js/data-identity-cultivation.js` — 七身份专属修行内容
- `js/app.js` — 应用逻辑
