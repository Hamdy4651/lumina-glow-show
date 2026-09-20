# LUMINA Magazine

# Design-Prompt — LUMINA aesthetic clinic
## Editoriale Luxus-Website: viel große Fotografie, viel Bewegung

---

## 🎯 Grundidee

LUMINA soll sich anfühlen wie das Editorial-Feature eines Luxusmagazins, nicht wie eine Klinik-Website. Der Besucher soll scrollen und dabei das Gefühl haben, durch eine großformatige Fotostrecke zu blättern — Behandlungen sind nebensächlich, das erste, was wirkt, ist Atmosphäre, Licht und Ruhe.

Oberste Priorität: **großformatige, hochwertige Fotografie überall**, getragen von **spürbarer, durchgehender Bewegung** beim Scrollen. Text bleibt knapp; die Bilder erzählen die Geschichte.

---

## 🎨 Markenwelt — „Aubergine & Champagner"

Bereits etablierte Palette, konsequent weiterführen:

| Verwendung | Farbe | Code |
|---|---|---|
| Pearl — ruhiger Grund | Warmes Off-White | `#F5F1EF` |
| Pearl 2 — weicher Sekundärgrund | `#ECE5E4` |
| Plum — Tiefe, Abend, Luxus | `#2A0F1E` |
| Plum 2/3 — Abstufungen | `#431A31` / `#6B2B4D` |
| Champagne — Metall, Akzent | `#C8A96A` (soft: `#E4D2A6`) |
| Blush — Haut, Wärme | `#E8C9D0` |
| Ink / Muted | `#1F0E17` / `#7C6772` |

Typografie: **Bodoni Moda** (Display, editorial, mit Kursiv-Momenten) + **Jost** (Fließtext, leicht, luftig). Große, ruhige Serifen-Headlines, viel Weißraum, feine Linien statt schwerer Rahmen.

---

## 🖼 Bildsprache — die eigentliche Hauptrolle

Das ist der wichtigste Unterschied zu einer generischen Klinik-Seite:

- **Jede Sektion trägt mindestens ein großformatiges Foto** — nicht als Beiwerk, sondern als tragendes Element der Komposition. Kein Abschnitt bleibt reiner Text.
- **Formatvielfalt bewusst einsetzen:** hohe Editorial-Porträts im Bogenformat (`.arch`, das Signatur-Motiv), breite Panorama-Ausschnitte für Zitat-Bänder, eine unregelmäßige Mosaik-Galerie (5 Bilder, unterschiedliche Größen, kein starres Raster)
- **Große Maßstäbe:** Hero-Bild deckt den gesamten Viewport, Editorial-Porträts laufen über die volle Sektionshöhe, Vollbild-Fotoabschnitte zwischen den Content-Blöcken als ruhige Atempausen
- **Bildregie statt Stockfoto-Beliebigkeit:** jedes Foto bekommt eine dezente, zur Marke passende Farbgebung (Duotone-artige Abstimmung auf Plum/Champagne), damit unterschiedliche Quellen wie eine durchgehende Fotostrecke wirken, nicht wie zusammengewürfelte Stockbilder
- ⚠️ Stockfotos sind ein Platzhalter für den Start — echte Fotografie der Praxis, der Behandlungsräume und (mit Einverständnis) echter Patientinnen wirkt für eine Klinik immer glaubwürdiger und hochwertiger

---

## 🎬 Bewegung — durchgehend, nie sporadisch

Animation ist hier kein Add-on für den Hero, sondern **die Grundregel für jede Sektion**:

