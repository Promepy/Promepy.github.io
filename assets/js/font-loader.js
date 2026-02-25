// ============================================
// Font Loader - Dynamic Google Fonts injection
// ============================================
(function () {
    'use strict';

    var loadedFonts = {};

    // Fonts available in templates
    var FONT_MAP = {
        "'Inter', system-ui, sans-serif": 'Inter:wght@300;400;500;600;700;800',
        "'Outfit', system-ui, sans-serif": 'Outfit:wght@300;400;500;600;700',
        "'Orbitron', system-ui, sans-serif": 'Orbitron:wght@400;500;600;700',
        "'Playfair Display', Georgia, serif": 'Playfair+Display:wght@400;500;600;700',
        "'Space Grotesk', system-ui, sans-serif": 'Space+Grotesk:wght@300;400;500;600;700',
        "'JetBrains Mono', monospace": 'JetBrains+Mono:wght@400;500;600',
        "'Roboto', system-ui, sans-serif": 'Roboto:wght@300;400;500;700',
    };

    function loadFont(fontStack) {
        var fontSpec = FONT_MAP[fontStack];
        if (!fontSpec || loadedFonts[fontSpec]) return;

        loadedFonts[fontSpec] = true;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=' + fontSpec + '&display=swap';
        document.head.appendChild(link);
    }

    // Preload Inter (always needed) and JetBrains Mono (code blocks)
    function preloadDefaults() {
        loadFont("'Inter', system-ui, sans-serif");
        loadFont("'JetBrains Mono', monospace");
    }

    window.FontLoader = {
        load: loadFont,
        preloadDefaults: preloadDefaults,
        FONT_MAP: FONT_MAP
    };

    // Preload defaults on parse
    preloadDefaults();
})();
