# CommunityCare — Portale Demo

*This project has been created as part of the 42 curriculum for Diaconia Valdese by matlabar, lciardo e lgreco*

---

Un portale web per la gestione di strutture residenziali di cura (comunità), realizzato come **prototipo dimostrativo** con due interfacce distinte: una per gli **ospiti/residenti** e una per gli **educatori/staff**. Il progetto funziona interamente nel browser — nessun backend o processo di build necessario.

---

## Struttura del progetto

```
/
├── index.html              # Punto di ingresso — pagina di selezione del profilo
├── ospite.html             # App ospite (residente)
├── educatore.html          # Dashboard educatore (staff)
├── style/
│   └── ospite.css          # Stili per l'interfaccia ospite
├── js/
│   ├── agenda.js           # Rendering del calendario e dati dei promemoria
│   ├── appointments.js     # Interazioni del dropdown degli appuntamenti
│   ├── messaging.js        # Logica della messaggistica anonima
│   ├── profile.js          # Editor del profilo con persistenza in localStorage
│   ├── tasks.js            # Gestione dei compiti, cambio tab, selettore umore
│   └── typography.js       # Preferenze di accessibilità (font, tema, scala)
└── imgs/
    ├── rifare_letto.png     # Illustrazione regole della casa — rifare il letto
    ├── pulire_bagno.png     # Illustrazione regole della casa — pulire il bagno
    ├── cucinare.png         # Illustrazione regole della casa — cucinare
    └── no_smoke.png         # Illustrazione regole della casa — no alcool e fumo
```

> **Nota:** `educatore.html` è completamente autocontenuto — tutto il CSS e il JavaScript sono scritti inline nello stesso file.

---

## Come iniziare

Nessuna dipendenza da installare. Apri `index.html` in qualsiasi browser moderno e scegli un ruolo:

- **Entra come Ospite** → apre l'app mobile per l'ospite (`ospite.html`)
- **Entra come Educatore** → apre la dashboard desktop per l'educatore (`educatore.html`)

Entrambe le pagine permettono di tornare alla selezione tramite il logo o la navigazione.

---

## Interfaccia Ospite (`ospite.html`)

La vista ospite è stilizzata come una **shell di app mobile** (layout a cornice telefonica) pensata per i residenti della struttura. Utilizza una barra di navigazione inferiore per spostarsi tra sei sezioni.

### Tab di navigazione

| Tab | ID | Descrizione |
|---|---|---|
| Da fare | `panel-tasks` | Compiti giornalieri e attività extra |
| Premi | `panel-premi` | Premi e badge XP guadagnati |
| Agenda | `panel-agenda` | Calendario appuntamenti settimanale/mensile |
| Notifiche | `panel-notifiche` | Notifiche in-app |
| Messaggio | `panel-anonymous` | Messaggio anonimo agli educatori |
| Profilo | `panel-profilo` | Profilo personale e impostazioni di accessibilità |

Il cambio tab è gestito da `switchTab(name)` in `tasks.js`, con navigazione completa tramite tasti freccia e attributi ARIA per l'accessibilità.

---

### Tab: Da fare

**File:** `tasks.js`

La tab principale mostra un **check-in dell'umore** (triste / normale / felice) e un elenco di compiti giornalieri. Ogni riga compito può essere attivata/disattivata cliccando o premendo Invio/Spazio.

- Completare un compito aggiunge la classe `.done` e segna il tag XP come `earned`.
- Un contatore live (`today-task-count`) si aggiorna nel formato `X/Y fatte`.
- Un toggle tra **Da fare** (compiti obbligatori) e **Extra** (attività bonus opzionali) alterna tra due liste (`today-task-list` e `extra-task-list`), ciascuna con il proprio contatore XP.

**Compiti giornalieri predefiniti:**

| Compito | XP |
|---|---|
| Rifare il letto | +10 XP |
| Prendere le medicine | +15 XP |
| Pulire il bagno | +20 XP |
| Riordinare la camera | +15 XP |
| Preparare la cena | +25 XP |

**Attività extra:**

| Attività | XP |
|---|---|
| Letto un libro | +30 XP |
| Sono andato a passeggiare | +20 XP |
| Sono andato al lavoro | +50 XP |
| Ho partecipato a un'attività | +25 XP |

---

### Tab: Agenda

**File:** `agenda.js`, `appointments.js`

Mostra gli appuntamenti da un array di dati hardcoded (`reminders`) che copre la settimana dal 9 al 15 maggio 2026.

