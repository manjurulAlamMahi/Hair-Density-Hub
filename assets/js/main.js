/* =========================================================
   Hair Density Hub: site behaviour (no frameworks, no backend)
   ========================================================= */

/* ---- Edit clinic settings here ---- */
const CONFIG = {
  clinicName: 'Hair Density Hub',
  refPrefix: 'HDH',
  whatsapp: '919670962400',            // international format, digits only
  phoneDisplay: '+91 96709 62400',
  // TODO: put the full street address here; it's shown on the page, in the map and in calendar invites
  address: 'Lucknow, Uttar Pradesh',
  mapQuery: 'Hair Density Hub Lucknow', // what Google Maps searches for (use the full address once known)
  // Patient / surgery review videos for the Results section. Each entry is either
  //   { youtube: 'VIDEO_ID', title: '...' }   or   { instagram: 'https://www.instagram.com/reel/XXXX/' }
  // Leave empty to show the "Watch on Instagram" tiles instead.
  videos: [],
  // Optional: paste a Formspree / Web3Forms / Google Apps Script URL to also receive bookings by email.
  // Leave empty to use WhatsApp only.
  formEndpoint: '',
  openHour: 10,                         // first slot 10:00
  closeHour: 20,                        // last slot starts 19:30
  slotMinutes: 30,
  closedDays: [],                       // e.g. [0] to close Sundays (0 = Sun … 6 = Sat)
  daysAhead: 21,
  // Online consultation (video call) modal
  consultBadge: 'Video call',            // e.g. '30 min · Google Meet' once the clinic confirms
  consultLanguages: ['English', 'Hindi'],
  consultOpenHour: 10,                   // video-call slots, clinic time (IST)
  consultCloseHour: 19,
  consultDaysAhead: 14
};

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

$('#year').textContent = new Date().getFullYear();

/* ---------- Generic WhatsApp links ---------- */
$$('.js-wa').forEach(a => {
  a.href = waLink(`Hi ${CONFIG.clinicName}, I'd like to know more about your treatments.`);
  a.target = '_blank';
  a.rel = 'noopener';
});

/* ---------- Header / mobile CTA on scroll ---------- */
const header = $('#siteHeader');
const mobileCta = $('.mobile-cta');
const hero = $('#hero');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  const pastHero = !hero || hero.getBoundingClientRect().bottom < 0;
  const booking = $('#booking');
  const bookingRect = booking && booking.getBoundingClientRect();
  const inBooking = !!bookingRect && bookingRect.top < window.innerHeight && bookingRect.bottom > 0;
  mobileCta.classList.toggle('show', pastHero && !inBooking);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


/* ---------- Drawer ---------- */
const drawer = $('#drawer');
const menuBtn = $('#menuBtn');
const setDrawer = open => {
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', !open);
  menuBtn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn.addEventListener('click', () => setDrawer(true));
$('#drawerClose').addEventListener('click', () => setDrawer(false));
drawer.addEventListener('click', e => { if (e.target === drawer || e.target.closest('a')) setDrawer(false); });

/* ---------- Hero video (loads small file on phones, like the reference) ---------- */
(() => {
  const v = $('#heroVideo');
  if (!v) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  v.src = matchMedia('(max-width: 768px)').matches ? v.dataset.srcMobile : v.dataset.srcDesktop;
  if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
  v.play().catch(() => {});
  // Pause when off-screen to save battery
  new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())).observe(v);
})();

/* ---------- Reveal on scroll ---------- */
requestAnimationFrame(() => $$('.hero .reveal, .page-hero .reveal').forEach(el => el.classList.add('in')));
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, { threshold: .12 });
$$('.section-head, .treat-card, .journey li, .tl-item, .stat, .why-intro, .why-card, .reel-tile, .estimator, .faq details, .contact-card, .map, .doc-card, .case-card, .pkg, .post-card, .review, .value, .detail-steps li').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

/* ---------- Stat counters ---------- */
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const end = parseFloat(el.dataset.count);
    const dec = +(el.dataset.decimals || 0);
    const start = end > 1000 ? end - 15 : 0;
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (start + (end - start) * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: .6 });
$$('[data-count]').forEach(el => countObs.observe(el));

