export function initCanvasAnimation() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');

    // Detect mobile device for ping-pong effect
    let isMobile = window.innerWidth < 768;

    const frameCount = 192;
    const initialLoadCount = 20;
    const images = [];
    let currentFrame = 0;
    let imagesLoaded = 0;
    let initialLoadComplete = false;
    let allFramesLoaded = false;
    let backgroundLoadedCount = 0;

    // Animation direction for ping-pong effect on mobile
    let animationDirection = 1; // 1 = forward, -1 = backward

    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Update mobile state
        isMobile = window.innerWidth < 768;

        // Try to redraw immediately to prevent flashing
        // Check if drawFrame is defined (it's hoisted but good to be safe) and images exist
        if (typeof drawFrame === 'function' && images.length > 0) {
            drawFrame(currentFrame);
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Disable CSS transition for JS control
    if (progressBar) progressBar.style.transition = 'none';

    // Preloader animation variables
    const minPreloaderDuration = 3000; // Minimum 3 seconds
    const preloaderStartTime = performance.now();

    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 400);
    }

    for (let i = 0; i < frameCount; i++) {
        images.push(null);
    }

    function loadImage(index, onLoadCallback) {
        const img = new Image();
        img.onload = () => {
            images[index] = img;
            if (onLoadCallback) onLoadCallback();
        };
        img.onerror = () => {
            if (onLoadCallback) onLoadCallback();
        };
        img.src = `animation/frame_${String(index + 1).padStart(4, '0')}.webp`;
    }

    // Start loading initial frames
    for (let i = 0; i < initialLoadCount; i++) {
        loadImage(i, () => {
            imagesLoaded++;
        });
    }

    // Progress bar animation loop
    function animatePreloader() {
        if (initialLoadComplete) return;

        const currentTime = performance.now();
        const elapsed = currentTime - preloaderStartTime;

        // Calculate progress based on real loading
        const realProgress = (imagesLoaded / initialLoadCount) * 100;

        // Calculate progress based on time (linear interpolation)
        const timeProgress = (elapsed / minPreloaderDuration) * 100;

        // Use the minimum of both
        let displayedProgress = Math.min(realProgress, timeProgress);

        // Clamp to 100
        if (displayedProgress > 100) displayedProgress = 100;

        // Update UI
        if (progressBar) progressBar.style.width = displayedProgress + '%';
        if (progressPercent) progressPercent.textContent = Math.round(displayedProgress) + '%';

        // Check completion
        if (imagesLoaded === initialLoadCount && elapsed >= minPreloaderDuration) {
            initialLoadComplete = true;
            // Ensure we show 100% at the end
            if (progressBar) progressBar.style.width = '100%';
            if (progressPercent) progressPercent.textContent = '100%';

            hidePreloader();
            startAnimation();
            loadRemainingFrames();
        } else {
            requestAnimationFrame(animatePreloader);
        }
    }

    // Start the preloader animation loop
    requestAnimationFrame(animatePreloader);

    function loadRemainingFrames() {
        for (let i = initialLoadCount; i < frameCount; i++) {
            loadImage(i, () => {
                backgroundLoadedCount++;
                if (backgroundLoadedCount === frameCount - initialLoadCount) {
                    allFramesLoaded = true;
                }
            });
        }
    }

    function drawFrame(frameIndex, alpha = 1) {
        const img = images[frameIndex];
        if (!img || !img.complete) {
            return;
        }

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        if (alpha < 1) {
            ctx.globalAlpha = alpha;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        if (alpha < 1) {
            ctx.globalAlpha = 1;
        }
    }

    function startAnimation() {
        let lastFrameTime = performance.now();
        const frameDuration = 1000 / 24;
        const crossfadeFrames = 8;

        function animate(currentTime) {
            const elapsed = currentTime - lastFrameTime;

            if (elapsed >= frameDuration) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let maxFrame = allFramesLoaded ? frameCount : initialLoadCount;

                if (images[currentFrame] && images[currentFrame].complete) {
                    if (currentFrame >= maxFrame - crossfadeFrames && currentFrame < maxFrame) {
                        const fadeProgress = (currentFrame - (maxFrame - crossfadeFrames)) / crossfadeFrames;
                        const nextFrame = currentFrame - (maxFrame - crossfadeFrames);

                        if (images[nextFrame] && images[nextFrame].complete) {
                            drawFrame(currentFrame, 1 - fadeProgress);
                            drawFrame(nextFrame, fadeProgress);
                        } else {
                            drawFrame(currentFrame);
                        }
                    } else {
                        drawFrame(currentFrame);
                    }
                }

                // Ping-pong animation on mobile, normal loop on desktop
                if (isMobile) {
                    currentFrame += animationDirection;

                    // Reverse direction at boundaries
                    if (currentFrame >= maxFrame - 1) {
                        animationDirection = -1;
                        currentFrame = maxFrame - 1;
                    } else if (currentFrame <= 0) {
                        animationDirection = 1;
                        currentFrame = 0;
                    }
                } else {
                    // Normal loop for desktop
                    currentFrame = (currentFrame + 1) % maxFrame;
                }

                lastFrameTime = currentTime - (elapsed % frameDuration);
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
}
