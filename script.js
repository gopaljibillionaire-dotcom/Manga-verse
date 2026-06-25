/**
 * NEBULA CORE APPLICATION MODULE ENGINE
 * Hand-Crafted Vanilla Functional Architecture
 */

// Global High-Fidelity Mock Database Generator Engine
const MockDatabaseGenerator = (() => {
    const genresPool = ["Action", "Fantasy", "Sci-Fi", "Romance", "System", "Slice of Life", "Mystery", "Cultivation"];
    const authorsPool = ["Studio Nexus", "Xian Comics", "S.T. Studio", "Yuki Tanaka", "Author Core", "Noveleers"];
    
    // Dynamic abstract geometric cover art canvas rendering string fallback generators
    const generateSyntheticCover = (index, seedText) => {
        const hue = (index * 37) % 360;
        return `https://images.unsplash.com/photo-${1500000000000 + (index * 100000)}?auto=format&fit=crop&w=300&q=80&sig=${index}`;
    };

    const run = () => {
        const list = [];
        const mediaTypes = ["manga", "webtoon", "novel"];
        
        for (let i = 1; i <= 50; i++) {
            const type = mediaTypes[i % mediaTypes.length];
            const titleText = `${type.toUpperCase()} Module ${i}: ${i % 2 === 0 ? 'Chronicles of Void' : 'The Quantum Threshold'}`;
            const rating = (4.2 + (i % 9) * 0.08).toFixed(1);
            const viewsNum = (10.5 * i + i * i * 3.4).toFixed(1);
            
            // Randomly slice genres array
            const genresCount = 2 + (i % 3);
            const chosenGenres = [];
            for(let g=0; g<genresCount; g++) {
                const targetG = genresPool[(i + g) % genresPool.length];
                if(!chosenGenres.includes(targetG)) chosenGenres.push(targetG);
            }

            // Mock Chapters array
            const chapters = [];
            const chapterCount = 10 + (i % 15);
            for(let c = chapterCount; c >= 1; c--) {
                chapters.push({
                    id: c,
                    title: `Chapter ${c}: ${c === 1 ? 'The Genesis Matrix' : 'Unveiling Realities Part ' + c}`,
                    date: `${c} days ago`
                });
            }

            // Mock Reviews array
            const reviews = [
                { user: "Weeb_Master_99", score: 5, text: "Absolute masterpiece. The structural integrity of the plot framework is flawless." },
                { user: "Nerd_Alchemist", score: 4, text: "Pacing parameters are optimal. Visual composition layers are top tier." }
            ];

            list.push({
                id: i,
                title: titleText,
                type: type,
                author: authorsPool[i % authorsPool.length],
                rating: rating,
                views: `${viewsNum}K`,
                genres: chosenGenres,
                cover: generateSyntheticCover(i, titleText),
                synopsis: `In an era dominated by structural systemic shifts, Subject ${i} discovers a residual loophole within the collective consciousness grid. Tasked with executing historical alterations, they must traverse spatial boundaries risking localized timeline collapse. Will the absolute framework withstand their sequence?`,
                chapters: chapters,
                reviews: reviews,
                isFavorite: i % 7 === 0
            });
        }
        return list;
    };

    return { getDataset: run };
})();

// Application Core Orchestrator Class
class NebulaApp {
    constructor() {
        this.dataset = [];
        this.currentScreen = 'home';
        this.screenHistory = [];
        this.activeSeriesCtx = null;
        this.activeChapterCtx = null;
        this.userState = {
            isPremium: false,
            streak: 7,
            xp: 2450,
            level: 24,
            favorites: [],
            history: []
        };
        
        // Reader configurations state
        this.readerConfig = {
            brightness: 100,
            mode: 'vertical',
            theme: 'amoled'
        };
    }

