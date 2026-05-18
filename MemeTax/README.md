# Diaconia

Piattaforma di gestione per comunità educative. Due ruoli: **Admin** (educatore) e **Ragazzo** (ospite).

**App deployata: https://diaconiadaily.netlify.app/login**

## Come provarla

Aprire il link e accedere con una di queste utenze demo:

| Ruolo  | Email           | Password  |
|--------|-----------------|-----------|
| Admin  | admin@demo.it   | demo1234  |
| Mario  | mario@demo.it   | demo1234  |
| Giulia | giulia@demo.it  | demo1234  |
| Ahmed  | ahmed@demo.it   | demo1234  |

(Nella pagina di login c'è un pulsante che precompila le credenziali.)

## Se il link non funziona

Se il deploy è offline (es. crediti di hosting esauriti), si può navigare l'app in locale. Serve **Node.js >= 18** e il codice di questo repository.

```bash
npm install
npm run dev:frontend
```

Aprire **http://localhost:5173** e accedere con le stesse credenziali demo della tabella sopra. Il frontend parte in **modalità demo** con dati mock in-memory: navigazione, calendari, compiti, report e tabelle funzionano senza database né backend.

L'unica funzione non disponibile in locale è l'**export PDF/DOCX**, che è generato server-side e richiede la configurazione completa di Supabase + backend. Per provarla, usare il link del deploy.

## Cosa fa l'app

Lato **Admin**:
- Anagrafica ragazzi con parole-chiave e storico punti settimanali.
- Calendari settimanali di **compiti**, **impegni** esterni e **attività** della comunità.
- **Report settimanali** per ogni ragazzo, con evidenziazione automatica delle parole-chiave e dettatura vocale.
- **Statistiche** mensili e tabelle riassuntive dei compiti e dei punti.
- Gestione dei turni **lavatrice**.
- Pannello permessi: abilitare/disabilitare singoli moduli e decidere cosa vedono i ragazzi.
- **Export PDF** di calendari e attività dal pulsante flottante in basso.

Lato **Ragazzo**:
- Vista mobile-first dei propri compiti del giorno, dei punti settimanali e delle attività.
- Profilo personale con documenti, dati e impostazioni di accessibilità (testo più grande, alto contrasto, lingua). Con possibilità di inviare email precompilate in italiano.

Trasversali:
- Quattro lingue (it / en / fr / ar).
- Notifiche in-app per l'admin.
