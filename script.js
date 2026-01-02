// Terminal Effect - /dev/urandom style
class TerminalEffect {
    constructor() {
        this.terminal = document.getElementById('terminal-content');
        this.commands = [
            // System boot
            '[BOOT] kernel loaded',
            '[BOOT] initial RAM disk loaded',
            '[OK] network namespace created',
            '[OK] net.ipv4.ip_forward = 1',
            '[OK] iptables: FORWARD policy DROP',
            '',
            // Network scan
            'scanning 192.168.0.0/24...',
            '192.168.0.1 : TP-LINK router',
            '192.168.0.100 : Samsung phone',
            '192.168.0.101 : localhost (ME)',
            '192.168.0.105 : Unknown (SUSPICIOUS)',
            '192.168.0.108 : iPhone (mom)',
            '',
            // ARP spoofing
            '[ARP] poisoning: 192.168.0.100 <- 192.168.0.101',
            '[ARP] poisoning: 192.168.0.108 <- 192.168.0.101',
            '[ARP] target count: 2',
            '',
            // C2 investigation
            '[PKT] 192.168.0.105 -> 172.234.100.5:80',
            '[ANALYSIS] C2 server: Linode, Stockholm',
            '[ANALYSIS] Protocol: custom HTTP (kuA)',
            '[RE] headers: Host, Cookie, Content-Type',
            '',
            // Fuzzing
            '[FUZZ] /dev/urandom: 212 bytes',
            '[RESP] 404 Not Found',
            '[ERROR] chunk hex-length error',
            '[SUCCESS] C2 server corrupted',
            '',
            // Banner injection
            '[INJECT] 0xMew protected > logs',
            '[SUCCESS] logs filled with ASCII art',
            '',
            // Minecraft
            '[MC] server: MyMine.fun',
            '[MC] version: 1.20.1 (Fabric)',
            '[MC] mods: Create, Better Combat',
            '',
            // Shell history
            '0xMew@arch:~$ nmap -sS 192.168.0.0/24',
            '0xMew@arch:~$ tcpdump -i wlan0 -w capture.pcap',
            '0xMew@arch:~$ bettercap -iface wlan0',
            '0xMew@arch:~$ sudo iptables -I FORWARD -j DROP',
            '',
            // Random /dev/urandom
            this.generateHex(60),
            this.generateHex(60),
            this.generateHex(60),
            '',
            // Process list
            '  PID TTY          TIME CMD',
            '    1 ?        00:00:01 systemd',
            '  420 ?        00:00:00 bash',
            ' 1337 ?        00:00:05 bettercap',
            ' 7331 ?        00:00:01 tcpdump',
            '',
            // System info
            'hostname: arch',
            'kernel: Linux 6.12.1-arch1-1',
            'uptime: ' + this.getUptime(),
            'memory: ' + this.getMemory(),
            '',
            'load average: 0.' + Math.floor(Math.random() * 30 + 5) + ', 0.' + Math.floor(Math.random() * 20 + 3) + ', 0.' + Math.floor(Math.random() * 15 + 1),
            '',
            // Cursor
            '0xMew@arch:~$ _',
        ];
        this.currentLine = 0;
        this.lineDelay = 100;
        this.init();
    }

    init() {
        this.typeLine();
    }

