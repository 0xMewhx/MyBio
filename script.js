// Terminal Effect - /dev/urandom style with real case references
class TerminalEffect {
    constructor() {
        this.terminal = document.getElementById('terminal-content');
        this.commands = [
            // System boot
            ' [BOOT] kernel loaded at 0xffffffff80000000',
            ' [BOOT] initial RAM disk: /boot/initramfs-linux.img',
            ' [BOOT] systemd-journald: Journal started',
            ' [OK] network namespace created',
            ' [OK] net.ipv4.ip_forward = 1',
            ' [OK] iptables: FORWARD policy DROP',
            '',
            // Network scanning
            ' scanning 192.168.0.0/24...',
            ' 192.168.0.1   : TP-LINK router     [ gateway ]',
            ' 192.168.0.100 : Samsung SM-G990B  [ phone ]',
            ' 192.168.0.101 : localhost          [ ME ]',
            ' 192.168.0.105 : Unknown device     [ SUSPICIOUS ]',
            ' 192.168.0.108 : iPhone             [ mom ]',
            '',
            // ARP spoofing status
            ' [ARP] poisoning: 192.168.0.100 <- 192.168.0.101',
            ' [ARP] poisoning: 192.168.0.108 <- 192.168.0.101',
            ' [ARP] target count: 2',
            ' [INFO] redirecting DNS queries...',
            '',
            // Packet analysis
            ' [PKT] TCP: 192.168.0.105:48132 -> 172.234.100.5:80',
            ' [PKT] TCP: 192.168.0.105:48133 -> 172.234.100.5:80',
            ' [PKT] TCP: 192.168.0.105:48134 -> 172.234.100.5:80',
            ' [HTTP] POST /api/cmd HTTP/1.1',
            ' [HTTP] Host: www.paymenthardwarenoteglow.com',
            ' [HTTP] Cookie: N=7SSEwErthhY',
            ' [HTTP] Content-Type: text/plain; charset=utf-8',
            ' [HTTP] Content-Length: 47',
            ' [DATA] 0x1a3d8f2b4c5e9d0f1a2b3c4d5e6f7a8b',
            '',
            // C2 investigation
            ' [ANALYSIS] C2 server identified: 172.234.100.5',
            ' [ANALYSIS] Hosting: Linode, Stockholm, Sweden',
            ' [ANALYSIS] Protocol: custom HTTP (method: kuA)',
            ' [ANALYSIS] SSL: yes (Let\'s Encrypt)',
            '',
            // Reverse engineering
            ' [RE] extracting protocol structure...',
            ' [RE] method: kuA (custom, not standard)',
            ' [RE] headers: Host, Cookie, Content-Type',
            ' [RE] payload: encrypted, 32-byte blocks',
            ' [RE] response: 200 OK (empty body)',
            '',
            // Fuzzing the C2
            ' [FUZZ] generating random payload...',
            ' [FUZZ] /dev/urandom: 212 bytes written',
            ' [FUZZ] sending to 172.234.100.5:80...',
            ' [RESP] HTTP/1.1 404 Not Found',
            ' [RESP] chunked transfer encoding error',
            ' [ERROR] chunk hex-length char not a hex digit: 0xd',
            ' [FUZZ] server confused: SUCCESS',
            '',
            // Banner injection
            ' [INJECT] crafting ASCII art payload...',
            ' [INJECT] ' + this.generateRandomHex(40),
            ' [INJECT] ' + this.generateRandomHex(40),
            ' [INJECT] sending banner to C2 server...',
            ' [LOG] 0xMew protected > /var/log/c2.log',
            ' [SUCCESS] C2 server logs corrupted',
            '',
            // Spam operation (accidental DDoS)
            ' [SPAM] curl command repeated...',
            ' [SPAM] request count: ' + Math.floor(Math.random() * 50 + 20),
            ' [SPAM] 172.234.100.5:80 - connection established',
            ' [SPAM] 172.234.100.5:80 - connection established',
            ' [SPAM] 172.234.100.5:80 - connection established',
            ' [WARN] accidental DDoS achieved',
            '',
            // Minecraft server
            ' [MC] server status: online',
            ' [MC] version: 1.20.1 (Fabric)',
            ' [MC] players: 0/' + Math.floor(Math.random() * 10 + 2),
            ' [MC] world: MyMine_fabric_season_3',
            ' [MC] mods loaded: ' + Math.floor(Math.random() * 40 + 60),
            '',
            // Shell history style
            ' 0xMew@arch:~$ nmap -sS 192.168.0.0/24',
            ' 0xMew@arch:~$ tcpdump -i wlan0 -w capture.pcap',
            ' 0xMew@arch:~$ bettercap -iface wlan0',
            ' 0xMew@arch:~$ curl -X kuA -d @/dev/urandom http://...',
            ' 0xMew@arch:~$ sudo iptables -I FORWARD -j DROP',
            ' 0xMew@arch:~$ echo "0xMew protected" | nc 172.234.100.5 80',
            '',
            // /dev/urandom style output
            ' ' + this.generateRandomHex(78),
            ' ' + this.generateRandomHex(78),
            ' ' + this.generateRandomHex(78),
            ' ' + this.generateRandomHex(78),
            ' ' + this.generateRandomAscii(60),
            ' ' + this.generateRandomAscii(60),
            ' ' + this.generateRandomAscii(60),
            '',
            // Process list style
            ' PID    COMMAND           %CPU   MEM',
            ' 1      /sbin/init        0.1    0.2',
            ' 420    bash              0.0    0.1',
            ' 1337   bettercap         2.5    1.8',
            ' 7331   tcpdump          0.3    0.4',
            ' 9999   curl             0.1    0.1',
            ' 31415  vim              0.0    0.1',
            '',
            // System info
            ' [INFO] hostname: arch',
            ' [INFO] kernel: Linux 6.12.1-arch1-1 x86_64',
            ' [INFO] uptime: ' + this.getUptime(),
            ' [INFO] memory: ' + this.getMemory(),
            ' [INFO] disk: /dev/sda1 256GB SSD',
            ' [INFO] cpu: AMD Ryzen 5 5600X',
            '',
            // Load average and system status
            ' load average: 0.' + Math.floor(Math.random() * 30 + 5) + ', 0.' + Math.floor(Math.random() * 20 + 3) + ', 0.' + Math.floor(Math.random() * 15 + 1),
            ' processes: ' + Math.floor(Math.random() * 150 + 80) + ' running, ' + Math.floor(Math.random() * 50 + 20) + ' sleeping',
            ' users: 1 logged in',
            '',
            // Random tech stuff
            ' [+] npm packages installed: ' + Math.floor(Math.random() * 100 + 50),
            ' [+] github commits: ' + Math.floor(Math.random() * 200 + 50),
            ' [+] cups printed: 0 (why would i?)',
            ' [+] terminal hours: ∞',
            '',
            // Final cursor
            ' 0xMew@arch:~$ _',
        ];
        this.currentLine = 0;
        this.lineDelay = 80;
        this.init();
    }

