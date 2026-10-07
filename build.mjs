// Builds every page of the site from src/ into the project root.
//   node build.mjs
// No dependencies. Edit src/ (partials, sections, data), then run this again.

import fs from 'node:fs';
import { treatments, cards } from './src/data/treatments.mjs';
import { doctors, packages, priceList, cases, reviews, faqGroups } from './src/data/content.mjs';
import { posts } from './src/data/posts.mjs';

const read = p => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const part = n => read(`./src/partials/${n}.html`);
const sec = n => read(`./src/sections/${n}.html`);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
const SITE = 'Hair Density Hub';
const demo = '<span class="demo-tag" title="Placeholder content: replace with the clinic\'s real details">Demo</span>';
const byId = Object.fromEntries(treatments.map(t => [t.slug, t]));

/* ---------- Navigation ---------- */
const NAV = [
  { href: 'treatments.html', label: 'Treatments', key: 'treatments', sub: treatments.map(t => [`${t.slug}.html`, t.name, t.slug]) },
  { href: 'before-after.html', label: 'Before & After', key: 'results' },
  { href: 'doctors.html', label: 'Doctors', key: 'doctors' },
  { href: 'pricing.html', label: 'Pricing', key: 'pricing' },
  { href: 'international-patients.html', label: 'International', key: 'international' },
  { href: 'about.html', label: 'About Us', key: 'about' },
  { href: 'faq.html', label: 'F.A.Q', key: 'faq' },
  { href: 'blog.html', label: 'Blog', key: 'blog' },
  { href: 'contact.html', label: 'Contact', key: 'contact' }
];
const TABS = [
  ['index.html', 'Discover', 'home'], ['treatments.html', 'Treatments', 'treatments'], ['before-after.html', 'Before & After', 'results'],
  ['doctors.html', 'Doctors', 'doctors'], ['pricing.html', 'Pricing', 'pricing'], ['graft-estimator.html', 'Graft Estimator', 'estimator'],
  ['international-patients.html', 'International', 'international'], ['about.html', 'About Us', 'about'], ['faq.html', 'F.A.Q', 'faq'],
  ['blog.html', 'Blog', 'blog'], ['contact.html', 'Contact', 'contact']
];
const drawerHtml = active => [['index.html', 'Home', 'home'], ...NAV.map(n => [n.href, n.label, n.key]), ['graft-estimator.html', 'Graft Estimator', 'estimator']]
  .map(([h, l, k]) => `      <a href="${h}"${k === active ? ' class="active"' : ''}>${esc(l)}</a>`).join('\n');
const heroBar = (active, id = 'heroTabs', cls = 'hero-bar') => `<div class="${cls}">
    <div class="container hero-bar-inner">
      <button class="hero-bar-arrow" data-scroll="-1" aria-label="Previous">‹</button>
      <nav class="hero-tabs" id="${id}" aria-label="Pages">
${TABS.map(([h, l, k]) => `        <a href="${h}"${k === active ? ' class="active" aria-current="page"' : ''}>${esc(l)}</a>`).join('\n')}
      </nav>
      <button class="hero-bar-arrow" data-scroll="1" aria-label="Next">›</button>
    </div>
  </div>`;

/* ---------- Shared blocks ---------- */
const footer = () => `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="logo logo-light">
        <span class="logo-mark"><img src="assets/img/logo-96.png" srcset="assets/img/logo-96.png 1x, assets/img/logo-192.png 2x" width="56" height="56" alt=""></span>
        <span class="logo-text">Hair Density Hub<small>Skin &amp; Hair Transplant Clinic · Lucknow</small></span>
      </a>
      <p>Advanced techniques, natural results, permanent solutions. Trusted by 3000+ happy clients.</p>
    </div>
    <div>
      <h4>Treatments</h4>
      <ul>
${treatments.slice(0, 5).map(t => `        <li><a href="${t.slug}.html">${esc(t.name)}</a></li>`).join('\n')}
        <li><a href="treatments.html">All treatments</a></li>
      </ul>
    </div>
    <div>
      <h4>Clinic</h4>
      <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="doctors.html">Doctors</a></li>
        <li><a href="before-after.html">Before &amp; After</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="graft-estimator.html">Graft Estimator</a></li>
        <li><a href="international-patients.html">International Patients</a></li>
      </ul>
    </div>
    <div>
      <h4>Help</h4>
      <ul>
        <li><a href="faq.html">F.A.Q</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="https://www.instagram.com/hairdensityhub/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://www.facebook.com/hairdensityhub/" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="#" class="js-wa">WhatsApp</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© <span id="year">2026</span> Hair Density Hub, Lucknow.</span>
    <span>Results vary from person to person. Content is for information only and isn't medical advice.</span>
  </div>
</footer>
`;

