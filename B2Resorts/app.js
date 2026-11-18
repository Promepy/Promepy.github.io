'use strict';
const RESORT = {
  phone: '+919966553200',
  whatsapp: 'https://wa.me/919966553200',
  instagram: 'https://www.instagram.com/b2resorts_chirala/',
  reviews: 'https://www.google.com/travel/hotels/entity/ChgI2crAlsqk2FsaDS9nLzExdzhncHo1ZHkQAQ/reviews',
};
const photos = [
  { file: '01', category: 'resort', title: 'Palm trees, pool days and a warm welcome', alt: 'B2 Resorts courtyard and swimming pool framed by palm trees at dusk' },
  { file: '02', category: 'rooms', title: 'Your comfortable coastal base', alt: 'Guest room with a large bed, white linen and wood-panelled ceiling' },
  { file: '06', category: 'resort', title: 'A slower afternoon by the pool', alt: 'View of the outdoor swimming pool from the shared resort corridor' },
  { file: '07', category: 'beach', title: 'A little closer to the Bay of Bengal', alt: 'Waves rolling onto the sandy beach near the resort' },
  { file: '05', category: 'food', title: 'A taste of the stay', alt: 'An idli and vada breakfast photographed by a resort guest' },
  { file: '11', category: 'resort', title: 'When the resort lights come on', alt: 'B2 Resorts and its illuminated blue swimming pool at night' },
  { file: '09', category: 'rooms', title: 'Rest easy after a day out', alt: 'A guest room with warm wooden details and a large bed' },
  { file: '08', category: 'resort', title: 'The resort after dark', alt: 'The illuminated resort seen from the open sandy grounds at night' },
  { file: '14', category: 'rooms', title: 'Make room for a little rest', alt: 'White bedding and a cushioned headboard in a B2 Resorts guest room' },
  { file: '12', category: 'resort', title: 'The pool, the palms, the pause', alt: 'The resort swimming pool with guests enjoying the courtyard' },
  {"file": "17", "category": "rooms", "title": "A wider view of the guest room", "alt": "Spacious B2 Resorts guest room with a large bed and wood-panelled ceiling"},
  {"file": "18", "category": "food", "title": "Breakfast on the balcony", "alt": "Guest photograph of a breakfast tray by the resort balcony railing"},
  {"file": "19", "category": "resort", "title": "Family time in the pool", "alt": "A family enjoying the B2 Resorts swimming pool"},
  {"file": "20", "category": "rooms", "title": "Room to unwind", "alt": "A double bed, air conditioning and seating in a B2 Resorts guest room"},
  {"file": "21", "category": "food", "title": "A breakfast moment", "alt": "Guest breakfast tray photographed during a stay at B2 Resorts"},
  {"file": "22", "category": "resort", "title": "Along the poolside corridor", "alt": "A guest by the railing overlooking the resort pool"},
  {"file": "23", "category": "resort", "title": "The courtyard in daylight", "alt": "An unobstructed daylight view of the resort pool and courtyard"},
  {"file": "24", "category": "rooms", "title": "Inside the coastal stay", "alt": "Wide-angle photograph of a guest room with white bedding and a wooden ceiling"},
  {"file": "25", "category": "rooms", "title": "A look inside the bathroom", "alt": "Marble-pattern bathroom with a shower and toilet at B2 Resorts"},
  {"file": "26", "category": "rooms", "title": "Guest bathroom details", "alt": "Washbasin, mirror and shower curtain in a B2 Resorts bathroom"},
  {"type": "video", "category": "videos", "file": "09", "src": "assets/videos/room-tour.mp4", "poster": "assets/videos/room-tour-poster.webp", "title": "A walk around B2", "alt": "Resort walk-through video from the Google gallery", "duration": "1:09"},
  {"type": "video", "category": "videos", "file": "04", "src": "assets/videos/pool-evening.mp4", "poster": "assets/videos/pool-evening-poster.webp", "title": "An evening by the pool", "alt": "Video of the illuminated pool and B2 Resorts exterior", "duration": "0:45"},
  {"type": "video", "category": "videos", "file": "13", "src": "assets/videos/rain-dance.mp4", "poster": "assets/videos/rain-dance-poster.webp", "title": "The rain-dance area", "alt": "Visitor video of the rain-dance area beside the swimming pool", "duration": "0:27"},
  {"type": "video", "category": "videos", "file": "07", "src": "assets/videos/beach-waves.mp4", "poster": "assets/videos/beach-waves-poster.webp", "title": "A few seconds by the sea", "alt": "Waves rolling onto the beach in a visitor video", "duration": "0:09"},
];
const messageUrl = (message) => `${RESORT.whatsapp}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('.whatsapp').forEach(link => { link.href = messageUrl('Hello B2 Resorts! I would like to enquire about a stay. Could you share room availability and rates?'); });
document.querySelectorAll('.room-enquiry').forEach(link => { link.href = messageUrl(`Hello B2 Resorts! I am interested in a ${link.dataset.room}. Could you share current photos, availability, rates and inclusions?`); });
document.querySelectorAll('.google-reviews').forEach(link => { link.href = RESORT.reviews; });
document.querySelector('#year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
const grid = document.querySelector('#gallery-grid');
let activePhotos = photos.map((_, i) => i);
function renderGallery(category) {
  activePhotos = photos.map((p, i) => ({ ...p, index: i })).filter(p => category === 'all' || p.category === category).map(p => p.index);
  grid.classList.toggle('filtered', category !== 'all');
  grid.classList.toggle('videos-only', category === 'videos');
  grid.replaceChildren(...activePhotos.map(index => {
    const photo = photos[index]; const button = document.createElement('button'); button.className = 'gallery-item'; button.type = 'button'; button.setAttribute('aria-label', `${photo.type === 'video' ? 'Watch video' : 'View photo'}: ${photo.title}`);
    const img = document.createElement('img'); img.src = photo.poster || `assets/resort-${photo.file}.webp`; img.width = 1200; img.height = 900; img.alt = photo.alt; img.loading = 'lazy';
    const caption = document.createElement('span'); caption.textContent = photo.title;
    button.append(img, caption); if (photo.type === 'video') { button.classList.add('video-item'); const badge = document.createElement('span'); badge.className = 'video-badge'; badge.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z"/></svg>'; const duration = document.createElement('small'); duration.textContent = photo.duration; badge.append(duration); button.append(badge); } button.addEventListener('click', () => openPhoto(index, activePhotos)); return button;
  }));
  document.querySelector('#gallery-status').textContent = `${activePhotos.length} gallery items shown${category === 'all' ? '' : ` for ${category}`}.`;
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed', 'true'); renderGallery(button.dataset.filter);
}));
renderGallery('all');
document.querySelector('.filter[data-filter="all"] span').textContent = photos.length;
const lightbox = document.querySelector('#lightbox');
let photoIndex = 0; let lightboxPhotos = activePhotos; let previousOverflow = '';
const player = document.querySelector('#lightbox-video');
function stopVideo() { player.pause(); player.removeAttribute('src'); player.load(); }
function paintPhoto() {
  const photo = photos[photoIndex]; const img = document.querySelector('#lightbox-image'); const isVideo = photo.type === 'video';
  stopVideo(); img.hidden = isVideo; player.hidden = !isVideo;
  if (isVideo) { player.poster = photo.poster; player.src = photo.src; player.setAttribute('aria-label', photo.alt); }
  else { img.src = `assets/resort-${photo.file}.webp`; img.alt = photo.alt; }
  document.querySelector('#lightbox-caption').textContent = `${photo.title} · From the resort’s Google gallery`;
  document.querySelector('.lightbox-counter').textContent = `${lightboxPhotos.indexOf(photoIndex) + 1} / ${lightboxPhotos.length}`;
}
function openPhoto(index, subset = photos.map((_, i) => i)) { photoIndex = index; lightboxPhotos = [...subset]; paintPhoto(); previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; lightbox.showModal(); }
function movePhoto(direction) { const current = lightboxPhotos.indexOf(photoIndex); photoIndex = lightboxPhotos[(current + direction + lightboxPhotos.length) % lightboxPhotos.length]; paintPhoto(); }
document.querySelectorAll('[data-photo]').forEach(b => b.addEventListener('click', () => openPhoto(Number(b.dataset.photo))));
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => movePhoto(1));
lightbox.addEventListener('close', () => { stopVideo(); document.body.style.overflow = previousOverflow; });
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', e => { if (e.target === player) return; if (e.key === 'ArrowRight') { e.preventDefault(); movePhoto(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); movePhoto(-1); } });
let touchStartX = null;
lightbox.addEventListener('touchstart', e => { if (e.target.closest('video')) return; touchStartX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', e => { if (touchStartX !== null) { const distance = e.changedTouches[0].screenX - touchStartX; if (Math.abs(distance) > 60) movePhoto(distance < 0 ? 1 : -1); touchStartX = null; } }, { passive: true });
const checkin = document.querySelector('#checkin'); const checkout = document.querySelector('#checkout');
function dateString(date) { const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000); return local.toISOString().slice(0, 10); }
checkin.min = dateString(new Date()); checkout.min = checkin.min;
checkin.addEventListener('change', () => { if (!checkin.value) return; const next = new Date(`${checkin.value}T12:00:00`); next.setDate(next.getDate() + 1); checkout.min = dateString(next); if (checkout.value && checkout.value <= checkin.value) checkout.value = ''; document.querySelector('#form-error').textContent = ''; });
checkout.addEventListener('change', () => { document.querySelector('#form-error').textContent = ''; });
function humanDate(value) { return new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
document.querySelector('#enquiry-form').addEventListener('submit', e => {
  e.preventDefault();
  if (checkin.value < checkin.min || checkout.value <= checkin.value) { document.querySelector('#form-error').textContent = 'Please choose a future stay with check-out after check-in.'; checkout.focus(); return; }
  const guests = document.querySelector('#guests').value; const room = document.querySelector('#room').value;
  const message = `Hello B2 Resorts! I would like to enquire about a stay.\n\nCheck-in: ${humanDate(checkin.value)}\nCheck-out: ${humanDate(checkout.value)}\nGuests: ${guests}\nPreferred stay: ${room}\n\nPlease share availability, rates and inclusions. Thank you!`;
  window.open(messageUrl(message), '_blank', 'noopener,noreferrer');
});
// Instagram is presented as locally hosted artwork with direct public-post links.
// No third-party widgets are injected, so every preview keeps the same dimensions.
