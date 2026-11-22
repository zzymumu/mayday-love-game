# 那年夏天，還有未讀訊息

五月天同人戀愛互動遊戲。故事設定於 1990 年代末的台灣大學生活與樂團早期時期；角色互動及戀愛劇情均為架空同人創作。

## 技術

- React + TypeScript
- Vite
- GitHub Pages + GitHub Actions

## 本機開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
npm run preview
```

## GitHub Pages

此專案使用 GitHub Actions 自動部署。工作流程位於 `.github/workflows/deploy.yml`，每次推送到 `main` 都會建置並發布 `dist`。

請在 GitHub repository 的 **Settings → Pages → Build and deployment** 中，將 **Source** 設為 **GitHub Actions**。

專案站台網址：

https://zzymumu.github.io/mayday-love-game/

## 第一階段範圍

目前提供復古手機外觀、主選單、玩家姓名設定與各功能入口的佔位畫面。正式聊天、劇情、日記、好感度及多結局系統會在後續階段加入。

玩家姓名目前儲存在瀏覽器本機；清除瀏覽器資料或更換裝置不會自動同步。

<!-- Trigger a fresh GitHub Pages deployment after enabling Pages in repository settings. -->
