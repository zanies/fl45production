        // Theme management
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial theme based on system preference
        if (prefersDark) {
            html.classList.add('dark');
        }

        // Update toggle icon based on current theme
        function updateThemeIcon() {
            const isDark = html.classList.contains('dark');
            const icon = themeToggle.querySelector('.material-icons-round');
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        }

        // Toggle theme
        function toggleTheme() {
            html.classList.toggle('dark');
            updateThemeIcon();
        }

        // Initialize icon
        updateThemeIcon();

        // Add click listener
        themeToggle.addEventListener('click', toggleTheme);

        // Typewriter effect for hero slogan (3 lines with moving cursor)
        (function () {
            const line1 = document.getElementById('line1Text');
            const line2 = document.getElementById('line2Text');
            const line3 = document.getElementById('line3Text');
            const cursor = document.getElementById('typingCursor');

            if (!line1 || !line2 || !line3 || !cursor) return;

            const lines = [
                { element: line1, text: 'Projektuję' },
                { element: line2, text: 'Koduję' },
                { element: line3, text: 'Wdrażam' }
            ];

            let currentLineIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let allLinesCompleted = false;

            function moveCursor(lineIndex) {
                // Usuń kursor z obecnego miejsca
                cursor.remove();

                // Dodaj kursor po aktualnej linii
                const targetLine = lines[lineIndex].element;
                targetLine.parentElement.appendChild(cursor);
            }

            function type() {
                const currentLine = lines[currentLineIndex];
                const currentText = currentLine.text;

                if (!allLinesCompleted) {
                    // Faza wpisywania
                    if (charIndex < currentText.length) {
                        currentLine.element.textContent = currentText.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(type, 150); // 150ms na znak
                    } else {
                        // Linia zakończona - poczekaj, potem przeskocz
                        if (currentLineIndex < lines.length - 1) {
                            // Pauza 2s przy obecnej linii
                            setTimeout(() => {
                                // Przejdź do następnej linii
                                currentLineIndex++;
                                charIndex = 0;
                                moveCursor(currentLineIndex);
                                // Od razu zacznij pisać (bez dodatkowej pauzy)
                                type();
                            }, 2000);
                        } else {
                            // Wszystkie linie ukończone
                            allLinesCompleted = true;
                            setTimeout(() => {
                                isDeleting = true;
                                currentLineIndex = lines.length - 1;
                                charIndex = currentText.length;
                                moveCursor(currentLineIndex);
                                type();
                            }, 2500); // Dłuższa pauza po ukończeniu
                        }
                    }
                } else {
                    // Faza kasowania
                    if (isDeleting) {
                        currentLine.element.textContent = currentText.substring(0, charIndex - 1);
                        charIndex--;

                        if (charIndex === 0) {
                            // Linia skasowana
                            if (currentLineIndex > 0) {
                                // Przejdź do poprzedniej linii
                                currentLineIndex--;
                                charIndex = lines[currentLineIndex].text.length;
                                moveCursor(currentLineIndex);
                                setTimeout(type, 200);
                            } else {
                                // Wszystko skasowane, restart
                                isDeleting = false;
                                allLinesCompleted = false;
                                currentLineIndex = 0;
                                charIndex = 0;
                                moveCursor(0);
                                setTimeout(type, 800);
                            }
                        } else {
                            setTimeout(type, 40);
                        }
                    }
                }
            }

            // Start
            setTimeout(type, 1000);
        })();

        // Code typing animation for VS Code mockup
        (function () {
            const codeLine1 = document.getElementById('codeLine1');
            const codeLine2 = document.getElementById('codeLine2');

            if (!codeLine1 || !codeLine2) return;

            // Code lines to type
            const lines = [
                {
                    element: codeLine1,
                    parts: [
                        { text: 'import', color: 'text-purple-400' },
                        { text: ' ', color: '' },
                        { text: 'Developer', color: 'text-yellow-300' },
                        { text: ' ', color: '' },
                        { text: 'from', color: 'text-purple-400' },
                        { text: ' ', color: '' },
                        { text: "'@fl45/core'", color: 'text-green-400' },
                        { text: ';', color: '' }
                    ]
                },
                {
                    element: codeLine2,
                    parts: [
                        { text: 'import', color: 'text-purple-400' },
                        { text: ' ', color: '' },
                        { text: 'Skills', color: 'text-yellow-300' },
                        { text: ' ', color: '' },
                        { text: 'from', color: 'text-purple-400' },
                        { text: ' ', color: '' },
                        { text: "'./skills'", color: 'text-green-400' },
                        { text: ';', color: '' }
                    ]
                }
            ];

            let currentLine = 0;
            let currentPart = 0;
            let currentChar = 0;

            function typeCode() {
                if (currentLine >= lines.length) {
                    // Animation complete, restart after delay
                    setTimeout(() => {
                        codeLine1.innerHTML = '';
                        codeLine2.innerHTML = '';
                        currentLine = 0;
                        currentPart = 0;
                        currentChar = 0;
                        setTimeout(typeCode, 500);
                    }, 5000); // Wait 5 seconds before restarting
                    return;
                }

                const line = lines[currentLine];
                const part = line.parts[currentPart];

                if (currentChar < part.text.length) {
                    // Clear and rebuild current line
                    line.element.innerHTML = '';

                    // Add all completed parts
                    for (let i = 0; i < currentPart; i++) {
                        const prevSpan = document.createElement('span');
                        if (line.parts[i].color) prevSpan.className = line.parts[i].color;
                        prevSpan.textContent = line.parts[i].text;
                        line.element.appendChild(prevSpan);
                    }

                    // Add current part up to current character
                    const currentSpan = document.createElement('span');
                    if (part.color) currentSpan.className = part.color;
                    currentSpan.textContent = part.text.substring(0, currentChar + 1);
                    line.element.appendChild(currentSpan);

                    currentChar++;
                    setTimeout(typeCode, 50); // Speed: 50ms per character
                } else {
                    // Move to next part
                    currentChar = 0;
                    currentPart++;

                    if (currentPart >= line.parts.length) {
                        // Move to next line
                        currentPart = 0;
                        currentLine++;
                        setTimeout(typeCode, 300); // Pause between lines
                    } else {
                        setTimeout(typeCode, 50);
                    }
                }
            }

            // Start typing after a short delay
            setTimeout(typeCode, 1000);
        })();

        // WebP sequence animation with crossfade loop with lazy loading
        (function () {
            const canvas = document.getElementById('heroCanvas');
            const ctx = canvas.getContext('2d');
            const frameCount = 192;
            const initialLoadCount = 20; // Ładuj tylko pierwsze 20 klatek
            const images = [];
            let currentFrame = 0;
            let imagesLoaded = 0;
            let initialLoadComplete = false;
            let allFramesLoaded = false;
            let backgroundLoadedCount = 0;

            // Preloader elements
            const preloader = document.getElementById('preloader');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');

            // Set canvas size to match container
            function resizeCanvas() {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Update progress (tylko dla pierwszych 20 klatek)
            function updateProgress() {
                if (!initialLoadComplete) {
                    const percent = Math.round((imagesLoaded / initialLoadCount) * 100);
                    progressBar.style.width = percent + '%';
                    progressPercent.textContent = percent + '%';
                }
            }

            // Hide preloader
            function hidePreloader() {
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 400);
            }

            // Inicjalizuj wszystkie sloty dla obrazów
            for (let i = 0; i < frameCount; i++) {
                images.push(null);
            }

            // Load image function
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

            // Ładuj pierwsze 20 klatek
            for (let i = 0; i < initialLoadCount; i++) {
                loadImage(i, () => {
                    imagesLoaded++;
                    updateProgress();
                    if (imagesLoaded === initialLoadCount) {
                        initialLoadComplete = true;
                        hidePreloader();
                        startAnimation();
                        // Załaduj pozostałe klatki w tle
                        loadRemainingFrames();
                    }
                });
            }

            // Ładuj pozostałe klatki w tle (po ukryciu preloadera)
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

            // Draw frame to canvas with optional crossfade
            function drawFrame(frameIndex, alpha = 1) {
                const img = images[frameIndex];
                if (!img || !img.complete) {
                    // Jeśli klatka nie jest załadowana, użyj najbliższej załadowanej
                    return;
                }

                // Calculate aspect ratio fit
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

            // Animation loop at 24fps with smooth looping
            function startAnimation() {
                let lastFrameTime = performance.now();
                const frameDuration = 1000 / 24;
                const crossfadeFrames = 8; // Crossfade last 8 frames

                function animate(currentTime) {
                    const elapsed = currentTime - lastFrameTime;

                    if (elapsed >= frameDuration) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Ograniczenie animacji do załadowanych klatek
                        let maxFrame = allFramesLoaded ? frameCount : initialLoadCount;

                        // Sprawdź czy aktualna klatka jest załadowana
                        if (images[currentFrame] && images[currentFrame].complete) {
                            // Crossfade między ostatnimi a pierwszymi klatkami
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

                        currentFrame = (currentFrame + 1) % maxFrame;
                        lastFrameTime = currentTime - (elapsed % frameDuration);
                    }

                    requestAnimationFrame(animate);
                }

                requestAnimationFrame(animate);
            }
        })();

        // Scroll animations with Intersection Observer
        (function () {
            const observerOptions = {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully in view
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: stop observing after animation (one-time animation)
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all elements with animate-on-scroll class
            document.querySelectorAll('.animate-on-scroll').forEach(element => {
                observer.observe(element);
            });
        })();
        // Select pricing package and scroll to contact form
        function selectPackage(packageName) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Dzień dobry, jestem zainteresowany pakietem: ${packageName}.\n\nProszę o więcej informacji.`;

                // Add focus effect
                setTimeout(() => {
                    messageField.focus();
                }, 100);
            }
        }

        // Mobile menu toggle
        (function () {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');

            if (!mobileMenuToggle || !mobileMenu) return;

            // Toggle mobile menu
            mobileMenuToggle.addEventListener('click', function () {
                mobileMenu.classList.toggle('hidden');

                // Change icon between menu and close
                const icon = this.querySelector('.material-icons-round');
                icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
            });

            // Close mobile menu when clicking on a link
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function () {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuToggle.querySelector('.material-icons-round');
                    icon.textContent = 'menu';
                });
            });
        })();

        // Active section tracking for navigation
        (function () {
            const navLinks = document.querySelectorAll('.nav-link[data-section]');
            const sections = document.querySelectorAll('section[id]');

            if (navLinks.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-middle of viewport
                threshold: 0
            };

            function updateActiveLink(sectionId) {
                navLinks.forEach(link => {
                    if (link.dataset.section === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateActiveLink(entry.target.id);
                    }
                });
            }, observerOptions);

            // Observe all sections with IDs that match nav links
            sections.forEach(section => {
                const sectionId = section.id;
                const hasNavLink = Array.from(navLinks).some(link => link.dataset.section === sectionId);
                if (hasNavLink) {
                    sectionObserver.observe(section);
                }
            });
        })();

        // Global smooth scrolling for all anchor links without updating URL hash
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Stop the browser from updating the URL
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active state for nav links immediately
                    if (this.classList.contains('nav-link')) {
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
