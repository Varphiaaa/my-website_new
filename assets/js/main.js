// ==========================================
// 全ページ共通の機能 (main.js)
// ==========================================

// 1. 現在の言語を取得
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'ja';

// 2. 共通部分（ナビゲーション）の言語データ
const commonI18n = {
  ja: { nav: ["トップ", "論文", "講演", "ブログ・ノート等", "リンク"] },
  en: { nav: ["Home", "Papers", "Talks", "Blog & Notes", "Links"] }
};

// 3. 言語切り替えドロップダウンの表示/非表示
function toggleLang() { 
  document.getElementById('langDropdown').classList.toggle('show-dropdown'); 
}

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
  
  // --- A. ナビゲーションと言語ボタンの翻訳反映 ---
  const navLinks = document.querySelectorAll('.nav-links li a');
  commonI18n[lang].nav.forEach((text, i) => { 
    if(navLinks[i]) navLinks[i].textContent = text; 
  });
  
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? "English ∨" : "Japanese ∨";
  }

  // --- B. ページ内のリンクに言語設定を引き継ぐ ---
  document.querySelectorAll('a').forEach(link => {
    let href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.includes('?lang=')) {
      link.setAttribute('href', href + '?lang=' + lang);
    }
  });
// --- 言語に応じたタイトルの切り替え ---
  const titleJa = document.querySelector('#hero-title .lang-ja');
  const titleEn = document.querySelector('#hero-title .lang-en');
  
  if (titleJa && titleEn) {
    if (lang === 'en') {
      titleJa.style.display = 'none';
      titleEn.style.display = 'inline';
    } else {
      titleJa.style.display = 'inline';
      titleEn.style.display = 'none';
    }
  }
  // --- C. ヒーロー画像のスライドショー（全ページ共通レイアウトの場合） ---
  const bg1 = document.getElementById('hero-bg-1');
  const bg2 = document.getElementById('hero-bg-2');
  const heroComment = document.getElementById('hero-comment');

  if (bg1 && bg2 && heroComment) {
    const heroData = [
      { 
        src: 'images/DSC04243.JPG', 
        comment: { ja: '日本の数学研究の拠点', en: 'Hub of mathematical research in Japan' } 
      },
      { 
        src: 'zaou.jpeg', 
        comment: { ja: '日常の研究のひとこま', en: 'A glimpse of daily research' } 
      }
    ];

    let activeBg = 1;
    let currentImageIndex = -1;

    function initHero() {
      currentImageIndex = Math.floor(Math.random() * heroData.length);
      bg1.style.backgroundImage = `url('${heroData[currentImageIndex].src}')`;
      heroComment.textContent = heroData[currentImageIndex].comment[lang];
    }

    function changeHeroImage() {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * heroData.length);
      } while (nextIndex === currentImageIndex && heroData.length > 1);
      
      currentImageIndex = nextIndex;
      const nextData = heroData[currentImageIndex];

      if (activeBg === 1) {
        bg2.style.backgroundImage = `url('${nextData.src}')`;
        bg2.classList.add('active');
        bg1.classList.remove('active');
        activeBg = 2;
      } else {
        bg1.style.backgroundImage = `url('${nextData.src}')`;
        bg1.classList.add('active');
        bg2.classList.remove('active');
        activeBg = 1;
      }
      
      heroComment.textContent = nextData.comment[lang];
    }

    initHero();
    setInterval(changeHeroImage, 5000);
  }
});