- **Hero:** langsamer, orchestrierter Einstieg (Label → Headline → Text → Buttons, je 150–250 ms versetzt), Foto setzt beim Laden sanft aus leichtem Zoom auf, danach übernimmt ein **scroll-gekoppelter Parallax-Zoom** des Hero-Fotos — das Bild bewegt sich spürbar langsamer als der Rest der Seite
- **Jede Sektion:** Scroll-Reveal per IntersectionObserver — Inhalte fahren beim Eintreten sanft von unten ein (Fade + Slide), nie abrupt
- **Überschriften:** Wort-für-Wort- oder Zeilen-Reveal (jede Zeile fährt einzeln aus einer maskierten Box hoch), nicht einfach eingeblendet
- **Bilder:** dezenter Zoom bei Hover (Karten, Mosaik-Kacheln), sichtbare aber ruhige Bewegung — kein Ruckeln, alles mit weichem Easing
- **Gestaffelte Gruppen:** Behandlungs-Karten, Werte-Zahlen, FAQ-Einträge erscheinen nacheinander mit kleinem Zeitversatz, nie alle gleichzeitig
- **Zahlen/Statistiken:** zählen beim Eintreten in den Viewport von 0 auf den Zielwert hoch
- **Vorher/Nachher:** flüssiger, ziehbarer Regler mit spürbarer, aber gedämpfter Trägheit
- **Testimonial-Karussell:** weicher Übergang zwischen Zitaten (Fade + leichter Vertikal-Versatz), Anführungszeichen-Icon in Champagne
- **Mega-Menü/Navigation:** sanftes Fade + Slide-Down beim Öffnen, dezenter Blur-Hintergrund beim Scrollen
- **Ambiente-Bewegung:** mindestens ein Element pro großer Sektion bewegt sich unabhängig vom Scroll weiter (z. B. ein langsam „atmendes" Licht-Bloom in Champagne-Ton) — die Seite soll nie komplett stillstehen
- `prefers-reduced-motion` wird überall respektiert: alle Bewegungen fallen dann auf einfache Fades zurück

---

## 📐 Seitenaufbau

1. **Hero** — Vollbild-Foto (Arzt-Patientin-Moment oder Praxis-Atmosphäre), großer Editorial-Headline-Block, Adresse als leiser Fußpunkt, seitliches „Kostenlose Erstberatung"-Glass-Panel
2. **Kennzahlen-Leiste** — 4 große, hochzählende Zahlen auf dunklem Plum-Grund
3. **Philosophie** — zwei versetzte Bogen-Porträts (`.arch`) + Editorial-Text, große Aussage als Headline
4. **Zitat-Band** — Vollbild-Foto, dunkles Overlay, ein einzelner großer kursiver Satz, mittig
5. **Ablauf** — vier Schritte auf dunklem Grund, dezentes Hintergrundfoto (Bokeh), jeder Schritt mit römischer Ziffer in Champagne
6. **Behandlungen** — Karten-Raster, jede Karte mit großem Foto oben, aufklappbare Details (Dauer/Ausfallzeit/Preis), versetztes Raster (mittlere Spalte leicht tiefer für visuellen Rhythmus)
7. **Signature-Angebot** — großes Bogen-Porträt links, rechts hervorgehobenes Kombi-Paket mit Preis-Vergleich
8. **Aktuelle Angebote** — schlanke Zeilen-Liste mit Rabatt-Badges
9. **Vorher/Nachher** — drei nebeneinander, jedes mit großem interaktivem Ziehregler
10. **Bewertungen** — Vollbild-Hintergrundfoto (weich abgedunkelt), zentriertes Zitat-Karussell
11. **Galerie „Momente bei LUMINA"** — unregelmäßige Foto-Mosaik, 5 Bilder, verschiedene Formate
12. **Preisübersicht** — drei Kategorien nebeneinander, klare Zeilenpreise
13. **Über uns** — Editorial-Layout, großes Foto + Kennzahlen (Gründungsjahr, Team, Standort), zweites Modul mit Öffnungszeiten und Anfahrt
14. **Kontakt & FAQ** — schlankes Formular + Accordion nebeneinander, WhatsApp-Link sichtbar
15. **Footer** — riesiger Outline-Schriftzug „LUMINA" als grafisches Element, Spalten für Behandlungen/Praxis/Adresse

---

## 🧭 Header

Sticky, wird beim Scrollen kompakter mit dezentem Blur. Navigation: Behandlungen (Mega-Menü) · Ablauf · Preise · Über uns · Kontakt. Rechts: WhatsApp-Icon, „TERMIN"-Button. Logo und Navigationstext müssen **in jedem Zustand** ausreichend Kontrast zum Hintergrund haben — auch direkt auf dem dunklen Hero-Foto.

---

## 🧩 Technische Umsetzung

- React + TypeScript, eine Komponente pro Sektion (`Hero`, `WerteSection`, `PhilosophieSection`, `AblaufSection`, `BehandlungenSection`, `SignatureSection`, `VorherNachherSection`, `BewertungenSection`, `GalerieSection`, `PreiseSection`, `UeberUnsSection`, `KontaktSection`, `FooterSection`)
- Bestehendes CSS-Variablen-System (`--plum`, `--champagne`, `--pearl`, `var(--ease)`) konsequent weiterverwenden, keine neuen, unabgestimmten Farben einführen
- Scroll- und Reveal-Animationen nach Möglichkeit ohne zusätzliche Bibliothek (IntersectionObserver + CSS-Transitions/Keyframes), wie im bestehenden Code bereits umgesetzt
- Jedes Bild mit Lazy Loading (außer Hero), responsive Größen, WebP wo möglich
- Vollständig responsive: Bogen-Porträts und Mosaik-Galerie brechen auf Mobil in ein einspaltiges, weiterhin bildstarkes Layout um — nie ersatzlos verkleinert

---

## 📋 Offene Punkte

- [ ] Echte Fotografie der Praxis, der Behandlungsräume und (mit Einverständnis) echter Patientinnen
- [ ] Echte Vorher/Nachher-Bildpaare
- [ ] Verifizierte Patientenbewertungen
- [ ] Bestätigte aktuelle Preise und Angebote

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lumina-glow-show.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83553e70-dd33-4578-8907-119522750bee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
