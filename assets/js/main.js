// ==========================================
// 全ページ共通の機能 (main.js / style.js)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // ★安全装置：古いURLパラメーター (?lang=...) が残っていたら強制削除する
  // ------------------------------------------
  if (window.location.search.includes('lang=')) {
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  // ==========================================
  // 1. 言語切り替え機能 (localStorageを利用)
  // ==========================================
  
  // ブラウザに保存されている言語を取得（初回は 'ja'）
  let currentLang = localStorage.getItem('siteLanguage') || 'ja';
  
  const langBtn = document.getElementById('lang-toggle-btn');
  const langDropdown = document.getElementById('lang-dropdown-menu');
  
  // 初回アクセス時に言語設定を適用
  switchLanguage(currentLang);

  if (langBtn && langDropdown) {
    // ボタンクリックでドロップダウンを開閉
    langBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      langDropdown.classList.toggle('show-dropdown');
    });

    // ドロップダウンの言語をクリックした時の処理
    const langOptions = langDropdown.querySelectorAll('a');
    langOptions.forEach(function(option) {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        currentLang = this.getAttribute('data-lang');
        
        // 言語を保存して切り替えを実行
        localStorage.setItem('siteLanguage', currentLang); 
        switchLanguage(currentLang);
        langDropdown.classList.remove('show-dropdown');
        
        // ヒーロー画像のコメントも即座に翻訳
        updateHeroComment();
      });
    });

    // ドロップダウンの外側をクリックしたらメニューを閉じる
    document.addEventListener('click', function(e) {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('show-dropdown');
      }
    });
  }

  // クラスを元に言語の表示・非表示を切り替える関数（強制上書き）
  function switchLanguage(lang) {
    // HTML全体の言語設定も書き換える（SEO・アクセシビリティ対策）
    document.documentElement.lang = lang;

    const jaElements = document.querySelectorAll('.lang-ja');
    const enElements = document.querySelectorAll('.lang-en');

    if (lang === 'en') {
      jaElements.forEach(el => el.style.display = 'none');
      enElements.forEach(el => el.style.display = ''); // CSSのデフォルトに戻す
    } else {
      jaElements.forEach(el => el.style.display = ''); // CSSのデフォルトに戻す
      enElements.forEach(el => el.style.display = 'none');
    }
  }

  // ==========================================
  // 2. ヒーロー画像のスライドショー
  // ==========================================
  
  const bg1 = document.getElementById('hero-bg-1');
  const bg2 = document.getElementById('hero-bg-2');
  const heroComment = document.getElementById('hero-comment');

  const heroData = [
    { 
      src: 'images/ibaraki1.JPG', 
      comment: { ja: '国営ひたち海浜公園', en: 'Hitachi Seaside Park' } 
    },
    { 
      src: 'images/yamanashi1.JPG', 
      comment: { ja: '富士山 (河口湖)', en: 'Mt. Fuji (Lake Kawaguchi)' } 
    },
    { 
      src: 'images/yamanashi2.JPG', 
      comment: { ja: '富士山 (河口湖)', en: 'Mt. Fuji (Lake Kawaguchi)' } 
    },
    { 
      src: 'images/singapore2.JPG', 
      comment: { ja: 'シンガポール植物園', en: 'Singapore Botanic Gardens' } 
    },
    { 
      src: 'images/singapore1.JPG', 
      comment: { ja: 'マリーナベイサンズ', en: 'Marina Bay Sands' } 
    },
    { 
      src: 'images/kyoto2.JPG', 
      comment: { ja: '天橋立', en: 'Amanohashidate' } 
    },
    { 
      src: 'images/kyoto3.JPG', 
      comment: { ja: '渡月橋', en: 'Togetsukyo Bridge' } 
    },
    { 
      src: 'images/miyagi2.JPG', 
      comment: { ja: '松島', en: 'Matsushima' } 
    },
    { 
      src: 'images/osaka4.JPG', 
      comment: { ja: '2025年日本国際博覧会', en: 'Expo 2025 Osaka, Kansai, Japan' } 
    },
    { 
      src: 'images/osaka5.JPG', 
      comment: { ja: '2025年日本国際博覧会', en: 'Expo 2025 Osaka, Kansai, Japan' } 
    },
    { 
      src: 'images/kanagawa1.JPG', 
      comment: { ja: '江ノ島', en: 'Enoshima' } 
    },
    {
      src: 'images/hyogo4.JPG',
      comment: { ja: '竹田城', en: 'Takeda Castle Ruins' } 
    },
    {
      src: 'images/hiroshima2.JPG',
      comment: { ja: '厳島神社', en: 'Itsukushima Shrine' } 
    },
    {
      src: 'images/hyogo6.JPG',
      comment: { ja: '姫路城', en: 'Himeji Castle' } 
    },
    {
      src: 'images/nagano3.JPG',
      comment: { ja: '松本城', en: 'Matsumoto Castle' } 
    },
    {
      src: 'images/hyogo5.JPG',
      comment: { ja: '竹田城', en: 'Takeda Castle Ruins' } 
    }
  ];

  let currentImageIndex = -1;

  // 現在の言語に合わせてヒーロー画像のコメントを更新する関数
  function updateHeroComment() {
    if (heroComment && currentImageIndex !== -1) {
      heroComment.textContent = heroData[currentImageIndex].comment[currentLang];
    }
  }

  if (bg1 && bg2 && heroComment) {
    let activeBg = 1;

    function initHero() {
      currentImageIndex = Math.floor(Math.random() * heroData.length);
      bg1.style.backgroundImage = `url('${heroData[currentImageIndex].src}')`;
      bg1.classList.add('active'); 
      updateHeroComment(); // 初期コメントを設定
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
      
      updateHeroComment(); // 画像切り替え時にコメントを更新
    }

    initHero();
    setInterval(changeHeroImage, 5000);
  }
});
