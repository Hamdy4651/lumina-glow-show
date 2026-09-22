import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronDown, Menu, MessageCircle, Minus, Plus, Quote, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import hero from "../assets/lumina-hero.jpg";
import portrait from "../assets/lumina-portrait-01.jpg";
import interior from "../assets/lumina-interior.jpg";
import skin from "../assets/lumina-skin-detail.jpg";
import doctor from "../assets/lumina-doctor.jpg";
import stilllife from "../assets/lumina-stilllife.jpg";
import client from "../assets/lumina-client.jpg";
import bokeh from "../assets/lumina-bokeh.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "icon", type: "image/png", href: "/favicon.png" }], meta: [
    { title: "LUMINA Klinik | Ästhetische Medizin in Bochum" },
    { name: "description", content: "LUMINA Klinik in Bochum: natürliche Ergebnisse, individuelle Beratung und ästhetische Behandlungen mit Botox, Hyaluron und modernen Verfahren." },
    { property: "og:title", content: "LUMINA Klinik | Ästhetische Medizin in Bochum" },
    { property: "og:description", content: "Natürliche Ergebnisse, individuelle Beratung und ästhetische Medizin mit Feingefühl." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

const treatments = [
  { name: "Faltenbehandlung (Botox)", note: "Entspannte, natürliche Ausstrahlung", image: skin, duration: "30–45 Min.", downtime: "Keine", price: "ab 149 €" },
  { name: "Hyaluronsäure & Filler", note: "Harmonische Konturen ohne Skalpell", image: portrait, duration: "45–60 Min.", downtime: "1–3 Tage", price: "ab 219 €" },
  { name: "Fett-weg-Spritze", note: "Gezielte Injektionslipolyse", image: stilllife, duration: "30 Min.", downtime: "Wenig", price: "ab 149 €" },
  { name: "Skin Booster & PRP", note: "Feuchtigkeit und Zellaktivierung", image: doctor, duration: "45–60 Min.", downtime: "Keine", price: "ab 199 €" },
  { name: "HydraFacial & Microneedling", note: "Tiefenpflege und Hauterneuerung", image: client, duration: "60–75 Min.", downtime: "1 Tag", price: "ab 159 €" },
  { name: "Infusionen & Vitamine", note: "Nährstoffe direkt für Körper und Haut", image: interior, duration: "30–45 Min.", downtime: "Keine", price: "ab 89 €" },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal, .stagger");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

// ── Ergänzung: dünner Scroll-Fortschrittsbalken ganz oben ──────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
    <div className="h-full bg-champagne transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
  </div>;
}

// ── Header: Mega-Menü & Mobil-Menü öffnen jetzt weich statt abrupt ────────
// Header schlanker gemacht: weniger Padding, etwas kleinere Logo-/Button-
// Maße. Auf großen Bildschirmen wirkte er zu wuchtig im Vergleich zum
// sonst sehr leichten, editorialen Stil der Seite — vor allem der solide
// TERMIN-Button zog optisch zu viel Gewicht auf sich.

function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 48);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const nav = [
    { label: "Ablauf", href: "#ablauf" },
    { label: "Preise", href: "#preise" },
    { label: "Über uns", href: "#ueber-uns" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${
          compact
            ? "bg-plum/90 py-1.5 shadow-xl backdrop-blur-xl"
            : "bg-gradient-to-b from-plum/85 to-transparent py-3"
        }
      `}
    >
      <div className="editorial-container relative">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          
          {/* Logo */}
          <a
            href="#top"
            aria-label="LUMINA Startseite"
            className="flex w-24 shrink-0 items-center gap-2 lg:w-28"
          >
            <img
              src="/favicon.png"
              alt="LUMINA"
              className="size-7 object-contain"
            />

            <span className="font-display text-lg tracking-[.08em] text-pearl">
              LUMINA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden justify-center gap-6 text-sm text-pearl lg:flex">
            <button
              type="button"
              onClick={() => setMega((prev) => !prev)}
              className="flex items-center gap-1 bg-transparent transition-colors hover:text-champagne"
            >
              Behandlungen

              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  mega ? "rotate-180" : ""
                }`}
              />
            </button>

            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-champagne"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            <a
              href="https://wa.me/4915777779962"
              aria-label="WhatsApp"
              className="
                grid size-9 place-items-center
                border border-pearl/40
                text-pearl
                transition-colors
                hover:border-champagne
                hover:text-champagne
              "
            >
              <MessageCircle size={16} />
            </a>

            <a
              href="#kontakt"
              className="
                hidden
                border border-champagne
                bg-champagne
                px-4 py-2.5
                text-xs font-semibold uppercase
                tracking-[.16em]
                text-plum
                transition-colors
                hover:bg-champagne-soft
                sm:block
              "
            >
              Termin
            </a>

            <button
              type="button"
              aria-label="Menü öffnen"
              onClick={() => setOpen((prev) => !prev)}
              className="grid size-9 place-items-center text-pearl lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <div
          className={`
            absolute left-0 right-0 top-full
            hidden lg:block
            overflow-hidden
            border-t border-pearl/10
            bg-plum/95
            shadow-2xl
            backdrop-blur-xl
            transition-all duration-300 ease-out
            ${
              mega
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="grid grid-cols-3 gap-10 p-8 text-pearl">
            {treatments.map((t) => (
              <a
                href="#behandlungen"
                onClick={() => setMega(false)}
                key={t.name}
                className="group"
              >
                <span className="font-display text-2xl transition-colors group-hover:text-champagne">
                  {t.name}
                </span>

                <span className="mt-1 block text-xs text-pearl/60">
                  {t.note}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`
            grid
            overflow-hidden
            bg-plum
            text-pearl
            transition-[max-height,opacity]
            duration-300
            ease-out
            lg:hidden
            ${
              open
                ? "max-h-96 py-6 opacity-100"
                : "max-h-0 py-0 opacity-0"
            }
          `}
        >
          <a
            href="#behandlungen"
            onClick={() => setOpen(false)}
            className="border-b border-pearl/15 py-3"
          >
            Behandlungen
          </a>

          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-pearl/15 py-3"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[94svh] overflow-hidden bg-plum text-pearl"
    >
      <div className="hero-media absolute inset-0">
        <img
          src={hero}
          width={1920}
          height={1280}
          alt="Persönliche Beratung bei LUMINA"
          className="hero-image h-full w-full object-cover object-[64%_center] md:object-[58%_center]"
        />
      </div>

      <div className="hero-overlay absolute inset-0" />
      <div className="hero-grain absolute inset-0" />
      <div className="ambient absolute left-[8%] top-[18%] size-56 rounded-full bg-champagne/15 blur-3xl" />

      <div className="editorial-container hero-copy relative z-10 flex min-h-[94svh] flex-col justify-center pb-20 pt-32">
        <p className="eyebrow text-champagne">
          Ästhetische Medizin · Bochum
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.8rem,9vw,8.8rem)] leading-[.84]">
          Natürlich schön.
          <br />
          <em className="font-normal text-champagne-soft">
            Ganz Sie.
          </em>
        </h1>

        <p className="mt-8 max-w-md text-base font-light leading-relaxed text-pearl/80 md:text-lg">
          Individuelle Beratung und moderne ästhetische Medizin mit Botox,
          Hyaluron und weiteren Verfahren für Ergebnisse, die zu Ihnen passen.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#kontakt"
            className="bg-champagne px-6 py-4 text-xs font-semibold uppercase tracking-[.16em] text-plum"
          >
            Termin buchen
          </a>

          <a
            href="#behandlungen"
            className="flex items-center gap-2 border border-pearl/50 px-6 py-4 text-xs uppercase tracking-[.16em] text-pearl"
          >
            Behandlungen
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <p className="absolute bottom-7 left-4 z-10 text-xs text-pearl/65 md:left-12">
        Brückstr. 44 · 44787 Bochum
      </p>

      <a
        href="#werte"
        aria-label="Weiter scrollen"
        className="absolute bottom-6 right-6 z-10 grid size-12 place-items-center border border-pearl/40 text-pearl"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}

function PhilosophieSection() { return <section className="section-pad overflow-hidden bg-pearl"><div className="editorial-container grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
  <div className="reveal relative grid grid-cols-2 gap-4 pb-12"><div className="arch image-zoom h-[34rem] self-start"><img loading="lazy" width={1024} height={1536} src={portrait} alt="Natürliche Schönheit" className="image-tone h-full w-full object-cover"/></div><div className="arch image-zoom mt-28 h-[27rem]"><img loading="lazy" width={1024} height={1536} src={doctor} alt="LUMINA Ärztin" className="image-tone h-full w-full object-cover"/></div><span className="absolute bottom-0 right-0 font-display text-7xl italic text-blush/60">L</span></div>
  <div className="reveal lg:pl-8"><p className="eyebrow text-plum-3">Unsere Philosophie</p><h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">Nicht verändern.<br/><em className="text-plum-3">Verfeinern.</em></h2><p className="mt-8 max-w-lg text-lg font-light leading-8 text-muted-ink">Wir betrachten jedes Gesicht als individuelle Komposition. Unser Ziel ist kein neuer Ausdruck, sondern die schönste, erholteste Version Ihrer selbst.</p><div className="mt-10 h-px w-24 bg-champagne"/></div>
  </div></section>; }

function WerteSection() { return <section id="werte" className="bg-plum pb-12 pt-20 text-pearl md:pt-28"><div className="editorial-container stagger grid grid-cols-2 gap-px bg-pearl/15 lg:grid-cols-4">{[[12,"+","Jahre Erfahrung"],[980,"+","Behandlungen"],[4.9,"","Bewertung"],[100,"%","Individuell"]].map(([n,s,l]) => <div key={String(l)} className="bg-plum px-4 py-8 text-center"><strong className="font-display text-4xl font-normal text-champagne md:text-6xl">{typeof n === "number" && n % 1 ? n : <Counter target={n as number} suffix={s as string}/>}</strong><span className="mt-2 block text-xs uppercase tracking-[.15em] text-pearl/60">{l}</span></div>)}</div></section>; }

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0); const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([entry]) => { if (!entry?.isIntersecting) return; const start = performance.now(); const tick = (now:number) => { const p = Math.min((now-start)/1500,1); setValue(Math.round(target*(1-Math.pow(1-p,3)))); if(p<1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); io.disconnect(); }); io.observe(el); return () => io.disconnect(); }, [target]);
  return <span ref={ref}>{value}{suffix}</span>;
}

function QuoteBand() { return <section className="relative grid min-h-[68vh] place-items-center overflow-hidden text-center text-pearl"><img loading="lazy" width={1792} height={1024} src={skin} alt="Natürliche Haut im Licht" className="image-tone absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-plum/65"/><blockquote className="reveal relative z-10 max-w-5xl px-6 font-display text-4xl italic leading-tight md:text-7xl">„Schönheit beginnt dort, wo Sie sich wiedererkennen.“</blockquote></section>; }

function AblaufSection() { const steps = [["I","Kennenlernen","Ihre Wünsche, Ihre Geschichte, Ihr Tempo."],["II","Analyse","Präzise Beratung ohne vorgefertigten Plan."],["III","Behandlung","Behutsam, transparent und medizinisch fundiert."],["IV","Begleitung","Wir bleiben auch danach an Ihrer Seite."]]; return <section id="ablauf" className="section-pad relative overflow-hidden bg-plum text-pearl"><img loading="lazy" width={1792} height={1024} src={bokeh} alt="Ruhige Atmosphäre" className="absolute inset-0 h-full w-full object-cover opacity-20"/><div className="ambient absolute right-[12%] top-[20%] size-72 rounded-full bg-champagne/15 blur-3xl"/><div className="editorial-container relative"><p className="eyebrow text-champagne">Ihr Weg bei LUMINA</p><h2 className="mt-6 max-w-3xl font-display text-5xl md:text-7xl">Vier Schritte. Ein Ergebnis, das sich nach Ihnen anfühlt.</h2><div className="stagger mobile-card-scroll mt-16 grid gap-4 md:grid-cols-4">{steps.map(([num,title,text])=><article key={num} className="luxury-card min-h-64 bg-plum/85 p-7 backdrop-blur-sm"><span className="font-display text-5xl text-champagne">{num}</span><h3 className="mt-12 font-display text-2xl">{title}</h3><p className="mt-3 text-sm font-light leading-6 text-pearl/65">{text}</p></article>)}</div></div></section>; }

function BehandlungenSection() { const [active,setActive]=useState<number|null>(null); return <section id="behandlungen" className="section-pad bg-pearl"><div className="editorial-container"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-plum-3">Behandlungen</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Ihre Haut.<br/><em>Neu gelesen.</em></h2></div><p className="max-w-sm text-sm leading-6 text-muted-ink">Ausgewählte Konzepte, individuell kombiniert. Die finalen Preise werden nach persönlicher Beratung bestätigt.</p></div><div className="stagger mobile-card-scroll mt-14 grid gap-7 md:grid-cols-3">{treatments.map((t,i)=><article key={t.name} className={`luxury-card group ${i===1?"md:mt-16":""}`}><div className="image-zoom h-[28rem] overflow-hidden"><img loading="lazy" width={i===2?1200:i===1?1024:1792} height={i===2?1200:i===1?1536:1024} src={t.image} alt={t.name} className="image-tone h-full w-full object-cover"/></div><div className="border-b border-plum/20 px-4 py-5"><button onClick={()=>setActive(active===i?null:i)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center text-left"><span><strong className="block font-display text-3xl font-normal">{t.name}</strong><small className="text-muted-ink">{t.note}</small></span>{active===i?<Minus/>:<Plus/>}</button>{active===i&&<div className="mt-5 grid grid-cols-3 gap-2 border-t border-plum/10 pt-4 text-xs"><span><b className="block text-muted-ink">Dauer</b>{t.duration}</span><span><b className="block text-muted-ink">Ausfallzeit</b>{t.downtime}</span><span><b className="block text-muted-ink">Preis</b>{t.price}</span></div>}</div></article>)}</div></div></section>; }

function SignatureSection() { return <section className="section-pad bg-pearl-2"><div className="editorial-container grid items-center gap-12 lg:grid-cols-2"><div className="reveal arch image-zoom h-[44rem]"><img loading="lazy" width={1024} height={1536} src={portrait} alt="LUMINA Signature Behandlung" className="image-tone h-full w-full object-cover"/></div><div className="reveal lg:px-14"><p className="eyebrow text-plum-3">Signature Experience</p><h2 className="mt-6 font-display text-5xl md:text-7xl">The LUMINA<br/><em>Ritual</em></h2><p className="mt-7 text-lg font-light leading-8 text-muted-ink">Eine fein abgestimmte Kombination aus Hautanalyse, regenerierender Behandlung und persönlichem Pflegekonzept.</p><div className="my-9 border-y border-plum/15 py-6"><div className="flex items-baseline justify-between"><span className="text-sm">Komplettes Ritual</span><span className="font-display text-4xl">490 €</span></div><p className="mt-2 text-right text-xs text-muted-ink line-through">Einzeln 590 €</p></div><a href="#kontakt" className="inline-flex items-center gap-3 bg-plum px-7 py-4 text-xs uppercase tracking-[.16em] text-pearl">Ritual anfragen <ArrowRight size={15}/></a></div></div></section>; }

function AngeboteSection(){ return <section className="bg-plum-2 py-16 text-pearl"><div className="editorial-container reveal"><div className="grid gap-6 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-champagne">Aktuell bei LUMINA</p><h2 className="mt-4 font-display text-4xl">Unsere Angebote</h2></div><div className="mobile-card-scroll">{[["4 Zonen Botox","Jede weitere Zone 59 €","240 €"],["Russische Lippen Technik","Mit Juvederm, statt 240 €","219 €"],["Doppelkinn Lemon Bottle","3 Sitzungen, statt 360 €","299 €"],["Skin Booster mit Profhilo","3 Sitzungen, statt 750 €","599 €"]].map(([a,b,c])=><div key={a} className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-pearl/20 py-5"><div><strong className="font-display text-2xl font-normal">{a}</strong><span className="ml-4 hidden text-sm text-pearl/55 sm:inline">{b}</span></div><span className="border border-champagne px-3 py-1 text-xs text-champagne">{c}</span></div>)}</div></div></div></section> }

// ── BeforeAfter: dezenter Puls am Regler, bis einmal interagiert wurde ────
function BeforeAfter({ image, position, setPosition }: { image:string; position:number; setPosition:(n:number)=>void }) {
  const [touched, setTouched] = useState(false);
  return <div className="luxury-card relative aspect-[4/5] overflow-hidden bg-plum">
    <img loading="lazy" src={image} alt="Vorher: unruhiges Hautbild" className="absolute inset-0 h-full w-full object-cover saturate-0 brightness-75 contrast-75 blur-[.2px]"/>
    <div className="absolute inset-y-0 left-0 overflow-hidden" style={{width:`${position}%`}}><img loading="lazy" src={image} alt="Nachher: ebenmäßigeres Hautbild" className="h-full max-w-none object-cover saturate-100 contrast-100" style={{width:"calc((min(100vw, 84rem) - 3.5rem) / 3)"}}/></div>
    <div className="pointer-events-none absolute inset-y-0 w-px bg-pearl" style={{left:`${position}%`}}>
      <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-pearl font-display text-plum">
        {!touched && <span className="absolute inset-0 animate-ping rounded-full bg-pearl/70" />}
        <span className="relative">↔</span>
      </span>
    </div>
    <input aria-label="Vorher-Nachher-Vergleich" type="range" min="8" max="92" value={position} onPointerDown={() => setTouched(true)} onChange={e=>setPosition(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"/>
    <span className="absolute bottom-4 left-4 text-xs uppercase text-pearl">Nachher</span>
    <span className="absolute bottom-4 right-4 text-xs uppercase text-pearl">Vorher</span>
  </div>;
}
function VorherNachherSection(){ const [positions,setPositions]=useState([52,45,58]); const imgs=[client,skin,portrait]; return <section className="section-pad bg-pearl"><div className="editorial-container"><div className="reveal text-center"><p className="eyebrow text-plum-3">Ergebnisse</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Subtil. Sichtbar. <em>Sie.</em></h2><p className="mx-auto mt-5 max-w-lg text-sm text-muted-ink">Die linke Seite zeigt ein bewusst reduziertes Hautbild als illustrative Vorher-Darstellung. Echte Ergebnisse variieren und werden nach Einwilligung ergänzt.</p></div><div className="stagger mobile-card-scroll mt-14 grid gap-5 md:grid-cols-3">{imgs.map((img,i)=><BeforeAfter key={img} image={img} position={positions[i] ?? 50} setPosition={(n)=>setPositions(p=>p.map((v,x)=>x===i?n:v))}/>)}</div></div></section> }

function BewertungenSection(){ const reviews=[
  ["Susi K.","Bochum","Ich war zur Beratung in der Praxis und habe mich von Anfang an rundum wohl und gut aufgehoben gefühlt. Die Ärzte haben sich viel Zeit genommen und ehrlich sowie individuell beraten. Das Ergebnis wirkt wunderschön und absolut natürlich."],
  ["S. T.","Essen","Das Team war unglaublich freundlich und professionell. Meine Lippen sehen wunderschön und trotzdem natürlich aus. Die Behandlung verlief völlig schmerzfrei und das Ergebnis ist einfach perfekt."],
  ["Sabrina G.","Dortmund","Ich hatte vor meiner ersten Behandlung wirklich Angst. Das Aufklärungsgespräch war gründlich, die Arbeit steril und dank der Betäubung hatte ich absolut keine Schmerzen. Ich habe mich sehr wohl gefühlt."],
] as const; const [i,setI]=useState(0); useEffect(()=>{const id=setInterval(()=>setI(v=>(v+1)%reviews.length),6500);return()=>clearInterval(id)},[]); const review=reviews[i] ?? reviews[0]; return <section id="bewertungen" className="section-pad bg-plum text-pearl"><div className="editorial-container"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-champagne">Patientenstimmen</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Echte Worte.<br/><em className="text-champagne-soft">Echte Erfahrung.</em></h2></div><p className="max-w-sm text-sm leading-6 text-pearl/60">Eine Auswahl authentischer Rückmeldungen aus unserer Praxis in Bochum.</p></div><div className="reveal mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div className="luxury-card bg-pearl p-8 text-plum md:p-12"><Quote className="text-plum-3" size={36}/><blockquote key={i} className="mt-7 animate-fade-in font-display text-3xl italic leading-tight md:text-5xl">„{review[2]}“</blockquote><div className="mt-9 border-t border-plum/15 pt-5"><strong className="font-display text-2xl font-normal">{review[0]}</strong><span className="ml-3 text-sm text-muted-ink">{review[1]}</span></div></div><div className="grid gap-4 sm:grid-cols-3">{reviews.map((item,x)=><button key={item[0]} onClick={()=>setI(x)} className={`luxury-card p-5 text-left text-pearl transition-colors ${i===x?"bg-plum-3":"bg-plum-2"}`}><span className="text-xs uppercase tracking-[.16em] text-champagne">0{x+1}</span><strong className="mt-10 block font-display text-2xl font-normal">{item[0]}</strong><span className="mt-1 block text-sm text-pearl/55">{item[1]}</span><span className="mt-6 block text-xs leading-5 text-pearl/65">{item[2].slice(0,90)}...</span></button>)}</div></div></div></section> }

function GalerieSection(){ const photos=[{src:doctor,c:"md:col-span-2 md:row-span-2"},{src:stilllife,c:""},{src:interior,c:"md:col-span-2"},{src:client,c:""},{src:skin,c:"md:col-span-2"}]; return <section className="section-pad bg-pearl"><div className="editorial-container"><div className="reveal mb-12"><p className="eyebrow text-plum-3">Eine Welt für sich</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Momente bei <em>LUMINA</em></h2></div><div className="stagger mobile-card-scroll grid auto-rows-[18rem] gap-3 md:grid-cols-4">{photos.map((p,i)=><div key={i} className={`image-zoom overflow-hidden ${p.c}`}><img loading="lazy" src={p.src} alt={`LUMINA Moment ${i+1}`} className="image-tone h-full w-full object-cover"/></div>)}</div></div></section> }

function PreiseSection(){ const categories=[{n:"Botox",items:[["4 Zonen","240 €"],["Jede weitere Zone","59 €"],["Faltenbehandlung","auf Anfrage"]]},{n:"Filler",items:[["Russische Lippen Technik","219 €"],["Hyaluronsäure","auf Anfrage"],["Beratung","kostenlos"]]},{n:"Haut & Körper",items:[["Doppelkinn Lemon Bottle","299 € / 3 Sitzungen"],["Skin Booster Profhilo","599 € / 3 Sitzungen"],["Infusionen & Vitamine","auf Anfrage"]]}]; return <section id="preise" className="section-pad bg-pearl-2"><div className="editorial-container"><div className="reveal text-center"><p className="eyebrow text-plum-3">Transparenz</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Preisübersicht</h2><p className="mx-auto mt-5 max-w-xl text-sm text-muted-ink">Unsere Angebote auf einen Blick. Der genaue Behandlungsplan wird persönlich mit Ihnen besprochen.</p></div><div className="stagger mt-14 grid gap-6 md:grid-cols-3">{categories.map(cat=><div key={cat.n} className="luxury-card bg-pearl p-7"><h3 className="font-display text-3xl">{cat.n}</h3><div className="mt-6">{cat.items.map(([a,b])=><div key={a} className="flex justify-between gap-4 border-b border-plum/15 py-4 text-sm"><span>{a}</span><span className="text-right text-muted-ink">{b}</span></div>)}</div></div>)}</div></div></section> }

function UeberUnsSection(){ return <section id="ueber-uns" className="section-pad bg-plum text-pearl"><div className="editorial-container"><div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]"><div className="reveal image-zoom h-[38rem] overflow-hidden"><img loading="lazy" width={1024} height={1536} src={doctor} alt="Ihre Ärztin bei LUMINA" className="image-tone h-full w-full object-cover object-top"/></div><div className="reveal lg:pl-10"><p className="eyebrow text-champagne">Über LUMINA</p><h2 className="mt-6 font-display text-5xl md:text-7xl">Medizin mit Blick für das <em className="text-champagne-soft">Wesentliche.</em></h2><p className="mt-7 font-light leading-7 text-pearl/70">Ein ruhiger Ort für ehrliche Beratung, sorgfältige Behandlung und eine Ästhetik, die nicht laut sein muss.</p><div className="mt-10 grid grid-cols-3 border-y border-pearl/20 py-7 text-center"><span><b className="block font-display text-3xl text-champagne">2018</b><small>Gegründet</small></span><span><b className="block font-display text-3xl text-champagne">6</b><small>Expertinnen</small></span><span><b className="block font-display text-3xl text-champagne">1</b><small>Standort</small></span></div></div></div><div className="luxury-card reveal mt-20 grid overflow-hidden bg-pearl text-plum md:grid-cols-2"><img loading="lazy" width={1792} height={1024} src={interior} alt="Praxisräume" className="h-80 w-full object-cover md:h-full"/><div className="p-8 md:p-12"><p className="eyebrow text-plum-3">Besuchen Sie uns</p><h3 className="mt-5 font-display text-4xl">Zeit für Sie</h3><div className="mt-8 space-y-3 text-sm"><p className="flex justify-between border-b border-plum/15 pb-3"><span>Montag – Freitag</span><span>09:00 – 18:00</span></p><p className="flex justify-between border-b border-plum/15 pb-3"><span>Samstag</span><span>Nach Vereinbarung</span></p></div><p className="mt-8 text-sm text-muted-ink">Maximilianstraße · München<br/>Nur wenige Schritte vom Odeonsplatz</p></div></div></div></section> }

function KontaktSection(){ const faqs=["Wie läuft die Erstberatung ab?","Wie natürlich sind die Ergebnisse?","Welche Ausfallzeit sollte ich einplanen?","Kann ich Behandlungen kombinieren?"]; const [open,setOpen]=useState(0); return <section id="kontakt" className="section-pad bg-pearl"><div className="editorial-container grid gap-16 lg:grid-cols-2"><div className="reveal"><p className="eyebrow text-plum-3">Kontakt</p><h2 className="mt-5 font-display text-5xl md:text-7xl">Beginnen wir mit einem <em>Gespräch.</em></h2><form onSubmit={e=>e.preventDefault()} className="mt-10 grid gap-5"><label className="text-xs uppercase tracking-[.14em]">Name<input className="mt-2 w-full border-0 border-b border-plum/30 bg-transparent px-0 py-3 outline-none focus:border-champagne" /></label><label className="text-xs uppercase tracking-[.14em]">E-Mail<input type="email" className="mt-2 w-full border-0 border-b border-plum/30 bg-transparent px-0 py-3 outline-none focus:border-champagne" /></label><label className="text-xs uppercase tracking-[.14em]">Ihre Wünsche<textarea rows={3} className="mt-2 w-full resize-none border-0 border-b border-plum/30 bg-transparent px-0 py-3 outline-none focus:border-champagne" /></label><button className="mt-3 w-fit bg-plum px-7 py-4 text-xs uppercase tracking-[.16em] text-pearl">Anfrage senden</button></form><a href="https://wa.me/" className="mt-7 inline-flex items-center gap-2 text-sm text-plum-3"><MessageCircle size={17}/> Lieber per WhatsApp schreiben</a></div><div className="reveal"><div className="image-zoom mb-10 h-64 overflow-hidden"><img loading="lazy" width={1200} height={1200} src={stilllife} alt="LUMINA Atmosphäre" className="image-tone h-full w-full object-cover"/></div><p className="eyebrow text-plum-3">Häufige Fragen</p><div className="mt-5">{faqs.map((q,i)=><div key={q} className="border-b border-plum/15"><button onClick={()=>setOpen(open===i?-1:i)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"><span className="font-display text-xl">{q}</span>{open===i?<Minus size={18}/>:<Plus size={18}/>}</button>{open===i&&<p className="pb-5 pr-8 text-sm leading-6 text-muted-ink">Im persönlichen Gespräch nehmen wir uns Zeit für Ihre Fragen, klären Wünsche und Möglichkeiten und empfehlen nur, was wirklich zu Ihnen passt.</p>}</div>)}</div></div></div></section> }

function FooterSection(){ return <footer className="overflow-hidden bg-ink pb-10 pt-20 text-pearl"><div className="editorial-container grid gap-10 border-b border-pearl/20 pb-16 md:grid-cols-4"><div><div className="flex items-center gap-3"><img src="/favicon.png" alt="LUMINA" className="size-10 object-contain"/><span className="font-display text-3xl tracking-[.08em]">LUMINA</span></div><p className="mt-5 text-sm leading-6 text-pearl/55">Ästhetische Medizin<br/>mit Feingefühl.</p></div><div><p className="eyebrow text-champagne">Behandlungen</p><p className="mt-5 text-sm leading-7 text-pearl/60">Botox & Faltenbehandlung<br/>Hyaluron & Filler<br/>Skin Booster & PRP</p></div><div><p className="eyebrow text-champagne">Praxis</p><p className="mt-5 text-sm leading-7 text-pearl/60">Über uns<br/>Angebote<br/>Kontakt</p></div><div><p className="eyebrow text-champagne">Adresse</p><p className="mt-5 text-sm leading-7 text-pearl/60">Brückstr. 44<br/>44787 Bochum<br/>015 77777 9962</p></div></div><div className="editorial-container flex justify-between pt-6 text-xs text-pearl/40"><span>© 2026 LUMINA Klinik</span><span>Impressum · Datenschutz</span></div><div aria-hidden="true" className="pointer-events-none -mb-20 mt-8 text-center font-display text-[clamp(7rem,20vw,18rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--champagne)] opacity-35">LUMINA</div></footer> }

function Index() { useReveal(); return <main><ScrollProgress/><Header/><Hero/><PhilosophieSection/><WerteSection/><QuoteBand/><AblaufSection/><BehandlungenSection/><SignatureSection/><AngeboteSection/><VorherNachherSection/><BewertungenSection/><GalerieSection/><PreiseSection/><UeberUnsSection/><KontaktSection/><FooterSection/></main>; }