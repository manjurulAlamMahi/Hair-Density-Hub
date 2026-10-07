// One entry per treatment. Each becomes its own page (<slug>.html), a card on the
// Treatments page and an entry in the site search.
// `price` values are DEMO figures: replace them with the clinic's real prices.

export const treatments = [
  {
    slug: 'fue-hair-transplant',
    name: 'FUE Hair Transplant',
    cat: 'hair',
    concern: 'Hair Transplant (FUE / Sapphire FUE)',
    icon: '<path d="M10 30c0-9 6-16 14-16s14 7 14 16" /><path d="M16 22l-2-6M22 18l-1-7M28 18l1-7M33 22l2-6"/><path d="M10 30v6M38 30v6"/>',
    short: 'Healthy follicles are moved one by one from the donor area to thinning zones. No linear scar, with a natural-looking hairline.',
    lead: 'Follicular Unit Extraction moves your own healthy follicles, one at a time, from the back of the scalp to the areas that are thinning.',
    intro: [
      'FUE is the most widely used hair transplant technique today. Each follicular unit (a natural group of 1 to 4 hairs) is taken out individually with a fine punch, so there is no strip of skin removed and no stitched scar at the back of the head.',
      'The extracted grafts are then placed into tiny channels in the recipient area. The angle, direction and spacing of every channel are planned so that the new hair grows the same way your original hair did.'
    ],
    suitable: [
      'Men with receding hairlines or crown thinning (Norwood grade 2 to 6)',
      'People with a stable pattern of hair loss and a good donor area',
      'Anyone who wants to keep their hair short at the back without a visible scar',
      'Patients who want to restore a hairline lost to an old injury or burn'
    ],
    steps: [
      ['Hairline design', 'The doctor marks the new hairline with you, based on your face shape, age and future hair loss.'],
      ['Extraction', 'Under local anaesthesia, grafts are taken one by one from the donor area at the back and sides.'],
      ['Channel opening', 'Fine channels are made in the thinning area at the angle your hair naturally grows.'],
      ['Implantation', 'Each graft is placed into a channel, with single-hair grafts at the front for a soft hairline.']
    ],
    facts: [['Procedure time', '6–8 hours'], ['Anaesthesia', 'Local'], ['Back to work', '2–3 days'], ['Final result', '10–12 months']],
    price: 'From ₹45,000',
    faqs: [
      ['Will people be able to tell I had a transplant?', 'Once healed, no. The hairline is designed with single-hair grafts at the front and the tiny extraction points at the back are hidden by surrounding hair.'],
      ['How many grafts will I need?', 'It depends on the size of the thinning area and the density you want. Use the Graft Estimator for a rough range, and the doctor will confirm it at your consultation.'],
      ['Do I need to shave my head?', 'The donor area is usually trimmed short. Depending on the number of grafts, an unshaven option may be possible. Ask the doctor at your consultation.']
    ]
  },
  {
    slug: 'sapphire-fue',
    name: 'Sapphire FUE',
    cat: 'hair',
    concern: 'Hair Transplant (FUE / Sapphire FUE)',
    icon: '<path d="M24 6l8 10-8 26-8-26z"/><path d="M16 16h16"/>',
    short: 'Sapphire-tipped blades make finer channels, which can mean denser packing, smaller wounds and quicker healing.',
    lead: 'The same FUE extraction, with the recipient channels opened by sapphire-tipped blades instead of steel.',
    intro: [
      'In Sapphire FUE the grafts are extracted exactly as in classic FUE. The difference is in the second stage: the channels that receive the grafts are opened with blades made of polished sapphire crystal.',
      'Sapphire blades stay very sharp and smooth, so the channels can be smaller and more precise. That allows grafts to be placed closer together, which helps when a patient wants higher density in the hairline.'
    ],
    suitable: [
      'Patients who want maximum density at the hairline',
      'Large sessions where many channels need to be opened',
      'People who want to keep redness and scabbing to a minimum',
      'Anyone already suitable for classic FUE'
    ],
    steps: [
      ['Assessment', 'Donor density and the size of the recipient area are measured to plan the graft count.'],
      ['Extraction', 'Grafts are taken individually from the donor area under local anaesthesia.'],
      ['Sapphire channels', 'V-shaped sapphire blades open fine channels at the planned angle and depth.'],
      ['Implantation', 'Grafts are placed closely together for a dense, natural-looking result.']
    ],
    facts: [['Procedure time', '6–8 hours'], ['Anaesthesia', 'Local'], ['Scabs clear', '7–10 days'], ['Final result', '10–12 months']],
    price: 'From ₹60,000',
    faqs: [
      ['Is Sapphire FUE better than regular FUE?', 'It is a refinement of the channel-opening step. For many patients it allows denser packing and slightly faster healing, but the skill of the team matters more than the blade.'],
      ['Does it cost more?', 'Usually yes, because the blades are more expensive. Your quote will show the difference so you can choose.'],
      ['Is recovery different?', 'Recovery is similar to classic FUE. Some patients notice less redness in the first week.']
    ]
  },
  {
    slug: 'beard-eyebrow-transplant',
    name: 'Beard & Eyebrow Transplant',
    cat: 'hair',
    concern: 'Beard / Eyebrow Transplant',
    icon: '<path d="M12 18c4-3 8-3 12 0M24 18c4-3 8-3 12 0"/><path d="M14 32c3 6 17 6 20 0"/><path d="M14 32c0 4 4 8 10 8s10-4 10-8"/>',
    short: 'Fill patchy beards and shape fuller brows using your own hair, angled to match natural growth direction.',
    lead: 'Fill patchy beards, shape the moustache or rebuild thin eyebrows using follicles from your own scalp.',
    intro: [
      'Facial hair grows at very low angles and changes direction across the face. A beard or eyebrow transplant uses single-hair grafts placed almost flat to the skin, following those directions closely.',
      'The grafts come from the back of the scalp, where hair is permanent. Once they grow, they can be trimmed and shaped like the rest of your facial hair.'
    ],
    suitable: [
      'Men with patchy cheeks, a thin moustache or gaps in the beard line',
      'Thin or over-plucked eyebrows',
      'Scars in the beard or eyebrow area where hair no longer grows',
      'Anyone who wants a sharper, more defined beard shape'
    ],
    steps: [
      ['Shape design', 'The beard line or brow shape is drawn and agreed with you before anything starts.'],
      ['Extraction', 'Single-hair grafts are selected from the donor area at the back of the scalp.'],
      ['Placement', 'Each graft is placed at a very low angle, following the natural direction of facial hair.'],
      ['Aftercare', 'Small crusts fall off within a week. You can shave or trim after about 10 days.']
    ],
    facts: [['Procedure time', '3–6 hours'], ['Anaesthesia', 'Local'], ['Visible crusts', '5–7 days'], ['Final result', '6–9 months']],
    price: 'From ₹35,000',
    faqs: [
      ['Will the transplanted hair look like beard hair?', 'Scalp hair is a little finer than beard hair, but once it grows and is trimmed it blends in well with the existing beard.'],
      ['Can I shave after the transplant?', 'Yes. Wait around 10 days for the grafts to settle, then you can trim or shave as usual.'],
      ['How many grafts does an eyebrow need?', 'Typically 150 to 400 per brow, depending on the shape and how much existing hair there is.']
    ]
  },
  {
    slug: 'female-hair-loss',
    name: 'Female Hair Loss',
    cat: 'hair',
    concern: 'Female Hair Loss',
    icon: '<circle cx="24" cy="18" r="8"/><path d="M14 18c0 14-4 18-4 22M34 18c0 14 4 18 4 22"/><path d="M16 42c2-6 14-6 16 0"/>',
    short: 'Diffuse thinning, widening parting or post-pregnancy shedding, diagnosed properly and treated medically or surgically.',
    lead: 'Thinning in women usually has a cause that can be found and treated. We start with the diagnosis, not the surgery.',
    intro: [
      'Female hair loss often looks different from male pattern baldness: a widening parting, overall thinning on top, or heavy shedding after pregnancy, illness or stress. Hormones, thyroid problems, low iron and vitamin levels are common causes.',
      'Your consultation includes a scalp examination and, where needed, blood tests. Most women are treated with medicines, PRP or GFC first. A transplant is offered only when the pattern is stable and the donor area is strong.'
    ],
    suitable: [
      'A widening parting or thinning crown',
      'Heavy shedding after pregnancy, illness or weight loss',
      'A high forehead or receding temples',
      'Thin areas caused by tight hairstyles (traction alopecia)'
    ],
    steps: [
      ['Diagnosis', 'Scalp examination with a trichoscope and blood tests where the history suggests them.'],
      ['Medical plan', 'Treatment for the underlying cause, plus topical or oral medicine if appropriate.'],
      ['Regrowth therapy', 'PRP or GFC sessions to strengthen weak follicles and reduce shedding.'],
      ['Transplant (if suitable)', 'For stable, localised thinning, FUE can add density without shaving the whole head.']
    ],
    facts: [['First review', '6–8 weeks'], ['Common causes', 'Hormones, iron, thyroid'], ['PRP sessions', '4–6 typical'], ['Visible change', '3–6 months']],
    price: 'Consultation from ₹800',
    faqs: [
      ['Can women have a hair transplant?', 'Yes, when the thinning is stable and the donor area is good. Many women do well with medical treatment alone, so we always start there.'],
      ['Will I need to shave my head?', 'No. For women we usually use an unshaven technique so the procedure is not noticeable.'],
      ['Is post-pregnancy hair loss permanent?', 'Usually not. Shedding after pregnancy often settles within 6 to 12 months, and treatment can help it recover faster.']
    ]
  },
  {
    slug: 'prp-gfc-therapy',
    name: 'PRP & GFC Therapy',
    cat: 'hair',
    concern: 'Hair Fall / PRP / GFC',
    icon: '<path d="M18 6h12M20 6v8l-8 22a4 4 0 0 0 4 6h16a4 4 0 0 0 4-6l-8-22V6"/><path d="M15 30h18"/>',
    short: 'Growth factors from your own blood, injected into the scalp to strengthen weak follicles and slow hair fall.',
    lead: 'Growth factors from your own blood, concentrated and injected into the scalp to support weak and thinning hair.',
    intro: [
      'PRP (platelet-rich plasma) and GFC (growth factor concentrate) both start with a small blood sample. It is processed to concentrate the platelets and the growth factors they release, then injected into the thinning areas of the scalp.',
      'The aim is to strengthen follicles that are shrinking but still alive, reduce shedding and improve thickness. It is used on its own for early hair loss and alongside a transplant to support healing and protect existing hair.'
    ],
    suitable: [
      'Early thinning or increased daily hair fall',
      'Women with diffuse thinning',
      'Patients before or after a hair transplant',
      'People who want a non-surgical option'
    ],
    steps: [
      ['Blood sample', 'A small amount of blood is drawn, similar to a routine blood test.'],
      ['Processing', 'The sample is spun and processed to concentrate platelets and growth factors.'],
      ['Scalp injections', 'The concentrate is injected into the thinning areas. A numbing cream keeps it comfortable.'],
      ['Repeat sessions', 'Sessions are usually repeated every 4 to 6 weeks, then maintained a few times a year.']
    ],
    facts: [['Session time', '45–60 minutes'], ['Downtime', 'None'], ['Sessions', '4–6 to start'], ['Visible change', '3–4 months']],
    price: 'From ₹4,000 per session',
    faqs: [
      ['What is the difference between PRP and GFC?', 'GFC uses a further processing step to collect the growth factors themselves, giving a cleaner, more concentrated serum. The doctor will suggest which suits you.'],
      ['Does it hurt?', 'There is some discomfort from the injections. Numbing cream and fine needles keep it manageable, and you can return to normal activities the same day.'],
      ['Will PRP regrow hair on a bald area?', 'No. It helps follicles that are still alive. Completely bald areas need a transplant.']
    ]
  },
  {
    slug: 'repair-hair-transplant',
    name: 'Corrective / Repair Transplant',
    cat: 'hair',
    concern: 'Hair Transplant (FUE / Sapphire FUE)',
    icon: '<path d="M8 24a16 16 0 1 0 5-11.6"/><path d="M8 8v6h6"/><path d="M24 16v8l6 4"/>',
    short: 'Redesign of unnatural hairlines, pluggy grafts or low-density results from earlier procedures.',
    lead: 'For results from an earlier procedure that look unnatural, too thin or too low. We plan the repair around what can still be done.',
    intro: [
      'Common problems after a poor transplant include a hairline that is too straight or too low, large "pluggy" grafts, grafts placed at the wrong angle, low density and an over-harvested donor area.',
      'A repair can combine several approaches: softening the hairline with single-hair grafts, removing or re-angling badly placed grafts, adding density and camouflaging scars. Because donor hair may already be limited, careful planning is essential.'
    ],
    suitable: [
      'An unnatural, straight or very low hairline',
      'Visible "pluggy" or clumped grafts',
      'Low density after an earlier transplant',
      'A thinned or scarred donor area'
    ],
    steps: [
      ['Detailed review', 'We assess the previous result, the remaining donor supply and what is realistically achievable.'],
      ['Repair plan', 'A written plan covering which grafts to remove, re-angle or soften, and where to add density.'],
      ['Procedure', 'Corrective work and new grafts, usually in one session, under local anaesthesia.'],
      ['Follow-up', 'Close follow-up through regrowth, with a second session only if it is needed.']
    ],
    facts: [['Procedure time', '4–8 hours'], ['Anaesthesia', 'Local'], ['Back to work', '3–5 days'], ['Final result', '12 months']],
    price: 'Quote after review',
    faqs: [
      ['Can every bad transplant be fixed?', 'Most can be improved significantly. How much depends on how much donor hair is left. We will be honest about what is possible at the review.'],
      ['Can grafts be removed?', 'Yes. Badly placed grafts can be extracted and, where suitable, re-implanted at the correct angle.'],
      ['Should I send photos first?', 'Yes. Send clear photos of the front, top, crown and donor area on WhatsApp for a first opinion.']
    ]
  },
  {
    slug: 'laser-hair-reduction',
    name: 'Laser Hair Reduction',
    cat: 'laser',
    concern: 'Laser Hair Reduction',
    icon: '<path d="M24 4v10M24 34v10M4 24h10M34 24h10M10 10l7 7M31 31l7 7M38 10l-7 7M17 31l-7 7"/><circle cx="24" cy="24" r="5"/>',
    short: 'Diode laser for long-term hair reduction on face and body, with settings suited to Indian skin tones.',
    lead: 'Long-term reduction of unwanted hair on the face and body, with diode laser settings chosen for Indian skin.',
    intro: [
      'Laser hair reduction uses light energy that is absorbed by the pigment in the hair root. The heat damages the follicle so that it produces finer, lighter hair or stops growing altogether.',
      'Because only hairs in their active growth phase respond, a course of sessions is needed. Settings are adjusted to your skin type to keep treatment safe and effective on medium and darker skin tones.'
    ],
    suitable: [
      'Face, upper lip and chin',
      'Underarms, arms and legs',
      'Back, chest and bikini line',
      'Ingrown hairs and razor bumps in the beard area'
    ],
    steps: [
      ['Skin check', 'Skin type and hair colour are assessed and a small test patch is done.'],
      ['Preparation', 'The area is shaved a day before. No waxing or plucking for a few weeks beforehand.'],
      ['Treatment', 'The laser is passed over the area with built-in cooling to keep it comfortable.'],
      ['Course', 'Sessions every 4 to 8 weeks depending on the area, usually 6 to 8 in total.']
    ],
    facts: [['Session time', '15–60 minutes'], ['Downtime', 'None'], ['Sessions', '6–8 typical'], ['Interval', '4–8 weeks']],
    price: 'From ₹1,500 per session',
    faqs: [
      ['Is laser hair reduction permanent?', 'It gives long-term reduction. Most people see a large drop in hair growth, with occasional maintenance sessions afterwards.'],
      ['Is it safe for darker skin?', 'Yes, with the right laser and settings. A test patch is done first to confirm.'],
      ['Does it hurt?', 'Most people describe a warm, snapping feeling. The cooling tip keeps it comfortable.']
    ]
  },
  {
    slug: 'skin-treatments',
    name: 'Skin Treatments',
    cat: 'skin',
    concern: 'Acne / Scars / Pigmentation',
    icon: '<circle cx="24" cy="24" r="18"/><circle cx="17" cy="20" r="2"/><circle cx="29" cy="28" r="3"/><circle cx="30" cy="17" r="1.5"/>',
    short: 'Acne and scars, pigmentation, anti-ageing with HIFU and fillers, plus tattoo removal and carbon peel.',
    lead: 'Medical skin care under the same roof as our hair clinic: acne, scars, pigmentation, anti-ageing and laser treatments.',
    intro: [
      'Every skin plan starts with a proper diagnosis. Acne, melasma and early ageing each have several causes, and the right treatment depends on your skin type, history and lifestyle.',
      'We combine medical treatment with in-clinic procedures such as chemical peels, fractional laser, microneedling, HIFU, botox and fillers, Q-switched laser for tattoos and carbon peel for oily skin.'
    ],
    suitable: [
      'Active acne and acne scars',
      'Melasma, tanning and uneven skin tone',
      'Fine lines, sagging skin and volume loss',
      'Unwanted tattoos, open pores and dull, oily skin'
    ],
    steps: [
      ['Skin analysis', 'The doctor examines your skin and reviews your history and current products.'],
      ['Treatment plan', 'A combined plan of home care and in-clinic procedures, with a clear timeline.'],
      ['Procedures', 'Peels, lasers, microneedling or injectables, spaced as your skin needs.'],
      ['Maintenance', 'Review visits to adjust the plan and keep results going.']
    ],
    facts: [['Consultation', '20–30 minutes'], ['Most procedures', 'Under 1 hour'], ['Downtime', 'None to a few days'], ['Visible change', '4–12 weeks']],
    price: 'From ₹2,000 per session',
    faqs: [
      ['Can acne scars be removed completely?', 'They can be improved a great deal, often by 50 to 80 percent, with a combination of treatments over several sessions.'],
      ['Is melasma curable?', 'Melasma can be controlled well, but it can come back with sun exposure or hormonal changes, so maintenance and sun protection matter.'],
      ['When will I see results from HIFU?', 'Some tightening is visible early, with the full effect developing over 2 to 3 months.']
    ]
  }
];

