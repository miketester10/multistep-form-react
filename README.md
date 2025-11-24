# 📝 Form Multi-Step

Un'applicazione React moderna per la gestione di form multi-step con validazione avanzata, animazioni fluide e interfaccia utente intuitiva.

## 🚀 Caratteristiche

- **Form Multi-Step**: Form diviso in 3 step per una migliore esperienza utente
- **Validazione in Tempo Reale**: Validazione dei campi con messaggi di errore chiari
- **Progress Bar**: Barra di progresso animata che mostra la percentuale di completamento
- **Animazioni Fluide**: Transizioni animate tra gli step usando Framer Motion
- **Persistenza Dati**: I dati vengono salvati automaticamente nel localStorage tramite Zustand persist middleware
- **Reset Automatico**: Dopo il submit finale, il form viene automaticamente resettato e torna al primo step
- **Design Moderno**: Interfaccia utente moderna e responsive con Tailwind CSS v4
- **Type-Safe**: Completamente scritto in TypeScript per maggiore sicurezza del codice

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI moderna
- **TypeScript** - Tipizzazione statica
- **Vite** - Build tool veloce
- **Tailwind CSS v4** - Framework CSS utility-first
- **React Hook Form** - Gestione efficiente dei form
- **Zod** - Validazione schema-based
- **Zustand** - State management leggero
- **Framer Motion** - Animazioni fluide

## 📦 Installazione

1. Clona il repository o scarica i file del progetto

2. Installa le dipendenze:
```bash
npm install
```

## 🎯 Utilizzo

### Avviare il server di sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

### Build per produzione

```bash
npm run build
```

### Preview della build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📋 Struttura del Progetto

```
multistep-form/
├── src/
│   ├── components/
│   │   ├── MultiForm.tsx      # Componente principale del form
│   │   ├── ProgressBar.tsx    # Barra di progresso personalizzata
│   │   └── StepFields.tsx     # Componente per i campi del form
│   ├── schemas/
│   │   └── stepSchemas.ts     # Schemi di validazione Zod
│   ├── store/
│   │   └── useFormStore.ts    # Store Zustand per lo stato globale con persistenza localStorage
│   ├── App.tsx                # Componente root
│   ├── main.tsx               # Entry point
│   └── index.css              # Stili globali con Tailwind
├── public/                    # File statici
├── index.html                 # Template HTML
├── vite.config.ts             # Configurazione Vite
├── tailwind.config.js         # Configurazione Tailwind (v4)
└── package.json               # Dipendenze e script
```

## 📝 Step del Form

### Step 1: Informazioni Personali
- Nome (obbligatorio)
- Cognome (obbligatorio)
- Email (obbligatorio, formato valido)

### Step 2: Indirizzo
- Indirizzo (obbligatorio)
- Città (obbligatorio)
- CAP (obbligatorio, 5 cifre)

### Step 3: Dati di Pagamento
- Numero carta (obbligatorio, 16 cifre)
- Mese di scadenza (obbligatorio, formato MM)
- Anno di scadenza (obbligatorio, formato YYYY)
- Validazione della data di scadenza (non può essere nel passato)

## 🎨 Personalizzazione

### Modificare gli Step

Gli step sono definiti nel file `src/store/useFormStore.ts`:

```typescript
const steps = [
  { schema: stepSchema1, fields: ["nome", "cognome", "email"] },
  { schema: stepSchema2, fields: ["indirizzo", "citta", "cap"] },
  { schema: stepSchema3, fields: ["carta", "mese", "anno"] },
] as const;
```

### Modificare gli Schemi di Validazione

Gli schemi sono definiti in `src/schemas/stepSchemas.ts` usando Zod:

```typescript
export const stepSchema1 = z.object({
  nome: z.string().trim().nonempty({ error: "Il nome è obbligatorio" }),
  // ... altri campi
});
```

### Personalizzare lo Stile

Il progetto utilizza Tailwind CSS v4. Puoi modificare gli stili direttamente nelle classi dei componenti o aggiungere classi personalizzate in `src/index.css`.

## 🔧 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm run preview` - Anteprima della build di produzione
- `npm run lint` - Esegue il linter ESLint
