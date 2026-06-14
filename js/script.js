/* ========================================
   Anniversary Website - Interactive Features
   ======================================== */

// ========================================
// Constants & Configuration
// ========================================
const CONFIG = {
    anniversary: {
        date: new Date('2026-03-14T00:00:00+05:30'), // IST - We met on 14 March 2026
        hindiMonths: [
            { name: 'Chaitra', start: 'March', end: 'April' },
            { name: 'Vaishakh', start: 'April', end: 'May' },
            { name: 'Jyeshtha', start: 'May', end: 'June' },
            { name: 'Ashadha', start: 'June', end: 'July' },
            { name: 'Shravan', start: 'July', end: 'August' },
            { name: 'Bhadrapada', start: 'August', end: 'September' },
            { name: 'Ashwin', start: 'September', end: 'October' },
            { name: 'Kartik', start: 'October', end: 'November' },
            { name: 'Margashirsha', start: 'November', end: 'December' },
            { name: 'Pausha', start: 'December', end: 'January' },
            { name: 'Magha', start: 'January', end: 'February' },
            { name: 'Phalguna', start: 'February', end: 'March' }
        ]
    },
    particles: {
        count: 50,
        colors: ['#FF6B8A', '#C9B1FF', '#FFD700', '#FF8FA3']
    }
};

