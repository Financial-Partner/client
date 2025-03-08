# Financial Partner App

這是一個使用 React Native 開發的理財小夥伴應用程式。

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
yarn start
```

2. 在新的視窗中執行 Android 應用程式：

```bash
yarn android
```

3. 在新的視窗中執行 iOS 應用程式：

```bash
yarn ios
```

## 開發注意事項

在 iOS 環境，若初次啟動，或是有安裝任何新的 dependency，建議確認是否需要在 iOS 安裝新的依賴：

```bash
cd ios
bundle exec pod install
```

**只有 MacOS 可以編譯和執行 iOS，若您不確定更新是否能在 iOS 上執行，請在 MR 上說明。**

## 常見問題排解

如果遇到問題，請檢查：

1. `.env` 檔案中的所有變數是否已正確設置
2. `google-services.json`, `GoogleService-info.plist` 檔案是否存在且內容正確
3. `npx react-native doctor` 確認已準備好環境

更多疑難排解資訊，請參考：

- [React Native 疑難排解指南](https://reactnative.dev/docs/troubleshooting)
- [Firebase Authentication 文件](https://firebase.google.com/docs/auth)