    generateHex(length) {
        const chars = '0123456789abcdef';
        let result = '0x';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    getUptime() {
        const days = Math.floor(Math.random() * 10) + 1;
        const hours = Math.floor(Math.random() * 24);
        const mins = Math.floor(Math.random() * 60);
        return days + 'd ' + hours + 'h ' + mins + 'm';
    }

    getMemory() {
        const used = (Math.random() * 3 + 1).toFixed(2);
        return used + 'GB / 16.00GB';
    }

    typeLine() {
    // Если линий стало слишком много (например, больше 50), очищаем или переносим
        if (this.currentLine >= this.commands.length) {
            this.currentLine = 0;
        // Вместо полной очистки можно оставить последние строки для плавности
            if (this.terminal.childNodes.length > 50) {
                this.terminal.innerHTML = ''; 
            }
        }

    const line = this.commands[this.currentLine];
    const lineElement = document.createElement('div');
    
    // Делаем текст в терминале чуть более случайным по позиции, чтобы заполнить экран
    lineElement.style.paddingLeft = Math.random() * 20 + 'px';
    lineElement.style.opacity = '0';

    let formatted = this.formatLine(line);
    lineElement.innerHTML = formatted;
    this.terminal.appendChild(lineElement);

    // Автопрокрутка вниз, если контента много
    this.terminal.scrollTop = this.terminal.scrollHeight;

    setTimeout(() => {
        lineElement.style.transition = 'opacity 0.2s ease';
        lineElement.style.opacity = '1';
    }, 5);

    this.currentLine++;
    // Ускоряем вывод, чтобы текста было визуально "много"
    const delay = 40 + Math.random() * 40; 
    setTimeout(() => this.typeLine(), delay);
}
        const line = this.commands[this.currentLine];
        const lineElement = document.createElement('div');
        lineElement.style.opacity = '0';

        let formatted = this.formatLine(line);
        lineElement.innerHTML = formatted;
        this.terminal.appendChild(lineElement);

        setTimeout(() => {
            lineElement.style.transition = 'opacity 0.2s ease';
            lineElement.style.opacity = '1';
        }, 5);

        this.currentLine++;
        const delay = this.lineDelay + Math.random() * 80;
        setTimeout(() => this.typeLine(), delay);
    }

    formatLine(line) {
        let formatted = line;

        if (line.includes('[BOOT]')) {
            formatted = '<span style="color: #3b82f6;">[BOOT]</span>' + line.substring(6);
        } else if (line.includes('[OK]')) {
            formatted = '<span style="color: #22c55e;">[OK]</span>' + line.substring(4);
        } else if (line.includes('[ARP]')) {
            formatted = '<span style="color: #8b5cf6;">[ARP]</span>' + line.substring(5);
        } else if (line.includes('[PKT]') || line.includes('[ANALYSIS]')) {
            formatted = '<span style="color: #06b6d4;">[ANALYSIS]</span>' + line.substring(11);
        } else if (line.includes('[RE]')) {
            formatted = '<span style="color: #f59e0b;">[RE]</span>' + line.substring(4);
        } else if (line.includes('[FUZZ]')) {
            formatted = '<span style="color: #ec4899;">[FUZZ]</span>' + line.substring(6);
        } else if (line.includes('[INJECT]')) {
            formatted = '<span style="color: #a855f7;">[INJECT]</span>' + line.substring(8);
        } else if (line.includes('[ERROR]')) {
            formatted = '<span style="color: #ef4444;">[ERROR]</span>' + line.substring(7);
        } else if (line.includes('[SUCCESS]')) {
            formatted = '<span style="color: #22c55e;">[SUCCESS]</span>' + line.substring(9);
        } else if (line.includes('[MC]')) {
            formatted = '<span style="color: #22c55e;">[MC]</span>' + line.substring(4);
        } else if (line.includes('0xMew@')) {
            formatted = '<span style="color: #a855f7;">' + line.split('@')[0] + '</span>@' + line.split('@')[1];
        } else if (line.includes('PID') || line.startsWith('  ')) {
            formatted = '<span style="color: rgba(168,85,247,0.3);">' + line + '</span>';
        } else if (line === '') {
            return '<br>';
        } else if (line.includes('_')) {
            return '<span style="color: #22c55e;">></span> <span class="cursor">_</span>';
        }

        return formatted;
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new TerminalEffect();

    // Hover effects
    document.querySelectorAll('.project-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Cursor blink
    let cursorVisible = true;
    setInterval(() => {
        document.querySelectorAll('.cursor').forEach(cursor => {
            cursor.style.opacity = cursorVisible ? '1' : '0';
        });
        cursorVisible = !cursorVisible;
    }, 500);

    // Console signature
    console.log('%c 0xMew ', 'background: #7c3aed; color: white; font-size: 16px; padding: 8px;');
    console.log('%c just a guy who breaks things ', 'color: #a855f7; font-size: 11px;');
});

// Add cursor CSS
const style = document.createElement('style');
style.textContent = `
    .cursor {
        display: inline-block;
        width: 8px;
        height: 1.2em;
        background: #22c55e;
        vertical-align: middle;
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    .project-card, .contact-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