// ========================================
// DOM Elements
// ========================================
const elements = {
    loader: document.getElementById('loader'),
    mainSite: document.getElementById('main-site'),
    cursor: document.getElementById('cursor'),
    canvas: document.getElementById('particles-canvas'),
    heroImage: document.getElementById('heroImage'),
    quotesCarousel: document.getElementById('quotesCarousel'),
    quoteDots: document.getElementById('quoteDots'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    togetherYears: document.getElementById('togetherYears'),
    togetherMonths: document.getElementById('togetherMonths'),
    togetherDays: document.getElementById('togetherDays'),
    togetherHours: document.getElementById('togetherHours'),
    togetherMinutes: document.getElementById('togetherMinutes'),
    togetherSeconds: document.getElementById('togetherSeconds'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCaption: document.getElementById('lightboxCaption'),
    confetti: document.getElementById('confetti'),
    dayNight: document.getElementById('dayNight'),
    bgMusic: document.getElementById('bgMusic'),
    footerDate: document.getElementById('footerDate'),
    floatingHearts: document.getElementById('floatingHearts'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    petalContainer: document.getElementById('petalContainer'),
    slideshowContainer: document.getElementById('slideshowContainer'),
    slideshowTrack: document.getElementById('slideshowTrack'),
    slideshowDots: document.getElementById('slideshowDots'),
    slideshowToggle: document.getElementById('slideshowToggle'),
    letterContainer: document.getElementById('letterContainer')
};

// ========================================
// Particle System
// ========================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)],
            opacity: Math.random() * 0.5 + 0.3,
            pulse: Math.random() * Math.PI * 2
        };
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, i) => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;
            
            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                p.x -= dx * 0.01;
                p.y -= dy * 0.01;
            }
            
            // Wrap around edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Draw particle
            const pulseSize = p.size + Math.sin(p.pulse) * 1;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (dist2 < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = (1 - dist2 / 100) * 0.2;
                    this.ctx.stroke();
                }
            }
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Custom Cursor
// ========================================
class CustomCursor {
    constructor() {
        this.cursor = elements.cursor;
        this.pos = { x: 0, y: 0 };
        this.visible = false;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.pos.x = e.clientX;
            this.pos.y = e.clientY;
            if (!this.visible) {
                this.visible = true;
                this.cursor.classList.add('visible');
            }
            this.update();
        });

        document.addEventListener('mouseleave', () => {
            this.visible = false;
            this.cursor.classList.remove('visible');
        });

        document.addEventListener('click', (e) => {
            this.createHeartBurst(e.clientX, e.clientY);
        });
    }

    update() {
        this.cursor.style.left = this.pos.x + 'px';
        this.cursor.style.top = this.pos.y + 'px';
    }

    createHeartBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                font-size: 20px;
                z-index: 10000;
                transition: all 0.8s ease;
                opacity: 1;
            `;
            document.body.appendChild(heart);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            
            setTimeout(() => {
                heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                heart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => heart.remove(), 800);
        }
    }
}

// ========================================
// Floating Hearts
// ========================================
class FloatingHearts {
    constructor(container) {
        this.container = container;
        this.createHearts();
    }

    createHearts() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '✨', '🌟'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 15 + 's';
            heart.style.animationDuration = 15 + Math.random() * 10 + 's';
            this.container.appendChild(heart);
        }
    }
}

// ========================================
// Quotes Carousel
// ========================================
class QuotesCarousel {
    constructor() {
        this.quotes = document.querySelectorAll('.quote-card');
        this.currentIndex = 0;
        this.dotsContainer = elements.quoteDots;
        this.autoplayInterval = null;
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.startAutoplay();
        this.showQuote(0);
    }

    createDots() {
        this.quotes.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'quote-dot';
            dot.addEventListener('click', () => this.showQuote(i));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.quote-dot');
    }

    bindEvents() {
        document.querySelector('.quote-btn.prev').addEventListener('click', () => {
            this.prev();
            this.resetAutoplay();
        });
        
        document.querySelector('.quote-btn.next').addEventListener('click', () => {
            this.next();
            this.resetAutoplay();
        });
    }

    showQuote(index) {
        this.quotes.forEach((q, i) => {
            q.classList.remove('active');
            this.dots[i].classList.remove('active');
        });
        
        this.quotes[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentIndex = index;
    }

    next() {
        this.showQuote((this.currentIndex + 1) % this.quotes.length);
    }

    prev() {
        this.showQuote((this.currentIndex - 1 + this.quotes.length) % this.quotes.length);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
}

// ========================================
// IST Helper
// ========================================
function getISTDate() {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 5.5 * 60 * 60 * 1000);
}

function istDateStr(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// ========================================
// Countdown Timer (Yearly - 14 June)
// ========================================
class CountdownTimer {
    constructor() {
        this.startY = 2016;
        this.startM = 5; // June (0-indexed)
        this.startD = 14;
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const ist = getISTDate();
        const y = ist.getFullYear();
        const m = ist.getMonth();
        const d = ist.getDate();
        const h = ist.getHours();
        const min = ist.getMinutes();
        const s = ist.getSeconds();

        // Next 14 June
        let nextY = y;
        if (m > 5 || (m === 5 && d >= 14)) {
            nextY++;
        }
        const targetMs = new Date(nextY, 5, 14, 0, 0, 0).getTime();
        const currentMs = new Date(y, m, d, h, min, s).getTime();
        const diff = targetMs - currentMs;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        this.animate(elements.days, days);
        this.animate(elements.hours, hours);
        this.animate(elements.minutes, minutes);
        this.animate(elements.seconds, seconds);

        // Milestone label
        const totalYears = y - this.startY;
        const nextYear = totalYears + 1;
        const labelEl = document.getElementById('nextMilestoneLabel');
        if (labelEl) labelEl.textContent = `🎉 Next: ${nextYear}${this.ordinal(nextYear)} Anniversary — 14/06/${nextY}`;

        // Together counter
        let years = y - this.startY;
        let months = m - this.startM;
        let days2 = d - this.startD;
        if (days2 < 0) {
            months--;
            days2 += new Date(y, m, 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Live clock - hours, minutes, seconds from current time
        const hours = h;
        const minutes = min;
        const seconds = s;

        if (elements.togetherYears) elements.togetherYears.textContent = years;
        if (elements.togetherMonths) elements.togetherMonths.textContent = months;
        if (elements.togetherDays) elements.togetherDays.textContent = days2;
        if (elements.togetherHours) elements.togetherHours.textContent = hours;
        if (elements.togetherMinutes) elements.togetherMinutes.textContent = minutes;
        if (elements.togetherSeconds) elements.togetherSeconds.textContent = seconds;
    }

    ordinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    }

    animate(el, val) {
        if (!el) return;
        if (parseInt(el.textContent) !== val) {
            el.style.transform = 'translateY(-10px)';
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = String(val).padStart(2, '0');
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 150);
        }
    }
}

// ========================================
// Milestones Animation
// ========================================
class MilestonesAnimator {
    constructor() {
        this.milestones = document.querySelectorAll('.milestone-card');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        this.milestones.forEach(m => this.observer.observe(m));
    }
}

// ========================================
// Scroll Reveal
// ========================================
class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        this.revealElements.forEach(el => this.observer.observe(el));
    }
}

// ========================================
// Photo Slideshow
// ========================================
class PhotoSlideshow {
    constructor() {
        this.track = elements.slideshowTrack;
        this.dotsContainer = elements.slideshowDots;
        this.toggleBtn = elements.slideshowToggle;
        this.slides = this.track.querySelectorAll('.slideshow-slide');
        this.currentIndex = 0;
        this.interval = 4000;
        this.timer = null;
        this.isPlaying = true;
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        this.createDots();
        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }

    createDots() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            this.dotsContainer.appendChild(dot);
        });
    }

    showSlide(index) {
        this.slides.forEach(s => s.classList.remove('active'));
        this.slides[index].classList.add('active');
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
    }

    startAutoPlay() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.nextSlide(), this.interval);
        this.isPlaying = true;
        if (this.toggleBtn) this.toggleBtn.textContent = '⏸';
    }

    stopAutoPlay() {
        clearInterval(this.timer);
        this.timer = null;
        this.isPlaying = false;
        if (this.toggleBtn) this.toggleBtn.textContent = '▶';
    }

    togglePlay() {
        this.isPlaying ? this.stopAutoPlay() : this.startAutoPlay();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.showSlide(index);
        if (this.isPlaying) {
            clearInterval(this.timer);
            this.timer = setInterval(() => this.nextSlide(), this.interval);
        }
    }

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePlay());
        }
        this.dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                this.goToSlide(parseInt(e.target.dataset.index));
            }
        });
        this.slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const img = slide.querySelector('img');
                if (img) {
                    const caption = slide.dataset.caption || '';
                    elements.lightboxImage.src = img.src;
                    elements.lightboxCaption.textContent = caption;
                    elements.lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
}

// ========================================
// Typewriter Effect
// ========================================
class TypewriterEffect {
    constructor() {
        this.paragraphs = document.querySelectorAll('.letter-paragraph[data-text]');
        this.speed = 50;
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    this.typeText(entry.target);
                }
            });
        }, { threshold: 0.3 });
        this.paragraphs.forEach(p => this.observer.observe(p));
    }

    typeText(element) {
        const text = element.dataset.text;
        element.textContent = '';
        element.classList.add('typing');
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, this.speed);
            } else {
                element.classList.remove('typing');
            }
        };
        type();
    }
}

// ========================================
// Confetti Effect
// ========================================
class ConfettiEffect {
    constructor() {
        this.colors = ['#FF6B8A', '#C9B1FF', '#FFD700', '#FF8FA3', '#FFFFFF'];
    }

    create() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                left: ${Math.random() * 100}%;
                top: -10px;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${this.colors[Math.floor(Math.random() * this.colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            elements.confetti.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// ========================================
// Day/Night Mode
// ========================================
class DayNightMode {
    constructor() {
        this.isNight = false;
        this.bindEvents();
    }

    bindEvents() {
        elements.dayNight.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isNight = !this.isNight;
        document.body.classList.toggle('night-mode', this.isNight);
    }
}

// ========================================
// Keyboard Shortcuts
// ========================================
class KeyboardShortcuts {
    constructor(confetti) {
        this.confetti = confetti;
        this.musicPlaying = false;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'l':
                    this.confetti.create();
                    break;
                case 'h':
                    this.createHeartRain();
                    break;
                case 'm':
                    this.toggleMusic();
                    break;
            }
        });
    }

    createHeartRain() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${Math.random() * 20 + 20}px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }
    }

    toggleMusic() {
        const fabMusic = document.getElementById('fabMusic');
        if (!elements.bgMusic.src && !elements.bgMusic.currentSrc) return;
        
        if (this.musicPlaying) {
            elements.bgMusic.pause();
            if (fabMusic) fabMusic.textContent = '🎵';
            if (fabMusic) fabMusic.classList.remove('playing');
            if (window.audioWave) window.audioWave.hide();
        } else {
            elements.bgMusic.play().catch(() => {});
            if (fabMusic) fabMusic.textContent = '🎶';
            if (fabMusic) fabMusic.classList.add('playing');
            if (window.audioWave) window.audioWave.show();
        }
        this.musicPlaying = !this.musicPlaying;
    }
}

// ========================================
// Navigation
// ========================================
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.links = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.bindEvents();
    }

    bindEvents() {
        // Show nav after scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.classList.add('visible');
            } else {
                this.nav.classList.remove('visible');
            }
        });
        
        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
        
        // Smooth scroll for nav links
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    updateActiveLink() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ========================================
// Hero Image 3D Effect
// ========================================
class HeroImage3D {
    constructor() {
        this.image = elements.heroImage;
        this.wrapper = document.querySelector('.hero-image-wrapper');
        this.bindEvents();
    }

    bindEvents() {
        this.wrapper.addEventListener('mousemove', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            this.image.style.transform = `
                perspective(1000px)
                rotateY(${x * 20}deg)
                rotateX(${-y * 20}deg)
                scale(1.05)
            `;
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            this.image.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
        });
    }
}

// ========================================
// Long Press Hidden Message
// ========================================
class LongPress {
    constructor() {
        this.heroImage = document.getElementById('heroImage');
        this.overlay = document.getElementById('secretOverlay');
        this.timer = null;
        this.hint = document.getElementById('longPressHint');
        this.bindEvents();
    }

    bindEvents() {
        if (!this.heroImage || !this.overlay) return;

        // Mouse events
        this.heroImage.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startTimer();
        });

        this.heroImage.addEventListener('mouseup', () => this.cancelTimer());
        this.heroImage.addEventListener('mouseleave', () => this.cancelTimer());

        // Touch events
        this.heroImage.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startTimer();
        }, { passive: false });

        this.heroImage.addEventListener('touchend', () => this.cancelTimer());
        this.heroImage.addEventListener('touchcancel', () => this.cancelTimer());

        // Dismiss overlay
        this.overlay.addEventListener('click', () => this.hideOverlay());
        this.overlay.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.hideOverlay();
        });
    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.showOverlay();
        }, 500);
    }

    cancelTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    showOverlay() {
        this.overlay.classList.add('show');
        if (this.hint) this.hint.style.opacity = '0';
    }

    hideOverlay() {
        this.overlay.classList.remove('show');
    }
}

// ========================================
// Audio Wave Visualizer
// ========================================
class AudioWave {
    constructor() {
        this.wave = document.getElementById('audioWave');
    }

    show() {
        if (this.wave) this.wave.classList.add('playing');
    }

    hide() {
        if (this.wave) this.wave.classList.remove('playing');
    }
}

// ========================================
// Preloader with Progress
// ========================================
class Preloader {
    constructor() {
        this.progressBar = elements.progressBar;
        this.progressText = elements.progressText;
        this.progress = 0;
        this.isComplete = false;
        this.tick = setInterval(() => this.advance(), 400);
        this.safetyTimer();
    }

    advance() {
        if (this.isComplete) return;
        this.progress += Math.random() * 18 + 8;
        if (this.progress >= 100) this.progress = 100;
        this.updateUI();
        if (this.progress >= 100) this.finish();
    }

    finish() {
        this.isComplete = true;
        clearInterval(this.tick);
    }

    safetyTimer() {
        setTimeout(() => {
            if (!this.isComplete) {
                this.progress = 100;
                this.updateUI();
                this.finish();
            }
        }, 5000);
    }

    updateUI() {
        if (this.progressBar) this.progressBar.style.width = Math.round(this.progress) + '%';
        if (this.progressText) this.progressText.textContent = Math.round(this.progress) + '%';
    }
}

// ========================================
// Parallax Scrolling
// ========================================
class ParallaxScroll {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.ticking = false;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.update();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    update() {
        const scrollY = window.scrollY;
        this.elements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = scrollY * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// ========================================
// Cherry Blossom Petal Rain
// ========================================
class PetalRain {
    constructor(container) {
        this.container = container;
        this.petals = ['🌸', '🌺'];
        this.interval = 600;
        this.timer = null;
        if (!container) return;
        this.start();
    }

    createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = this.petals[Math.floor(Math.random() * this.petals.length)];
        const size = Math.random() * 20 + 15;
        const startX = Math.random() * 100;
        const duration = Math.random() * 7 + 10;
        const delay = Math.random() * 3;
        petal.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.4 + 0.6};
        `;
        this.container.appendChild(petal);
        setTimeout(() => petal.remove(), (duration + delay) * 1000);
    }

    start() {
        this.createPetal();
        this.timer = setInterval(() => this.createPetal(), this.interval);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

// ========================================
// Loader
// ========================================
class Loader {
    constructor(preloader) {
        this.preloader = preloader;
        this.bindEvents();
        this.autoCheck();
    }

    bindEvents() {
        elements.loader.addEventListener('click', () => this.hide());
    }

    autoCheck() {
        const check = () => {
            if (this.preloader && this.preloader.isComplete) {
                this.hide();
            } else {
                setTimeout(check, 500);
            }
        };
        setTimeout(check, 3000);
    }

    hide() {
        elements.loader.classList.add('hidden');
        elements.mainSite.classList.remove('hidden');
        elements.mainSite.classList.add('visible');
        document.body.style.overflow = '';
    }
}

// ========================================
// Footer Date
// ========================================
function updateFooterDate() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    elements.footerDate.textContent = now.toLocaleDateString('en-IN', options);
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
    
    // Initialize all components
    const particleSystem = new ParticleSystem(elements.canvas);
    const customCursor = new CustomCursor();
    const floatingHearts = new FloatingHearts(elements.floatingHearts);
    const preloader = new Preloader();
    const loader = new Loader(preloader);
    
    // Initialize after loader
    const parallaxScroll = new ParallaxScroll();
    const petalRain = new PetalRain(elements.petalContainer);
    const quotesCarousel = new QuotesCarousel();
    const countdownTimer = new CountdownTimer();
    const milestonesAnimator = new MilestonesAnimator();
    const scrollReveal = new ScrollReveal();
    const photoSlideshow = new PhotoSlideshow();
    
    // Lightbox close handlers
    document.querySelector('.lightbox-close')?.addEventListener('click', () => {
        elements.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    elements.lightbox?.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) {
            elements.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    const typewriterEffect = new TypewriterEffect();
    const confetti = new ConfettiEffect();
    const dayNightMode = new DayNightMode();
    const keyboardShortcuts = new KeyboardShortcuts(confetti);
    const navigation = new Navigation();
    const heroImage3D = new HeroImage3D();
    const longPress = new LongPress();
    window.audioWave = new AudioWave();
    window.musicShortcut = keyboardShortcuts;
    
    // Update footer date
    updateFooterDate();
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                quotesCarousel.next();
            } else {
                quotesCarousel.prev();
            }
        }
    }
    
    console.log('❤️ Anniversary Website Loaded - Press L for confetti, H for hearts, M for music');

    // ========================================
    // Floating Action Buttons (Mobile Friendly)
    // ========================================
    const fabToggle = document.getElementById('fabToggle');
    const fabMenu = document.getElementById('fabMenu');
    const fabConfetti = document.getElementById('fabConfetti');
    const fabHearts = document.getElementById('fabHearts');
    const fabMusic = document.getElementById('fabMusic');

    if (fabToggle) {
        fabToggle.addEventListener('click', () => {
            fabToggle.classList.toggle('open');
            fabMenu.classList.toggle('open');
        });
    }

    if (fabConfetti) {
        fabConfetti.addEventListener('click', () => {
            confetti.create();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }

    if (fabHearts) {
        fabHearts.addEventListener('click', () => {
            keyboardShortcuts.createHeartRain();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }

    if (fabMusic) {
        fabMusic.addEventListener('click', () => {
            keyboardShortcuts.toggleMusic();
            fabToggle.classList.remove('open');
            fabMenu.classList.remove('open');
        });
    }
});
