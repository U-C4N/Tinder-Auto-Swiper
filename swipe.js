// Click count variable
var clickCount = 0;

// Prompt user for like limit and validate input
var limit = prompt("Lütfen beğeni limiti girin:", 10);
limit = parseInt(limit);

if (isNaN(limit) || limit <= 0) {
  alert("Geçersiz limit değeri. Lütfen pozitif bir sayı girin.");
} else {
  // Start time for measuring time spent
  var startTime = new Date();

  // Function to perform the click action
  function performClick() {
    var element = document.querySelector("button[class='button Lts($ls-s) Z(0) CenterAlign Mx(a) Cur(p) Tt(u) Bdrs(50%) P(0) Fw($semibold) focus-button-style Bxsh($bxsh-btn) Expand Trstf(e) Trsdu($normal) Wc($transform) Pe(a) Scale(1.1):h Scale(.9):a Bgi($g-ds-background-like):a']");
    if (element) {
      element.click();
      clickCount++;
      console.log("Number of clicks: " + clickCount);
    }

    // Check if the click limit is reached
    if (clickCount >= limit) {
      clearInterval(intervalId);
      var endTime = new Date();
      var timeSpent = (endTime - startTime) / 1000;
      alert("Beğeni limitine ulaşıldı: " + clickCount + " beğeni\nGeçen süre: " + timeSpent + " saniye");
    }
  }

  // Set interval to perform click action every second
  var intervalId = setInterval(performClick, 1000);
}
