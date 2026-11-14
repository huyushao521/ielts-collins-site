# Collins IELTS 学习中心

> 基于 **Collins Listening / Reading / Writing / Speaking for IELTS**（2nd Edition）四本教材整理的雅思理论学习网站。看网站就能学雅思理论。

**在线访问**：https://huyushao521.github.io/ielts-collins-site/

---

## 📚 内容概览

| 模块 | 单元数 | 音频 | 说明 |
|------|-------|------|------|
| 🎧 **听力 Listening** | 12 | ✅ 87 Track | 全套题型技巧 + 每条音轨的题目详情 |
| 📖 **阅读 Reading** | 12 | — | 全套题型技巧（阅读考试无音频） |
| ✍️ **写作 Writing** | 12 | — | Task 1 全图表类型 + Task 2 全题型 |
| 🗣️ **口语 Speaking** | 12 | ✅ 123 Track | Part 1/2/3 全流程 + 发音专项 |

每个单元包含：

- 🎯 **单元目标（Aims）** — 考试技能、语言发展、发音
- 📋 **考试规则信息（Exam Information）** — 题型规则、字数限制、答案形式
- 💡 **考试技巧（Exam Tips）** — 应试策略与时间分配
- ⚠️ **注意事项（Watch Out!）** — 常见错误与失分陷阱
- 🎯 **核心技巧与示例（Techniques）** — 解题步骤 + 英汉双语例句
- 📝 **核心词汇（Vocabulary）** — 单元高频词
- 📐 **语法要点（Grammar）** — 语法结构与用法
- 🔗 **连接词 / 衔接手段（Connectors）** — 逻辑关系词
- 🔊 **发音专项（Pronunciation）** — 重音、连读、弱读等
- ✍️ **练习清单（Exercises）** — 教材练习索引
- 🎧 **音频播放器** — 每条 Track 附带题目内容说明

---

## 🎧 听力音频关联

听力模块的每条 Track 都**关联了书中具体题目**，点击「题目详情 ▾」即可查看：

- 该 Track 对应的**题型**（表单填空 / 配对题 / 流程图 / 笔记填空 / 图示标注 / 选择题 / 摘要填空 …）
- **题号范围**（如 Q1-4、Q5-10）
- **题目内容概述**（场景、人物、考点）
- **答案形式要求**（如 NO MORE THAN TWO WORDS AND/OR A NUMBER）

示例：

| Track | 题目详情 |
|-------|---------|
| Track 08 | Part 3 考试实战 Section 1 — 表单填空（Q1-4）：City Bus Tour Booking Form（Passenger names / Contact telephone / Hotel / Bus tour time / Date） |
| Track 24 | Part 3 考试实战 Section 3 — 笔记填空（Q1-3）+ 分类题（Q4-7）：天气项目优缺点；判断谁负责 floods/blizzards/drought/cyclones |
| Track 84 | Section 1 模拟考试 — 多选（Q1-3）+ 表单填空（Q4-7）+ 平面图完成（Q8-10）：Ellen 百货商店购物对话 |

**播放器特性**：
- 底部常驻 sticky 播放器，切换单元不中断
- 当前播放的 Track 高亮显示（▶ 变 ❚❚）
- 点击同一 Track 可暂停/继续
- 空格键全局播放/暂停

---

## 🗣️ 口语音频

123 条 Track（WAV 源文件经 64kbps MP3 压缩，约 1.05 GB → 71 MB），覆盖 Unit 1-12 全部 Part 1 / Part 2 / Part 3 示范。

---

## 🛠 技术栈

- **纯静态站点** — 无框架、无构建步骤
- HTML + CSS + 原生 JavaScript
- JSON 数据驱动（`data/*.json`）
- GitHub Pages 部署

### 目录结构

```
ielts-collins-site/
├── index.html                 # 入口页面
├── _config.yml                # GitHub Pages 配置
├── .nojekyll                  # 禁用 Jekyll 处理
├── assets/
│   ├── style.css              # 样式
│   ├── app.js                 # 应用逻辑（渲染 / 交互 / 播放器）
│   └── audio/
│       ├── listening/         # 听力 MP3 × 87
│       └── speaking/          # 口语 MP3 × 123
└── data/
    ├── listening.json         # 听力数据（含 Track 题目详情）
    ├── reading.json
    ├── writing.json
    ├── speaking.json
    └── audio-index.json
```

---

## 🚀 本地预览

由于使用了 `fetch` 加载 JSON，需通过 HTTP 服务器访问，不能直接双击打开 `index.html`：

```bash
cd ielts-collins-site
python -m http.server 8000
# 打开 http://localhost:8000
```

---

## 📄 数据来源与声明

- 教材内容整理自 **Collins for IELTS** 系列（2nd Edition），版权归 HarperCollins 所有
- 本仓库仅用于个人学习与教学参考，不包含任何商业用途
- 音频文件来自教材官方配套音频

---

## 📮 反馈

如发现内容错误或希望补充更多资料，欢迎提 Issue。
