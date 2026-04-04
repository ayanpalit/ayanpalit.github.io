/* ═══════════════════════════════════════════════════════════
   PORTFOLIO OS — MAIN SCRIPT
   OS Boot Animation · Typewriter · Progress Bars
   Author: Ayan Palit
══════════════════════════════════════════════════════════════ */

'use strict';

/* ── BOOT SEQUENCE CONFIG ─────────────────────────────────── */
const BOOT_LINES = [
    { text: 'initializing profile ...', tag: 'INIT', delay: 0 },
    { text: 'loading frontend modules', tag: 'MODULE', delay: 700 },
    { text: 'loading backend services', tag: 'MODULE', delay: 1400 },
    { text: 'connecting cloud services', tag: 'CLOUD', delay: 2100 },
    { text: 'deploying AI extensions', tag: 'AI/ML', delay: 2800 },
    { text: 'system status: production ready', tag: 'OK', delay: 3500 },
];

const PROGRESS_MODULES = [
    { label: 'React.js', pct: 90, color: '', delay: 700 },
    { label: 'Spring Boot', pct: 88, color: 'violet', delay: 1100 },
    { label: 'OpenAI / LLMs', pct: 82, color: 'accent', delay: 1500 },
    { label: 'AWS Cloud', pct: 80, color: 'green', delay: 1900 },
    { label: 'Docker / CI/CD', pct: 76, color: 'green', delay: 2300 },
];

const TYPEWRITER_ROLES = [
    'Full-Stack Engineer',
    'AI Builder',
    'Microservices Architect',
    'React · Spring Boot Dev',
];

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    startBootSequence();
    initClock();
    initUptime();
    initNavScrollSpy();
    initRevealObserver();
    initCareerExpress();
    initStoryPanels();
    initSkillBars();

    // skip on spacebar / enter
    const skipFn = (e) => {
        if (e.code === 'Space' || e.code === 'Enter') skipBoot();
    };
    document.addEventListener('keydown', skipFn, { once: true });
    // tap to skip on mobile
    document.getElementById('bootScreen').addEventListener('click', skipBoot, { once: true });
});

/* ══════════════════════════════════════════════════════════
   BOOT SEQUENCE
══════════════════════════════════════════════════════════ */
let bootDone = false;

function startBootSequence() {
    const output = document.getElementById('terminalOutput');
    const pbSection = document.getElementById('bootProgressSection');
    const pbContainer = document.getElementById('progressBars');

    // Render terminal lines
    BOOT_LINES.forEach((line, i) => {
        setTimeout(() => {
            if (bootDone) return;
            const isLast = i === BOOT_LINES.length - 1;
            const div = document.createElement('div');
            div.className = `boot-line ${isLast ? 'ok' : 'spin'}`;

            const icon = document.createElement('span');
            icon.className = 'boot-line-icon';

            const text = document.createElement('span');
            text.className = 'boot-line-text';
            text.textContent = '> ' + line.text;

            const tag = document.createElement('span');
            tag.className = 'boot-line-tag';
            tag.textContent = line.tag;

            div.appendChild(icon);
            div.appendChild(text);
            div.appendChild(tag);

            // Add blinking cursor to last non-final line
            if (!isLast) {
                const cursor = document.createElement('span');
                cursor.className = 'boot-cursor';
                text.appendChild(cursor);
            }

            output.appendChild(div);

            // After added, mark previous spin lines as ok
            if (i > 0) {
                const prev = output.querySelectorAll('.boot-line.spin');
                prev.forEach(p => {
                    p.classList.remove('spin');
                    p.classList.add('ok');
                    // remove cursor from previous
                    const c = p.querySelector('.boot-cursor');
                    if (c) c.remove();
                });
            }

            // Show progress bars after 2nd line
            if (i === 1) {
                pbSection.style.display = 'block';
                renderProgressBars(pbContainer);
            }

            // Finish boot after last line
            if (isLast) {
                setTimeout(() => completeBoot(), 900);
            }
        }, line.delay);
    });
}

function renderProgressBars(container) {
    PROGRESS_MODULES.forEach((mod) => {
        setTimeout(() => {
            if (bootDone) return;

            const row = document.createElement('div');
            row.className = 'pbar-row';

            const label = document.createElement('span');
            label.className = 'pbar-label';
            label.textContent = mod.label;

            const track = document.createElement('div');
            track.className = 'pbar-track';

            const fill = document.createElement('div');
            fill.className = `pbar-fill ${mod.color}`;

            const pct = document.createElement('span');
            pct.className = 'pbar-pct';
            pct.textContent = '0%';

            track.appendChild(fill);
            row.appendChild(label);
            row.appendChild(track);
            row.appendChild(pct);
            container.appendChild(row);

            // Animate fill
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fill.style.width = mod.pct + '%';
                    // Animate counter
                    animateCounter(pct, 0, mod.pct, 1200, '', '%');
                });
            });
        }, mod.delay);
    });
}

