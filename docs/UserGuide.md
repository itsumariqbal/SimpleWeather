# Documentazione Finale - SimpleWeather

## Manuale Tecnico



### Gestione Errori

| Scenario | Gestione | Output |
|----------|----------|--------|
| Città non trovata | catch API error | "Città non trovata. Controlla il nome." |
| Input vuoto | Validazione preventiva | "Inserisci una città." |
| Network error | catch fetch error | "Città non trovata..." |
| API rate limit | catch 429 | Messaggio generico errore |

## Guida Utente

### Come Usare SimpleWeather

#### 1. Ricerca Meteo

1. Digitare il nome di una città italiana (es. "Milano", "Roma")
2. Premere INVIO o cliccare "Cerca"
3. Il meteo apparirà automaticamente

#### 2. Visualizzazione Dati

- **Temperatura grande**: Temperatura attuale in gradi Celsius
- **Icona**: Rappresentazione visiva delle condizioni meteo
- **Umidità**: Percentuale di umidità relativa
- **Vento**: Velocità del vento in metri/secondo

#### 3. Previsioni

- Sotto il meteo corrente sono presenti 5 card giornaliere
- Ogni card mostra: giorno, icona, temperature minima e massima
- La card "Oggi" è selezionata di default

#### 4. Dettagli Orari

- Cliccare su una card giornaliera per visualizzare le previsioni orarie
- La tabella mostra: ora, condizioni, temperatura, vento
- Massimo 8 intervalli orari (ogni 3 ore)

#### 5. Sfondi Dinamici

L'applicazione cambia automaticamente sfondo e animazioni:

- **Sole**: Cielo azzurro con effetto luce
- **Nuvole**: Nuvole in movimento
- **Pioggia**: Gocce animate
- **Neve**: Fiocchi che cadono
- **Temporale**: Lampi intermittenti

## Manutenzione

### Modificare la API Key

```javascript
// script.js, linea 3
const API_KEY = "TUA_CHIAVE_QUI";
```

### Aggiungere una Nuova Condizione Meteo

```javascript
// 1. Aggiungere immagine in style.css
.bg-fog {
  background-image: url("https://images.unsplash.com/...");
}

// 2. Aggiungere overlay se necessario
.fog-overlay {
  background: rgba(200,200,200,0.4);
}

// 3. Aggiungere logica in updateBackground()
else if (condition.includes("fog")) {
  bgImage.classList.add("bg-fog");
  bgOverlay.classList.add("fog-overlay");
}
```

### Modificare Numero Giorni Forecast

```javascript
// script.js, funzione renderDaily()
const dates = Object.keys(days).slice(0, 7); // Da 5 a 7 giorni
```

### Cambiare Lingua

```javascript
// Nelle chiamate API
&lang=en  // Inglese
&lang=fr  // Francese
&lang=de  // Tedesco
```

---

**Documento generato per il progetto SimpleWeather**  
**Data**: Gennaio 2026  
