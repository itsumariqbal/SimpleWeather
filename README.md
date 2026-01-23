# SimpleWeather - Realistic Weather Application

Applicazione meteorologica moderna con sfondi fotografici dinamici e animazioni CSS avanzate.

## Caratteristiche Principali

- **Ricerca intelligente** - Ricerca per qualsiasi città italiana
- **Meteo in tempo reale** - Temperatura, umidità, velocità del vento
- **Previsioni a 5 giorni** - Con dettaglio orario
- **Sfondi dinamici** - Fotografie realistiche che si adattano alle condizioni meteo
- **Animazioni meteorologiche**
  - Effetto luce solare
  - Pioggia animata
  - Neve in caduta
  - Lampi durante temporali
  - Movimento delle nuvole
- **Responsive Design** - Compatibile con mobile, tablet e desktop
- **Localizzazione italiana** - Descrizioni meteorologiche in lingua italiana

## Demo

**Live Demo**: [https://github.com/SimpleWeather-TPS/SimpleWeather](https://github.com/SimpleWeather-TPS/SimpleWeather)

## Stack Tecnologico

| Tecnologia | Utilizzo |
|------------|----------|
| **HTML5** | Struttura semantica dell'applicazione |
| **CSS3** | Styling e sistema di animazioni |
| **JavaScript ES6+** | Logica applicativa e gestione dati |
| **OpenWeatherMap API** | Servizio dati meteorologici |
| **Unsplash** | CDN per immagini di background |

## Installazione

### Metodo 1: Download Diretto

```bash
# Clonare il repository
git clone https://github.com/SimpleWeather-TPS/SimpleWeather.git

# Aprire index.html nel browser
cd simple-weather
open index.html
```

### Metodo 2: Deploy con GitHub Pages

1. Effettuare il fork del repository
2. Accedere a **Settings** → **Pages**
3. Selezionare branch `main` e directory `/root`
4. Salvare e attendere il completamento del deploy
5. Accedere a https://github.com/SimpleWeather-TPS/SimpleWeather.git

## Configurazione API Key

1. Registrarsi gratuitamente su [OpenWeatherMap](https://openweathermap.org/api)
2. Ottenere la propria API key
3. Sostituire la chiave nel file `script.js`:

```javascript
const API_KEY = "TUA_CHIAVE_API_QUI";
```

**Nota**: La chiave fornita nel codice è a scopo dimostrativo. Per l'utilizzo in produzione è necessario utilizzare una chiave personale.

## Guida all'Utilizzo

### Ricerca Base

1. Inserire il nome di una città (es. "Milano")
2. Premere INVIO oppure cliccare su "Cerca"
3. Visualizzare meteo corrente e previsioni

### Navigazione Previsioni

1. Selezionare una card giornaliera
2. Consultare i dettagli orari nella tabella sottostante
3. Lo sfondo si adatta automaticamente alle condizioni meteo selezionate

## Struttura del Progetto

```
simple-weather/
│
├── index.html          # Struttura HTML principale
├── style.css           # Fogli di stile e animazioni CSS
├── script.js           # Logica applicativa JavaScript
│
├── docs/               # Documentazione di progetto
│   ├── design.md
│   ├── development.md
│   └── user-guide.md
│
└── README.md           # Documentazione principale
```

## Condizioni Meteorologiche Supportate

| Condizione | Sfondo | Animazione |
|------------|--------|------------|
| Sereno | Cielo azzurro | Effetto luce solare pulsante |
| Nuvoloso | Nuvole grigie | Movimento orizzontale delle nuvole |
| Pioggia | Paesaggio piovoso | Gocce animate in caduta |
| Neve | Paesaggio innevato | Fiocchi di neve in movimento |
| Temporale | Cielo tempestoso | Lampi intermittenti e pioggia |

## Testing e Compatibilità

L'applicazione è stata testata e verificata sui seguenti browser:

- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

## Roadmap Futura

- Implementazione grafici andamento temperatura settimanale
- Aggiunta geolocalizzazione automatica
- Sistema di salvataggio città preferite (localStorage)
- Implementazione modalità tema scuro/chiaro manuale
- Sistema di widget meteorologici personalizzabili
- Supporto Progressive Web App (modalità offline)
