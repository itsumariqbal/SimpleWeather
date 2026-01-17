/* SIMPLE WEATHER — FRONTEND (NO API KEY) */

/* ================= CONFIG ================= */
const API_BASE_URL = "https://simpleweather-api.vercel.app/api";

/* ================= DOM ================= */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");
const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const descriptionEl = document.getElementById("description");
const temperatureEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const weatherIconEl = document.getElementById("weatherIcon");

let forecastList = [];

/* ================= EVENTS ================= */
searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keyup", e => e.key === "Enter" && handleSearch());

/* ================= HANDLERS ================= */
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Inserisci il nome di una città.");
    return;
  }
  loadData(city);
}

function setLoadingState(isLoading) {
  searchBtn.disabled = isLoading;
  searchBtn.textContent = isLoading ? "Caricamento..." : "Cerca";
  if (isLoading) {
    weatherCard.classList.add("hidden");
  }
}

/* ================= LOAD DATA ================= */
async function loadData(city) {
  clearError();
  setLoadingState(true);

  try {
    const currentUrl = `${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`;
    const forecastUrl = `${API_BASE_URL}/forecast?city=${encodeURIComponent(city)}`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok) {
      throw new Error(currentRes.status === 404 ? "Città non trovata" : "Errore nel recupero del meteo");
    }
    if (!forecastRes.ok) {
      throw new Error("Errore nel recupero delle previsioni");
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    forecastList = forecast.list;

    renderCurrent(current);
    renderDaily();
  } catch (err) {
    console.error("Errore caricamento dati:", err);
    showError(err.message || "Errore nel recupero dei dati meteo.");
  } finally {
    setLoadingState(false);
  }
}

/* ================= CURRENT WEATHER ================= */
function renderCurrent(cur) {
  cityNameEl.textContent = `${cur.name}, ${cur.sys.country}`;
  descriptionEl.textContent = cur.weather[0].description;
  temperatureEl.textContent = `${Math.round(cur.main.temp)}°C`;
  humidityEl.textContent = `${cur.main.humidity}%`;
  windEl.textContent = `${cur.wind.speed} m/s`;

  weatherIconEl.src = `https://openweathermap.org/img/wn/${cur.weather[0].icon}@2x.png`;
  weatherIconEl.alt = cur.weather[0].description;
}

/* ================= DAILY FORECAST ================= */
function renderDaily() {
  document.getElementById("forecastContainer")?.remove();
  document.getElementById("hourlyTable")?.remove();

  const container = document.createElement("div");
  container.id = "forecastContainer";

  const days = {};

  forecastList.forEach(item => {
    const d = new Date(item.dt * 1000);
    const key = d.toISOString().split("T")[0];
    if (!days[key]) days[key] = [];
    days[key].push(item);
  });

  const dates = Object.keys(days).slice(1, 6);

  dates.forEach(dateStr => {
    const dayItems = days[dateStr];
    const temps = dayItems.map(x => x.main.temp);
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));
    const middle = dayItems[Math.floor(dayItems.length / 2)];

    const d = new Date(dateStr);
    const dayName = d.toLocaleDateString("it-IT", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <strong>${dayName}</strong><br>
      <img src="https://openweathermap.org/img/wn/${middle.weather[0].icon}.png">
      <small>${middle.weather[0].description}</small><br>
      <small>min ${min}° — max ${max}°</small>
    `;

    card.addEventListener("click", () => showHourly(dayItems));
    container.appendChild(card);
  });

  weatherCard.appendChild(container);
  weatherCard.classList.remove("hidden");
}

/* ================= HOURLY TABLE ================= */
function showHourly(items) {
  document.getElementById("hourlyTable")?.remove();

  const table = document.createElement("table");
  table.id = "hourlyTable";
  table.style.marginTop = "14px";
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.background = "#fff";

  table.innerHTML = `
    <thead style="background:#f1f1f1">
      <tr>
        <th style="padding:8px">Ora</th>
        <th style="padding:8px">Temp</th>
        <th style="padding:8px">Descrizione</th>
        <th style="padding:8px">Vento</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  items.forEach(h => {
    const t = new Date(h.dt * 1000);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding:6px 8px">${t.getHours()}:00</td>
      <td style="padding:6px 8px">${Math.round(h.main.temp)}°C</td>
      <td style="padding:6px 8px">${h.weather[0].description}</td>
      <td style="padding:6px 8px">${h.wind.speed} m/s</td>
    `;
    tbody.appendChild(row);
  });

  weatherCard.appendChild(table);
}

/* ================= UTILS ================= */
function showError(msg) {
  errorMessage.textContent = msg;
}
function clearError() {
  errorMessage.textContent = "";
}
