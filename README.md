# Saverio Sandbox - 3D GLB Viewer Demo

Questa è una semplice demo web per visualizzare modelli 3D in formato GLB utilizzando il componente `<model-viewer>` di Google.

## Struttura del Progetto

- `index.html`: Il visualizzatore principale.
- `public/assets/3d/`: Cartella per i modelli 3D (es. `SM_Interaction_01.glb`).
- `public/assets/hdri/`: Cartella per gli sfondi HDRI.
- `.gitattributes`: Configurazione per Git LFS.

## Come usare la demo

1. Deposita i tuoi file `.glb` nella cartella `public/assets/3d/`.
2. Deposita i tuoi file `.hdr` nella cartella `public/assets/hdri/`.
3. Modifica il percorso `src` (ed eventualmente `environment-image`) in `index.html`.
4. Apri `index.html` in un browser web (potrebbe essere necessario un server locale per alcuni asset).

## Git LFS (Large File Storage)

Il progetto ha Git LFS abilitato per gestire correttamente i file binari dei modelli 3D.
I file con estensione `.glb` sono tracciati automaticamente da LFS.