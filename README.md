# filofobia: quando amare fa paura
### Installazione digitale — POST del cuore · Luna Cucchiaro · 2025/26

Quattro file, nessuna dipendenza da installare, nessun server nostro:

| file | cos'è |
|---|---|
| `index.html` | l'installazione completa, tutte e 4 le fasi della spec |
| `config.js` | **l'unico file da riempire**: indirizzo Supabase, chiave anon, etichette |
| `supabase.sql` | tabelle, indici e policy da incollare una volta nel SQL Editor di Supabase |
| `logo.jpeg` | il marchio, sorgente delle maschere incorporate nel CSS |

Senza `config.js` compilato il sito funziona comunque: le lettere restano sul
dispositivo di chi le scrive. Riempendolo diventano un archivio condiviso.

---

## 1. Come collegarlo al bottone in Figma

Il prototipo Figma apre un **link esterno**, quindi il file deve stare a un
indirizzo pubblico (http). Un modo qualsiasi va bene:

| Come | Cosa fare |
|---|---|
| **Netlify Drop** (30 secondi, senza account) | vai su `app.netlify.com/drop` e trascina la cartella `LUNA` |
| **GitHub Pages** | carica `index.html` in una repo, Settings → Pages → branch `main` |
| **Vercel** | `vercel deploy` dentro la cartella |

Poi in Figma: seleziona il bottone → pannello **Prototype** → *On click* →
**Open link** → incolla l'URL.

Per provarlo intanto sul tuo computer: doppio clic su `index.html`. Funziona
tutto tranne il salvataggio delle lettere, che su alcuni browser è bloccato
quando il file è aperto in locale (`file://`).

### Più bottoni Figma verso punti diversi
Aggiungendo un parametro all'URL si entra direttamente in una fase:

```
tuo-sito.it/index.html                          → dall'inizio (strato nero da grattare)
tuo-sito.it/index.html?fase=scelta              → direttamente amore / paura
tuo-sito.it/index.html?fase=archivio&tema=amore → direttamente le lettere d'amore
tuo-sito.it/index.html?fase=archivio&tema=paura → direttamente le lettere sulla paura
   ...&vista=ventaglio                          → apre l'archivio già sul mazzo di carte
   ...&vista=registro                           → apre l'archivio sull'indice a righe
tuo-sito.it/index.html?reset=1                  → cancella le lettere salvate su quel device
```

Utile in mostra: se l'installazione girasse su un totem, `?reset=1` la riporta
allo stato iniziale.

---

## 2. Le 4 fasi, come sono state realizzate

**1 · Reveal** — è la prima cosa che si vede entrando: canvas HTML5 con `destination-out`, pennello morbido, pointer
events unificati (funziona con mouse, dito e pennino). Lo strato è **nero
pieno**, senza cornici né marchi: in questa fase e nella successiva header e
footer sono nascosti (`body[data-fase="reveal"]` nel CSS), così la pagina è
tutta schermo. Sotto il nero c'è un
manifesto rosso: *QUANDO AMARE FA PAURA* con l'etimologia. La percentuale di
area pulita viene misurata campionando il canvas: **superato il 34% lo strato si
apre da solo** con un'onda che parte dai punti già grattati. Da lì in poi **non
succede più niente da solo**: il manifesto rosso resta fermo sullo schermo e si
passa alla fase 3 solo quando l'utente tocca (o clicca) in qualunque punto —
l'etichetta in basso diventa `tocca per continuare` e il bottone diventa
`entra →`. C'è un `salta →` che compare dopo 5 secondi (serve anche per chi
non può usare il gesto) e un suono di graffio generato via Web Audio, con
interruttore in alto a destra: quello è l'unico punto che non fa cambiare fase.

**2 · Scelta del tema** — ricostruita sullo screenshot di riferimento, solo le
due scritte senza numeri. Al clic il rettangolo si espande a schermo intero nel
suo colore e da lì si entra nell'archivio. La scelta **è reversibile**: in
archivio c'è `← cambia sezione`.

**3 · Archivio** — ibrido dei due riferimenti, con due viste commutabili:

