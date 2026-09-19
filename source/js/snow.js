(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    var W, H;
    var snowflakes = [];
    var COUNT = 35; // 数量调少了，35片

    // 画一片六角雪花
    function drawSnowflake(cx, cy, r, alpha) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        ctx.lineWidth = Math.max(0.5, r * 0.12);
        ctx.lineCap = 'round';
        ctx.shadowBlur = r * 1.5;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';

        // 六条主分支
        for (var i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -r);
            // 主分支上的小刺
            ctx.moveTo(0, -r * 0.4);
            ctx.lineTo(-r * 0.25, -r * 0.6);
            ctx.moveTo(0, -r * 0.4);
            ctx.lineTo(r * 0.25, -r * 0.6);
            ctx.moveTo(0, -r * 0.7);
            ctx.lineTo(-r * 0.18, -r * 0.85);
            ctx.moveTo(0, -r * 0.7);
            ctx.lineTo(r * 0.18, -r * 0.85);
            ctx.stroke();
            ctx.rotate(Math.PI / 3);
        }
        ctx.restore();
    }

    function init() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        snowflakes = [];
        for (var i = 0; i < COUNT; i++) {
            snowflakes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 5 + 3, // 半径 3-8，比原来大
                speedY: Math.random() * 1.0 + 0.3,
                speedX: Math.random() * 0.3 - 0.15,
                alpha: Math.random() * 0.5 + 0.4,
                rot: Math.random() * Math.PI * 2, // 初始旋转角度
                rotSpeed: (Math.random() - 0.5) * 0.01, // 缓慢自转
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < snowflakes.length; i++) {
            var f = snowflakes[i];
            ctx.save();
            ctx.translate(f.x, f.y);
            ctx.rotate(f.rot);
            ctx.translate(-f.x, -f.y);
            drawSnowflake(f.x, f.y, f.r, f.alpha);
            ctx.restore();

            // 更新位置和角度
            f.rot += f.rotSpeed;
            f.wobble += f.wobbleSpeed;
            f.x += f.speedX + Math.sin(f.wobble) * 0.5;
            f.y += f.speedY;

            if (f.y > H + 20) {
                f.y = -20;
                f.x = Math.random() * W;
            }
            if (f.x > W + 20) f.x = -20;
            if (f.x < -20) f.x = W + 20;
        }
        requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
})();