La **vista settimanale** mostra una scheda per ogni giorno. Ogni scheda elenca gli appuntamenti ordinati per orario, con icona, ora e titolo. Toccando o cliccando un appuntamento si espande un dropdown inline con luogo e descrizione. Un solo dropdown è aperto alla volta; cliccare altrove o premere Escape lo chiude.

La **vista mensile** mostra una griglia mensile completa (maggio 2026) con pallini colorati sotto i giorni che hanno appuntamenti.

Il **pulsante "+"** apre un dialogo `prompt()` per aggiungere un nuovo promemoria (titolo, data, orario) all'array live.

**Colori appuntamenti per tipo:**

| Colore | Utilizzato per |
|---|---|
| `#6C63FF` (viola) | Medico / amministrativo |
| `#4ECDC4` (turchese) | Educativo / cognitivo |
| `#27C17B` (verde) | Attività fisica / fisioterapia |
| `#FF6B6B` (rosso) | Visite specialistiche |
| `#8B5CF6` (violetto) | Psicologico / famiglia |
| `#FFB800` (oro) | Laboratori creativi / colloqui educatori |

---

### Tab: Messaggio anonimo

**File:** `messaging.js`

Permette agli ospiti di inviare messaggi di testo anonimi agli educatori senza rivelare la propria identità. I messaggi sono salvati nell'array `anonMessages` in memoria e visualizzati come lista con timestamp e stato di consegna (`Consegnato`). Il form verifica che il campo di testo non sia vuoto prima dell'invio.

---

### Tab: Profilo

**File:** `profile.js`, `typography.js`

La tab profilo contiene due sezioni:

**Editor dati personali** (`profile.js`): campi per nome, cognome, email, telefono, struttura, camera, indirizzo e bio. Tutti i valori vengono salvati in `localStorage` con la chiave `ccGuestProfile`. Le modifiche si applicano in tempo reale — il nome nell'intestazione e il sottotitolo si aggiornano immediatamente. È possibile caricare una foto profilo dal dispositivo, visualizzarla in anteprima e reimpostarla; viene salvata in `localStorage` come stringa base64 con la chiave `ccGuestProfileImage`.

**Preferenze di accessibilità / lettura** (`typography.js`): applicate in tempo reale tramite proprietà CSS personalizzate sull'elemento root.

| Impostazione | Opzioni | Variabile CSS |
|---|---|---|
| Font | Nunito, Lexend, Atkinson Hyperlegible, OpenDyslexic | `--app-font-family` |
| Interlinea | Stretta (1.2), Normale (1.45), Ampia (1.7) | `--app-line-height` |
| Tema | Chiaro, Scuro | attributo `data-theme` su `<html>` |
| Scala del font | 85%–125% a passi del 5% | `--user-font-scale`, `--nav-font-scale` |

Tutte le preferenze vengono salvate in `localStorage` con le chiavi `ccTypographyPreferences` e `ccFontScale`. La scala del font nella navigazione è limitata a 110% per evitare problemi di layout.

La sezione **Regole della casa** mostra quattro schede illustrate (con le immagini della cartella `/imgs/`) con semplici linee guida per la vita quotidiana.

---

## Interfaccia Educatore (`educatore.html`)

Una dashboard desktop completa per il personale di cura. Tutto il codice (HTML, CSS, JS) si trova in un unico file autocontenuto. Utilizza una **sidebar fissa a sinistra** per la navigazione e un'area di contenuto principale con una topbar fissa.

### Navigazione sidebar

| Sezione | Descrizione |
|---|---|
| Dashboard | Statistiche generali, grafici e azioni rapide |
| Ragazzi | Gestione del registro degli ospiti |
| Compiti | Assegnazione e monitoraggio dei compiti |
| Premi | Gestione dei premi e degli XP |
| Agenda | Calendario eventi lato educatore |
| Messaggi anonimi | Visualizzazione dei messaggi anonimi degli ospiti |
| Impostazioni | Configurazione della struttura e delle categorie |

Il pannello attivo è mostrato tramite la classe `.panel.active` con un'animazione di dissolvenza.

---

### Dashboard

La vista principale mostra:

- Un **banner statistiche con gradiente** con saluto, data, conteggio degli avvisi urgenti e tre KPI (ospiti attivi, compiti completati oggi, media XP settimanale).
- Un **grafico a linee Chart.js** (andamento a 7 giorni) che confronta i compiti completati con quelli assegnati.
- Un widget **"Da confermare"** con i compiti in attesa di revisione da parte dell'educatore.
- Un elenco **"Prossimi eventi"**.
- Una scheda anteprima **"Messaggi anonimi recenti"**.
- Un **grafico radar** di confronto dei progressi per ospite.