function animateCounter(el, from, to, duration, prefix = '', suffix = '') {
    const start = performance.now();
    const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const val = Math.round(from + (to - from) * easeOut(progress));
        el.textContent = prefix + val + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function completeBoot() {
    bootDone = true;
    const screen = document.getElementById('bootScreen');
    screen.classList.add('done');

    // Reveal hero content
    setTimeout(() => {
        const heroContent = document.getElementById('heroContent');
        const heroCard = document.getElementById('heroTerminalCard');
        const heroScroll = document.getElementById('heroScroll');
        heroContent.classList.add('visible');
        heroCard.classList.add('visible');

        // Start typewriter on hero path
        startHeroTypewriter();
    }, 400);
}

function skipBoot() {
    if (bootDone) return;
    bootDone = true;
    const screen = document.getElementById('bootScreen');
    screen.classList.add('done');
    setTimeout(() => {
        document.getElementById('heroContent').classList.add('visible');
        document.getElementById('heroTerminalCard').classList.add('visible');
        startHeroTypewriter();
    }, 400);
}

/* ══════════════════════════════════════════════════════════
   HERO TYPEWRITER
══════════════════════════════════════════════════════════ */
function startHeroTypewriter() {
    const el = document.getElementById('heroRoleTyped');
    const cursor = document.getElementById('heroCursorInline');
    let roleIdx = 0;

    function typeRole(text, cb) {
        let i = 0;
        el.textContent = '';
        const iv = setInterval(() => {
            el.textContent += text[i++];
            if (i >= text.length) {
                clearInterval(iv);
                setTimeout(cb, 1800);
            }
        }, 55);
    }

    function eraseRole(cb) {
        const iv = setInterval(() => {
            const cur = el.textContent;
            if (!cur.length) { clearInterval(iv); cb(); return; }
            el.textContent = cur.slice(0, -1);
        }, 30);
    }

    function cycle() {
        typeRole(TYPEWRITER_ROLES[roleIdx], () => {
            eraseRole(() => {
                roleIdx = (roleIdx + 1) % TYPEWRITER_ROLES.length;
                cycle();
            });
        });
    }

    setTimeout(cycle, 300);
}

/* ══════════════════════════════════════════════════════════
   LIVE CLOCK & UPTIME
══════════════════════════════════════════════════════════ */
function initClock() {
    const el = document.getElementById('htcTime');
    function update() {
        const now = new Date();
        el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    }
    update();
    setInterval(update, 1000);
}

function initUptime() {
    const el = document.getElementById('htcUptime');
    // Simulated start time ~2 years back (symbolic)
    const start = new Date();
    start.setFullYear(start.getFullYear() - 2);

    function update() {
        const diff = Date.now() - start.getTime();
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        el.textContent = `${days}d ${hours}h ${mins}m`;
    }
    update();
    setInterval(update, 60000);
}

/* ══════════════════════════════════════════════════════════
   NAVBAR SCROLL SPY & PARALLAX
══════════════════════════════════════════════════════════ */
function initNavScrollSpy() {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const rootJump = document.getElementById('rootJump');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky style
        navbar.classList.toggle('scrolled', scrollY > 20);

        // Global parallax variable
        document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

        // Root jump visibility
        if (rootJump) {
            if (scrollY > window.innerHeight * 0.8) {
                if (!rootJump.classList.contains('show')) {
                    rootJump.classList.add('show');
                    // Typewriter effect
                    if (!rootJump.dataset.typed) {
                        rootJump.dataset.typed = 'true';
                        const cmdEl = document.getElementById('rjCmd');
                        if (cmdEl) {
                            const text = "cd ~/root";
                            cmdEl.textContent = "";
                            let i = 0;
                            const typeInterval = setInterval(() => {
                                cmdEl.textContent += text.charAt(i);
                                i++;
                                if (i >= text.length) clearInterval(typeInterval);
                            }, 80);
                        }
                    }
                }
            } else {
                rootJump.classList.remove('show');
            }
        }

        // Active link
        let current = '';
        sections.forEach(s => {
            if (scrollY >= s.offsetTop - 100) current = s.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    if (rootJump) {
        rootJump.addEventListener('click', () => {
            // Flash effect
            rootJump.classList.add('terminal-flash');

            setTimeout(() => {
                rootJump.classList.remove('terminal-flash');

                // Shimmer reflow trigger
                rootJump.classList.remove('shimmer');
                void rootJump.offsetWidth; // force reflow
                rootJump.classList.add('shimmer');

                // Trigger scroll
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 120);
        });
    }
}

/* ══════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — REVEAL
══════════════════════════════════════════════════════════ */
function initRevealObserver() {
    // Add reveal class to section children
    document.querySelectorAll('.skill-group, .project-card, .timeline-item, .info-card, .cert-badge, .contact-item, .contact-terminal, .about-text, .rt-node, .cv-card, .animate-metric').forEach((el, i) => {
        el.classList.add('reveal');
        if (!el.classList.contains('cv-card') && !el.classList.contains('rt-node')) {
            el.style.transitionDelay = (i % 4) * 80 + 'ms';
        }
    });

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');

                if (e.target.classList.contains('animate-metric')) {
                    const valEl = e.target.querySelector('.pw-metric-val');
                    if (valEl && valEl.dataset.target) {
                        const target = parseInt(valEl.dataset.target, 10);
                        const prefix = valEl.dataset.prefix || '';
                        const suffix = valEl.dataset.suffix || '';
                        animateCounter(valEl, 0, target, 1200, prefix, suffix);
                    }
                }

                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    document.querySelectorAll('.section').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════════════════════════
   SKILL BARS — ANIMATE ON SCROLL
══════════════════════════════════════════════════════════ */
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill[data-w]');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = e.target.getAttribute('data-w');
                e.target.style.width = target + '%';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(f => obs.observe(f));
}

/* ══════════════════════════════════════════════════════════
   PROJECTS WORKSPACE — ARCHITECTURE DRAWER
══════════════════════════════════════════════════════════ */
function toggleDrawer(btn, drawerId) {
    const drawer = document.getElementById(drawerId);
    const isOpen = drawer.classList.contains('open');

    // Close all other drawers first
    document.querySelectorAll('.pw-drawer.open').forEach(d => {
        if (d.id !== drawerId) {
            d.classList.remove('open');
            const sibling = d.previousElementSibling;
            if (sibling && sibling.classList.contains('pw-drawer-toggle')) {
                sibling.setAttribute('aria-expanded', 'false');
                sibling.querySelector('.pw-drawer-hint').textContent = 'View system design';
            }
        }
    });

    // Toggle target drawer
    drawer.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.querySelector('.pw-drawer-hint').textContent = isOpen ? 'View system design' : 'Close diagram';
}


/* ══════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════ */
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
        btn.textContent = '✓ Sent!';
        document.getElementById('ctSuccess').style.display = 'block';
        e.target.reset();
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            document.getElementById('ctSuccess').style.display = 'none';
        }, 4000);
    }, 1200);
}

