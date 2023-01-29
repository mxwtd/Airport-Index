function searchAirport() {
  const searchTerm = document.getElementById("search-input").value;
  let html = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const data = JSON.parse(this.responseText);

      data.rows.forEach(row => {
        if (searchTerm.length > 4) {
          if (row.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            html += `<h3>${row.name}</h3>`;
            html += `<p>=> City: ${row.city}</p>`;
            html += `<p>=> IATA: ${row.iata}</p>`;
            html += `<p>=> ICAO: ${row.icao}</p>`;
            html += `<p>=> Country: ${row.country}</p>`;
            html += `<p>=> Size: ${row.size} m²</p>`;
          }
        } else if (searchTerm.length <= 4) {
          if (row.iata.toLowerCase().includes(searchTerm.toLowerCase())) {
            html += `<h3>${row.name}</h3>`;
            html += `<p>=> City: ${row.city}</p>`;
            html += `<p>=> IATA: ${row.iata}</p>`;
            html += `<p>=> ICAO: ${row.icao}</p>`;
            html += `<p>=> Country: ${row.country}</p>`;
            html += `<p>=> Size: ${row.size} m²</p>`;
          }
        }
      });

      if (searchTerm === "") {
        html = "⚠️ Please Enter a City Name or IATA Code. ⚠️";
      }

      document.getElementById("airport-data").innerHTML = html;
    }
  });

  xhr.open("GET", "https://flight-radar1.p.rapidapi.com/airports/list");
  xhr.setRequestHeader("X-RapidAPI-Key", "25fa9bb330mshb190051fed7e987p1b93bbjsn4c577d87db38");
  xhr.setRequestHeader("X-RapidAPI-Host", "flight-radar1.p.rapidapi.com");

  document.getElementById("airport-data").innerHTML = '<div class="spinner-box"> <div class="pulse-container"> <div class="pulse-bubble pulse-bubble-1"></div> <div class="pulse-bubble pulse-bubble-2"></div> <div class="pulse-bubble pulse-bubble-3"></div> </div> </div>';

  xhr.send();
}
// This function hides Elements in the HTML

function hideElement() {
  const hiddenElement = document.getElementById("data_grid");
  const showButton = document.getElementById("search-btn");
  const hideInfo = document.getElementById("intro-info");

  // initially hide the element
  hiddenElement.style.display = "none";
  hideInfo.style.display = "block";

  showButton.addEventListener("click", function() {
    hiddenElement.style.display = "block";
  });

  showButton.addEventListener("click", function() {
    hideInfo.style.display = "none";
  });
}


window.onload = () => {

document.getElementById("search-input").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.key === 'Enter') {
      document.getElementById("search-btn").click();
  }
});
hideElement();

}
