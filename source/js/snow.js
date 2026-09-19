(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    var W, H;
    var snowflakes = [];
    var COUNT = 60;

    function init() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        snowflakes = [];
        for (var i = 0; i < COUNT; i++) {
            snowflakes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 2.5 + 1,
                speedY: Math.random() * 1.2 + 0.4,
                speedX: Math.random() * 0.3 - 0.15,
                alpha: Math.random() * 0.6 + 0.4,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < snowflakes.length; i++) {
            var f = snowflakes[i];
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + f.alpha + ')';
            ctx.shadowBlur = f.r * 2;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            ctx.closePath();

            f.wobble += f.wobbleSpeed;
            f.x += f.speedX + Math.sin(f.wobble) * 0.4;
            f.y += f.speedY;

            if (f.y > H + 10) {
                f.y = -10;
                f.x = Math.random() * W;
            }
            if (f.x > W + 10) f.x = -10;
            if (f.x < -10) f.x = W + 10;
        }
        requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
})();