/* ══════════════════════════════════════════════════════════
   MOBILE NAV TOGGLE
══════════════════════════════════════════════════════════ */
document.getElementById('navToggle').addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? '' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = 'var(--nav-h)';
    links.style.left = '0'; links.style.right = '0';
    links.style.background = 'rgba(4,6,15,.98)';
    links.style.padding = '16px 24px';
    links.style.borderBottom = '1px solid var(--c-border)';
});

/* ══════════════════════════════════════════════════════════
   RELEASE TIMELINE — DRAG TO SCROLL
══════════════════════════════════════════════════════════ */
(function () {
    const rail = document.querySelector('.timeline-scroll');
    if (!rail) return;

    let isDown = false, startX = 0, scrollLeft = 0;

    rail.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - rail.offsetLeft;
        scrollLeft = rail.scrollLeft;
        rail.style.userSelect = 'none';
    });
    document.addEventListener('mouseup', () => {
        isDown = false;
        rail.style.userSelect = '';
    });
    rail.addEventListener('mouseleave', () => { isDown = false; });
    rail.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - rail.offsetLeft;
        const walk = (x - startX) * 1.4;
        rail.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX = 0, touchScrollLeft = 0;
    rail.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = rail.scrollLeft;
    }, { passive: true });
    rail.addEventListener('touchmove', e => {
        const dx = touchStartX - e.touches[0].pageX;
        rail.scrollLeft = touchScrollLeft + dx;
    }, { passive: true });

    rail.addEventListener('wheel', e => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            rail.scrollLeft += e.deltaY;
        }
    }, { passive: false });
})();

