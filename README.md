# Saverio Sandbox - 3D GLB Viewer Demo

Questa è una semplice demo web per visualizzare modelli 3D in formato GLB utilizzando il componente `<model-viewer>` di Google.

## Struttura del Progetto

- `index.html`: Il visualizzatore principale.
- `public/assets/`: Cartella dove depositare i modelli 3D.
- `.gitattributes`: Configurazione per Git LFS.

## Come usare la demo

1. Deposita il tuo file `.glb` nella cartella `public/assets/`.
2. Rinomina il file in `model.glb` oppure modifica il percorso `src` in `index.html`.
3. Apri `index.html` in un browser web (potrebbe essere necessario un server locale per alcuni asset).

## Git LFS (Large File Storage)

Il progetto ha Git LFS abilitato per gestire correttamente i file binari dei modelli 3D.
I file con estensione `.glb` sono tracciati automaticamente da LFS.