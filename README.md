Viewed adv-04-unit-filter-algorithms.html:1-574

針對 **`adv-04-unit-filter-algorithms` (數據抖動與數位濾波演算法)** 單元，這是一個將「原始物理訊號」進行數學提純的進階技術課，對於打造穩定的自駕系統或傳感器終端至關重要。

以下是在 **GitHub Classroom** 部署其作業 (Assignments) 的具體建議：

### 1. 範本倉庫 (Template Repo) 配置建議
濾波演算法需要大量的「髒數據」來測試有效性，建議範本包含：
*   **📂 `src/filters.js`**：核心演算法檔案，預置 `MovingAverage`, `MedianFilter`, `AdaptiveLPF` 三個類別的空架構。
*   **📂 `data/sensor_noise.json`**：提供一組「真實感測器噪音」數據，包含高頻振動雜訊、突發性尖峰脈衝 (Spikes) 以及階躍信號 (Step signals)。
*   **📂 `simulator/index.html`**：視覺化儀表板。學員只需在 `filters.js` 寫好邏輯，網頁端會自動引用並畫出「原始 vs. 濾波後」的波形動態對比圖。
*   **📂 `tests/snr_evaluator.js`**：自動化評分腳本，計算濾波後的「信噪比 (SNR)」提升度，以及相對於原始信號的「相位延遲 (Phase Lag)」。

---

### 2. 作業任務部署細節

#### 任務 1：線性濾波器設計 (Moving Average & LPF)
*   **目標**：掌握最基礎的線性時域濾波，理解「時間換取穩定度」的代價。
*   **Classroom 部署建議**：
    *   **核心代碼檢核**：
        ```javascript
        // 學生需實作：低通濾波公式
        this.currentValue = this.alpha * newValue + (1 - this.alpha) * this.lastValue;
        ```
    *   **Autograding**：給予一組階躍輸入，測量輸出的「上升時間 (Rise Time)」。如果學員的 $\alpha$ 設得太小，卻沒發現數據反應變得過於遲鈍，則需提供回饋提示。

#### 任務 2：中值濾波抗干擾挑戰 (Median Filter Spike Protection)
*   **目標**：處理線性濾波器無法解決的「離群值 (Outliers)」。
*   **Classroom 部署建議**：
    *   **異常測試**：在測試數據中插入一個極大的錯誤值（如：正常值 10，突然變成 1000）。
    *   **驗證方式**：檢核輸出曲線。均值濾波會被 1000 拉起一個大斜坡，而正確的中值濾波應該能「完全無視」這個尖峰，維持在 10 附近。這能帶給學員極大的成功感。

#### 任務 3：動態 α 濾波器 (Adaptive Alpha Lab)
*   **目標**：設計具備「智能」的濾波強度，解決靈敏度與平穩度的零和博弈。
*   **Classroom 部署建議**：
    *   **權衡邏輯設計**：要求學員實作一個根據「誤差值 (Error)」自動調整 $\alpha$ 的函式。
        - 當 $Error$ 很大時（代表發生真位移），調大 $\alpha$ 以求快速追隨。
        - 當 $Error$ 很小時（代表只是雜訊），調小 $\alpha$ 以求極致平穩。
    *   **Tutor View (PR 審核)**：導師在 PR 中點評學員的公式曲線。是否有設置「死區 (Deadband)」以避免在平衡點產生微小震盪？

---

### 3. 演算法導師點評標準 (Algorithm Benchmarks)
此單元的價值在於 **「對數據背後物理意義的理解」**：
*   [ ] **延遲感知力**：學員是否能解釋為什麼視窗 $N$ 不能無限加大？（提示：無人車會因為濾波延遲而撞牆）。
*   [ ] **排序效率考量**：在實作中值濾波時，是否因頻繁的 `Array.sort()` 導致瀏覽器運算負載過重？
*   [ ] **場景自適應性**：README 是否說明了：在「靜態測速」與「高速避障」時，濾波器參數應如何動態切換？

### 📁 推薦範本結構 (GitHub Classroom Template)：
```text
.
├── src/
│   ├── MovingAverage.js    # 任務 1：線性平均
│   ├── MedianFilter.js     # 任務 2：排序取中值
│   └── AdaptiveFilter.js   # 任務 3：適應性係數邏輯
├── simulator/
│   └── chart_app.js        # 視覺化邏輯 (使用 Chart.js)
├── test/
│   └── accuracy_test.js    # 自動化：SNR 與 Lag 測算
└── README.md               # 專案報告：我如何找到平滑與回應的黃金分割點
```

透過這種部署方式，學生能明白 **「演算法不是冰冷的公式，而是應對物理世界雜訊的盾牌」**。這對於未來開發高精度遙控系統或自駕演算法是絕對核心的底層實力。_