    init() {
        this.typeLine();
    }

    generateRandomHex(length) {
        const chars = '0123456789abcdef';
        let result = '0x';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    generateRandomAscii(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    getUptime() {
        const days = Math.floor(Math.random() * 10) + 1;
        const hours = Math.floor(Math.random() * 24);
        const mins = Math.floor(Math.random() * 60);
        return `${days}d ${hours}h ${mins}m`;
    }

    getMemory() {
        const used = (Math.random() * 3 + 1).toFixed(2);
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
        lineElement.style.opacity = '0';

        let formattedLine = this.formatLine(line);
        lineElement.innerHTML = formattedLine;
        this.terminal.appendChild(lineElement);

        setTimeout(() => {
            lineElement.style.transition = 'opacity 0.15s ease';
            lineElement.style.opacity = '1';
        }, 5);

        this.currentLine++;
        const delay = this.lineDelay + Math.random() * 100;
        setTimeout(() => this.typeLine(), delay);
    }

    formatLine(line) {
        // Add colors and formatting based on content
        let formatted = line;

        if (line.includes('[BOOT]')) {
            formatted = '<span style="color: #3b82f6;">[BOOT]</span>' + line.substring(6);
        } else if (line.includes('[OK]')) {
            formatted = '<span style="color: #22c55e;">[OK]</span>' + line.substring(4);
        } else if (line.includes('[ARP]')) {
            formatted = '<span style="color: #8b5cf6;">[ARP]</span>' + line.substring(5);
        } else if (line.includes('[PKT]') || line.includes('[HTTP]')) {
            formatted = '<span style="color: #06b6d4;">[PKT]</span>' + line.substring(5);
        } else if (line.includes('[ANALYSIS]') || line.includes('[RE]')) {
            formatted = '<span style="color: #f59e0b;">[ANALYSIS]</span>' + line.substring(11);
        } else if (line.includes('[FUZZ]')) {
            formatted = '<span style="color: #ec4899;">[FUZZ]</span>' + line.substring(6);
        } else if (line.includes('[INJECT]')) {
            formatted = '<span style="color: #a855f7;">[INJECT]</span>' + line.substring(8);
        } else if (line.includes('[ERROR]') || line.includes('[WARN]')) {
            formatted = '<span style="color: #ef4444;">[WARN]</span>' + line.substring(6);
        } else if (line.includes('[SUCCESS]')) {
            formatted = '<span style="color: #22c55e;">[SUCCESS]</span>' + line.substring(9);
        } else if (line.includes('[SPAM]')) {
            formatted = '<span style="color: #f97316;">[SPAM]</span>' + line.substring(6);
        } else if (line.includes('[MC]')) {
            formatted = '<span style="color: #22c55e;">[MC]</span>' + line.substring(4);
        } else if (line.includes('[INFO]')) {
            formatted = '<span style="color: #3b82f6;">[INFO]</span>' + line.substring(6);
        } else if (line.includes('0xMew@')) {
            formatted = '<span style="color: #a855f7;">' + line.split('@')[0] + '</span>@' + line.split('@')[1];
        } else if (line.includes('PID') || line.includes('---')) {
            formatted = '<span style="color: #8888a0;">' + line + '</span>';
        } else if (line.includes('_')) {
            formatted = '<span style="color: #22c55e;">></span> <span class="cursor">_</span>';
        } else if (line === '') {
            return '<br>';
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

    // Hover effects for cards
    document.querySelectorAll('.info-card, .project-card, .contact-card').forEach(card => {
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
    console.log('%c 0xMew ', 'background: #7c3aed; color: white; font-size: 18px; padding: 8px;');
    console.log('%c just a guy who breaks things ', 'color: #a855f7; font-size: 11px;');
    console.log('%c "If not me, then who?" ', 'color: #8888a0; font-style: italic;');
});

// Add cursor animation CSS
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
    .info-card, .project-card, .contact-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
