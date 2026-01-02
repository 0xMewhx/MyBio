// Terminal Effect - Hollywood Style
class TerminalEffect {
    constructor() {
        this.terminal = document.getElementById('terminal-content');
        this.commands = [
            ' initializing system...',
            ' loading kernel modules...',
            ' mounting file systems...',
            ' [OK] network interfaces configured',
            ' [OK] firewall rules loaded',
            ' [OK] SSL certificates verified',
            ' connecting to remote host...',
            ' 172.234.100.5: connection established',
            ' analyzing packet structure...',
            ' protocol: custom HTTP (kuA)',
            ' payload: decoded successfully',
            ' [ALERT] suspicious activity detected',
            ' initiating counter-measures...',
            ' arp spoofing: ACTIVE',
            ' traffic redirection: ENABLED',
            ' [OK] target identification complete',
            ' analyzing network topology...',
            ' gateway: 192.168.0.1',
            ' hosts: 192.168.0.100, 192.168.0.108',
            ' [INFO] guest device .105 flagged',
            ' C2 server: 172.234.100.5 (Linode, SE)',
            ' protocol reverse engineering...',
            ' extracting headers...',
            ' Host: www.paymenthardwarenoteglow.com',
            ' Cookie: N=7SSEwErthhY',
            ' Content-Type: text/plain; charset=utf-8',
            ' method: kuA (custom)',
            ' crafting payload...',
            ' sending test request...',
            ' response: 404 Not Found',
            ' fuzzing protocol...',
            ' input: /dev/urandom (212 bytes)',
            ' response: chunk hex-length error',
            ' server stability: COMPROMISED',
            ' injecting banner...',
            ' "0xMew protected" > logs',
            ' [SUCCESS] C2 corrupted',
            ' logging session...',
            ' user: 0xMew',
            ' privilege: root',
            ' access: granted',
            ' system status: secure',
            ' uptime: ' + this.getUptime(),
            ' memory: ' + this.getMemoryUsage(),
            ' load average: 0.15, 0.08, 0.03',
            ' _',
        ];
        this.currentLine = 0;
        this.typeSpeed = 30;
        this.lineDelay = 100;
        this.init();
    }

    init() {
        this.typeLine();
    }

    getUptime() {
        const days = Math.floor(Math.random() * 15) + 1;
        const hours = Math.floor(Math.random() * 24);
        const mins = Math.floor(Math.random() * 60);
        return `${days}d ${hours}h ${mins}m`;
    }

    getMemoryUsage() {
        const used = (Math.random() * 2 + 0.5).toFixed(2);
        const total = '16.00';
        return `${used}GB / ${total}GB`;
    }

    typeLine() {
        if (this.currentLine >= this.commands.length) {
            this.currentLine = 0;
            this.terminal.innerHTML = '';
        }

        const line = this.commands[this.currentLine];
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        lineElement.style.opacity = '0';

        // Add different prefixes based on content
        let formattedLine = line;
        if (line.includes('[OK]')) {
            formattedLine = line.replace('[OK]', '<span style="color: #22c55e;">[OK]</span>');
        } else if (line.includes('[ALERT]')) {
            formattedLine = line.replace('[ALERT]', '<span style="color: #f59e0b;">[ALERT]</span>');
        } else if (line.includes('[INFO]')) {
            formattedLine = line.replace('[INFO]', '<span style="color: #3b82f6;">[INFO]</span>');
        } else if (line.includes('[SUCCESS]')) {
            formattedLine = line.replace('[SUCCESS]', '<span style="color: #22c55e;">[SUCCESS]</span>');
        } else if (line.includes('[ERROR]') || line.includes('error')) {
            formattedLine = line.replace('[ERROR]', '<span style="color: #ef4444;">[ERROR]</span>');
            formattedLine = formattedLine.replace('error', '<span style="color: #ef4444;">error</span>');
        } else if (line.includes('_')) {
            formattedLine = '<span style="color: #22c55e;">></span> <span class="cursor">_</span>';
        } else if (line.startsWith(' ')) {
            formattedLine = '<span style="color: #3b82f6;">│</span>' + formattedLine;
        }

        lineElement.innerHTML = formattedLine;
        this.terminal.appendChild(lineElement);

        // Fade in
        setTimeout(() => {
            lineElement.style.transition = 'opacity 0.3s ease';
            lineElement.style.opacity = '1';
        }, 10);

        this.currentLine++;

        // Random delay for more natural feel
        const delay = this.lineDelay + Math.random() * 200;

        setTimeout(() => this.typeLine(), delay);
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect for hero title
class TypeWriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start terminal effect
    new TerminalEffect();

    // Typing effect for hero
    const heroTitle = document.querySelector('.typing-effect');
    if (heroTitle) {
        const texts = ['Cyber Security', 'Network', 'Linux', 'Security'];
        // Only start if not already set by server-side rendering
        if (!heroTitle.hasAttribute('data-rendered')) {
            // Keep the data-text value as static content
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card, .philosophy-content').forEach(el => {
        observer.observe(el);
    });

    // Add hover effect to skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Dynamic stat counter animation
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.textContent;
        if (target.includes('%') || target.includes('∞') || target.includes('0')) {
            return; // Skip non-numeric stats
        }

        const numericValue = parseInt(target);
        let current = 0;
        const increment = numericValue / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });

    // Cursor blink effect
    let cursorVisible = true;
    setInterval(() => {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.opacity = cursorVisible ? '1' : '0';
        });
        cursorVisible = !cursorVisible;
    }, 500);

    // Add click effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(124, 58, 237, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .skill-card, .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Console log signature
console.log('%c 0xMew ', 'background: #7c3aed; color: white; font-size: 20px; padding: 10px;');
console.log('%c Security Researcher & Network Explorer ', 'color: #a855f7; font-size: 12px;');
console.log('%c "If not me, then who?" ', 'color: #8888a0; font-style: italic;');