/* ---------- Treatment filter ---------- */
const filterTabs = $$('#filterTabs button');
function applyFilter(cat) {
  filterTabs.forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  $$('.treat-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat || card.dataset.cat === 'all';
    card.classList.toggle('hidden', !show);
  });
}
filterTabs.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
$$('a[data-filter]').forEach(a => a.addEventListener('click', () => {
  applyFilter(a.dataset.filter);
}));
$$('#heroTabs a').forEach(a => a.addEventListener('click', () => {
  $$('#heroTabs a').forEach(x => x.classList.toggle('active', x === a));
}));

/* Hero tab bar: bring the current page's tab into view */
(() => {
  const tabs = $('#heroTabs');
  const cur = tabs && $('a.active', tabs);
  if (cur) tabs.scrollLeft = cur.offsetLeft - (tabs.clientWidth - cur.offsetWidth) / 2;
})();

/* Before & after case filter */
$$('#caseTabs button').forEach(b => b.addEventListener('click', () => {
  $$('#caseTabs button').forEach(x => x.classList.toggle('active', x === b));
  $$('.case-card').forEach(c => c.classList.toggle('hidden', b.dataset.case !== 'all' && c.dataset.tag !== b.dataset.case));
}));

/* FAQ: open the question in the URL (#q-...) */
(() => {
  const open = () => {
    const d = location.hash.startsWith('#q-') && document.getElementById(location.hash.slice(1));
    if (d && d.tagName === 'DETAILS') {
      d.open = true;
      d.classList.add('highlight');
      setTimeout(() => d.classList.remove('highlight'), 2500);
      d.scrollIntoView({ block: 'center' });
    }
  };
  open();
  window.addEventListener('hashchange', open);
})();

/* Hero tab-bar arrows */
$$('.hero-bar-arrow').forEach(btn => btn.addEventListener('click', () => {
  $('#heroTabs').scrollBy({ left: 220 * btn.dataset.scroll, behavior: 'smooth' });
}));

/* ---------- Hero search (whole site, index generated by build.mjs) ---------- */
(() => {
  const input = $('#heroSearch');
  const list = $('#searchResults');
  if (!input || !list) return;
  const index = window.SEARCH_INDEX || [];
  let matches = [];
  let focus = -1;

  const render = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { list.classList.remove('open'); return; }
    const words = q.split(/\s+/);
    matches = index
      .map(item => {
        const hay = (item.title + ' ' + item.text).toLowerCase();
        const score = words.reduce((s, w) => s + (item.title.toLowerCase().includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0);
        return { ...item, score };
      })
      .filter(i => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    focus = -1;
    list.innerHTML = matches.length
      ? matches.map(m => `<li><a href="${escapeHTML(m.url)}"><small>${escapeHTML(m.type)}</small>${escapeHTML(m.title)}</a></li>`).join('')
      : `<li class="empty">No match. <a href="contact.html#booking">Ask the doctor directly →</a></li>`;
    list.classList.add('open');
  };

  input.addEventListener('input', render);
  input.addEventListener('focus', render);
  input.addEventListener('keydown', e => {
    const items = $$('li > a[href]:not(.empty a)', list);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!items.length) return;
      focus = (focus + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.classList.toggle('focus', i === focus));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matches.length) location.href = matches[Math.max(focus, 0)].url;
    } else if (e.key === 'Escape') {
      list.classList.remove('open');
    }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.hero-search')) list.classList.remove('open'); });
})();

/* =========================================================
   QUICK BOOKING (no login)
   ========================================================= */
const form = $('#bookingForm');
const card = $('#bookingCard');
let current = 1;

