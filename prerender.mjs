/**
 * Post-build prerender script for static hosting SEO.
 *
 * Run AFTER `npm run build`:
 *   node prerender.mjs
 *
 * Creates a folder + index.html for every route so that:
 * 1. Crawlers (Google, Bing, ChatGPT, Perplexity) see correct meta tags
 * 2. SPA routing works on basic Apache/nginx hosting (each route has its own index.html)
 * 3. Social media sharing shows correct OG tags per page
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'

const DIST = './dist'
const BASE_URL = 'https://rsistems.ro'
const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

// ── Route definitions: path → { title, description, keywords } ──────────────
const routes = [
  // Core pages
  {
    path: '/demo',
    title: 'Demo Gratuit Sistem POS Restaurant – Programează Demonstrație RSistems',
    description: 'Programează o demonstrație gratuită a sistemului POS RSistems pentru restaurant, cafenea, bar sau fast-food. Vezi funcționalitățile POS, gestiune stocuri, rapoarte și KDS în acțiune.',
    keywords: 'demo sistem POS, demonstratie POS restaurant, demo gratuit POS, RSistems demo',
  },
  {
    path: '/preturi',
    title: 'Prețuri Sistem POS Restaurant România – Pachete de la 39€/lună | RSistems',
    description: 'Prețuri transparente RSistems: Basic 39€, Professional 59€, Enterprise 99€ pe lună. Sisteme POS complete pentru restaurante, cafenele, baruri și fast-food.',
    keywords: 'preturi sistem POS, pret POS restaurant, cat costa POS restaurant, pachete POS HoReCa',
  },
  {
    path: '/despre',
    title: 'Despre RSistems – Echipă și Misiune | Automatizare HoReCa România',
    description: 'RSistems este partenerul de digitalizare pentru afacerile HoReCa din România. Implementări rapide, suport real și soluții personalizate pentru restaurante, cafenele și baruri.',
    keywords: 'despre RSistems, echipa RSistems, automatizare HoReCa Romania, companie software restaurant',
  },
  {
    path: '/integrations',
    title: 'Integrări POS Restaurant – Delivery, Contabilitate, Plăți, CRM | RSistems',
    description: 'RSistems se integrează cu Glovo, Tazz, Bolt Food, sisteme de contabilitate, soluții de plată, CRM și HR. Conectează-ți restaurantul cu ecosistemul digital.',
    keywords: 'integrari POS restaurant, integrare Glovo POS, integrare Tazz, integrare Bolt Food, POS contabilitate',
  },
  {
    path: '/front-of-house',
    title: 'Software Front of House Restaurant – POS, Kiosk, QR Menu, Delivery | RSistems',
    description: 'Soluții POS complete pentru sala restaurantului: comenzi la masă, meniu QR, kiosk autoservire, arrival screen, integrare delivery și plăți rapide.',
    keywords: 'front of house restaurant, POS restaurant, kiosk autoservire, meniu QR restaurant, QR order',
  },
  {
    path: '/blog',
    title: 'Blog RSistems – Automatizare HoReCa, Sisteme POS, Gestiune Restaurant',
    description: 'Articole despre automatizare restaurant, sisteme POS, gestiune stocuri, digitalizare HoReCa, KDS, kiosk autoservire și tendințe din industria ospitalității în România.',
    keywords: 'blog HoReCa, articole automatizare restaurant, ghid POS restaurant, sfaturi gestiune restaurant',
  },

  // Industry pages
  {
    path: '/restaurant',
    title: 'Sistem POS Restaurant România – Automatizare și Gestiune Completă | RSistems',
    description: 'Sistem POS profesional pentru restaurante din România. Automatizare comenzi, KDS bucătărie, gestiune stocuri, rapoarte vânzări în timp real, integrare delivery Glovo, Tazz, Bolt Food.',
    keywords: 'sistem POS restaurant, automatizare restaurant, software restaurant, POS restaurant Romania, gestiune restaurant, KDS bucatarie',
  },
  {
    path: '/cafenea',
    title: 'Sistem POS Cafenea și Coffee Shop – Software Automatizare Cafenea | RSistems',
    description: 'Software POS pentru cafenele și coffee shop-uri. Servire rapidă, gestiune stocuri, programe fidelizare, rapoarte zilnice, fiscalizare ANAF. Soluție completă RSistems.',
    keywords: 'POS cafenea, sistem POS cafenea, automatizare cafenea, software cafenea, gestiune cafenea, coffee shop POS',
  },
  {
    path: '/bar',
    title: 'Sistem POS Bar și Pub – Automatizare și Gestiune Băuturi | RSistems',
    description: 'Sistem POS profesional pentru baruri și pub-uri. Gestiune băuturi, comenzi instant, control angajați, rapoarte vânzări, prevenire pierderi.',
    keywords: 'POS bar, sistem POS bar, automatizare bar, software bar, gestiune bar, POS pub',
  },
  {
    path: '/fast-food',
    title: 'Sistem POS Fast-Food – Automatizare, Kiosk și Integrare Delivery | RSistems',
    description: 'POS profesional pentru fast-food. Self-order kiosk, KDS bucătărie, integrare Glovo Tazz Bolt Food, gestiune stocuri în timp real, comenzi rapide.',
    keywords: 'POS fast-food, sistem POS fast food, automatizare fast food, kiosk autoservire fast food, integrare delivery',
  },
  {
    path: '/livrare',
    title: 'Sistem POS Delivery și Takeaway – Integrare Glovo, Tazz, Bolt Food | RSistems',
    description: 'Soluție POS completă pentru delivery și takeaway. Integrare directă cu Glovo, Tazz și Bolt Food, gestiune comenzi online centralizată.',
    keywords: 'POS delivery, sistem POS livrare, automatizare delivery, integrare Glovo, integrare Tazz, takeaway POS',
  },
  {
    path: '/sala-evenimente',
    title: 'Sistem POS Sală de Evenimente – Gestiune Rezervări și Meniuri | RSistems',
    description: 'POS profesional pentru săli de evenimente. Gestiune rezervări, facturare, control meniuri, rapoarte complete.',
    keywords: 'POS sala evenimente, sistem POS evenimente, automatizare sala evenimente, gestiune rezervari',
  },

  // Blog articles
  {
    path: '/blog/automatizare-horeca',
    title: 'Cum Automatizarea HoReCa Crește Profitul și Reduce Pierderile | RSistems',
    description: 'Descoperă cum automatizarea HoReCa reduce pierderile operaționale și crește profitabilitatea. Soluții POS complete RSistems pentru restaurante, cafenele și fast food.',
    keywords: 'automatizare HoReCa, automatizare restaurant, reducere pierderi restaurant, profit restaurant, sisteme POS HoReCa',
  },
  {
    path: '/blog/automatizare-restaurant-2026',
    title: 'Automatizare Restaurant: Tot Ce Trebuie să Știi în 2026 | RSistems',
    description: 'Ghid complet de automatizare restaurant 2026. Sisteme POS, KDS, gestiune stocuri, delivery integrat. Transformă operațiunile restaurantului tău.',
    keywords: 'automatizare restaurant 2026, ghid automatizare restaurant, sisteme POS moderne, KDS restaurant, digitalizare restaurant',
  },
  {
    path: '/blog/pos-cafenele',
    title: 'Sisteme POS Moderne pentru Cafenele și Coffee Shop-uri | RSistems',
    description: 'Ghid complet despre sisteme POS pentru cafenele în 2026. Servire rapidă, gestiune stocuri, fiscalizare ANAF, integrare delivery.',
    keywords: 'POS cafenea, sistem POS cafenea, software cafenea, gestiune cafenea, POS coffee shop',
  },
  {
    path: '/blog/reducere-pierderi-horeca',
    title: 'Cum Reduci Pierderile și Erorile în HoReCa | RSistems',
    description: 'Metode practice pentru reducerea pierderilor operaționale și eliminarea erorilor în restaurante, cafenele și fast food.',
    keywords: 'reducere pierderi restaurant, erori restaurant, gestiune stocuri, control vanzari, pierderi HoReCa',
  },
  {
    path: '/blog/automatizare-fast-food',
    title: 'Ghid Complet pentru Automatizarea Fast Food-urilor | RSistems',
    description: 'Automatizare fast food 2026: self-order kiosk, POS rapid, KDS, integrare delivery Glovo Tazz Bolt Food.',
    keywords: 'automatizare fast food, POS fast food, kiosk autoservire, KDS fast food, integrare delivery fast food',
  },
  {
    path: '/blog/digital-signage-horeca',
    title: 'Panouri Digitale pentru Restaurante și Meniuri Interactive | RSistems',
    description: 'Digital signage pentru restaurante, cafenele și fast food. Meniuri interactive, panouri digitale LED, actualizare automată.',
    keywords: 'digital signage restaurant, meniu digital, panou digital restaurant, menu board digital, meniu interactiv',
  },

  // Product categories
  {
    path: '/produse/pos-pc',
    title: 'Terminale POS și PC-uri Specializate pentru Restaurant | RSistems',
    description: 'Echipamente POS profesionale: terminale POS touchscreen, PC-uri specializate pentru restaurante, cafenele și baruri din România.',
    keywords: 'terminal POS, PC POS restaurant, echipamente POS, POS touchscreen, calculator POS',
  },
  {
    path: '/produse/imprimante',
    title: 'Imprimante POS și Bon Fiscal pentru Restaurant | RSistems',
    description: 'Imprimante POS profesionale pentru bonuri fiscale și comenzi bucătărie. Compatibile cu sistemul RSistems.',
    keywords: 'imprimanta POS, imprimanta bon fiscal, imprimanta termica restaurant, imprimanta bucatarie',
  },
  {
    path: '/produse/cantare-comerciale',
    title: 'Cântare Comerciale pentru Restaurant și Retail | RSistems',
    description: 'Cântare comerciale profesionale cu integrare POS. Ideale pentru restaurante, cofetării și magazine alimentare.',
    keywords: 'cantar comercial, cantar restaurant, cantar cu integrare POS, cantar digital',
  },
  {
    path: '/produse/scanare-coduri-de-bare',
    title: 'Scanere Coduri de Bare pentru POS Restaurant | RSistems',
    description: 'Scanere 2D coduri de bare profesionale, manuale și wireless. Compatibile cu sistemele POS RSistems.',
    keywords: 'scanner coduri de bare, scanner POS, cititor coduri de bare, scanner 2D restaurant',
  },
  {
    path: '/produse/sistem-numarare-vizitatori',
    title: 'Sistem Numărare Vizitatori pentru Restaurant și Retail | RSistems',
    description: 'Sisteme profesionale de numărare vizitatori pentru restaurante și magazine. Monitorizare flux clienți în timp real.',
    keywords: 'sistem numarare vizitatori, contor vizitatori, numarare clienti restaurant, flux clienti',
  },
  {
    path: '/produse/case-de-autoservire',
    title: 'Case de Autoservire și Kiosk Self-Order | RSistems',
    description: 'Case de autoservire și kiosk-uri self-order pentru restaurante, fast-food și retail. Comenzi rapide fără personal.',
    keywords: 'casa de autoservire, kiosk self-order, self checkout, autoservire restaurant, kiosk comanda',
  },
]

// ── Helper: inject meta tags into HTML template ─────────────────────────────
function injectMeta(html, { title, description, keywords, path }) {
  const fullUrl = `${BASE_URL}${path}`

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  )

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${description}"`
  )

  // Replace meta keywords
  html = html.replace(
    /<meta name="keywords" content="[^"]*"/,
    `<meta name="keywords" content="${keywords}"`
  )

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title}"`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${description}"`
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${fullUrl}"`
  )

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title}"`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${description}"`
  )

  // Replace canonical (hreflang)
  html = html.replace(
    /<link rel="alternate" hreflang="ro" href="[^"]*"/,
    `<link rel="alternate" hreflang="ro" href="${fullUrl}"`
  )
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"/,
    `<link rel="alternate" hreflang="x-default" href="${fullUrl}"`
  )

  return html
}

// ── Generate ────────────────────────────────────────────────────────────────
let created = 0
for (const route of routes) {
  const dir = join(DIST, route.path)
  const file = join(dir, 'index.html')

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const html = injectMeta(template, route)
  writeFileSync(file, html, 'utf-8')
  created++
}

console.log(`✅ Prerendered ${created} routes with SEO meta tags into ${DIST}/`)