- **REGISTRO**: indice d'archivio a righe sottili — numero, etichetta, data,
  titolo. La riga attiva si apre in un blocco pieno con l'estratto e la firma;
  si sposta col mouse, con il dito o con il Tab. Il puntino `···` in alto a
  destra apre la lettera intera.
- **VENTAGLIO**: il mazzo di carte, centrato e simmetrico. L'impaginato della
  carta segue il riferimento che mi hai dato: **cornice scura arrotondata**,
  dentro un **foglio avorio** (65% dell'altezza) con il numero d'archivio e
  l'etichetta in alto in rosso, la frase della lettera in Georgia corsivo
  centrata e un cuore in filigrana nell'angolo; sotto, la **fascia rossa** in
  sfumatura con il titolo in Skia Black Extended bianco e la firma in Georgia.
  La prima carta è `scrivi una lettera`: foglio ancora bianco con cornice
  tratteggiata rossa e la penna al centro. Le carte lontane dal centro si
  spengono. Si trascina col dito o col mouse, si scorre con le frecce e con la
  rotella, la carta al centro si apre con un clic o con Invio.
  L'altezza del riquadro segue quella delle carte, quindi il mazzo non nuota
  in uno spazio vuoto a nessuna larghezza.

A destra le etichette con contatore (stile sidebar di every:second), la
dimensione del testo cresce col numero di lettere. In alto: `scrivi una
lettera`, ordinamento (recenti / risposte / casuale), ricerca a testo libero con
la lente. La riga con `← cambia sezione` e l'orologio al secondo sta **fuori
dallo scroller** (`.arc-bar`): resta ferma in cima mentre l'archivio scorre sotto.

---

## 3. Le domande aperte della spec: cosa ho deciso

Sono scelte, non vincoli: si cambiano tutte in poche righe.

| Domanda | Scelta |
|---|---|
| Serve una landing prima del gratta? | No: si entra direttamente sullo strato nero |
| Soglia autocompletamento | 34% dell'area (3 passate su desktop, 4-5 col dito) — variabile `thr` nel codice |
| Dopo la soglia si passa da solo? | No: lo strato si apre da solo, poi il manifesto resta finché non lo si tocca |
| Cosa c'è sotto il nero | manifesto rosso con l'etimologia di *filofobia* |
| Suono / vibrazione | suono di graffio + campanella all'apertura, vibrazione su mobile; interruttore visibile |
| La scelta del tema è reversibile? | sì, `← cambia sezione` |
| Transizione diversa per tema | il bottone scelto si espande a schermo intero nel suo colore |
| Header/footer fissi | sì, in tutte le fasi |
| Lettere anonime o profilo? | anonime; firma libera facoltativa (default `anonimo`), nessun account |
| Le risposte sono thread pubblici? | sì, pubbliche sotto la lettera |
| Moderazione | pubblicazione immediata (prototipo). Vedi nota sotto |
| Limite caratteri | 1200 per lettera, 600 per risposta, con contatore |
| Amore e paura separate? | separate come archivi, ma si passa da una all'altra quando si vuole |
| Backend o mock? | Supabase (Postgres gestito), chiamato dal browser con la chiave pubblica `anon`. Senza `config.js` compilato tutto resta sul dispositivo |

---

## 4. Archivio condiviso: Supabase

Il browser parla **direttamente** al database con l'SDK ufficiale di Supabase e
la chiave pubblica `anon`. Nessun server da tenere in piedi, nessuna funzione da
scrivere altrove, e il sito resta statico: va bene su GitHub Pages.

### Passo 1 — crea il progetto

Su **supabase.com** → *New project*. Regione Europa (Frankfurt), password del
database scelta a caso e messa da parte: quella non serve al sito.

### Passo 2 — crea le tabelle

Nel progetto: **SQL Editor** → *New query*. Incolla **tutto** il contenuto di
`supabase.sql` e premi **Run**. Una volta sola. Crea tre tabelle — `letters`,
`replies`, `citta` — con gli indici e le policy di sicurezza.

Il file è diviso in blocchi commentati: se salti il blocco 2 il sito funziona
ancora, ma le lettere nuove restano senza titolo e le risposte non vengono
condivise. Conviene eseguirlo intero.

### Passo 3 — metti le due chiavi in `config.js`

Nel progetto: **Project Settings** (l'ingranaggio) → **Data API**. Copia:

- **Project URL** → in `SUPABASE_URL` (tipo `https://abcdefgh.supabase.co`)
- la chiave **`anon` public** → in `SUPABASE_ANON_KEY`

```js
window.POSTO_CONFIG = {
  SUPABASE_URL: "https://abcdefgh.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",
  ...
};
```

Quella chiave **è pubblica e va bene che si veda**: la scarica il browser di
chiunque visiti il sito. Chi la ha in mano può fare solo quello che le policy
permettono, cioe leggere le lettere e aggiungerne. La chiave da non mettere mai
in `config.js` è l'altra, la **`service_role`**: quella apre tutto.

### Passo 4 — pubblica su GitHub Pages

Carica i quattro file nella radice del repository (`index.html`, `config.js`,
`supabase.sql`, `logo.jpeg`), poi nel repo: **Settings → Pages**, *Source:
Deploy from a branch*, branch **main** e cartella **/ (root)**, *Save*. Dopo un
minuto il sito è su `https://<utente>.github.io/<repo>/`.

Non serve build, non serve npm, non serve nient'altro. Per aggiornarlo si
ricarica il file cambiato.

### Come si comporta

- Entrando nell'archivio la pagina legge il database; sotto al titolo compare
  *archivio condiviso · N lettere*. Si aggiorna da sé ogni 45 secondi, quindi
  in mostra le lettere degli altri appaiono mentre uno guarda.
- Chi scrive vede la sua lettera **subito**, prima che parta l'invio. Se il
  database non risponde la lettera **non va persa**: resta sul dispositivo, il
  messaggio lo dice chiaramente (non finge che sia andata bene) e al caricamento
  successivo viene rimandata. Vale anche per le risposte e per le richieste di
  nuove tappe.
- **Moderazione**: dal sito nessuno può modificare o cancellare niente (non
  esistono policy `update` e `delete`). Per togliere una lettera vai su
  **Table Editor → letters** e cancella la riga: serve il tuo accesso a
  Supabase, non basta la chiave pubblica.
- **Le richieste di nuove tappe** (`citta`) hanno solo la policy di scrittura:
  dal sito si possono mandare ma **non rileggere**. Contengono nomi e luoghi, è
  giusto che le veda solo tu, dal Table Editor.
- **Scaricare tutto**: dal Table Editor di ogni tabella, *Export → CSV*.

### I limiti, detti chiaramente

Chiunque trovi la chiave `anon` può inserire righe senza passare dal sito. Per
un progetto di tesi o una mostra va bene, e i vincoli nello SQL restringono
molto il danno possibile: la categoria deve essere `amore` o `paura`,
l'etichetta deve essere una di quelle in elenco, il testo deve stare fra 20 e
1200 caratteri. Se qualcuno ne abusa, da **Authentication → Policies** puoi
togliere la policy di `insert` in un clic: il sito continua a funzionare, in
sola lettura, senza rompersi.

Il piano gratuito di Supabase (500 MB di database, 5 GB di traffico al mese) è
lontanissimo dal traffico di un progetto come questo. Attenzione a una cosa
sola: **i progetti gratuiti vanno in pausa dopo una settimana senza richieste**
e vanno risvegliati a mano dalla dashboard. Prima di una presentazione, apri il
sito il giorno prima.

Una nota sull'SDK: è l'unico file che il sito prende da fuori
(`cdn.jsdelivr.net`, versione fissata con la sua impronta `integrity`, quindi
non può cambiare sotto i piedi). Se quel file non arriva — rete assente, CDN
bloccato — la pagina non si rompe: parte in modalità locale.

---

### Due cose da valutare prima di una vera messa in mostra

1. **Risvegliare il progetto Supabase.** Il piano gratuito mette in pausa il
   database dopo una settimana di inattività. Non si perde niente, ma il primo
   che apre il sito vede *archivio non raggiungibile*: apri la dashboard e
   riattivalo il giorno prima della presentazione.
2. **Moderazione.** Nell'archivio "paura" può arrivare materiale delicato. Con
   pubblicazione immediata e senza moderazione, in una mostra pubblica il rischio
   è concreto. Nel form c'è una riga di cura, ma **se il progetto va online
   davvero vale la pena aggiungere il riferimento a un servizio di ascolto reale**
   (es. Telefono Amico) — non l'ho inserito io per non scrivere un numero
   sbagliato: verificalo e mettilo nel testo di `#wCare`.

---

## 5. Cosa cambiare (dove mettere le mani)

Tutto è dentro `index.html`, in sezioni numerate e commentate.

- **Rosso esatto.** In cima al CSS: `--red:#EC1C24`. La spec indicava `#C0392B`
  ma dallo screenshot il rosso è più acceso: ho usato quello. Cambiando quella
  riga cambia tutta l'installazione (l'hex compare 7 volte in tutto il file: CSS, favicon, meta
  theme-color e animazione del bottone — un cerca-e-sostituisci le prende tutte).
- **Archivio della paura invertito.** Ho scelto di ribaltare l'archivio "paura":
  fondo nero, testo chiaro, rosso come unico accento — la stessa installazione a
  due temperature. Se preferisci il fondo bianco anche lì, cancella il blocco CSS
  `body[data-theme="paura"]{…}` (una decina di righe, è segnalato da un commento).
- **Le lettere di partenza.** Sezione `1. DATI` del JS: array `SEEDS`, 30 lettere
  (15 per sezione) scritte come storie compiute. Sono segnaposto —
  **sostituiscile con testi tuoi o raccolti**, il formato è evidente. Le
  anteprime tagliano a fine frase, non a metà riga, così ogni carta si legge
  come un pensiero finito.
- **Le etichette.** Stanno in `config.js`, oggetto `ETICHETTE`, in un posto
  solo:
  **amore** — primo amore, quotidianità, ritorni, distanza, dialogo, lettere mai
  spedite, gratitudine, sogni;
  **paura** — abbandono, vulnerabilità, rifiuto, silenzio, attaccamento, fuga,
  gelosia, ricominciare.
  Nel form ne va scelta **esattamente una**: senza etichetta la lettera non
  parte, e il database la rifiuterebbe comunque. Se le cambi, cambia anche il
  vincolo `etichetta_valida` in `supabase.sql` (c'è il come, al punto 5 di quel
  file): i due elenchi devono dire la stessa cosa.
- **Logo.** È il tuo `logo.jpeg`. Dato che il marchio è nero + rosso su bianco e
  gli archivi hanno fondo rosso e nero, l'immagine è stata separata in due
  maschere (la scritta e il cuore) incorporate nel CSS: le forme sono le tue,
  ma il colore lo decide la sezione — nero e rosso su bianco, bianco e nero su
  rosso, bianco e rosso su nero. Per rigenerarle da un logo nuovo serve solo
  ripetere la separazione; `logo.jpeg` resta nella cartella come sorgente.
- **Font — Skia Black Extended.** Titoli, bottoni ed etichette usano Skia nel
  taglio **Black Extended**: `font-weight:900` e `font-stretch:125%` su tutto
  ciò che è Skia. Testo da leggere: **Georgia**, presente su tutti i sistemi.
  Come ci arriva, in due strade:
  1. su **macOS** Skia esiste come font di sistema **variabile** (assi peso e
     larghezza). Il primo `@font-face` del file la dichiara come famiglia a sé
     (`'Skia Sistema'`, `src:local('Skia')`, `font-weight:100 900`,
     `font-stretch:62.5% 125%`): lì il Black Extended è quello **vero**;
  2. altrove quella famiglia resta vuota e si passa al file base64 incorporato
     (`'Skia'`), che contiene **solo il Regular**: il nero lo sintetizza il
     browser e un contorno sottilissimo (`--dstroke`, in cima al CSS) restituisce
     il peso da manifesto. La spaziatura dei titoli è stata allargata perché
     l'*extended* non venisse strozzato da un tracking troppo stretto.
  Se ottieni il file del vero Black Extended, basta sostituire il base64 del
  secondo `@font-face` e azzerare `--dstroke`.
  Il font viene da onlinewebfonts.com con licenza CC BY 4.0 che chiede il
  credito: il rimando è nel commento sopra il `@font-face`, valuta se metterlo
  anche in una pagina di crediti.
- **Numeri delle lettere.** `001, 002…` assegnati per data di arrivo: la lettera
  numero 1 è la più vecchia dell'archivio, come in uno schedario reale.
- **Fai viaggiare il progetto.** Bottone bianco con contorno rosso scuro
  (`--red-dark:#920000`), **sotto le due categorie nella schermata della
  scelta** (fase 2). Apre una scheda con la domanda *"Vuoi il Posto del Cuore
  nella tua città? Scrivici qui."* (titolo in Skia Black Extended), un campo
  libero (placeholder `Scrivi qua...`, corpo in Georgia) e l'invio in stile
  outline. Sotto, la **card della cartina**: la cartina sta sempre sullo sfondo,
  coperta da un velo crema semitrasparente e sfocato che la lascia solo
  intravedere, con sopra *"Scopri dove ci troviamo"* in Skia Black Extended
  rosso. Col mouse sopra il velo si dirada in ~380 ms e la cartina diventa
  nitida; su telefono, dove l'hover non esiste, **il primo tocco svela** e il
  secondo apre. Al clic si apre **a schermo pieno**: si trascina, si zooma con
  rotella o due dita (1×–6×), i segnaposti sono cliccabili e mostrano città,
  data e descrizione; si chiude con la ✕ in alto o toccando fuori, e si torna
  alla scheda precedente (le modali sono impilate).
- **La cartina** è un SVG disegnato nel file (`mappaSVG()`), nessuna immagine e
  nessuna libreria: **solo tratto**, contorno dell'Italia più i confini delle
  venti regioni, tutto in rosso scuro `#920000` su fondo avorio, come il
  riferimento. I confini interni sbordano di proposito e vengono tagliati sulla
  costa da un `clipPath` che usa la sagoma stessa, così le linee arrivano
  esattamente sul contorno senza lasciare buchi. I segnaposti sono il **cuore
  del marchio** con occhi e sorriso, con la punta sulla città.
- **Le tappe** stanno nell'array `TAPPE` in cima al JS: **Tolmezzo, Udine,
  Verona, Firenze**. `x` e `y` sono la posizione sulla sagoma in percentuale,
  `lab` sposta l'etichetta a fianco (`sx` / `dx`) invece che sopra — serve a
  Tolmezzo e Udine, che sono vicine. `d` è la riga sotto al nome della città:
  per Tolmezzo è `Piazza XX settembre`, per Firenze `Manifattura Tabacchi`, per
  Udine e Verona resta `data e luogo da definire`. `img` è il **mockup della
  tappa**, un file dentro `foto/` (vedi `foto/LEGGIMI.txt`): compare nella
  scheda del segnaposto sotto il nome del luogo, e **se il file manca la scheda
  resta pulita** invece di mostrare un'immagine rotta. Per dare una foto anche
  a Udine o Verona basta metterla in `foto/` e aggiungere il campo `img`.
  Le richieste di nuove tappe finiscono nella tabella `citta` di Supabase e le
  leggi dal Table Editor; se il database non risponde restano sul dispositivo e
  partono al caricamento dopo.

## 6. Note tecniche

- Testato in viewport da 360 px a 1280 px, portrait e landscape.
- Tastiera: `Esc` chiude, `←` `→` sfogliano le lettere, tutto raggiungibile con
  `Tab`; i fogli del muro si aprono con `Invio`.
- Rispetta `prefers-reduced-motion`: chi ha le animazioni ridotte nel sistema
  operativo vede il muro senza 3D e senza transizioni lunghe.
- Il testo scritto dal pubblico viene sempre ripulito prima di essere mostrato:
  niente `innerHTML` con contenuto altrui, quindi nessun HTML iniettabile né
  dalle lettere né dalle risposte né dai dati che arrivano dal database.
- Niente cookie e niente tracciamento. Le uniche richieste verso l'esterno sono
  l'SDK di Supabase (`cdn.jsdelivr.net`, versione fissa con `integrity`) e le
  chiamate al proprio database. I font sono incorporati nel file.
- Nessun account e nessun login: la sessione di Supabase è disattivata
  (`persistSession:false`), quindi non viene scritto niente nel browser a parte
  le lettere in attesa di partire.