    init() {
        this.dataset = MockDatabaseGenerator.getDataset();
        // Initialize explicit defaults into state lists
        this.userState.favorites = this.dataset.filter(d => d.isFavorite).map(d => d.id);
        this.userState.history = [
            { seriesId: 1, chapterId: 3, progress: 75 },
            { seriesId: 3, chapterId: 1, progress: 40 }
        ];

        this.initThreeJSBackground();
        this.renderDomElements();
        this.registerGlobalEventListeners();
        this.executeSplashScreenSequence();
    }

    // Three.js Interactive Luxury Particle Field Layer Initialization
    initThreeJSBackground() {
        const canvas = document.getElementById('three-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 30;

        // Particle configuration geometries
        const particleGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 250 : 600;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 60;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Premium deep purple/indigo space dust material shaders
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.25,
            color: 0x8e44ad,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleMesh);

        // Ambient lighting parameters
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        // Mouse vector coordinate interceptors for interactive displacement parallax
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        // Frame rendering cycle animation loop
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Subtle multi-axis ambient rotations
            particleMesh.rotation.y = elapsedTime * 0.03;
            particleMesh.rotation.x = elapsedTime * 0.015;

            // Apply dampening mouse parallax vector transformations
            particleMesh.position.x += (mouseX * 10 - particleMesh.position.x) * 0.05;
            particleMesh.position.y += (-mouseY * 10 - particleMesh.position.y) * 0.05;

            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
        tick();

        // Responsive viewport resizing listener callback updates
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // GSAP Splash Screen Sequence Animation Frame
    executeSplashScreenSequence() {
        const tl = gsap.timeline({
            onComplete: () => {
                document.getElementById('splash-screen').style.display = 'none';
            }
        });

        tl.to('.loading-bar-progress', { width: '100%', duration: 2.2, ease: "power2.out" })
          .to('.splash-content', { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" })
          .to('#splash-screen', { opacity: 0, duration: 0.6 }, "-=0.2");
    }

    // Core SPA Centralized Navigation Engine Route Controller
    navigateTo(screenId, direction = 'forward') {
        const activeScreen = document.querySelector('.app-screen.active');
        const targetScreen = document.getElementById(`screen-${screenId}`);
        
        if (!targetScreen || screenId === this.currentScreen) return;

        // Manage contextual state histories
        if (direction === 'forward') {
            this.screenHistory.push(this.currentScreen);
        }

        // Deactivate HUD controls if exiting reader module explicitly
        if (this.currentScreen === 'reader') {
            this.toggleHudElementsVisibility(false);
        }

        // Reset system tab active states down in footer menu bar if switching main viewports
        const mainScreens = ['home', 'discover', 'library', 'profile'];
        if (mainScreens.includes(screenId)) {
            document.querySelectorAll('.nav-item').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.screen === screenId);
            });
            // Clear contextual layer arrays since we stepped out to root views
            this.screenHistory = [];
        }

        // Advanced fluid GSAP screen transition sequences orchestration
        gsap.killTweensOf([activeScreen, targetScreen]);

        // Position transformations mapping parameters
        let exitVars = { opacity: 0, scale: 0.96, display: 'none', duration: 0.25, ease: "power2.inOut" };
        let entryVars = { opacity: 1, scale: 1, display: 'block', duration: 0.35, ease: "power2.out" };

        if (screenId === 'reader' || screenId === 'details' || direction === 'backward') {
            // Contextual slide-up overlays layout configurations setup
            exitVars = { opacity: 0, display: 'none', duration: 0.25 };
            entryVars = { opacity: 1, display: 'block', duration: 0.3 };
        }

        gsap.to(activeScreen, exitVars);
        gsap.fromTo(targetScreen, { opacity: 0, scale: screenId === 'details' ? 1 : 0.98 }, entryVars);

        this.currentScreen = screenId;
        
        // Run contextual update routines on transition triggers
        if(screenId === 'library') this.populateLibraryViewContainers();
        if(screenId === 'profile') this.updateProfileMetricViews();
    }