// The broader treatment list shown on the home and Treatments pages.
// Entries with `page` link to a treatment page above.
export const cards = [
  { page: 'fue-hair-transplant' },
  { page: 'sapphire-fue' },
  { page: 'beard-eyebrow-transplant' },
  { page: 'female-hair-loss' },
  { page: 'prp-gfc-therapy' },
  { page: 'repair-hair-transplant' },
  { page: 'laser-hair-reduction' },
  {
    page: 'skin-treatments', cat: 'laser', name: 'Tattoo Removal & Carbon Peel', concern: 'Not sure / General consultation',
    icon: '<rect x="8" y="12" width="32" height="24" rx="4"/><path d="M8 20h32M16 28h4M24 28h8"/>',
    short: 'Q-switched laser to fade unwanted ink, plus carbon peel for oily skin, open pores and dullness.'
  },
  {
    page: 'skin-treatments', cat: 'skin', name: 'Acne & Acne Scars', concern: 'Acne / Scars / Pigmentation',
    icon: '<circle cx="24" cy="24" r="18"/><circle cx="17" cy="20" r="2"/><circle cx="29" cy="28" r="3"/><circle cx="30" cy="17" r="1.5"/>',
    short: 'Active acne control and scar revision with fractional laser, subcision and medical peels.'
  },
  {
    page: 'skin-treatments', cat: 'skin', name: 'Pigmentation & Glow', concern: 'Acne / Scars / Pigmentation',
    icon: '<path d="M24 6c8 8 14 14 14 22a14 14 0 0 1-28 0c0-8 6-14 14-22z"/><path d="M18 30a6 6 0 0 0 6 6"/>',
    short: 'Melasma, tanning and uneven tone treated with medical-grade peels, lasers and skin rejuvenation protocols.'
  },
  {
    page: 'skin-treatments', cat: 'skin', name: 'Anti-Ageing, HIFU & Fillers', concern: 'Anti-Ageing / HIFU / Fillers',
    icon: '<path d="M14 10c-4 6-4 22 0 28M34 10c4 6 4 22 0 28"/><path d="M18 20c4 2 8 2 12 0M18 30c4-2 8-2 12 0"/>',
    short: 'Non-surgical lifting and tightening with HIFU, plus botox and fillers for lines, volume loss and contouring.'
  }
];
