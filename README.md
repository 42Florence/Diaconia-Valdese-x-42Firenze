# OpenSpace – Canale di fiducia per firme assistite

**Piattaforma dimostrativa** per consentire a persone con difficoltà motorie, cognitive o digitali di firmare documenti in modo consapevole, con l'affiancamento di un operatore di fiducia, in un ambiente tracciabile e accessibile.

Progetto pensato per associazioni di assistenza sociale (es. Diaconia Valdese) e realizzato come mockup frontend interattivo.

---

## 🔐 Ruoli

| Ruolo | Descrizione |
|-------|-------------|
| **Assistito** | Persona che firma. Vede i propri documenti, può firmare con pulsanti grandi, voce, o in differita. Può revocare l'operatore di fiducia. |
| **Operatore** | Affianca l'assistito, crea documenti e invia richieste di firma. Non firma al posto dell'assistito. |
| **Supervisore** | Monitora i log, controlla gli abbinamenti assistito-operatore, previene abusi. |

---

## ✨ Funzionalità principali

- **Firma assistita** – tre modalità:
  - ✅ Firma con pulsante (touch minimo 48px)
  - 🎤 Firma vocale (registrazione "Sì, accetto")
  - ⏳ Firma differita (in un secondo momento)
- **Canale di fiducia** – ogni assistito ha operatori abbinati; la fiducia è revocabile in ogni momento.
- **Tracciabilità** – log immutabile con data, ora, utente, azione, IP.
- **Messaggistica** – chat private tra assistito e operatore.
- **Videochiamata** – interfaccia multi‑partecipante simulata.
- **Dashboard supervisore** – statistiche, abbinamenti, log globali.
- **Consenso informato** – simulazione del processo di consenso prima della firma.

---

## ♿ Accessibilità (WCAG AA)

- **Contrasto elevato** (4.5:1) – palette blu/verde scuro su bianco.
- **Pulsanti grandi** (minimo 48px) per firma tattile.
- **Modalità facile** – interfaccia semplificata con poche opzioni.
- **Text‑to‑Speech** – lettura automatica dei documenti (Web Speech API, gratuita).
- **Adattamenti per neurodivergenze**:
  - Dislessia: font leggibili, spaziatura ampia.
  - ADHD: riduzione distrazioni, gerarchia visiva.
  - Autismo: layout coerente, linguaggio letterale.
  - Discalculia: etichette testuali sui numeri.
- **Navigazione da tastiera** e focus visibile (outline giallo).
- Supporto **screen reader** (attributi ARIA, etichette semplificate).

---

## 🧠 Neurodivergenze supportate

| Condizione | Adattamento |
|------------|-------------|
| **Dislessia** | Font accessibile, spaziatura aumentata, audio alternativo |
| **ADHD** | Gerarchia visiva chiara, microinterazioni minime, progress indicator |
| **Autismo** | Layout coerente, linguaggio esplicito, feedback chiaro |
| **Discalculia** | Etichette testuali, grafici alternativi, passi guidati |

---

## 🛠 Tecnologie utilizzate

- **Frontend**: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **Icone**: Font Awesome 6 (free)
- **Sintesi vocale**: Web Speech API (gratuita, integrata nel browser)
- **Cifratura (demo)**: Simulata – in produzione si userebbe OpenPGP.js o libsodium

---

## 📂 Struttura del progetto


---

## 🚀 Demo rapida

### Credenziali dimostrative

| Ruolo | Email | Password |
|-------|-------|----------|
| Assistito | `mario@OpenSpace.it` | `demo` |
| Operatore | `operatore@OpenSpace.it` | `demo` |
| Supervisore | `supervisore@OpenSpace.it` | `demo` |

### Flusso tipico

1. **Operatore** invia un documento a Mario.
2. **Mario** riceve una notifica, apre il documento e sceglie come firmare (✅, 🎤, ⏳).
3. Il **supervisore** controlla il log e verifica che tutto sia regolare.

### Cosa provare

- Login come assistito, operatore o supervisore.
- Firma un documento con il pulsante grande ✅.
- Prova la **firma vocale** (simulata).
- Revoca un operatore di fiducia.
- Apri la **videochiamata** dalla chat.
- Modifica le **impostazioni di accessibilità** (modalità facile, TTS, neurodivergenze).
- Esplora la **dashboard supervisore** con statistiche e log.

---

## 📌 Note

- Il progetto è un **mockup frontend**. Non ha backend reale.
- La cifratura end‑to‑end e la firma con testimone sono simulate.
- I dati sono in memoria (JavaScript), non persistono oltre la sessione.
- Progettato per essere **accessibile** (WCAG AA) e **inclusivo** per neurodivergenze.

---

## 📄 Licenza

Progetto dimostrativo a scopo educativo. Libero da copyright per uso non commerciale.

*Restituire dignità e autonomia attraverso la tecnologia.*