    navigateBack() {
        if (this.screenHistory.length > 0) {
            const previous = this.screenHistory.pop();
            this.navigateTo(previous, 'backward');
        }
    }

    // Injection Builders Core Architecture Engine
    renderDomElements() {
        // 1. Populate Home Screen Hero Carousel Slider Component Nodes
        const heroContainer = document.getElementById('hero-carousel-container');
        const topFive = this.dataset.slice(0, 5);
        heroContainer.innerHTML = topFive.map(item => `
            <div class="hero-slide" onclick="app.showSeriesDetails(${item.id})">
                <img src="${item.cover}" alt="Hero Image" class="hero-img" loading="lazy">
                <div class="hero-overlay">
                    <span class="hero-meta-badge">${item.type}</span>
                    <h3 class="hero-title">${item.title}</h3>
                </div>
            </div>
        `).join('');

        // 2. Populate Continue Reading Horizontal Carousel Elements Cards
        this.renderContinueReadingCarousel();

        // 3. Populate Trending Lists (Horizontal Grid)
        const trendingContainer = document.getElementById('trending-container');
        const trendingList = this.dataset.slice(5, 13);
        trendingContainer.innerHTML = this.buildStandardCardTrack(trendingList);

        // 4. Populate Popular Weekly Carousel Containers Grid
        const popularContainer = document.getElementById('popular-container');
        const popularList = this.dataset.slice(13, 21);
        popularContainer.innerHTML = this.buildStandardCardTrack(popularList);

        // 5. Populate Home Genre Filter Chips Row Stack
        const chipsContainer = document.getElementById('home-genres-chips');
        const uniqueGenres = ["All", "Action", "Fantasy", "Sci-Fi", "Romance", "System"];
        chipsContainer.innerHTML = uniqueGenres.map((g, idx) => `
            <span class="genre-chip ${idx===0?'active':''}" data-genre="${g}">${g}</span>
        `).join('');

        // 6. Populate Editor's Pick Column Stack Cards
        const editorsContainer = document.getElementById('editors-pick-container');
        const editorsList = this.dataset.slice(21, 26);
        editorsContainer.innerHTML = this.buildLongCardTrack(editorsList);

        // 7. Populate Default Leaderboards Matrix on Discovery Screens Module
        this.renderLeaderboardRows('views');
        
        // 8. Populate Discovery Tags List Clouds Grid Elements
        const tagsContainer = document.getElementById('trending-search-tags');
        const mockTrends = ["Solo Leveling", "Omniscient", "Cultivation", "Cyberpunk", "Valkyrie Novel"];
        tagsContainer.innerHTML = mockTrends.map(t => `<span class="search-trend-tag">${t}</span>`).join('');
    }

    buildStandardCardTrack(list) {
        return list.map(item => `
            <div class="media-card-standard" onclick="app.showSeriesDetails(${item.id})">
                <div class="mcs-poster-wrapper">
                    <img src="${item.cover}" alt="Poster" loading="lazy">
                    <span class="mcs-score-floating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                </div>
                <h4 class="mcs-title">${item.title}</h4>
            </div>
        `).join('');
    }

