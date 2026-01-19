if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
  // If elements exist, show the error and disable the search button.
  const errorMessageEl = document.getElementById("errorMessage");
  const searchBtnEl = document.getElementById("searchBtn");
  if (errorMessageEl) errorMessageEl.textContent = "API key mancante o non valida. Verifica la secret MY_API_KEY e che il workflow abbia generato config.js";
  if (searchBtnEl) searchBtnEl.disabled = true;
  console.error('API key missing - check config.js or repository secret MY_API_KEY');
}

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");

const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
@@ -28,49 +24,67 @@ const windEl = document.getElementById("wind");
const weatherIconEl = document.getElementById("weatherIcon");

let forecastList = []; 


searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return showError("Inserisci una città.");
  loadData(city);


});
cityInput.addEventListener("keyup", e => e.key === "Enter" && searchBtn.click());

/* ---------------- CARICA TUTTO ---------------- */
async function loadData(city) {
  clearError();
  weatherCard.classList.add("hidden");

  try {
    // meteo attuale
    const curUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    // previsioni 5 giorni (ogni 3 ore)
    const foreUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=it`;

    const [curRes, foreRes] = await Promise.all([
      fetch(curUrl),
      fetch(foreUrl)
    ]);

    if (!curRes.ok) throw new Error("Errore meteo attuale");
    if (!foreRes.ok) throw new Error("Errore previsioni");
    const current = await curRes.json();
    const forecast = await foreRes.json();
    forecastList = forecast.list;
    renderCurrent(current);
    renderDaily(forecast);
  } catch (err) {
    console.error(err);
    showError("Errore nel recupero dei dati meteo.");
  }
}

@@ -188,3 +202,4 @@ function showHourly(items) {
/* ---------------- UTILITY ---------------- */
function showError(msg){ errorMessage.textContent = msg; }
function clearError(){ errorMessage.textContent = ""; }
