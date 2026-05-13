import posData        from '../../scraper/output/pospc-specializat.json'
/* ASCUNS TEMPORAR – nu șterge
import fiscaleData    from '../../scraper/output/echipamente-fiscale.json'
*/
import imprimanteData from '../../scraper/output/imprimante.json'
import cantareData    from '../../scraper/output/cantare-comerciale.json'
import scanereData    from '../../scraper/output/scanere-coduri-de-bare.json'
import caseData       from '../../scraper/output/case-de-autodeservire.json'
/* ASCUNS TEMPORAR – nu șterge
import terminaleData  from '../../scraper/output/terminale-colectare-date.json'
*/
import numarareData   from '../../scraper/output/sistem-numarare-vizitatori.json'
/* ASCUNS TEMPORAR – nu șterge
import antifurtData   from '../../scraper/output/sistem-antifurt.json'
import parcareData    from '../../scraper/output/echipamente-de-parcare.json'
import videoData      from '../../scraper/output/sisteme-supraveghere-video.json'
import audioData      from '../../scraper/output/sisteme-audio.json'
import accesData      from '../../scraper/output/sistem-control-acces.json'
import numerarData    from '../../scraper/output/echipament-primireemitere-numerar.json'
import industrialData from '../../scraper/output/echipamente-industriale-alimentare.json'
*/

export type Product = {
  slug: string
  title: string
  category: string
  stock_status: string
  price: string
  images: string[]
  description: string
  characteristics: string
  specifications: Record<string, string>
  tags: string[]
  url: string
}

export type CategoryEntry = {
  label: string
  icon: string
  products: Product[]
}

export const CATEGORY_MAP: Record<string, CategoryEntry> = {
  'pos-pc':                             { label: 'POS/PC Specializat',                   icon: '/img/iPOS.svg',           products: (posData as any).products.filter((p: any) => p.category === 'Sistem POS' && p.slug !== 'pos-terminal-beetle-ipos-plus-diebold-nixdorf') },
  'imprimante':                         { label: 'Imprimante',                            icon: '/img/iImprimante.svg',    products: (imprimanteData as any).products.filter((p: any) => p.title === 'RPrinter 421 L') },
  'cantare-comerciale':                 { label: 'Cântare Comerciale',                   icon: '/img/iCantare.svg',       products: (cantareData as any).products.filter((p: any) => p.title === 'Cantar Dibal serie G') },
  'scanare-coduri-de-bare':             { label: 'Scanare Coduri de Bare',               icon: '/img/iScanare.svg',       products: (scanereData as any).products.filter((p: any) => ['Scaner 2D coduri de bare manual RScan RSC 2410', 'Scaner 2D coduri de bare wireless RScan RSC 8410'].includes(p.title)) },
  'sistem-numarare-vizitatori':         { label: 'Sistem Numărare Vizitatori',           icon: '/img/iSistem.svg',        products: (numarareData as any).products },
  'case-de-autoservire':                { label: 'Case de Autoservire',                  icon: '/img/iCase.svg',          products: (caseData as any).products.filter((p: any) => p.category.trim() === 'Solutii HoReCa') },
  /* ASCUNS TEMPORAR – nu șterge
  'echipamente-fiscale':                { label: 'Echipamente Fiscale',                  icon: '/img/iEchipamente.svg',   products: (fiscaleData as any).products },
  'terminale-colectare-date':           { label: 'Terminale Colectare Date',             icon: '/img/iTerminale.svg',     products: (terminaleData as any).products },
  'sistem-antifurt':                    { label: 'Sistem Antifurt',                      icon: '/img/iSistem1.svg',       products: (antifurtData as any).products },
  'echipamente-de-parcare':             { label: 'Echipamente de Parcare',               icon: '/img/iEchipamente1.svg',  products: (parcareData as any).products },
  'sisteme-supraveghere-video':         { label: 'Sisteme Supraveghere Video',           icon: '/img/iSisteme.svg',       products: (videoData as any).products },
  'sisteme-audio':                      { label: 'Sisteme Audio',                        icon: '/img/iSisteme1.svg',      products: (audioData as any).products },
  'sistem-control-acces':               { label: 'Sistem Control Acces',                icon: '/img/iSistem2.svg',        products: (accesData as any).products },
  'echipament-primire-emitere-numerar': { label: 'Echipament Primire/Emitere Numerar',  icon: '/img/iEchipament.svg',    products: (numerarData as any).products },
  'echipament-industriale-alimentare':  { label: 'Echipament Industriale Alimentare',   icon: '/img/iEchipament1.svg',   products: (industrialData as any).products },
  */
}
