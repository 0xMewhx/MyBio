// Terminal Effect - /dev/urandom style
class TerminalEffect {
    constructor() {
        this.terminal = document.getElementById('terminal-content');
        this.commands = [
            '[BOOT] kernel loaded',
            '[BOOT] initial RAM disk loaded',
            '[OK] network namespace created',
            '[OK] net.ipv4.ip_forward = 1',
            '[OK] iptables: FORWARD policy DROP',
            '',
            'scanning 192.168.0.0/24...',
            '192.168.0.1 : TP-LINK router',
            '192.168.0.100 : Samsung phone',
            '192.168.0.101 : localhost (ME)',
            '192.168.0.105 : Unknown (SUSPICIOUS)',
            '192.168.0.108 : iPhone (mom)',
            '',
            '[ARP] poisoning: 192.168.0.100 <- 192.168.0.101',
            '[ARP] poisoning: 192.168.0.108 <- 192.168.0.101',
            '[ARP] target count: 2',
            '',
            '[PKT] 192.168.0.105 -> 172.234.100.5:80',
            '[ANALYSIS] C2 server: Linode, Stockholm',
            '[ANALYSIS] Protocol: custom HTTP (kuA)',
            '[RE] headers: Host, Cookie, Content-Type',
            '',
            '[FUZZ] /dev/urandom: 212 bytes',
            '[RESP] 404 Not Found',
            '[ERROR] chunk hex-length error',
            '[SUCCESS] C2 server corrupted',
            '',
            '[INJECT] 0xMew protected > logs',
            '[SUCCESS] logs filled with ASCII art',
            '',
            '[MC] server: MyMine.fun',
            '[MC] version: 1.20.1 (Fabric)',
            '[MC] mods: Create, Better Combat',
            '',
            '0xMew@arch:~$ nmap -sS 192.168.0.0/24',
            '0xMew@arch:~$ tcpdump -i wlan0 -w capture.pcap',
            '0xMew@arch:~$ bettercap -iface wlan0',
            '0xMew@arch:~$ sudo iptables -I FORWARD -j DROP',
            '',
            this.generateHex(60),
            this.generateHex(60),
            this.generateHex(40),
            '',
            '  PID TTY          TIME CMD',
            '    1 ?        00:00:01 systemd',
            '  420 ?        00:00:00 bash',
            ' 1337 ?        00:00:05 bettercap',
            ' 7331 ?        00:00:01 tcpdump',
            '',
            'hostname: arch',
            'kernel: Linux 6.12.1-arch1-1',
            'uptime: ' + this.getUptime(),
            'memory: ' + this.getMemory(),
            '',
            'load average: 0.' + Math.floor(Math.random() * 30 + 5) + ', 0.' + Math.floor(Math.random() * 20 + 3) + ', 0.' + Math.floor(Math.random() * 15 + 1),
            '',
            '0xMew@arch:~$ _',
        ];
        this.currentLine = 0;
        this.lineDelay = 60; // Немного ускорил
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
        return (Math.floor(Math.random() * 10) + 1) + 'd ' + Math.floor(Math.random() * 24) + 'h';
    }

    getMemory() {
        return (Math.random() * 3 + 1).toFixed(2) + 'GB / 16.00GB';
    }

    typeLine() {
        // Если дошли до конца массива команд
        if (this.currentLine >= this.commands.length) {
            this.currentLine = 0;
            // Если экран переполнен (более 60 строк), чистим для оптимизации
            if (this.terminal.childNodes.length > 60) {
                this.terminal.innerHTML = ''; 
            }
        }

        const line = this.commands[this.currentLine];
        const lineElement = document.createElement('div');
        
        // Случайный отступ слева (0-15px) для хаотичности
        lineElement.style.paddingLeft = Math.floor(Math.random() * 15) + 'px';
        lineElement.style.opacity = '0';

        let formatted = this.formatLine(line);
        lineElement.innerHTML = formatted;
        this.terminal.appendChild(lineElement);

        // Плавное появление
        setTimeout(() => {
            lineElement.style.transition = 'opacity 0.2s ease';
            lineElement.style.opacity = '1';
        }, 5);

        // Скроллим вниз (даже если контент за границами видимости)
        window.scrollTo(0, 0); 

        this.currentLine++;
        const delay = this.lineDelay + Math.random() * 50;
        setTimeout(() => this.typeLine(), delay);
    }

    formatLine(line) {
        let formatted = line;
        if (line.includes('[BOOT]')) formatted = `<span style="color: #3b82f6;">[BOOT]</span>${line.substring(6)}`;
        else if (line.includes('[OK]')) formatted = `<span style="color: #22c55e;">[OK]</span>${line.substring(4)}`;
        else if (line.includes('[ARP]')) formatted = `<span style="color: #8b5cf6;">[ARP]</span>${line.substring(5)}`;
        else if (line.includes('[ERROR]')) formatted = `<span style="color: #ef4444;">[ERROR]</span>${line.substring(7)}`;
        else if (line.includes('[SUCCESS]')) formatted = `<span style="color: #22c55e;">[SUCCESS]</span>${line.substring(9)}`;
        else if (line.includes('0xMew@')) formatted = `<span style="color: #a855f7;">${line.split('@')[0]}</span>@${line.split('@')[1]}`;
        else if (line === '') return '<br>';
        else if (line.includes('_')) return '<span style="color: #22c55e;">></span> <span class="cursor">_</span>';
        
        return formatted;
    }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new TerminalEffect();

    // Blink cursor
    let cursorVisible = true;
    setInterval(() => {
        document.querySelectorAll('.cursor').forEach(c => {
            c.style.opacity = cursorVisible ? '1' : '0';
        });
        cursorVisible = !cursorVisible;
    }, 500);
});