if (form) {
  function showStep(n) {
    current = n;
    $$('.step', form).forEach(s => s.classList.toggle('active', +s.dataset.step === n));
    $$('.steps li').forEach(li => {
      const i = +li.dataset.stepDot;
      li.classList.toggle('active', i === n);
      li.classList.toggle('done', i < n);
    });
    $$('.field-error').forEach(e => (e.textContent = ''));
  }

  /* Dates */
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fromISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  function buildDates() {
    const strip = $('#dateStrip');
    strip.innerHTML = '';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    for (let i = 0; i < CONFIG.daysAhead; i++) {
      const d = new Date(today); d.setDate(today.getDate() + i);
      if (CONFIG.closedDays.includes(d.getDay())) continue;
      if (i === 0 && availableSlots(d).length === 0) continue; // today already over
      const iso = toISO(d);
      const label = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : dayNames[d.getDay()];
      strip.insertAdjacentHTML('beforeend', `
        <label class="date-chip"><input type="radio" name="date" value="${iso}">
          <span><small>${label}</small><b>${d.getDate()}</b><small>${monthNames[d.getMonth()]}</small></span>
        </label>`);
    }
    const first = $('input[name="date"]', strip);
    if (first) { first.checked = true; buildSlots(first.value); }
  }

  function allSlots() {
    const out = [];
    for (let m = CONFIG.openHour * 60; m < CONFIG.closeHour * 60; m += CONFIG.slotMinutes) out.push(m);
    return out;
  }
  function availableSlots(date) {
    const now = new Date();
    const isToday = toISO(date) === toISO(now);
    const cutoff = now.getHours() * 60 + now.getMinutes() + 60; // need 1h notice
    return allSlots().filter(m => !isToday || m >= cutoff);
  }
  const fmtTime = m => {
    const h = Math.floor(m / 60), mm = m % 60;
    const h12 = ((h + 11) % 12) + 1;
    return `${h12}:${pad(mm)} ${h < 12 ? 'AM' : 'PM'}`;
  };

  function buildSlots(iso) {
    const date = fromISO(iso);
    const avail = new Set(availableSlots(date));
    const groups = [
      { name: 'Morning', from: 0, to: 12 * 60 },
      { name: 'Afternoon', from: 12 * 60, to: 16 * 60 },
      { name: 'Evening', from: 16 * 60, to: 24 * 60 }
    ];
    const prev = form.elements.time ? (form.querySelector('input[name="time"]:checked') || {}).value : null;
    $('#slotGroups').innerHTML = groups.map(g => {
      const slots = allSlots().filter(m => m >= g.from && m < g.to);
      if (!slots.length) return '';
      return `<div class="slot-group"><h5>${g.name}</h5><div class="slot-list">${slots.map(m => `
        <label class="slot"><input type="radio" name="time" value="${fmtTime(m)}" data-min="${m}" ${avail.has(m) ? '' : 'disabled'}>
        <span>${fmtTime(m)}</span></label>`).join('')}</div></div>`;
    }).join('');
    if (prev) {
      const same = $(`input[name="time"][value="${prev}"]:not(:disabled)`);
      if (same) same.checked = true;
    }
    const d = fromISO(iso);
    $('#slotHint').textContent = `· ${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`;
  }

  $('#dateStrip').addEventListener('change', e => { if (e.target.name === 'date') buildSlots(e.target.value); });
  $$('[data-strip]').forEach(b => b.addEventListener('click', () => $('#dateStrip').scrollBy({ left: 216 * b.dataset.strip })));

  /* Validation */
  function validate(step) {
    const err = $(`[data-error="${step}"]`);
    const fail = (msg, el) => { err.textContent = msg; if (el) { el.classList.add('invalid'); el.focus(); } return false; };
    $$('.invalid', form).forEach(el => el.classList.remove('invalid'));

    if (step === 1 && !form.querySelector('input[name="concern"]:checked')) return fail('Please choose what you would like help with.');
    if (step === 2) {
      if (!form.querySelector('input[name="date"]:checked')) return fail('Please pick a day.');
      if (!form.querySelector('input[name="time"]:checked')) return fail('Please pick a time slot.');
    }
    if (step === 3) {
      const name = form.elements.name;
      const phone = form.elements.phone;
      phone.value = phone.value.replace(/[^\d]/g, '');
      if (name.value.trim().length < 2) return fail('Please enter your name.', name);
      const okPhone = form.elements.cc.value === '+91' ? /^[6-9]\d{9}$/.test(phone.value) : /^\d{6,14}$/.test(phone.value);
      if (!okPhone) return fail('Please enter a valid mobile number' + (form.elements.cc.value === '+91' ? ' (10 digits).' : '.'), phone);
      if (!form.elements.consent.checked) return fail('Please tick the box so we can contact you.');
    }
    err.textContent = '';
    return true;
  }

  $$('[data-next]', form).forEach(b => b.addEventListener('click', () => { if (validate(current)) showStep(current + 1); }));
  $$('[data-prev]', form).forEach(b => b.addEventListener('click', () => showStep(current - 1)));

  /* Clear the step-1 error as soon as a concern is picked */
  $('#concernChips').addEventListener('change', () => { $('[data-error="1"]').textContent = ''; });

  let lastBooking = null;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(3)) return;

    const f = form.elements;
    const date = fromISO(form.querySelector('input[name="date"]:checked').value);
    const ref = CONFIG.refPrefix + '-' + Date.now().toString(36).slice(-5).toUpperCase();
    const booking = {
      ref,
      concern: form.querySelector('input[name="concern"]:checked').value,
      mode: form.querySelector('input[name="mode"]:checked').value,
      dateISO: toISO(date),
      dateText: `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      time: form.querySelector('input[name="time"]:checked').value,
      minutes: +form.querySelector('input[name="time"]:checked').dataset.min,
      name: f.name.value.trim(),
      phone: `${f.cc.value} ${f.phone.value}`,
      gender: f.gender.value,
      notes: f.notes.value.trim()
    };
    lastBooking = booking;

    const rows = [
      ['Name', booking.name], ['Mobile', booking.phone], ['Concern', booking.concern],
      ['Type', booking.mode], ['Date', booking.dateText], ['Time', booking.time]
    ];
    $('#bookingRef').textContent = ref;
    $('#bookingSummary').innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${escapeHTML(v)}</dd>`).join('');

    const msg = [
      `Hello ${CONFIG.clinicName}, I'd like to book an appointment.`,
      ``,
      `Ref: ${ref}`,
      `Name: ${booking.name}`,
      `Mobile: ${booking.phone}`,
      booking.gender ? `Gender: ${booking.gender}` : null,
      `Concern: ${booking.concern}`,
      `Type: ${booking.mode}`,
      `Preferred: ${booking.dateText} at ${booking.time}`,
      booking.notes ? `Notes: ${booking.notes}` : null
    ].filter(l => l !== null).join('\n');
    $('#waConfirm').href = waLink(msg);

    try { localStorage.setItem('nr_last_booking', JSON.stringify(booking)); } catch (_) {}

    if (CONFIG.formEndpoint) {
      fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...booking, _subject: `New booking ${ref}: ${booking.name}` })
      }).catch(() => {});
    }

    showStep(4);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('#newBooking').addEventListener('click', () => {
    form.reset();
    buildDates();

  // Arriving from another page's "Book" button (contact.html?concern=...#booking)
  (() => {
    const concern = new URLSearchParams(location.search).get('concern');
    const input = concern && $(`input[name="concern"][value="${CSS.escape(concern)}"]`);
    if (input) { input.checked = true; showStep(2); }
  })();
    showStep(1);
  });

  /* Calendar (.ics) */
  $('#icsBtn').addEventListener('click', () => {
    if (!lastBooking) return;
    const b = lastBooking;
    const d = fromISO(b.dateISO);
    const start = new Date(d); start.setMinutes(b.minutes);
    const end = new Date(start.getTime() + 45 * 60000);
    const stamp = dt => `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hair Density Hub//Booking//EN', 'BEGIN:VEVENT',
      `UID:${b.ref}@hairdensityhub`, `DTSTAMP:${stamp(new Date())}`,
      `DTSTART;TZID=Asia/Kolkata:${stamp(start)}`, `DTEND;TZID=Asia/Kolkata:${stamp(end)}`,
      `SUMMARY:Hair Density Hub consultation (${b.concern})`,
      `LOCATION:${CONFIG.address.replace(/,/g, '\\,')}`,
      `DESCRIPTION:Ref ${b.ref}. ${b.mode}. Requested slot, to be confirmed by the clinic. Call ${CONFIG.phoneDisplay}.`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `new-roots-${b.ref}.ics` });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });


  /* Any [data-book] button: jump to booking, optionally preselect a concern */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-book]');
    if (!t) return;
    e.preventDefault();
    const concern = t.dataset.book;
    if (current === 4) { form.reset(); buildDates(); }
    if (concern) {
      const input = $(`input[name="concern"][value="${CSS.escape(concern)}"]`);
      if (input) input.checked = true;
    }
    showStep(concern ? 2 : 1);
    $('#booking').scrollIntoView({ behavior: 'smooth' });
    card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
  });

  buildDates();

  // Arriving from another page's "Book" button (contact.html?concern=...#booking)
  (() => {
    const concern = new URLSearchParams(location.search).get('concern');
    const input = concern && $(`input[name="concern"][value="${CSS.escape(concern)}"]`);
    if (input) { input.checked = true; showStep(2); }
  })();
} else {
  // No booking form on this page: send "Book" buttons to the Contact page, keeping the chosen treatment
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-book]');
    if (!t) return;
    e.preventDefault();
    location.href = 'contact.html' + (t.dataset.book ? '?concern=' + encodeURIComponent(t.dataset.book) : '') + '#booking';
  });
}

/* =========================================================
   GRAFT ESTIMATOR
   ========================================================= */
(() => {
  // Bald areas drawn as skin-coloured ellipses on a top-down head (front = top)
  const grades = [
    { id: '1', min: 0, max: 500, sessions: '-', time: '-', desc: 'Little or no recession. Usually managed medically (PRP/GFC, medication) rather than surgery.', bald: [] },
    { id: '2', min: 800, max: 1500, sessions: '1', time: '4–5 hrs', desc: 'Mild temple recession. Often a hairline refinement.', bald: [[20, 12, 7, 6], [44, 12, 7, 6]] },
    { id: '3', min: 1500, max: 2500, sessions: '1', time: '6–7 hrs', desc: 'Deeper recession at the temples. One of the most common cases we treat.', bald: [[19, 15, 9, 9], [45, 15, 9, 9], [32, 8, 12, 4]] },
    { id: '3V', min: 2000, max: 2800, sessions: '1', time: '6–8 hrs', desc: 'Temple recession plus early thinning at the crown (vertex).', bald: [[19, 15, 9, 9], [45, 15, 9, 9], [32, 8, 12, 4], [32, 44, 7, 7]] },
    { id: '4', min: 2500, max: 3500, sessions: '1', time: '7–8 hrs', desc: 'Front and crown thinning separated by a band of hair.', bald: [[32, 14, 18, 11], [32, 44, 10, 9]] },
    { id: '5', min: 3000, max: 4500, sessions: '1–2', time: '8–9 hrs', desc: 'Larger front and crown areas with a thin bridge between them.', bald: [[32, 17, 20, 14], [32, 44, 13, 11]] },
    { id: '6', min: 4000, max: 5500, sessions: '1–2', time: '1–2 days', desc: 'The bridge is gone and the front and crown have merged.', bald: [[32, 21, 17, 18]] },
    { id: '7', min: 5000, max: 6500, sessions: '2', time: '2 days', desc: 'Only a horseshoe of hair remains at the sides and back. Donor planning is key.', bald: [[32, 25, 20, 24]] }
  ];
  const svg = g => `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs><clipPath id="hc${g.id}"><ellipse cx="32" cy="33" rx="25" ry="28"/></clipPath></defs>
      <ellipse cx="32" cy="33" rx="25" ry="28" fill="#3b3631"/>
      <g clip-path="url(#hc${g.id})" fill="#e7c6a4">${g.bald.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}</g>
      <ellipse cx="32" cy="33" rx="25" ry="28" fill="none" stroke="#2a2622" stroke-width="1.5"/>
      <path d="M29 4.5l3-3 3 3" fill="none" stroke="#9aa199" stroke-width="1.2"/>
    </svg>`;
  const wrap = $('#norwood');
  if (!wrap) return;
  wrap.innerHTML = grades.map(g => `
    <label class="nw"><input type="radio" name="grade" value="${g.id}" ${g.id === '3' ? 'checked' : ''}>
      <span>${svg(g)}Grade ${g.id}</span></label>`).join('');
  const fmt = n => n.toLocaleString('en-IN');
  const update = id => {
    const g = grades.find(x => x.id === id);
    $('#estGrade').textContent = `Grade ${g.id}`;
    $('#estMin').textContent = fmt(g.min);
    $('#estMax').textContent = fmt(g.max) + (g.id === '7' ? '+' : '');
    $('#estDesc').textContent = g.desc;
    $('#estSessions').textContent = g.sessions;
    $('#estTime').textContent = g.time;
    const btn = $('#estBook');
    btn.textContent = `Book a free assessment for Grade ${g.id}`;
    btn.dataset.book = g.id === '1' ? 'Hair Fall / PRP / GFC' : 'Hair Transplant (FUE / Sapphire FUE)';
    btn.dataset.grade = g.id;
  };
  wrap.addEventListener('change', e => update(e.target.value));
  update('3');
  // Pass the grade into the booking notes
  $('#estBook').addEventListener('click', e => {
    if (!form) return;
    const notes = form.elements.notes;
    const line = `Self-assessed Norwood grade ${e.currentTarget.dataset.grade}.`;
    notes.value = notes.value.replace(/Self-assessed Norwood grade \S+\.\s*/g, '');
    notes.value = (line + ' ' + notes.value).trim();
  });
})();

/* =========================================================
   VIDEOS
   ========================================================= */
const lightbox = $('#lightbox');
const lbFrame = $('#lightboxFrame');
const lbInner = $('#lightboxInner');
function openVideo(id, vertical) {
  lbInner.classList.toggle('vertical', !!vertical);
  lbFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Patient video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#lightboxClose').focus();
}
function closeVideo() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbFrame.innerHTML = '';
  document.body.style.overflow = '';
}
$('#lightboxClose').addEventListener('click', closeVideo);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeVideo(); });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (lightbox.classList.contains('open')) closeVideo();
  if (drawer.classList.contains('open')) setDrawer(false);
});

/* Results: render CONFIG.videos (YouTube thumbnails open in the lightbox, Instagram reels embed inline) */
(() => {
  const grid = $('#reelGrid');
  if (!CONFIG.videos.length || !grid) return;
  grid.classList.add('has-videos');
  grid.innerHTML = CONFIG.videos.map(v => v.youtube
    ? `<button class="reel-tile reel-yt" data-yt="${escapeHTML(v.youtube)}">
         <img src="https://img.youtube.com/vi/${escapeHTML(v.youtube)}/hqdefault.jpg" alt="" loading="lazy">
         <span class="reel-play"><svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>
         ${v.title ? `<strong>${escapeHTML(v.title)}</strong>` : ''}
       </button>`
    : `<div class="reel-ig"><blockquote class="instagram-media" data-instgrm-permalink="${escapeHTML(v.instagram)}" data-instgrm-version="14">
         <a href="${escapeHTML(v.instagram)}" target="_blank" rel="noopener">Watch on Instagram</a></blockquote></div>`
  ).join('');
  $$('.reel-yt', grid).forEach(b => b.addEventListener('click', () => openVideo(b.dataset.yt)));
  if (CONFIG.videos.some(v => v.instagram)) {
    document.body.appendChild(Object.assign(document.createElement('script'), { src: 'https://www.instagram.com/embed.js', async: true }));
  }
})();

/* Address + map from CONFIG */
$$('[data-cfg="address"]').forEach(el => (el.textContent = CONFIG.address));
if ($('#mapFrame')) $('#mapFrame').src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapQuery)}&output=embed`;
if ($('#directionsBtn')) $('#directionsBtn').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`;

/* ---------- Online consultation modal (4 steps) ---------- */
(() => {
  const modal = $('#consultModal');
  const f = $('#consultForm');
  const next = $('#cmNext');
  const back = $('#cmBack');
  const err = $('#cmError');
  const labels = ['Your details', 'Your concern', 'Day & time', 'Review & confirm'];
  // [name, ISO code, dialling code, time zones used to guess the visitor's country]
  const countries = [
    ['India', 'IN', '+91', ['Asia/Kolkata', 'Asia/Calcutta']],
    ['Bangladesh', 'BD', '+880', ['Asia/Dhaka']],
    ['Nepal', 'NP', '+977', ['Asia/Kathmandu', 'Asia/Katmandu']],
    ['Bhutan', 'BT', '+975', ['Asia/Thimphu']],
    ['Sri Lanka', 'LK', '+94', ['Asia/Colombo']],
    ['Maldives', 'MV', '+960', ['Indian/Maldives']],
    ['United Arab Emirates', 'AE', '+971', ['Asia/Dubai']],
    ['Saudi Arabia', 'SA', '+966', ['Asia/Riyadh']],
    ['Qatar', 'QA', '+974', ['Asia/Qatar']],
    ['Oman', 'OM', '+968', ['Asia/Muscat']],
    ['Kuwait', 'KW', '+965', ['Asia/Kuwait']],
    ['Bahrain', 'BH', '+973', ['Asia/Bahrain']],
    ['United Kingdom', 'GB', '+44', ['Europe/London']],
    ['United States', 'US', '+1', []],
    ['Canada', 'CA', '+1', []],
    ['Australia', 'AU', '+61', []],
    ['Other', '', '', []]
  ];
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const guess = countries.find(c => c[3].includes(tz)) || countries[0];
  const opt = (v, t, sel) => `<option value="${escapeHTML(v)}"${sel ? ' selected' : ''}>${escapeHTML(t)}</option>`;
  $('#cmCountry').innerHTML = countries.map(c => opt(c[0], (c[1] ? c[1] + ' ' : '') + c[0], c === guess)).join('');
  $('#cmCc').innerHTML = countries.filter(c => c[2]).map(c => opt(c[2], `${c[1]} ${c[2]}`, c === guess)).join('');
  $('#cmLanguage').innerHTML = CONFIG.consultLanguages.map((l, i) => opt(l, l, i === 0)).join('');
  $('[data-cfg="consultBadge"]').textContent = CONFIG.consultBadge;
  $('#cmCountry').addEventListener('change', e => {
    const c = countries.find(x => x[0] === e.target.value);
    if (c && c[2]) $('#cmCc').value = c[2];
  });

  // Day & time, in clinic time (IST)
  const fmtDay = d => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const toTime = m => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
  function buildDays() {
    const out = [];
    const today = new Date();
    for (let i = 0; out.length < CONFIG.consultDaysAhead && i < 60; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      if (CONFIG.closedDays.includes(d.getDay())) continue;
      const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      out.push(`<label><input type="radio" name="day" value="${iso}" data-label="${fmtDay(d)}"><span>${d.toLocaleDateString('en-GB', { weekday: 'short' })}<b>${d.getDate()}</b>${d.toLocaleDateString('en-GB', { month: 'short' })}</span></label>`);
    }
    $('#cmDays').innerHTML = out.join('');
    $('#cmTimes').innerHTML = '<p class="muted">Pick a day first.</p>';
  }
  function buildTimes(iso) {
    // current time in India, so today's past slots are hidden
    const now = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
    const todayIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const nowMin = now.getHours() * 60 + now.getMinutes() + 60;
    const slots = [];
    for (let m = CONFIG.consultOpenHour * 60; m < CONFIG.consultCloseHour * 60; m += CONFIG.slotMinutes) {
      if (iso === todayIso && m < nowMin) continue;
      slots.push(`<label><input type="radio" name="time" value="${toTime(m)}"><span>${toTime(m)}</span></label>`);
    }
    $('#cmTimes').innerHTML = slots.join('') || '<p class="muted">No times left today. Please pick another day.</p>';
  }
  $('#cmDays').addEventListener('change', e => buildTimes(e.target.value));
  $('#cmTz').textContent = tz && !guess[3].includes('Asia/Kolkata') ? '(India time, IST)' : '(IST)';

  let step = 1;
  function show(n) {
    step = n;
    $$('.cm-step', f).forEach(el => el.classList.toggle('active', +el.dataset.cmStep === n));
    $$('.cm-progress i', f).forEach((el, i) => el.classList.toggle('on', i < n));
    $('#cmStepLabel').textContent = n <= 4 ? `${n}/4 · ${labels[n - 1]}` : 'Done';
    back.hidden = n === 1;
    next.textContent = n === 4 ? 'Request consultation' : 'Continue →';
    $('.cm-foot', modal).classList.toggle('hide', n === 5);
    err.textContent = '';
    $('.cm-body', modal).scrollTop = 0;
    if (n === 4) summary();
  }
  const val = n => (f.elements[n] && f.elements[n].value || '').trim();
  function check(n) {
    $$('.invalid', f).forEach(el => el.classList.remove('invalid'));
    const bad = (el, msg) => { if (el) { el.classList.add('invalid'); el.focus(); } err.textContent = msg; return false; };
    if (n === 1) {
      if (val('name').length < 2) return bad(f.elements.name, 'Please enter your full name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) return bad(f.elements.email, 'Please enter a valid email address.');
      if (val('phone').replace(/\D/g, '').length < 6) return bad(f.elements.phone, 'Please enter your phone number.');
    }
    if (n === 2 && !f.querySelector('[name="concern"]:checked')) return bad(null, 'Please choose a topic.');
    if (n === 3) {
      if (!f.querySelector('[name="day"]:checked')) return bad(null, 'Please choose a day.');
      if (!f.querySelector('[name="time"]:checked')) return bad(null, 'Please choose a time.');
    }
    if (n === 4 && !f.elements.consent.checked) return bad(null, 'Please tick the box so we can contact you.');
    return true;
  }
  function data() {
    const day = f.querySelector('[name="day"]:checked');
    return {
      name: val('name'), email: val('email'), country: val('country'), language: val('language'),
      phone: `${val('cc')} ${val('phone')}`.trim(),
      concern: (f.querySelector('[name="concern"]:checked') || {}).value || '',
      notes: val('notes'),
      day: day ? day.dataset.label : '', time: (f.querySelector('[name="time"]:checked') || {}).value || ''
    };
  }
  function summary() {
    const d = data();
    const rows = [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Country', d.country], ['Language', d.language],
      ['Topic', d.concern], ['Video call', `${d.day}, ${d.time} IST`]];
    if (d.notes) rows.push(['Notes', d.notes]);
    $('#cmSummary').innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${escapeHTML(v)}</dd>`).join('');
  }
  function submit() {
    const d = data();
    const ref = CONFIG.refPrefix + '-V' + Date.now().toString(36).slice(-5).toUpperCase();
    const msg = [
      `Hello ${CONFIG.clinicName}, I'd like an online (video) consultation.`,
      `Ref: ${ref}`, `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Country: ${d.country}`,
      `Language: ${d.language}`, `Topic: ${d.concern}`, `Preferred slot: ${d.day}, ${d.time} IST`,
      d.notes ? `Notes: ${d.notes}` : ''
    ].filter(Boolean).join('\n');
    $('#cmRef').textContent = ref;
    $('#cmWa').href = waLink(msg);
    if (CONFIG.formEndpoint) {
      fetch(CONFIG.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ type: 'Online consultation', ref, ...d })
      }).catch(() => {});
    }
    show(5);
  }
  next.addEventListener('click', () => {
    if (!check(step)) return;
    if (step === 4) submit(); else show(step + 1);
  });
  back.addEventListener('click', () => show(step - 1));
  f.addEventListener('submit', e => { e.preventDefault(); next.click(); });

  let lastFocus = null;
  function open() {
    if (step === 5) { f.reset(); buildDays(); $('#cmCountry').value = guess[0]; $('#cmCc').value = guess[2]; show(1); }
    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cm-lock');
    setTimeout(() => f.elements.name.focus(), 50);
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cm-lock');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-consult]')) { e.preventDefault(); open(); }
    else if (e.target.closest('[data-cm-close]') || e.target === modal) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  buildDays();
  show(1);
})();
