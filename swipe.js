var clickCount = 0;
var limit = 10; // Limit

var intervalId = setInterval(function() {
  var element = document.querySelector("button[class='button Lts($ls-s) Z(0) CenterAlign Mx(a) Cur(p) Tt(u) Bdrs(50%) P(0) Fw($semibold) focus-button-style Bxsh($bxsh-btn) Expand Trstf(e) Trsdu($normal) Wc($transform) Pe(a) Scale(1.1):h Scale(.9):a Bgi($g-ds-background-like):a']");
  element.click();
  clickCount++;
  console.log("Number of clicks: " + clickCount);

  if (clickCount >= limit) {
    clearInterval(intervalId);
    console.log("Click limit reached, stopping interval.");
  }
}, 1000);
