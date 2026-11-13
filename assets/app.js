/* ===== Collins IELTS 学习中心 — 前端应用 ===== */

const MODULES = ['listening', 'reading', 'writing', 'speaking'];
let moduleData = {};
let currentModule = null;

// Load all JSON data
async function loadAllData() {
  const results = await Promise.all(
    MODULES.map(async id => {
      const res = await fetch(`data/${id}.json`);
      return [id, await res.json()];
    })
  );
  results.forEach(([id, data]) => moduleData[id] = data);
}

// Get color CSS variable for module
function moduleColor(id) {
  return moduleData[id]?.color || '#212529';
}

// ===== Home Page =====
function renderHome() {
  const cards = MODULES.map(id => {
    const m = moduleData[id];
    return `
      <div class="module-card" style="border-top-color: ${m.color}" onclick="showModule('${id}')">
        <div class="icon">${m.icon}</div>
        <h3>${m.name}</h3>
        <div class="en-name">${m.nameEn} · ${m.book}</div>
        <div class="desc">${m.description}</div>
        <div class="unit-count" style="color: ${m.color}">${m.units.length} 个单元 →</div>
      </div>`;
  }).join('');

  document.getElementById('app').innerHTML = `
    <div class="header">
      <div class="header-inner">
        <div class="logo" onclick="renderHome()">
          📚 Collins IELTS 学习中心
          <span class="badge">听说读写</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="home-hero">
        <h1>Collins IELTS 听说读写全技巧</h1>
        <p>基于 Collins Listening / Reading / Writing / Speaking for IELTS 四本书，覆盖全部单元的题型技巧、核心词汇、语法要点、连接词与示例。看网站就能学雅思理论。</p>
      </div>
      <div class="module-grid">${cards}</div>
    </div>
    <div class="footer">
      Collins IELTS 学习中心 · 数据来源：Collins for IELTS 系列（2nd Edition）· GitHub Pages
    </div>`;
  window.scrollTo(0, 0);
}

// ===== Module View =====
function showModule(id) {
  currentModule = id;
  const m = moduleData[id];
  const color = m.color;

  // Nav tabs
  const tabs = MODULES.map(mid => {
    const md = moduleData[mid];
    const cls = mid === id ? 'active' : '';
    const style = mid === id ? `background: ${md.color}` : '';
    return `<div class="nav-tab ${cls}" style="${style}" onclick="showModule('${mid}')">${md.icon} ${md.name}</div>`;
  }).join('');

  // Unit nav items
  const unitNav = m.units.map(u =>
    `<div class="unit-nav-item" style="${color ? '' : ''}" onclick="toggleUnit(${u.id})" data-unit="${u.id}">${u.id}. ${u.titleCn}</div>`
  ).join('');

  // Exam info
  const examInfo = m.examInfo ? `
    <div class="exam-info">
      <h4>📋 考试概况</h4>
      <div class="exam-info-grid">
        <div class="exam-info-item"><span class="label">时长：</span>${m.examInfo.time}</div>
        <div class="exam-info-item"><span class="label">题量：</span>${m.examInfo.total}</div>
        <div class="exam-info-item"><span class="label">备注：</span>${m.examInfo.note}</div>
      </div>
      ${m.examInfo.sections ? `
        <div class="exam-info-sections">
          ${m.examInfo.sections.map(s => `<div class="exam-info-section"><span class="n">${s.n}</span>：${s.desc}</div>`).join('')}
        </div>` : ''}
      ${m.examInfo.scoring ? `
        <div class="scoring-table">
          ${m.examInfo.scoring.map(s => `<div class="scoring-item">${s.score} → ${s.band}</div>`).join('')}
        </div>` : ''}
    </div>` : '';

  // Unit cards
  const unitCards = m.units.map(u => renderUnitCard(u, color)).join('');

  document.getElementById('app').innerHTML = `
    <div class="header">
      <div class="header-inner">
        <div class="logo" onclick="renderHome()">
          📚 Collins IELTS
          <span class="badge">学习中心</span>
        </div>
        <div class="nav-tabs">${tabs}</div>
      </div>
    </div>
    <div class="main">
      <div class="module-header" style="border-color: ${color}">
        <h2 style="color: ${color}">${m.icon} ${m.name} <span style="font-size:16px;font-weight:400;color:#868e96">${m.nameEn}</span></h2>
        <div class="book">📖 ${m.book} · ${m.units.length} 个单元</div>
        <div class="desc">${m.description}</div>
      </div>
      ${examInfo}
      <div class="unit-nav">${unitNav}</div>
      <div id="units-container">${unitCards}</div>
    </div>
    <div class="footer">
      Collins IELTS 学习中心 · ${m.book} · GitHub Pages
    </div>`;
  window.scrollTo(0, 0);
}

// ===== Unit Card =====
function renderUnitCard(u, color) {
  const hasPron = !!u.pronunciation;

  return `
    <div class="unit-card" id="unit-${u.id}" data-unit-id="${u.id}">
      <div class="unit-card-header" style="border-left-color: ${color}" onclick="toggleUnit(${u.id})">
        <div class="unit-num" style="color: ${color}">${u.id}</div>
        <div class="unit-info">
          <h3>Unit ${u.id}: ${u.title}</h3>
          <div class="title-cn">${u.titleCn}</div>
          <div class="topic">${u.topic} · ${u.page}</div>
          <div class="qtypes">
            ${(u.questionTypes || []).map(q => `<span class="qtype-badge">${q}</span>`).join('')}
          </div>
        </div>
        <div class="toggle-icon">▼</div>
      </div>
      <div class="unit-card-body">
        <div class="unit-card-body-inner">
          ${renderAims(u)}
          ${renderExamInfo(u)}
          ${renderExamTips(u)}
          ${renderWatchOuts(u)}
          ${renderTechniques(u)}
          ${renderVocab(u)}
          ${renderGrammar(u)}
          ${renderConnectors(u)}
          ${renderPronunciation(u)}
          ${renderExercises(u)}
        </div>
      </div>
    </div>`;
}

