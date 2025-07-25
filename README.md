- Gestionale per azienda produttrice di vino;


- La gestione può avvenire solo tramite autenticazione e autorizzazione;
- Per la valorizzazione della password dell'admin ho preferito utilizzare un update
  per aggiornare la password sul db, la password criptata viene visualizzata sul log al momento del login
- La gestione comprende la creazione,la modifica e l'eliminazione dei clienti, 
  dei lotti, ordini,etichette e operatori;
- La creazione e la modifica avvengono attraverso un form;
- I dati sono di volta in volta rappresentati in una tabella;
- Le tabelle in modalità responsive diventano delle card;
- Gli ordini sono collegati a dei clienti e a degli operatori(reparto spedizione),
  bisognerà quindi prima modificare l'ordine o eliminarlo qualora si volesse eliminare
  un cliente o un operatore;
- Infine è possibile nella dashboard avere un riepilogo delle informazioni riguardo i lotti e 
  la percentuale di bottiglie che sono in determinate fasi, attreverso dei grafici che cambiano in base ai valori inseriti


Credenziali con cui accedere, l'accesso è previsto solo per admin

email: "maddalena@email.com"
password: "admin123"

link al backend: https://github.com/MaddalenaRen/vinicola-be

link deploy Vercel : https://vinicola-fe.vercel.app/

link deploy Koyeb : extended-celeste-rennella-d07bc04c.koyeb.app/

L'unica variabile d'ambiente è postgresql_password dove bisogna inserire la password del db



