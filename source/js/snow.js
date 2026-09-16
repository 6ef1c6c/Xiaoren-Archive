(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    let W, H;
    const snowflakes = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const COUNT = 80;
    for (let i = 0; i < COUNT; i++) {
        snowflakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.5 + 0.5,
            speed: Math.random() * 1.2 + 0.3,
            sway: Math.random() * 0.6 - 0.3,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        for (const f of snowflakes) {
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            f.y += f.speed;
            f.x += f.sway;
            if (f.y > H) { f.y = -5; f.x = Math.random() * W; }
            if (f.x > W || f.x < 0) f.x = Math.random() * W;
        }
        ctx.fill();
        requestAnimationFrame(draw);
    }
    draw();
})();