/* ══════════════════════════════════════════════════════════
   RECRUITER TERMINAL COMMANDS
══════════════════════════════════════════════════════════ */
const recInput = document.getElementById('recruiterInput');
if (recInput) {
    recInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value.trim().toLowerCase();
            if (val === 'connect --linkedin') {
                window.open('https://linkedin.com/in/ayan-palit-860568211', '_blank');
            } else if (val === 'open --github') {
                alert('GitHub link not available in provided records.');
            } else if (val === 'resume --download') {
                const a = document.createElement('a');
                a.href = 'Ayan_palit-resume-1.pdf';
                a.download = 'Ayan_palit-resume-1.pdf';
                a.click();
            } else if (val === 'message --ayan') {
                document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.getElementById('fname').focus();
            } else if (val !== '') {
                alert(`Command not found: ${val}\nType 'help commands' to see available options.`);
            }
            e.target.value = '';
        }
    });
}

/* ══════════════════════════════════════════════════════════
   CAREER EXPRESS TIMELINE CAPSULE
══════════════════════════════════════════════════════════ */
function initCareerExpress() {
    const scrollContainer = document.querySelector('.timeline-scroll');
    const express = document.getElementById('careerExpress');
    const track = document.querySelector('.rt-track-line');
    const nodes = document.querySelectorAll('.rt-node');

    if (!scrollContainer || !express || !track) return;

    let isMoving = false;
    let moveTimeout = null;
    let currentX = 0;
    let targetX = 0;

    // Animation loop for smooth lerp
    function lerpLoop() {
        currentX += (targetX - currentX) * 0.08;
        express.style.transform = `translateX(${currentX}px)`;

        // Node illumination logic
        const capsuleCenter = currentX + 80 + 12; // left offset + half width

        nodes.forEach(node => {
            const nodeCenter = node.offsetLeft + (node.offsetWidth / 2);
            if (Math.abs(capsuleCenter - nodeCenter) < 40) {
                node.classList.add('express-lit');
            } else {
                node.classList.remove('express-lit');
            }
        });

        requestAnimationFrame(lerpLoop);
    }
    lerpLoop();

    scrollContainer.addEventListener('scroll', () => {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll <= 0) return;

        const scrollPct = scrollContainer.scrollLeft / maxScroll;
        const trackWidth = track.clientWidth;

        targetX = scrollPct * (trackWidth - 24);

        if (!isMoving) {
            isMoving = true;
            express.classList.add('moving');
        }

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
            express.classList.remove('moving');
        }, 150);
    }, { passive: true });
}

/* ══════════════════════════════════════════════════════════
   ENGINEERING STORY PANELS — INTERACTIVE MILESTONE STATIONS
══════════════════════════════════════════════════════════ */
function initStoryPanels() {
    const scroll = document.querySelector('.timeline-scroll');
    const cards = document.querySelectorAll('.rt-card');
    const nodes = document.querySelectorAll('.rt-node');

    if (!scroll || !cards.length) return;

    const PANEL_W = 256;  // px — must match CSS width + gap
    const PANEL_GAP = 14;

    function computePlacement(card) {
        const cardRect = card.getBoundingClientRect();
        const vpW = window.innerWidth;
        const rightSpace = vpW - cardRect.right;
        const leftSpace = cardRect.left;

        if (rightSpace >= PANEL_W + PANEL_GAP) return 'right';
        if (leftSpace >= PANEL_W + PANEL_GAP) return 'left';
        return 'below';
    }

    function activateCard(card) {
        const parentNode = card.closest('.rt-node');
        if (!parentNode) return;

        // 1. Clear all previous states
        nodes.forEach(n => {
            n.classList.remove('node-active');
            const p = n.querySelector('.rt-story-panel');
            if (p) p.removeAttribute('data-placement');
        });

        // 2. Determine collision-safe placement
        const panel = card.querySelector('.rt-story-panel');
        const placement = computePlacement(card);
        if (panel) panel.setAttribute('data-placement', placement);

        // 3. Activate — CSS transition fires
        parentNode.classList.add('node-active');

        // 4. Smoothly center the scroll wrapper on this card
        //    The Career Express lerp follows naturally
        const center = card.offsetLeft - (scroll.clientWidth / 2) + (card.offsetWidth / 2);
        scroll.scrollTo({ left: center, behavior: 'smooth' });
    }

    cards.forEach(card => {
        card.addEventListener('click', e => {
            e.stopPropagation();
            activateCard(card);
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!e.target.closest('.rt-node')) {
            nodes.forEach(n => {
                n.classList.remove('node-active');
                const p = n.querySelector('.rt-story-panel');
                if (p) p.removeAttribute('data-placement');
            });
        }
    });
}
