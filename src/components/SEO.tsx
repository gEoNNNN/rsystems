import { Helmet } from 'react-helmet-async'

interface BreadcrumbItem {
  name: string
  url: string
}

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  jsonLd?: object | object[]
  noindex?: boolean
  keywords?: string
  breadcrumbs?: BreadcrumbItem[]
}

const SITE_NAME = 'RSistems'
const BASE_URL = 'https://rsistems.ro'
const DEFAULT_OG = `${BASE_URL}/img/og-default.jpg`
const DEFAULT_KEYWORDS = 'sisteme POS, automatizare restaurant, software HoReCa, POS Romania, automatizare HoReCa, gestiune restaurant'

function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = 'website',
  jsonLd,
  noindex = false,
  keywords,
  breadcrumbs,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL

  const allJsonLd: object[] = []
  if (breadcrumbs && breadcrumbs.length > 0) {
    allJsonLd.push(buildBreadcrumbJsonLd(breadcrumbs))
  }
  if (jsonLd) {
    if (Array.isArray(jsonLd)) allJsonLd.push(...jsonLd)
    else allJsonLd.push(jsonLd)
  }

  return (
    <Helmet>
      {/* ── Primary ─────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="alternate" hrefLang="ro" href={url} />

      {/* ── Open Graph ──────────────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="ro_RO" />

      {/* ── Twitter Card ────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* ── JSON-LD ─────────────────────────────────── */}
      {allJsonLd.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(allJsonLd)}
        </script>
      )}
    </Helmet>
  )
}