const pageHero = ({ active, crumbs = [], eyebrow, title, lead, actions = true }) => `<section class="page-hero" id="hero">
  <div class="container page-hero-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${crumbs.map(([h, l]) => h ? ` <span>/</span> <a href="${h}">${esc(l)}</a>` : ` <span>/</span> <span aria-current="page">${esc(l)}</span>`).join('')}</nav>
    ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="page-hero-actions">
      <button type="button" class="btn btn-gold" data-consult>
        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8z"/></svg>
        Online Consultation</button>
      <a href="#" class="btn btn-outline-light js-wa">Quick Appointment</a>
    </div>` : ''}
  </div>
  ${heroBar(active)}
</section>
`;

const sectionHead = (eyebrow, title, lead) => `    <div class="section-head">
      <span class="eyebrow">${eyebrow}</span>
      <h2 class="section-title">${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>`;

const ctaBand = (title = 'Not sure where to start?', text = 'Send a few photos on WhatsApp or book a free online consultation. The doctor will tell you honestly what will work for you.') => `<section class="cta-band">
  <div class="container cta-band-inner">
    <div>
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
    <div class="cta-band-actions">
      <button type="button" class="btn btn-gold" data-consult>Online Consultation</button>
      <a href="#" class="btn btn-outline-light js-wa">Chat on WhatsApp</a>
    </div>
  </div>
</section>
`;

const treatCard = c => {
  const t = byId[c.page] || {};
  const name = c.name || t.name, cat = c.cat || t.cat, icon = c.icon || t.icon, short = c.short || t.short, concern = c.concern || t.concern;
  return `      <article class="treat-card" data-cat="${cat}">
        <div class="treat-icon"><svg viewBox="0 0 48 48">${icon}</svg></div>
        <h3><a href="${c.page}.html">${esc(name)}</a></h3>
        <p>${esc(short)}</p>
        <div class="treat-actions">
          <a href="${c.page}.html" class="card-link">Learn more →</a>
          <button class="card-link card-link-muted" data-book="${esc(concern)}">Book</button>
        </div>
      </article>`;
};
const treatmentsSection = (withHead = true) => `<section class="section" id="treatments">
  <div class="container">
${withHead ? sectionHead('Treatments', 'Hair, skin and laser care under one roof', 'Every plan starts with a proper scalp or skin assessment. Pick what you\'re interested in to learn more, or book it straight from the card.') : ''}
    <div class="filter-tabs" id="filterTabs" role="tablist">
      <button class="active" data-filter="all" role="tab">All</button>
      <button data-filter="hair" role="tab">Hair</button>
      <button data-filter="skin" role="tab">Skin</button>
      <button data-filter="laser" role="tab">Laser</button>
    </div>
    <div class="treat-grid" id="treatGrid">
${cards.map(treatCard).join('\n')}
      <article class="treat-card treat-card-cta" data-cat="all">
        <h3>Not sure what you need?</h3>
        <p>Book a general consultation. The doctor will examine your scalp or skin and explain your options, with no obligation.</p>
        <a href="contact.html#booking" class="btn btn-gold btn-sm" data-book="Not sure / General consultation">Quick Booking</a>
      </article>
    </div>
  </div>
</section>
`;

const faqItem = ([q, a]) => `      <details id="q-${slug(q)}">
        <summary>${esc(q)}</summary>
        <p>${esc(a)}</p>
      </details>`;
const faqSection = (items, more = true) => `<section class="section" id="faq">
  <div class="container faq-wrap">
${sectionHead('F.A.Q', 'Questions patients ask us')}
    <div class="faq" id="faqList">
${items.map(faqItem).join('\n')}
    </div>
    ${more ? '<p class="section-more"><a href="faq.html" class="btn btn-ghost">See all questions</a></p>' : ''}
  </div>
</section>
`;

const founderSection = (soft = false) => `<section class="section founder${soft ? ' section-soft' : ''}" id="founder">
  <div class="container founder-grid">
    <figure class="founder-photo">
      <img src="assets/img/founder-752.webp" srcset="assets/img/founder-480.webp 480w, assets/img/founder-752.webp 752w" sizes="(max-width: 960px) 90vw, 460px" width="752" height="1052" alt="The founder of Hair Density Hub at the clinic in Lucknow" loading="lazy">
    </figure>
    <div class="founder-text">
      <span class="eyebrow">Meet the founder</span>
      <h2 class="section-title">Results that look like your own hair</h2>
      <p class="lead">Hair Density Hub was started with a simple idea: a hair transplant should never look like a transplant. Every hairline is drawn by hand around the patient's face, age and donor area, and agreed with them before the procedure begins.</p>
      <blockquote class="founder-quote">“I'd rather tell someone they don't need surgery yet than give them a result they'll regret. Honest advice comes first.”</blockquote>
      <p class="founder-sign">Founder, Hair Density Hub ${demo}</p>
      <div class="founder-actions">
        <a href="contact.html#booking" class="btn btn-gold" data-book>Book a consultation</a>
        <a href="doctors.html" class="btn btn-ghost">Meet the team</a>
      </div>
    </div>
  </div>
</section>
`;

const avatar = d => d.photo
  ? `<img class="doc-photo" src="${d.photo}" width="480" height="672" alt="${esc(d.name)}" loading="lazy">`
  : `<span class="doc-avatar" aria-hidden="true">${d.initials}</span>`;
const doctorCard = (d, full) => `      <article class="doc-card">
        ${avatar(d)}
        <div class="doc-body">
          <h3>${esc(d.name)} ${demo}</h3>
          <p class="doc-role">${esc(d.role)}</p>
          <p class="doc-quals">${esc(d.quals)} · ${esc(d.years)}</p>
          ${full ? `<p>${esc(d.bio)}</p>
          <ul class="doc-focus">${d.focus.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
        </div>
      </article>`;

const reviewsSection = () => `<section class="section section-soft" id="reviews">
  <div class="container">
${sectionHead('Patient stories', 'What our patients say')}
    <div class="review-grid">
${reviews.map(([who, where, text]) => `      <figure class="review">
        <div class="stars" aria-label="5 out of 5">★★★★★</div>
        <blockquote>“${esc(text)}”</blockquote>
        <figcaption><strong>${esc(who)}</strong> · ${esc(where)} ${demo}</figcaption>
      </figure>`).join('\n')}
    </div>
  </div>
</section>
`;

// Top-down head illustration by Norwood grade (same drawing as the Graft Estimator)
const BALD = {
  '1': [], '2': [[20, 12, 7, 6], [44, 12, 7, 6]], '3': [[19, 15, 9, 9], [45, 15, 9, 9], [32, 8, 12, 4]],
  '3V': [[19, 15, 9, 9], [45, 15, 9, 9], [32, 8, 12, 4], [32, 44, 7, 7]], '4': [[32, 14, 18, 11], [32, 44, 10, 9]],
  '5': [[32, 17, 20, 14], [32, 44, 13, 11]], '6': [[32, 21, 17, 18]], '7': [[32, 25, 20, 24]]
};
let headN = 0;
const head = g => {
  const id = `bh${headN++}`;
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><clipPath id="${id}"><ellipse cx="32" cy="33" rx="25" ry="28"/></clipPath></defs>
<ellipse cx="32" cy="33" rx="25" ry="28" fill="#3b3631"/><g clip-path="url(#${id})" fill="#e7c6a4">${BALD[g].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}</g>
<ellipse cx="32" cy="33" rx="25" ry="28" fill="none" stroke="#2a2622" stroke-width="1.5"/></svg>`;
};
const caseCard = c => `      <article class="case-card" data-tag="${c.tag}">
        <div class="case-pair">
          <figure>${head(c.before)}<figcaption>Before</figcaption></figure>
          <span class="case-arrow" aria-hidden="true">→</span>
          <figure class="after">${head(c.after)}<figcaption>After</figcaption></figure>
        </div>
        <h3>${esc(c.title)} ${demo}</h3>
        <p>${esc(c.detail)}</p>
      </article>`;

const intlTeaser = () => `<section class="intl-band">
  <div class="container intl-band-inner">
    <div>
      <span class="eyebrow">International patients</span>
      <h2>Travelling to Lucknow for your transplant?</h2>
      <p>Consultation, procedure, hotel and transfers planned around your dates, starting with a video call from home.</p>
    </div>
    <a href="international-patients.html" class="btn btn-gold">See how it works</a>
  </div>
</section>
`;

const postCard = p => `      <article class="post-card">
        <a href="blog-${p.slug}.html" class="post-thumb" aria-hidden="true" tabindex="-1"><span>${esc(p.cat)}</span></a>
        <div class="post-body">
          <p class="post-meta">${fmtDate(p.date)} · ${p.mins} min read</p>
          <h3><a href="blog-${p.slug}.html">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
          <a href="blog-${p.slug}.html" class="card-link">Read article →</a>
        </div>
      </article>`;
function fmtDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---------- Page assembly ---------- */
const head0 = part('head'), topbar = part('topbar-header'), modal = part('modal'), floating = part('floating');
const pages = [];
function page(file, { title, description, active, sub, body, search }) {
  const hasBooking = body.includes('id="bookingForm"');
  let html = fill(head0, { title: esc(title), description: esc(description) }) + '\n'
    + fill(topbar, { drawerNav: drawerHtml(active), dock: heroBar(active, 'dockTabs', 'hero-bar dock-bar') })
    + '\n<main id="top">\n\n' + body + '\n</main>\n\n' + modal + '\n' + footer() + '\n' + floating;
  if (search) html = html.replace('<script src="assets/js/main.js"></script>', '<script src="assets/js/search-index.js"></script>\n<script src="assets/js/main.js"></script>');
  if (!hasBooking) html = html.replace(/href="#booking"/g, 'href="contact.html#booking"');
  if (!body.includes('id="contact"')) html = html.replace(/href="#contact"/g, 'href="contact.html#contact"');
  pages.push([file, html]);
}

/* Home */
page('index.html', {
  title: `${SITE} | Hair Transplant & Skin Clinic in Lucknow`,
  description: 'Hair Density Hub: skin & hair transplant clinic in Lucknow. FUE and Sapphire FUE hair transplant, PRP/GFC, beard & eyebrow transplant, laser and skin care. Book online, no login needed.',
  active: 'home', search: true,
  body: fill(sec('hero'), { heroBar: heroBar('home') }) + '\n' + sec('booking') + '\n' + sec('stats') + '\n' + treatmentsSection() + '\n'
    + sec('results').replace('<div class="results-cta">', '<div class="results-cta">\n      <a href="before-after.html" class="btn btn-outline-light">See before &amp; after</a>') + '\n'
    + sec('why') + '\n' + founderSection(true)
    + `<section class="section" id="doctors">
  <div class="container">
${sectionHead('Our doctors', 'The team behind your result')}
    <div class="doc-grid">
${doctors.map(d => doctorCard(d, false)).join('\n')}
    </div>
    <p class="section-more"><a href="doctors.html" class="btn btn-ghost">Meet the doctors</a></p>
  </div>
</section>
` + intlTeaser() + reviewsSection().replace('section-soft', '') + faqSection(faqGroups.flatMap(g => g[1]).slice(0, 5)) + sec('contact')
});

/* Treatments overview */
page('treatments.html', {
  title: `Treatments | ${SITE}, Lucknow`,
  description: 'Hair transplant (FUE, Sapphire FUE), beard and eyebrow transplant, PRP & GFC, female hair loss, laser hair reduction and skin treatments in Lucknow.',
  active: 'treatments',
  body: pageHero({ active: 'treatments', crumbs: [[null, 'Treatments']], eyebrow: 'Treatments', title: 'Hair, skin and laser care under one roof', lead: 'Every plan starts with a proper scalp or skin assessment. Choose a treatment to see how it works, who it suits and what recovery looks like.' })
    + treatmentsSection(false) + sec('journey') + ctaBand()
});

/* Treatment pages */
for (const t of treatments) {
  const related = treatments.filter(x => x.slug !== t.slug && (x.cat === t.cat || t.cat !== 'hair')).slice(0, 3);
  page(`${t.slug}.html`, {
    title: `${t.name} in Lucknow | ${SITE}`,
    description: `${t.lead} ${t.short}`.slice(0, 300),
    active: 'treatments', sub: t.slug,
    body: pageHero({ active: 'treatments', crumbs: [['treatments.html', 'Treatments'], [null, t.name]], eyebrow: { hair: 'Hair treatment', skin: 'Skin treatment', laser: 'Laser treatment' }[t.cat], title: esc(t.name), lead: esc(t.lead) })
      + `<section class="section">
  <div class="container detail-grid">
    <article class="detail-main">
      <h2>What is ${esc(t.name)}?</h2>
${t.intro.map(p => `      <p>${esc(p)}</p>`).join('\n')}
      <h2>Who it's for</h2>
      <ul class="check-list">
${t.suitable.map(s => `        <li>${esc(s)}</li>`).join('\n')}
      </ul>
      <h2>How it works</h2>
      <ol class="detail-steps">
${t.steps.map(([h, d]) => `        <li><h3>${esc(h)}</h3><p>${esc(d)}</p></li>`).join('\n')}
      </ol>
    </article>
    <aside class="detail-aside">
      <div class="aside-card">
        <h3>At a glance</h3>
        <dl class="facts">
${t.facts.map(([k, v]) => `          <div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n')}
        </dl>
        <div class="aside-price"><span>Guide price ${demo}</span><strong>${esc(t.price)}</strong><small>Final quote after your consultation.</small></div>
        <a href="contact.html#booking" class="btn btn-gold btn-block" data-book="${esc(t.concern)}">Book this treatment</a>
        <button type="button" class="btn btn-ghost btn-block" data-consult>Online consultation</button>
      </div>
      ${t.cat === 'hair' && t.slug !== 'prp-gfc-therapy' && t.slug !== 'female-hair-loss' ? `<a href="graft-estimator.html" class="aside-link">How many grafts do I need? <span>Try the Graft Estimator →</span></a>` : ''}
    </aside>
  </div>
</section>
` + faqSection(t.faqs, true).replace('<section class="section"', '<section class="section section-soft"').replace('Questions patients ask us', `${esc(t.name)}: common questions`)
      + `<section class="section">
  <div class="container">
${sectionHead('Related', 'You might also be interested in')}
    <div class="treat-grid treat-grid-3">
${related.map(r => treatCard({ page: r.slug })).join('\n')}
    </div>
  </div>
</section>
` + ctaBand()
  });
}

/* Before & After */
page('before-after.html', {
  title: `Before & After Hair Transplant Results | ${SITE}`,
  description: 'Hair transplant before and after results from Hair Density Hub, Lucknow: hairline restoration, crown coverage and large FUE sessions, plus patient video reviews.',
  active: 'results',
  body: pageHero({ active: 'results', crumbs: [[null, 'Before & After']], eyebrow: 'Real patients · Real results', title: 'Before &amp; after', lead: 'A selection of hair transplant cases by hair-loss grade, graft count and time since surgery. Every patient is different, so your consultation is where we set realistic expectations.' })
    + `<section class="section">
  <div class="container">
    <div class="filter-tabs" id="caseTabs" role="tablist">
      <button class="active" data-case="all" role="tab">All cases</button>
      <button data-case="hairline" role="tab">Hairline</button>
      <button data-case="crown" role="tab">Front &amp; crown</button>
    </div>
    <p class="demo-note">${demo} These are illustrations by hair-loss grade. Replace them with the clinic's patient photos (with consent).</p>
    <div class="case-grid">
${cases.map(caseCard).join('\n')}
    </div>
  </div>
</section>
` + sec('results') + reviewsSection() + ctaBand('Want results like these?', 'Send photos of your scalp for a free assessment and an estimate of the grafts you need.')
});

/* Doctors */
page('doctors.html', {
  title: `Our Doctors | ${SITE}, Lucknow`,
  description: 'Meet the doctors at Hair Density Hub, Lucknow: hair transplant surgeons, dermatologists and aesthetic physicians.',
  active: 'doctors',
  body: pageHero({ active: 'doctors', crumbs: [[null, 'Doctors']], eyebrow: 'Our doctors', title: 'The team behind your result', lead: 'Your consultation, hairline design and procedure are led by doctors, with a trained clinical team at every step.' })
    + `<section class="section">
  <div class="container">
    <p class="demo-note">${demo} Names, qualifications and the second and third doctors are placeholders. Replace them with the clinic's real team.</p>
    <div class="doc-list">
${doctors.map(d => doctorCard(d, true)).join('\n')}
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
${sectionHead('How we work', 'What you can expect from us')}
    <div class="value-grid">
      <div class="value"><h3>Doctor-led planning</h3><p>The doctor examines you, designs your hairline and agrees the plan with you before anything starts.</p></div>
      <div class="value"><h3>Honest advice</h3><p>If medicine or PRP will do the job better than surgery, we'll tell you. Not everyone needs a transplant.</p></div>
      <div class="value"><h3>One team, start to finish</h3><p>The same team looks after you from consultation through procedure day to your final review.</p></div>
    </div>
  </div>
</section>
` + ctaBand('Talk to a doctor', 'Book a video call with the doctor before you decide anything.')
});

/* Pricing */
page('pricing.html', {
  title: `Hair Transplant Cost & Pricing in Lucknow | ${SITE}`,
  description: 'Guide prices for hair transplant, PRP, GFC, laser and skin treatments at Hair Density Hub, Lucknow. Get an exact written quote after your consultation.',
  active: 'pricing',
  body: pageHero({ active: 'pricing', crumbs: [[null, 'Pricing']], eyebrow: 'Pricing', title: 'Clear, all-inclusive pricing', lead: 'Your final price depends on the number of grafts and the technique. After your consultation you get a written quote with everything included.' })
    + `<section class="section">
  <div class="container">
    <p class="demo-note">${demo} All prices on this page are sample figures. Replace them with the clinic's real prices.</p>
    <div class="pkg-grid">
${packages.map(p => `      <article class="pkg${p.featured ? ' pkg-featured' : ''}">
        ${p.featured ? '<span class="pkg-badge">Most chosen</span>' : ''}
        <h3>${esc(p.name)}</h3>
        <p class="pkg-sub">${esc(p.grafts)} · ${esc(p.note)}</p>
        <p class="pkg-price"><small>from</small> ${esc(p.price)}</p>
        <ul class="check-list">${p.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <a href="contact.html#booking" class="btn ${p.featured ? 'btn-gold' : 'btn-ghost'} btn-block" data-book="Hair Transplant (FUE / Sapphire FUE)">Get my quote</a>
      </article>`).join('\n')}
    </div>
  </div>
</section>
<section class="section section-soft">
  <div class="container price-wrap">
${sectionHead('Price list', 'Other treatments')}
    <table class="price-table">
      <tbody>
${priceList.map(([k, v]) => `        <tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n')}
      </tbody>
    </table>
    <p class="tiny">Guide prices including taxes. Your exact price is confirmed after the consultation.</p>
  </div>
</section>
<section class="section">
  <div class="container estimate-teaser">
    <div>
      <span class="eyebrow">Graft Estimator</span>
      <h2 class="section-title">Not sure how many grafts you need?</h2>
      <p class="lead">Pick the hair-loss pattern closest to yours and see an indicative graft range in seconds.</p>
    </div>
    <a href="graft-estimator.html" class="btn btn-primary">Try the Graft Estimator</a>
  </div>
</section>
` + faqSection(faqGroups.find(g => g[0] === 'Cost')[1], true).replace('<section class="section"', '<section class="section section-soft"') + ctaBand()
});

/* Graft estimator */
page('graft-estimator.html', {
  title: `Graft Estimator: How Many Grafts Do I Need? | ${SITE}`,
  description: 'Pick your hair-loss pattern (Norwood scale) for an indicative graft range, procedure time and recovery timeline, then book a free assessment.',
  active: 'estimator',
  body: pageHero({ active: 'estimator', crumbs: [[null, 'Graft Estimator']], eyebrow: 'Graft Estimator', title: 'How many grafts might you need?', lead: 'Choose the pattern closest to yours for an indicative range. Your exact plan depends on donor density and is set at consultation.', actions: false })
    + sec('estimator').replace(/<div class="section-head">[\s\S]*?<\/div>\n/, '') + sec('booking')
});

/* International patients */
page('international-patients.html', {
  title: `International Patients: Hair Transplant in Lucknow | ${SITE}`,
  description: 'Travelling to Lucknow for a hair transplant? Online consultation, travel planning, airport pickup, hotel, procedure and follow-up, planned around your dates.',
  active: 'international',
  body: pageHero({ active: 'international', crumbs: [[null, 'International Patients']], eyebrow: 'International patients', title: 'The international patient experience', lead: 'For patients travelling to Lucknow, everything is organised in one plan, from your first video call to your follow-up reviews at home.' })
    + sec('international').replace('<section class="section section-soft" id="international">', '<section class="section" id="international">')
    + `<section class="section section-soft">
  <div class="container">
${sectionHead('Planning your trip', 'Good to know before you travel')}
    <div class="value-grid value-grid-4">
      <div class="value"><h3>How long to stay</h3><p>Plan for 3 to 4 days: consultation and tests, procedure day and your first wash before flying home.</p></div>
      <div class="value"><h3>What to bring</h3><p>A button-up shirt, a loose cap for the journey home, your regular medicines and any recent blood reports.</p></div>
      <div class="value"><h3>Flying home</h3><p>Most patients fly 2 to 3 days after the procedure. We'll give you a travel and aftercare kit.</p></div>
      <div class="value"><h3>Follow-up from home</h3><p>Send photos on WhatsApp at set points through the year and we review your progress remotely.</p></div>
    </div>
  </div>
</section>
` + faqSection(faqGroups.find(g => g[0] === 'International patients')[1], true) + ctaBand('Start with a video call', 'Book an online consultation from home. The doctor will review your photos and give you a plan before you book flights.')
});

/* About */
page('about.html', {
  title: `About Us | ${SITE}, Lucknow`,
  description: 'Hair Density Hub is a dedicated skin and hair transplant clinic in Lucknow. Natural results, permanent solutions and 3000+ happy clients.',
  active: 'about',
  body: pageHero({ active: 'about', crumbs: [[null, 'About Us']], eyebrow: 'About us', title: 'Natural results. Permanent solutions.', lead: 'A dedicated skin and hair transplant clinic in Lucknow, planning every result around the person in front of us.' })
    + sec('why').replace(/<a href="#booking" class="btn btn-primary" data-book>Book a consultation<\/a>/, '<a href="doctors.html" class="btn btn-primary">Meet the doctors</a>')
    + founderSection(true) + sec('stats') + sec('journey') + reviewsSection() + ctaBand()
});

/* FAQ */
page('faq.html', {
  title: `Hair Transplant F.A.Q | ${SITE}, Lucknow`,
  description: 'Answers to common questions about hair transplant, recovery, results, cost and travelling to Lucknow for treatment.',
  active: 'faq',
  body: pageHero({ active: 'faq', crumbs: [[null, 'F.A.Q']], eyebrow: 'F.A.Q', title: 'Questions patients ask us', lead: 'Can\'t find your answer? Message the clinic on WhatsApp and the team will get back to you.' })
    + `<section class="section" id="faq">
  <div class="container faq-wrap">
    <nav class="faq-jump" aria-label="Topics">
${faqGroups.map(([g]) => `      <a href="#topic-${slug(g)}">${esc(g)}</a>`).join('\n')}
    </nav>
    <div id="faqList">
${faqGroups.map(([g, items]) => `    <h2 class="faq-group" id="topic-${slug(g)}">${esc(g)}</h2>
    <div class="faq">
${items.map(faqItem).join('\n')}
    </div>`).join('\n')}
    </div>
  </div>
</section>
` + ctaBand('Still have a question?')
});

/* Blog */
page('blog.html', {
  title: `Blog: Hair Loss & Hair Transplant Guides | ${SITE}`,
  description: 'Guides on hair transplant recovery, FUE techniques, female hair loss and more from the Hair Density Hub team in Lucknow.',
  active: 'blog',
  body: pageHero({ active: 'blog', crumbs: [[null, 'Blog']], eyebrow: 'Blog', title: 'Guides &amp; articles', lead: 'Plain-language guides on hair loss, hair transplants and recovery from the Hair Density Hub team.', actions: false })
    + `<section class="section">
  <div class="container">
    <div class="post-grid">
${posts.map(postCard).join('\n')}
    </div>
  </div>
</section>
` + ctaBand()
});
for (const p of posts) {
  page(`blog-${p.slug}.html`, {
    title: `${p.title} | ${SITE}`,
    description: p.excerpt,
    active: 'blog',
    body: pageHero({ active: 'blog', crumbs: [['blog.html', 'Blog'], [null, p.title]], eyebrow: `${esc(p.cat)} · ${fmtDate(p.date)} · ${p.mins} min read`, title: esc(p.title), lead: esc(p.excerpt), actions: false })
      + `<section class="section">
  <div class="container article-grid">
    <article class="article">${p.body}
    </article>
    <aside class="detail-aside">
      <div class="aside-card">
        <h3>Have a question about your hair?</h3>
        <p>Book a free online consultation and the doctor will review your photos.</p>
        <button type="button" class="btn btn-gold btn-block" data-consult>Online consultation</button>
        <a href="#" class="btn btn-ghost btn-block js-wa">WhatsApp us</a>
      </div>
    </aside>
  </div>
</section>
<section class="section section-soft">
  <div class="container">
${sectionHead('Keep reading', 'More from the blog')}
    <div class="post-grid">
${posts.filter(x => x !== p).slice(0, 3).map(postCard).join('\n')}
    </div>
  </div>
</section>
`
  });
}

/* Contact */
page('contact.html', {
  title: `Contact & Book an Appointment | ${SITE}, Lucknow`,
  description: 'Book a consultation at Hair Density Hub, Lucknow in under a minute. Call, WhatsApp or visit the clinic.',
  active: 'contact',
  body: pageHero({ active: 'contact', crumbs: [[null, 'Contact']], eyebrow: 'Contact', title: 'Book a consultation', lead: 'Choose a time below, call or WhatsApp us, or visit the clinic in Lucknow.', actions: false })
    + sec('booking') + sec('contact')
});

/* ---------- Search index (home page search box) ---------- */
const index = [
  ...treatments.map(t => ({ type: 'Treatment', title: t.name, text: `${t.short} ${t.lead}`, url: `${t.slug}.html` })),
  ...cards.filter(c => c.name).map(c => ({ type: 'Treatment', title: c.name, text: c.short, url: `${c.page}.html` })),
  ...faqGroups.flatMap(([, items]) => items.map(([q, a]) => ({ type: 'Question', title: q, text: a, url: `faq.html#q-${slug(q)}` }))),
  ...posts.map(p => ({ type: 'Article', title: p.title, text: p.excerpt, url: `blog-${p.slug}.html` })),
  { type: 'Tool', title: 'Graft Estimator: how many grafts do I need?', text: 'grafts norwood grade baldness', url: 'graft-estimator.html' },
  { type: 'Page', title: 'Pricing and cost', text: 'price cost package quote emi fee', url: 'pricing.html' },
  { type: 'Page', title: 'Before & after results', text: 'results before after photos video reviews', url: 'before-after.html' },
  { type: 'Page', title: 'Our doctors', text: 'doctor surgeon dermatologist team', url: 'doctors.html' },
  { type: 'Page', title: 'International patients', text: 'travel abroad bangladesh nepal visa hotel airport flight', url: 'international-patients.html' },
  { type: 'Booking', title: 'Book an appointment (no login)', text: 'book appointment consultation slot visit', url: 'contact.html#booking' },
  { type: 'Contact', title: 'Address, phone & directions', text: 'address location map lucknow contact phone call directions', url: 'contact.html#contact' }
];
fs.writeFileSync(new URL('./assets/js/search-index.js', import.meta.url),
  '// Generated by build.mjs: do not edit by hand.\nwindow.SEARCH_INDEX = ' + JSON.stringify(index, null, 1) + ';\n');

for (const [file, html] of pages) fs.writeFileSync(new URL(`./${file}`, import.meta.url), html);
console.log(`Built ${pages.length} pages: ${pages.map(p => p[0]).join(', ')}`);
