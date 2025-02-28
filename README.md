# Financial Partner App

這是一個使用 React Native 開發的理財小夥伴應用程式。目前僅保證在 Android 環境下的正常運作。

## 相關資源

- [React Native 官方網站](https://reactnative.dev)
- [React Native 環境設置指南](https://reactnative.dev/docs/environment-setup)

## 前置需求

1. Node.js >= 18
2. Android Studio 和 Android SDK
3. JDK >= 17

## 環境設置

1. Clone 專案：

```bash
git clone git@github.com:Financial-Partner/client.git
```

2. 安裝依賴：

```bash
npm install
```

3. 環境變數設置：
   - 將 `.env.example` 重新命名為 `.env`
   - 填入適當的環境變數

4. Firebase 設置：
   - 從 Firebase Console 下載 `google-services.json`
   - 將檔案放置於 `android/app/` 目錄下

## 執行專案

1. 啟動 Metro 開發伺服器：
```bash
npm start
```

2. 在新的終端機視窗中執行 Android 應用程式：
```bash
npm run android
```

## 開發注意事項

- 目前僅保證 Android 環境下的正常編譯和運行

## 常見問題排解

如果遇到問題，請檢查：
1. `.env` 檔案中的所有變數是否已正確設置
2. `google-services.json` 檔案是否存在且內容正確
3. Android SDK 版本是否符合要求
4. 是否已安裝所有必要的依賴

更多疑難排解資訊，請參考：
- [React Native 疑難排解指南](https://reactnative.dev/docs/troubleshooting)
- [Firebase Authentication 文件](https://firebase.google.com/docs/auth)
