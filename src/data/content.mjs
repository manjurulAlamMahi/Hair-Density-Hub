// Page content that isn't a treatment.
// Everything under DEMO is placeholder content: replace it with the clinic's real details.

/* ---------- DEMO: doctors ---------- */
export const doctors = [
  {
    name: 'Dr. Aarav Mehta', initials: 'AM', role: 'Lead Hair Transplant Surgeon',
    quals: 'MBBS, MD (Dermatology)', years: '12+ years',
    bio: 'Leads every hair transplant at the clinic, from hairline design to the final review. Special interest in high-density FUE and corrective work.',
    focus: ['FUE & Sapphire FUE', 'Hairline design', 'Repair transplants']
  },
  {
    name: 'Dr. Ishita Rao', initials: 'IR', role: 'Consultant Dermatologist',
    quals: 'MBBS, DNB (Dermatology)', years: '9+ years',
    bio: 'Runs the medical hair-loss and skin clinic. Diagnoses the cause of thinning and builds the treatment plan for women and early hair loss.',
    focus: ['Female hair loss', 'PRP & GFC', 'Acne & pigmentation']
  },
  {
    name: 'Dr. Kabir Saxena', initials: 'KS', role: 'Aesthetic Physician',
    quals: 'MBBS, Fellowship in Aesthetic Medicine', years: '7+ years',
    bio: 'Handles laser and anti-ageing treatments, including HIFU, fillers and laser hair reduction, with settings matched to Indian skin.',
    focus: ['Laser hair reduction', 'HIFU & fillers', 'Beard & eyebrow work']
  }
];

/* ---------- DEMO: pricing ---------- */
export const packages = [
  {
    name: 'Hairline Restore', grafts: 'Up to 2,000 grafts', price: '₹45,000', note: 'Grade 2–3',
    items: ['FUE technique', 'Hairline design with the doctor', 'Blood tests & medicines', 'First wash & aftercare kit', '1 PRP session']
  },
  {
    name: 'Full Coverage', grafts: '2,000–3,500 grafts', price: '₹70,000', note: 'Grade 4–5', featured: true,
    items: ['Sapphire FUE technique', 'Hairline & crown planning', 'Blood tests & medicines', 'First wash & aftercare kit', '3 PRP sessions', 'Follow-up for 12 months']
  },
  {
    name: 'Maximum Density', grafts: '3,500+ grafts', price: '₹95,000', note: 'Grade 5–7',
    items: ['Sapphire FUE technique', 'Session over 1–2 days', 'Blood tests & medicines', 'First wash & aftercare kit', '4 GFC sessions', 'Follow-up for 12 months']
  }
];
export const priceList = [
  ['Hair consultation & scalp analysis', '₹800'],
  ['Online video consultation', 'Free'],
  ['FUE hair transplant (per graft, guide)', '₹25–35'],
  ['Beard or eyebrow transplant', 'From ₹35,000'],
  ['PRP therapy (per session)', '₹4,000'],
  ['GFC therapy (per session)', '₹7,000'],
  ['Laser hair reduction (per session, small area)', 'From ₹1,500'],
  ['Chemical peel', 'From ₹2,000'],
  ['HIFU face', 'From ₹12,000']
];

/* ---------- DEMO: before & after cases (illustrations until real photos arrive) ---------- */
export const cases = [
  { before: '3', after: '1', title: 'Hairline restoration', detail: '1,800 grafts · FUE · 10 months', tag: 'hairline' },
  { before: '4', after: '1', title: 'Front & crown', detail: '2,900 grafts · Sapphire FUE · 12 months', tag: 'crown' },
  { before: '5', after: '2', title: 'Large session', detail: '3,600 grafts · Sapphire FUE · 12 months', tag: 'crown' },
  { before: '3V', after: '1', title: 'Temples & vertex', detail: '2,300 grafts · FUE · 11 months', tag: 'crown' },
  { before: '2', after: '1', title: 'Hairline refinement', detail: '1,100 grafts · FUE · 9 months', tag: 'hairline' },
  { before: '6', after: '3', title: 'Advanced hair loss', detail: '4,200 grafts · 2 days · 12 months', tag: 'crown' }
];

/* ---------- Reviews (DEMO) ---------- */
export const reviews = [
  ['Rahul, 31', 'Lucknow', 'The doctor drew the hairline with me twice before we agreed. Ten months later nobody can tell.'],
  ['Tanvir, 36', 'Dhaka', 'They planned everything around my flight dates. The video consultation answered most of my questions before I travelled.'],
  ['Priya, 29', 'Kanpur', 'I came in for hair fall after my pregnancy. They found low iron first, then started PRP. The shedding has stopped.']
];

/* ---------- FAQ (grouped) ---------- */
export const faqGroups = [
  ['General', [
    ['How is a hair transplant done?', 'Under local anaesthesia, individual follicular units are extracted from the back and sides of the scalp (the donor area, which is resistant to balding) and implanted into tiny channels in the thinning area. With FUE there\'s no stitching and no linear scar. The procedure usually takes 6–8 hours and you go home the same day.'],
    ['Am I a good candidate?', 'Most people with stable pattern hair loss and a healthy donor area are suitable. Very early or very diffuse thinning is often better treated medically first. The doctor will tell you honestly at your consultation.'],
    ['Do you treat women with hair loss?', 'Yes. Female hair loss often has hormonal, nutritional or thyroid causes, so we start with diagnosis and treat medically first. Transplant is offered when it\'s the right option.'],
    ['Do I need to create an account to book?', 'No. Quick Booking needs only your name and mobile number. The clinic confirms your slot by call or WhatsApp.']
  ]],
  ['Procedure & recovery', [
    ['Is a hair transplant painful?', 'You\'ll feel the anaesthetic injections at the start. After that the area is numb and most patients feel little or no pain. Mild soreness for a few days afterwards is managed with prescribed medicines.'],
    ['When can I go back to work?', 'Most people return to desk work in 2–3 days. Avoid helmets, heavy exercise, swimming and direct sun on the scalp for the period your doctor advises (usually 2–4 weeks).'],
    ['When will I see results?', 'Transplanted hairs usually shed in weeks 2–8. That\'s normal. New growth begins around month 3–4, and the final density shows at 10–12 months (sometimes a little longer for the crown).'],
    ['Are the results permanent?', 'Transplanted follicles come from the DHT-resistant donor zone, so they generally keep growing for life. Your existing native hair can still thin over time, which is why the doctor may recommend medical therapy or PRP alongside surgery.']
  ]],
  ['Cost', [
    ['How much does a hair transplant cost in Lucknow?', 'Cost depends mainly on the number of grafts and the technique (FUE vs Sapphire FUE). After your scalp analysis you\'ll get a written, all-inclusive quote. See the Pricing page for guide prices and the Graft Estimator for an indicative graft range.'],
    ['What is included in the price?', 'Packages include the procedure, blood tests, medicines, the first wash, an aftercare kit and follow-up visits. Your written quote lists exactly what is covered.'],
    ['Do you offer EMI?', 'Ask the clinic about payment options at your consultation.']
  ]],
  ['International patients', [
    ['Can I have a consultation before I travel?', 'Yes. Book an online video consultation and send photos of your scalp. The doctor will give you an initial plan and graft estimate before you book flights.'],
    ['How many days should I stay in Lucknow?', 'Plan for 3 to 4 days: one for the in-person consultation and tests, one for the procedure and one for the first wash before you fly home.'],
    ['Can you help with travel arrangements?', 'The team can share hotel options near the clinic and help arrange an airport transfer. Ask during your online consultation.']
  ]]
];
