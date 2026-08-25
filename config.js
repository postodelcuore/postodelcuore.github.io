/* =====================================================================
   POST del cuore — configurazione
   ---------------------------------------------------------------------
   L'UNICO file da riempire. Due valori, li trovi su supabase.com nel tuo
   progetto: icona a ingranaggio (Project Settings) > Data API.

     SUPABASE_URL       "Project URL", tipo https://abcdefgh.supabase.co
     SUPABASE_ANON_KEY  la chiave "anon public" (quella lunga)

   La chiave anon e PUBBLICA: finisce nel codice che scarica il browser e
   va bene cosi. Chi la ha in mano puo fare solo quello che le policy di
   supabase.sql permettono, cioe leggere le lettere e aggiungerne.
   NON mettere qui la chiave "service_role": quella apre tutto.

   Finche i due valori restano vuoti il sito funziona comunque: le lettere
   che uno scrive restano sul suo dispositivo e non le vede nessun altro.
   ===================================================================== */

window.POSTO_CONFIG = {

  SUPABASE_URL: "https://fvccsvldvenrushffkpy.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_3H5JfPwCt5krqavKUDiE0w_riGmUXNg",

  /* -------------------------------------------------------------------
     Le etichette dei due archivi. Devono dire la stessa cosa del vincolo
     etichetta_valida in supabase.sql, altrimenti il database rifiuta le
     lettere nuove. Se le cambi qui, cambia anche là (punto 5 del file).
     Massimo otto per archivio, altrimenti la colonna a destra si affolla.
     ------------------------------------------------------------------- */
  ETICHETTE: {
    amore: [
      "primo amore",
      "quotidianità",
      "ritorni",
      "distanza",
      "dialogo",
      "lettere mai spedite",
      "gratitudine",
      "sogni"
    ],
    paura: [
      "abbandono",
      "vulnerabilità",
      "rifiuto",
      "silenzio",
      "attaccamento",
      "fuga",
      "gelosia",
      "ricominciare"
    ]
  },

  /* Quante righe leggere dal database a ogni giro. Sono numeri larghi:
     alzali solo se l'archivio diventa davvero grosso. */
  MAX_LETTERE: 500,
  MAX_RISPOSTE: 2000
};