function renderAims(u) {
  if (!u.aims) return '';
  const a = u.aims;
  const items = [];
  if (a.examSkills) items.push(['考试技能', a.examSkills]);
  if (a.languageDevelopment) items.push(['语言发展', a.languageDevelopment]);
  if (a.pronunciation) items.push(['发音', a.pronunciation]);
  if (items.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">🎯 单元目标（Aims）</div>
    <div class="unit-section-content">
      ${items.map(([label, val]) => `<div style="font-size:13px;margin-bottom:6px"><b>${label}：</b>${val}</div>`).join('')}
    </div>
  </div>`;
}

function renderExamInfo(u) {
  if (!u.examInfo || u.examInfo.length === 0) return '';
  const boxes = u.examInfo.map(ei => `
    <div class="exam-info-box">
      <div class="box-title">📋 ${ei.title}</div>
      <ul>${(ei.points || []).map(p => `<li>${p}</li>`).join('')}</ul>
    </div>`).join('');
  return `<div class="unit-section"><div class="unit-section-title">📋 考试规则信息</div><div class="unit-section-content">${boxes}</div></div>`;
}

function renderExamTips(u) {
  if (!u.examTips || u.examTips.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">💡 考试技巧（Exam Tips）</div>
    <div class="unit-section-content">
      <ul class="tip-list">${u.examTips.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
  </div>`;
}

function renderWatchOuts(u) {
  if (!u.watchOuts || u.watchOuts.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">⚠️ 注意事项（Watch Out!）</div>
    <div class="unit-section-content">
      <ul class="watchout-list">${u.watchOuts.map(w => `<li>${w}</li>`).join('')}</ul>
    </div>
  </div>`;
}

function renderTechniques(u) {
  if (!u.techniques || u.techniques.length === 0) return '';
  const boxes = u.techniques.map(t => `
    <div class="technique-box">
      <div class="tech-name">🎯 ${t.name}</div>
      <div class="tech-detail">${t.detail}</div>
      ${t.examples && t.examples.length > 0 ? `
        <ul class="example-list">
          ${t.examples.map(e => `<li class="example-item"><span class="en">${e.en}</span><br><span class="cn">${e.cn}</span></li>`).join('')}
        </ul>` : ''}
    </div>`).join('');
  return `<div class="unit-section">
    <div class="unit-section-title">🎯 核心技巧与示例</div>
    <div class="unit-section-content">${boxes}</div>
  </div>`;
}

function renderVocab(u) {
  if (!u.vocab || u.vocab.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">📝 核心词汇（Vocabulary）</div>
    <div class="unit-section-content">
      <div class="vocab-tags">${u.vocab.map(v => `<span class="vocab-tag">${v}</span>`).join('')}</div>
    </div>
  </div>`;
}

function renderGrammar(u) {
  if (!u.grammar || u.grammar.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">📐 语法要点（Grammar）</div>
    <div class="unit-section-content">
      <ul class="grammar-list">${u.grammar.map(g => `<li>${g}</li>`).join('')}</ul>
    </div>
  </div>`;
}

function renderConnectors(u) {
  if (!u.connectors || u.connectors.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">🔗 连接词 / 衔接手段（Connectors）</div>
    <div class="unit-section-content">
      <ul class="connector-list">${u.connectors.map(c => `<li>${c}</li>`).join('')}</ul>
    </div>
  </div>`;
}

function renderPronunciation(u) {
  if (!u.pronunciation) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">🔊 发音专项（Pronunciation）</div>
    <div class="unit-section-content">
      <div class="pron-box">${u.pronunciation}</div>
    </div>
  </div>`;
}

function renderExercises(u) {
  if (!u.exercises || u.exercises.length === 0) return '';
  return `<div class="unit-section">
    <div class="unit-section-title">✍️ 练习清单（Exercises）</div>
    <div class="unit-section-content">
      <ul class="exercise-list">${u.exercises.map(e => `<li>${e}</li>`).join('')}</ul>
    </div>
  </div>`;
}

// ===== Toggle Unit =====
function toggleUnit(id) {
  const card = document.getElementById(`unit-${id}`);
  if (!card) return;
  const expanded = card.classList.toggle('expanded');
  // Update nav active state
  document.querySelectorAll('.unit-nav-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.unit) === id && expanded);
    if (el.classList.contains('active') && moduleData[currentModule]) {
      el.style.background = moduleColor(currentModule);
      el.style.color = '#fff';
    } else {
      el.style.background = '';
      el.style.color = '';
    }
  });
  if (expanded) {
    // Scroll to unit
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      if (rect.top < 80) {
        window.scrollBy({ top: rect.top - 80, behavior: 'smooth' });
      }
    }, 100);
  }
}

// ===== Init =====
async function init() {
  try {
    await loadAllData();
    renderHome();
  } catch (e) {
    document.getElementById('app').innerHTML = `
      <div style="padding:40px;text-align:center;color:#e03131">
        <h2>⚠️ 数据加载失败</h2>
        <p>请通过 HTTP 服务器访问（如 python -m http.server），不能直接打开文件。</p>
      </div>`;
    console.error(e);
  }
}

init();
