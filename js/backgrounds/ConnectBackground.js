"use strict";
// ConnectBackground - Social/network themed background for connect page
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectBackground = void 0;
class ConnectBackground {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.container.innerHTML = '';
        this.container.className = 'background-container connect-background';
        // Warm gradient background
        const gradient = document.createElement('div');
        gradient.className = 'background-gradient';
        gradient.style.position = 'absolute';
        gradient.style.inset = '0';
        gradient.style.background = 'linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)';
        this.container.appendChild(gradient);
        // Network/connection lines pattern
        const network = document.createElement('div');
        network.className = 'background-network';
        network.style.position = 'absolute';
        network.style.inset = '0';
        network.style.overflow = 'hidden';
        // Create connection nodes
        const nodes = [];
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            nodes.push({ x, y });
            node.style.position = 'absolute';
            node.style.width = '8px';
            node.style.height = '8px';
            node.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            node.style.borderRadius = '50%';
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.transform = 'translate(-50%, -50%)';
            network.appendChild(node);
        }
        // Create canvas for connection lines
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            // Draw connections between nearby nodes
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 30) {
                        ctx.beginPath();
                        ctx.moveTo((nodes[i].x / 100) * canvas.width, (nodes[i].y / 100) * canvas.height);
                        ctx.lineTo((nodes[j].x / 100) * canvas.width, (nodes[j].y / 100) * canvas.height);
                        ctx.stroke();
                    }
                }
            }
        }
        network.appendChild(canvas);
        this.container.appendChild(network);
    }
    destroy() {
        this.container.innerHTML = '';
    }
}
exports.ConnectBackground = ConnectBackground;
//# sourceMappingURL=ConnectBackground.js.map