---

### Ragazzi

Elenca tutti gli ospiti con avatar, nome, camera, struttura e badge di stato. Ogni scheda ospite mostra gli XP settimanali correnti e una barra di avanzamento. L'educatore può:

- Aggiungere un nuovo ospite tramite modal (nome, cognome, camera, struttura, livello di rischio).
- Modificare i dati di un ospite esistente.
- Eliminare un ospite dal registro.
- Filtrare/cercare gli ospiti per nome.

---

### Compiti

Il pannello di gestione compiti permette agli educatori di assegnare, rivedere e gestire i compiti per ogni ospite. Le funzionalità includono:

- Assegnare un nuovo compito tramite modal: seleziona ospite, titolo del compito, categoria, valore XP e data di scadenza.
- Visualizzare tutti i compiti in una lista raggruppata per stato: in attesa, in revisione, completati.
- Segnare i compiti come **Da rivedere**, **Completato** o eliminarli.
- Ogni cambio di stato genera una notifica toast e, facoltativamente, una voce nella lista notifiche dell'ospite.

Le categorie dei compiti sono configurabili (vedi Impostazioni). Le categorie predefinite sono: igiene, cucina, organizzazione, salute, attività, sociale.

---

### Premi

Gli educatori possono creare e assegnare premi agli ospiti. Ogni premio ha:

- Un nome, un'icona emoji, un costo in XP e una categoria.
- Un flusso di assegnazione: seleziona ospite → conferma → il premio viene registrato e viene creata una notifica in-app.

Viene mostrata una lista dei premi attivi e passati con filtro per ospite.

---

### Agenda (Educatore)

Un calendario eventi lato educatore con la possibilità di aggiungere eventi (titolo, data, orario, tipo, ospite collegato). Gli eventi sono salvati nell'oggetto in memoria `state` e visualizzati in una lista raggruppata per data.

---

### Messaggi anonimi

Mostra tutti i messaggi anonimi ricevuti dagli ospiti. I messaggi mostrano timestamp e testo. Gli educatori possono segnarli come letti o eliminarli.

---

### Impostazioni — Categorie

Gli educatori possono gestire le categorie dei compiti tramite una modal. Ogni categoria ha una chiave (usata internamente), un'etichetta da visualizzare e un'icona emoji. È possibile aggiungere o eliminare categorie personalizzate. Deve sempre rimanere almeno una categoria.

---

## Gestione dello stato

La dashboard educatore utilizza un unico oggetto in memoria `state` (nessun backend):

```js
state = {
  guests: [...],         // Registro degli ospiti
  tasks: [...],          // Tutti i compiti assegnati
  rewards: [...],        // Tutti i premi creati
  events: [...],         // Eventi del calendario
  notifications: [...],  // Feed delle notifiche
  categories: [...]      // Categorie dei compiti
}
```

I dati lato ospite (profilo, preferenze, completamento compiti) vengono salvati in `localStorage`. Tutto il resto si azzera al ricaricamento della pagina — si tratta di un prototipo dimostrativo.

---

## Accessibilità

Entrambe le interfacce sono sviluppate con l'accessibilità in mente:

- Tutti gli elementi interattivi hanno attributi `role`, `aria-label`, `aria-selected` e `tabindex`.
- I pannelli tab seguono il pattern ARIA `tablist`/`tab`/`tabpanel` con navigazione tramite tasti freccia.
- Le righe compito e gli appuntamenti sono utilizzabili da tastiera (Invio/Spazio per attivare, Escape per chiudere i dropdown).
- Gli annunci per gli screen reader usano `aria-live` per i valori dinamici (scala del font).
- L'app ospite supporta font pensati per la dislessia e spaziatura ampia tra le righe.

---

## Dipendenze esterne

| Libreria | Utilizzo | Caricata via CDN |
|---|---|---|
| Google Fonts (Nunito, Lexend, Atkinson Hyperlegible) | Tipografia | Sì |
| Tabler Icons webfont | Icone UI | Sì |
| Chart.js 4.4.0 | Grafici della dashboard (solo educatore) | Sì |

Nessun pacchetto npm, nessuno strumento di build, nessun framework — il progetto è puro HTML, CSS e JavaScript vanilla.