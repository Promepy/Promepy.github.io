# Theme Background Image Prompts

Use these prompts with an image generation AI (Midjourney, DALL·E, Stable Diffusion, etc.) to create background images for each theme. All images should be **dark, subtle, low-contrast** so text remains readable on top.

**Specs for all**: 1920×1080, dark tones, very low contrast, no text, seamless/tileable preferred.

---

## Cyberpunk - `cyberpunk-bg.webp`

**Hero background:**
> Dark futuristic cityscape at night with neon cyan and magenta reflections, rain-soaked streets, holographic signs in the far distance, extremely dark and moody with most details in shadow. Subtle grid lines overlaid. Aspect ratio 16:9, ultra-dark.

**Texture overlay:**
> Dark circuit board pattern, glowing cyan traces on near-black background, very subtle and low opacity, seamless tileable pattern. Technical blueprint feel.

---

## Vintage - `vintage-bg.webp`

**Hero background:**
> Aged leather desk surface with warm amber lighting, very dark, subtle paper grain texture, antique book spines barely visible in corners. Rich warm tones - deep browns, burnt sienna, aged gold. Ultra-dark, atmospheric.

**Texture overlay:**
> Subtle paper grain noise texture on dark warm brown background, seamless tileable, very low contrast. Old parchment feel but extremely dark.

---

## Ocean - `ocean-bg.webp`

**Hero background:**
> Deep underwater scene looking up toward faint surface light, dark teal and midnight blue tones, subtle light rays filtering through water, abstract and ethereal. Very dark, almost black with hints of deep blue-green.

**Texture overlay:**
> Abstract dark water caustics pattern, deep navy and teal, seamless tileable, very low opacity. Flowing water light refraction on dark background.

---

## Forest - `forest-bg.webp`

**Hero background:**
> Dark dense forest canopy at night, moonlight barely filtering through leaves, deep emerald and black tones, mysterious and grounded feel. Fog between trees. Extremely dark with subtle green atmospheric glow.

**Texture overlay:**
> Dark moss or leaf vein texture, deep green on near-black, seamless tileable, very subtle. Organic natural pattern.

---

## Midnight - `midnight-bg.webp`

**Hero background:**
> Abstract dark space nebula with deep purple and indigo tones, scattered subtle star points, very dark and moody cosmic atmosphere. Rich purple-black gradient with barely visible gas clouds.

**Texture overlay:**
> Subtle dark purple mesh gradient, abstract flowing shapes in deep violet on near-black, seamless tileable. Elegant and refined.

---

## Usage

1. Generate images using the prompts above
2. Optimize to WebP format, target <200KB each
3. Place in `assets/images/themes/`
4. Name files: `cyberpunk-bg.webp`, `vintage-bg.webp`, etc.
5. The theme engine will pick them up automatically via the template `bgImage` field
