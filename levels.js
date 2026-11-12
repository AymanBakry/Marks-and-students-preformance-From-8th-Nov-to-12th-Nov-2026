// ===== المستوى العلمي والسلوكي (يعمل مع script.js بدون تعديله) =====
// المستوى العلمي = اختبار 1 + المذكرة + المهمة 1 + المهمة 2 + كتابة الفقرة 2 (من 50)
// المستوى السلوكي = المشاركة + السلوك (من 20)
const LV_ACAD = { cols: [8, 4, 5, 6, 7], max: 50, icon: "🎓", title: "المستوى العلمي" };
const LV_BEH = { cols: [2, 3], max: 20, icon: "🤝", title: "المستوى السلوكي" };

// المستويات: l4 متميز، l3 جيد جدًا، l2 جيد، l1 يحتاج دعمًا
const LV_TEXT = {
  acad: {
    4: ["متميز", "مستوى علمي رفيع، بارك الله فيه ووفقه."],
    3: ["جيد جدًا", "مستوى علمي جيد جدًا وقريب من التميز."],
    2: ["جيد", "مستوى علمي جيد يحتاج مزيدًا من المتابعة."],
    1: ["يحتاج دعمًا", "نتعاون معًا لرفع مستواه العلمي بإذن الله."],
  },
  beh: {
    4: ["متميز", "سلوك راقٍ وانضباط مشرّف داخل الصف."],
    3: ["جيد جدًا", "سلوك جيد جدًا والتزام واضح بالتعليمات."],
    2: ["جيد", "سلوك جيد مع حاجة لمزيد من الانضباط."],
    1: ["يحتاج توجيهًا", "نتعاون معًا لتعزيز الانضباط الصفي بإذن الله."],
  },
};

function lvLevel(p) { return p >= 90 ? 4 : p >= 75 ? 3 : p >= 60 ? 2 : 1; }

// ميدالية متحركة بلون يناسب المستوى
function lvMedal(icon, lvl) {
  const spark = lvl >= 3 ? `<g fill="#fff"><text class="tw" x="6" y="30" font-size="14">✦</text><text class="tw" x="64" y="24" font-size="11" style="animation-delay:.6s">✦</text>${lvl === 4 ? '<text class="tw" x="68" y="64" font-size="12" style="animation-delay:1.1s">✦</text>' : ""}</g>` : "";
  const crown = lvl === 4 ? `<path class="tw" d="M28 34l4-9 8 6 8-6 4 9z" fill="#FFD43B" style="animation-duration:2.4s"/>` : "";
  return `<svg viewBox="0 0 80 90"><path d="M26 0h12l8 32H34z" fill="rgba(255,255,255,.6)"/><path d="M54 0H42l-8 32h12z" fill="rgba(255,255,255,.38)"/>
    <g class="mb"><circle cx="40" cy="58" r="28" fill="#fff"/><circle cx="40" cy="58" r="23" fill="none" stroke="var(--l1)" stroke-width="4"/><text x="40" y="69" text-anchor="middle" font-size="27">${icon}</text></g>${crown}${spark}</svg>`;
}

function lvCard(def, key, r, delay) {
  const sum = def.cols.reduce((s, c) => s + (/\d/.test(clean(r[c])) ? (num(r[c]) || 0) : 0), 0);
  const pct = Math.min(100, Math.round(sum / def.max * 100));
  const lvl = lvLevel(pct), t = LV_TEXT[key][lvl];
  return `<div class="lv l${lvl}" style="animation-delay:${delay}s">
    <div class="lvi">${lvMedal(def.icon, lvl)}</div>
    <div class="lvt"><small>${def.title}</small><b>${t[0]}</b>
      <div class="lvbar"><i data-w="${pct}"></i></div>
      <em>${pct}%</em><p>${t[1]}</p></div></div>`;
}

const _origShow = show;
show = function (r) {
  _origShow(r);
  try {
    const box = document.getElementById("student");
    const tiles = box.querySelector(".tiles");
    if (!tiles) return;
    tiles.insertAdjacentHTML("beforebegin", `<div class="lvs">${lvCard(LV_ACAD, "acad", r, 0)}${lvCard(LV_BEH, "beh", r, 0.15)}</div>`);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      box.querySelectorAll(".lvbar i").forEach(b => (b.style.width = b.dataset.w + "%"));
    }));
  } catch (e) { /* لا يؤثر على عرض الدرجات */ }
};
