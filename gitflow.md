# Git 開發流程與疑難排解指南

本文從環境設置開始，到建立分支、提交程式碼、推送與建立 Merge Request（MR），並提供常見問題的解決方案。請依照下列步驟操作，確保你能順利參與專案開發。

---

## 目錄

1. [基本環境設置](#基本環境設置)
2. [建立分支](#建立分支)
3. [編輯、提交與推送](#編輯提交與推送)
4. [建立 Merge Request (MR)](#建立-merge-request-mr)
5. [合併後更新 main 分支](#合併後更新-main-分支)
6. [處理合併衝突](#處理合併衝突)
7. [常見疑難雜症](#常見疑難雜症)

---

## 1. 基本環境設置

### 1.1 檢查 Git 是否安裝

確認 Git 已正確安裝：

```bash
git --version
```

### 1.2 Clone 專案

從 GitHub 將專案 clone 到本地：

```bash
git clone git@github.com:Financial-Partner/client.git
```

若遇到權限錯誤，請參考[SSH 金鑰設定](#ssh-金鑰設定)。

### 1.3 SSH 金鑰設定

如果推送或 clone 時出現「Permission Denied」錯誤：

- **生成 SSH 金鑰：**
  - **Windows/Mac：** 打開 Terminal 或 Git Bash，執行：
    ```bash
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```
- **新增金鑰到 GitHub：**
  1. 複製 `~/.ssh/id_rsa.pub` 的內容。
  2. 登入 GitHub，依序點選 **Settings → SSH and GPG keys → New SSH key**，貼上並儲存。

#### 1.4 個人資訊設定

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

---

## 2. 建立分支

為了保持 main 分支的穩定性，請從 main 分支建立新分支進行開發：

```bash
git checkout -b feat/your-feature-name
```

---

## 3. 編輯、提交與推送

### 3.1 編輯檔案

在你的分支上進行修改與開發，若有不能公開的檔案，請在 `.gitignore` 中設定。

### 3.2 新增變更

將修改的檔案加入暫存區：

```bash
git add .
```

### 3.3 提交變更

提交變更並附上清楚的說明：

```bash
git commit -m "描述此次修改內容"
```

### 3.4 推送分支

- **第一次推送：**
  ```bash
  git push -u origin feat/your-feature-name
  ```
  此命令會設定本地分支與遠端分支的追蹤關係。
- **後續推送：**
  直接使用：
  ```bash
  git push
  ```

---

## 4. 建立 Merge Request (MR)

1. 登入 GitHub，前往專案頁面。
2. 你會看到剛剛推送的分支，點選 **Compare & pull request**。
3. 填寫 MR 說明，提交並在 reviewer 欄位掛上 change 會影響的團隊成員。
4. MR 標題和說明盡量使用英文，真的不會寫可以寫中文。
5. 除了所作修改（包含新增功能、修改 BUG），如有需要重下 `npm install` 請在 MR 說明中註明。

---

## 5. 合併後更新 main 分支

當 MR 合併到 main 後，請更新本地 main 分支：

```bash
git checkout main
git pull
```

這樣可以確保你的 main 與遠端同步。

---

## 6. 處理合併衝突

若 MR 顯示有衝突，請依下列步驟處理：

1. **檢查衝突檔案：**  
   Git 會在衝突檔案中插入如下標記：
   ```
   <<<<<<< HEAD
   本地修改內容
   =======
   遠端修改內容
   >>>>>>> 分支名稱
   ```
2. **手動解決衝突：**  
   編輯檔案，決定保留哪部分內容或合併兩者，並刪除標記。
3. **標記解決完成：**
   ```bash
   git add conflicted-file.txt
   ```
4. **提交修改：**
   ```bash
   git commit -m "解決 merge 衝突"
   ```
5. 若有需要，可執行：
   ```bash
   git merge --continue
   ```
6. 推送分支：
   ```bash
   git push
   ```

---

## 7. 常見疑難雜症

### 7.1 無法推送或 Clone（Permission Denied）

- **原因：** SSH 金鑰未設定或設定錯誤。
- **解決方案：** 參考[SSH 金鑰設定](#ssh-金鑰設定)。

### 7.2 分支與 main 不同步

- **原因：** 本地分支落後於遠端 main 分支。
- **解決方案：**
  1. 切換至 main 並更新：
     ```bash
     git checkout main
     git pull
     ```
  2. 切回開發分支並合併 main：
     ```bash
     git checkout feature/your-feature-name
     git merge main
     ```
  3. 如有衝突，請參照[處理合併衝突](#處理合併衝突)解決。

### 7.3 衝突解決困難

- **原因：** 多人同時修改相同區塊。
- **解決方案：**
  - 仔細檢查並理解衝突內容，決定保留或合併的邏輯。
  - 如不確定，可請求團隊協助討論最合適的解法。