    buildLongCardTrack(list) {
        return list.map(item => `
            <div class="media-card-long" onclick="app.showSeriesDetails(${item.id})">
                <img src="${item.cover}" alt="Poster Cover" class="mcl-poster" loading="lazy">
                <div class="mcl-right">
                    <span class="mcl-type">${item.type}</span>
                    <h4 class="mcl-title">${item.title}</h4>
                    <span class="mcl-author">${item.author}</span>
                    <div class="mcl-meta-flex">
                        <span><i class="fa-solid fa-star gold-txt"></i> ${item.rating}</span>
                        <span><i class="fa-solid fa-eye"></i> ${item.views}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderContinueReadingCarousel() {
        const container = document.getElementById('continue-reading-container');
        if(this.userState.history.length === 0) {
            container.parentElement.style.display = 'none';
            return;
        }
        container.parentElement.style.display = 'block';
        
        container.innerHTML = this.userState.history.map(hist => {
            const series = this.dataset.find(d => d.id === hist.seriesId);
            if(!series) return '';
            return `
                <div class="continue-card" onclick="app.launchReader(${series.id}, ${hist.chapterId})">
                    <img src="${series.cover}" alt="Poster Cover" class="cc-poster">
                    <div class="cc-info">
                        <h4 class="cc-title">${series.title}</h4>
                        <span class="cc-chapter">Ch. ${hist.chapterId} • Page 1</span>
                        <div class="cc-track"><div class="cc-fill" style="width: ${hist.progress}%;"></div></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderLeaderboardRows(metricType) {
        const container = document.getElementById('ranking-list-container');
        // Sort local shallow copies parameters accordingly
        const sorted = [...this.dataset].sort((a,b) => {
            return metricType === 'stars' ? parseFloat(b.rating) - parseFloat(a.rating) : parseFloat(b.views) - parseFloat(a.views);
        }).slice(0, 7);

        container.innerHTML = sorted.map((item, idx) => `
            <div class="rank-item-row" onclick="app.showSeriesDetails(${item.id})">
                <span class="rank-number">${idx+1}</span>
                <img src="${item.cover}" alt="Mini Poster" class="rank-mini-poster" loading="lazy">
                <div class="rank-meta-block">
                    <h4 class="rank-title">${item.title}</h4>
                    <span class="rank-stat">${metricType==='stars'? 'Rating: ' + item.rating + ' / 5.0' : item.views + ' Views'}</span>
                </div>
                <i class="fa-solid fa-chevron-right" style="font-size:0.75rem; color:var(--txt-muted);"></i>
            </div>
        `).join('');
    }

    // Library Filter Synchronization Matrix Hydrators
    populateLibraryViewContainers() {
        // Build Favorites viewports grid
        const favsGrid = document.getElementById('library-favorites-grid');
        const favsList = this.dataset.filter(d => this.userState.favorites.includes(d.id));
        
        if(favsList.length === 0) {
            favsGrid.innerHTML = `
                <div class="empty-state-container" style="grid-column: span 2;">
                    <i class="fa-regular fa-bookmark empty-icon"></i>
                    <h3>Your Shelf is Empty</h3>
                    <p>Bookmark premium stories across discover matrices to initialize sync updates.</p>
                </div>
            `;
        } else {
            favsGrid.innerHTML = this.buildStandardCardTrack(favsList);
        }

        // Build History listing stack
        const historyListContainer = document.getElementById('library-history-list');
        const historyIds = this.userState.history.map(h => h.seriesId);
        const historyItems = this.dataset.filter(d => historyIds.includes(d.id));

        if(historyItems.length === 0) {
            historyListContainer.innerHTML = `<p class="txt-muted" style="text-align:center; padding:20px;">No reading sequence tracks recorded yet.</p>`;
        } else {
            historyListContainer.innerHTML = this.buildLongCardTrack(historyItems);
        }
    }

    // Gamification System & Profile Variable UI Generators
    updateProfileMetricViews() {
        // Synchronize Badge Elements
        const globalStreakNode = document.getElementById('global-streak');
        globalStreakNode.querySelector('.streak-count').innerText = this.userState.streak;

        document.getElementById('profile-level-tag').innerText = `Lv.${this.userState.level}`;
        document.getElementById('stat-streak-current').innerText = `${this.userState.streak} Days`;
        document.getElementById('stat-bookmarks-count').innerText = this.userState.favorites.length;

        // Render Unlocked Medals Badges row dynamically
        const row = document.getElementById('achievements-container-row');
        const medals = [
            { title: "First Step", icon: "fa-shoe-prints", earned: true, gold: false },
            { title: "Binge Protocol", icon: "fa-bolt", earned: true, gold: true },
            { title: "Cosmic Devotee", icon: "fa-crown", earned: this.userState.isPremium, gold: true },
            { title: "Centurion", icon: "fa-book", earned: false, gold: false }
        ];

        row.innerHTML = medals.map(m => `
            <div class="emblem-node ${m.earned && m.gold?'gold-earned':''}" style="opacity: ${m.earned ? '1' : '0.35'}">
                <div class="emblem-hex-frame">
                    <i class="fa-solid ${m.icon}"></i>
                </div>
                <span class="emblem-title">${m.title}</span>
            </div>
        `).join('');
    }

    // Details Component Core Logic Controller Function
    showSeriesDetails(id) {
        const series = this.dataset.find(d => d.id === id);
        if (!series) return;
        this.activeSeriesCtx = series;

        // Populate header fields elements context metrics
        const heroBg = document.getElementById('details-hero-banner-bg');
        heroBg.style.backgroundImage = `url(${series.cover})`;
        
        document.getElementById('details-target-poster').src = series.cover;
        document.getElementById('details-target-type').innerText = series.type;
        document.getElementById('details-target-title').innerText = series.title;
        document.getElementById('details-target-author').innerText = `By ${series.author}`;
        document.getElementById('details-target-score').innerText = series.rating;
        document.getElementById('details-target-views').innerText = series.views;
        document.getElementById('details-target-synopsis').innerText = series.synopsis;
        document.getElementById('details-chapters-count').innerText = series.chapters.length;

        // Toggle context bookmark icon states matching global index mappings
        const favIcon = document.getElementById('details-action-favorite').querySelector('i');
        if (this.userState.favorites.includes(series.id)) {
            favIcon.className = "fa-solid fa-bookmark gold-txt";
        } else {
            favIcon.className = "fa-regular fa-bookmark";
        }

        // Render Chapter Node Rows Row Item Stacks
        const chaptersAnchor = document.getElementById('details-chapters-anchor');
        chaptersAnchor.innerHTML = series.chapters.map(ch => `
            <div class="chapter-node-bar" onclick="app.launchReader(${series.id}, ${ch.id})">
                <div class="cnb-left">
                    <h4>${ch.title}</h4>
                    <span>Released ${ch.date}</span>
                </div>
                <i class="fa-solid fa-play cnb-right-icon"></i>
            </div>
        `).join('');

        // Render User Review Cards Nodes Track
        const reviewsAnchor = document.getElementById('details-reviews-anchor');
        reviewsAnchor.innerHTML = series.reviews.map(rev => `
            <div class="review-node-card">
                <div class="rnc-header">
                    <span class="rnc-user">@${rev.user}</span>
                    <span class="rnc-stars">${'<i class="fa-solid fa-star"></i>'.repeat(rev.score)}</span>
                </div>
                <p class="rnc-text">"${rev.text}"</p>
            </div>
        `).join('');

        // Wire primary execution actions launch configuration triggers
        document.getElementById('details-primary-read-btn').onclick = () => {
            this.launchReader(series.id, series.chapters[series.chapters.length - 1].id);
        };

        this.navigateTo('details');
    }

    // Toggle Bookmarks System Function Hook
    toggleContextSeriesFavorite() {
        if (!this.activeSeriesCtx) return;
        const id = this.activeSeriesCtx.id;
        const idx = this.userState.favorites.indexOf(id);
        const favIcon = document.getElementById('details-action-favorite').querySelector('i');

        if (idx > -1) {
            this.userState.favorites.splice(idx, 1);
            favIcon.className = "fa-regular fa-bookmark";
            this.showToastNotification("Removed from internal Library collection Shelf.");
        } else {
            this.userState.favorites.push(id);
            favIcon.className = "fa-solid fa-bookmark gold-txt";
            this.showToastNotification("Series bookmarked successfully to cloud matrix!");
        }
    }

    // Contextual Reader Suite Launch Engine Initialization Framework
    launchReader(seriesId, chapterId) {
        const series = this.dataset.find(d => d.id === seriesId);
        if (!series) return;
        
        this.activeSeriesCtx = series;
        this.activeChapterCtx = series.chapters.find(c => c.id === chapterId) || series.chapters[0];

        // Hydrate reader interface titles
        document.getElementById('reader-series-title-string').innerText = series.title;
        document.getElementById('reader-chapter-title-string').innerText = this.activeChapterCtx.title;

        const viewportTrack = document.getElementById('reader-canvas-viewport');
        viewportTrack.scrollTop = 0; // Explicit scroll reset anchor updates

        // Generate synthetic view panel elements based on categorization configurations
        if (series.type === 'novel') {
            viewportTrack.innerHTML = `
                <div class="novel-text-container">
                    <h3>${this.activeChapterCtx.title}</h3>
                    <p>The structural cosmic arrays shifted violently as the reality envelope tore down along structural faults. A cascading wave of raw mathematical data surged directly into the terminal, overloading the sensory nodes of the core grid interface arrays.</p>
                    <p>"Sequence variables are critical!" matching entities echoed down through tactical communications vectors. No entity within localized boundaries predicted the onset parameters of the sequence framework shift. Yet there he stood, navigating structural pathways with unyielding intent.</p>
                    <p>As layers dissolved, individual streams of glowing code aligned directly to form a centralized matrix engine. The threshold lay open, waiting for an absolute input confirmation protocol to finalize runtime initialization.</p>
                </div>
            `;
        } else {
            // Render graphic panels strip sheets stacks for Manga/Webtoon modes
            const panelCount = series.type === 'webtoon' ? 6 : 4;
            let panelsHtml = '';
            for(let p=1; p<=panelCount; p++) {
                // Generate varied structural abstract color canvases grids mapping loops
                panelsHtml += `
                    <img src="https://images.unsplash.com/photo-${1510000000000 + (series.id * 50000) + (p * 20000)}?auto=format&fit=crop&w=600&q=80" 
                         alt="Panel Sheet Strip ${p}" class="mock-panel-strip" loading="lazy">
                `;
            }
            viewportTrack.innerHTML = panelsHtml;
        }

        // Setup active synchronization markers inside state trackers indices loops
        const existingHist = this.userState.history.find(h => h.seriesId === series.id);
        if(existingHist) {
            existingHist.chapterId = this.activeChapterCtx.id;
            existingHist.progress = 100;
        } else {
            this.userState.history.unshift({ seriesId: series.id, chapterId: this.activeChapterCtx.id, progress: 100 });
        }
        this.renderContinueReadingCarousel();

        // Reveal view
        this.navigateTo('reader');
        
        // Brief dynamic notification micro interactions framework delay
        setTimeout(() => {
            this.showToastNotification(`Sync complete. Loaded ${this.activeChapterCtx.title}`);
        }, 600);
    }

    // Reader UI HUD Interactivity Core Mechanics Engine
    toggleHudElementsVisibility(forceState) {
        const topHud = document.querySelector('.reader-hud-top');
        const bottomHud = document.querySelector('.reader-hud-bottom');
        const drawer = document.getElementById('reader-config-drawer');
        
        const currentHidden = topHud.classList.contains('reader-hud-hidden-top');
        const targetState = (typeof forceState === 'boolean') ? !forceState : currentHidden;

        if (targetState) {
            topHud.classList.remove('reader-hud-hidden-top');
            bottomHud.classList.remove('reader-hud-hidden-bottom');
        } else {
            topHud.classList.add('reader-hud-hidden-top');
            bottomHud.classList.add('reader-hud-hidden-bottom');
            // Force contract configurations drawer
            drawer.style.display = 'none';
            gsap.to(drawer, { y: '100%', duration: 0.2 });
        }
    }

    toggleReaderSettingsDrawer() {
        const drawer = document.getElementById('reader-config-drawer');
        if (window.getComputedStyle(drawer).display === 'none') {
            drawer.style.display = 'block';
            gsap.fromTo(drawer, { y: '100%' }, { y: '0%', duration: 0.3, ease: "power2.out" });
        } else {
            gsap.to(drawer, { y: '100%', duration: 0.2, onComplete: () => drawer.style.display = 'none' });
        }
    }

    applyReaderSettingAdjustments(type, value) {
        const viewportTrack = document.getElementById('reader-canvas-viewport');
        
        if (type === 'brightness') {
            this.readerConfig.brightness = value;
            viewportTrack.style.filter = `brightness(${value}%)`;
        }
        
        if (type === 'theme') {
            this.readerConfig.theme = value;
            viewportTrack.className = 'reader-viewport-scroll-track'; // Reset
            if (value !== 'amoled') {
                viewportTrack.classList.add(`theme-${value}`);
            }
            
            // Toggle configuration selections design dot mappings matrix indicators
            document.querySelectorAll('.theme-dot').forEach(dot => {
                dot.classList.toggle('active', dot.dataset.theme === value);
            });
        }
    }

    // System Toast Message Box Dispatcher Function Hook Matrix
    showToastNotification(text) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--accent-purple);"></i> <span>${text}</span>`;
        
        container.appendChild(toast);
        
        // Fluid intro animations configuration via raw GSAP parameters framework setup
        gsap.fromTo(toast, { y: -20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        
        // Expire lifecycle tracking hook callbacks sequences handlers execution threads
        setTimeout(() => {
            gsap.to(toast, { opacity: 0, y: -10, scale: 0.9, duration: 0.2, onComplete: () => toast.remove() });
        }, 3000);
    }

    // Event Wiring Manager Routing Layer Initializer Subsystem
    registerGlobalEventListeners() {
        // Footer navigation items array loop handler wire attachments
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.screen;
                this.navigateTo(target);
            });
        });

        // Search Bar Event Filtering Matrix Mechanics
        const searchInput = document.getElementById('discover-search-bar');
        const searchResultsFrame = document.getElementById('search-results-wrapper');
        const defaultDiscoverFrame = document.getElementById('default-discover-content');
        const searchTarget = document.getElementById('search-results-target');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if(query.length < 2) {
                searchResultsFrame.classList.add('hidden-element');
                defaultDiscoverFrame.classList.remove('hidden-element');
                return;
            }

            // Execute shallow matches filtering criteria metrics
            const matches = this.dataset.filter(d => d.title.toLowerCase().includes(query) || d.genres.some(g => g.toLowerCase().includes(query)));
            defaultDiscoverFrame.classList.add('hidden-element');
            searchResultsFrame.classList.remove('hidden-element');

            if(matches.length === 0) {
                searchTarget.innerHTML = `<p class="txt-muted" style="padding:20px; text-align:center;">No cosmic anomalies matched search criteria strings.</p>`;
            } else {
                searchTarget.innerHTML = this.buildLongCardTrack(matches);
            }
        });

        // Category filter tabs wiring elements hook matrix
        document.querySelectorAll('.category-tabs .tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.category-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filterType = e.target.dataset.type;
                
                // Truncate search list filtering configurations arrays matrices updates
                if(filterType === 'all') {
                    this.renderLeaderboardRows('views');
                } else {
                    const filteredDataset = this.dataset.filter(d => d.type === filterType);
                    const listContainer = document.getElementById('ranking-list-container');
                    listContainer.innerHTML = filteredDataset.slice(0,6).map((item, idx) => `
                        <div class="rank-item-row" onclick="app.showSeriesDetails(${item.id})">
                            <span class="rank-number">${idx+1}</span>
                            <img src="${item.cover}" alt="Poster" class="rank-mini-poster">
                            <div class="rank-meta-block">
                                <h4 class="rank-title">${item.title}</h4>
                                <span class="rank-stat">${item.views} Views</span>
                            </div>
                        </div>
                    `).join('');
                }
            });
        });

        // Ranking configuration toggle button selectors hooks layout listeners
        document.getElementById('rank-views').onclick = (e) => {
            document.querySelectorAll('.ranking-toggle-container .rank-toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            this.renderLeaderboardRows('views');
        };
        document.getElementById('rank-stars').onclick = (e) => {
            document.querySelectorAll('.ranking-toggle-container .rank-toggle-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            this.renderLeaderboardRows('stars');
        };

        // Library sub-tabs framework navigation wire routines handlers setup
        document.querySelectorAll('.library-tabs .lib-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.library-tabs .lib-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                const targetViewId = e.target.dataset.target;
                document.querySelectorAll('.lib-sub-view').forEach(v => v.classList.remove('active-lib-view'));
                document.getElementById(targetViewId).classList.add('active-lib-view');
            });
        });

        // Details context bookmark action execution triggers hook mapping attachment setup
        document.getElementById('details-action-favorite').onclick = () => this.toggleContextSeriesFavorite();

        // Inner Details screen metadata context tabs navigation selector engine updates
        document.querySelectorAll('.details-inner-tab-bar .inner-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.details-inner-tab-bar .inner-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                const panelId = e.target.dataset.view;
                document.querySelectorAll('.details-content-body-card .inner-tab-panel').forEach(p => p.classList.remove('active-panel'));
                document.getElementById(panelId).classList.add('active-panel');
            });
        });

        // Core Immersive Canvas Reader View HUD toggle tracking setup
        document.getElementById('reader-canvas-viewport').onclick = (e) => {
            // Guard conditions checks ensuring configurations interface dashboard clicks bypass dismissals
            if(e.target.closest('.novel-text-container') || e.target.className === 'mock-panel-strip' || e.target.id === 'reader-canvas-viewport') {
                this.toggleHudElementsVisibility();
            }
        };

        document.getElementById('reader-exit-trigger').onclick = () => this.navigateBack();
        document.getElementById('reader-settings-toggle').onclick = () => this.toggleReaderSettingsDrawer();

        // Dynamic Display Controls adjustments slider event listeners mappings targets updates setup
        document.getElementById('reader-brightness-slider').oninput = (e) => {
            this.applyReaderSettingAdjustments('brightness', e.target.value);
        };

        document.querySelectorAll('.theme-picker-row .theme-dot').forEach(dot => {
            dot.onclick = (e) => this.applyReaderSettingAdjustments('theme', e.target.dataset.theme);
        });

        document.querySelectorAll('.segmented-control-tabs .seg-btn').forEach(btn => {
            btn.onclick = (e) => {
                document.querySelectorAll('.segmented-control-tabs .seg-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.showToastNotification(`Layout system format morphed into ${e.target.innerText} architecture standard.`);
            };
        });

        // Premium subscription activation mock automation trigger hook logic engine module setup
        document.getElementById('activate-premium-trigger').onclick = () => {
            this.userState.isPremium = true;
            this.userState.streak += 1;
            this.userState.level += 1;
            
            // Remove mock advertising wrapper nodes across active screens viewports matrices grids maps layout trees structure elements arrays listings
            document.querySelectorAll('.native-ad-box, .banner-ad-box').forEach(ad => ad.remove());
            
            this.showToastNotification("Cosmic Monarch Protocol active! Core Ads arrays permanently purged.");
            this.navigateTo('profile');
        };

        // Home view context horizontal chip filter adjustments handler wire execution
        document.getElementById('home-genres-chips').onclick = (e) => {
            if(!e.target.classList.contains('genre-chip')) return;
            document.querySelectorAll('#home-genres-chips .genre-chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectedGenre = e.target.dataset.genre;
            this.showToastNotification(`Filtering timeline modules context by archetype filter: ${selectedGenre}`);
        };
    }
}

// Instantiate Global Runtime Thread Lifecycle Process Loop Framework Shell Context Object Context instance Initialization execution
const app = new NebulaApp();
window.addEventListener('DOMContentLoaded', () => app.init());
