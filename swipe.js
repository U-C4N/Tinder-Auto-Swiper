let clickCount = 0;
const defaultLimit = 10;

const getLikeLimit = () => {
  const userLimit = prompt(`Beğeni limiti (varsayılan: ${defaultLimit}):`, defaultLimit);
  return isNaN(userLimit) || userLimit <= 0 ? defaultLimit : parseInt(userLimit);
};

const performClick = () => {
  const likeButton = document.querySelector("button[class*='Bgi($g-ds-background-like):a']");
  if (likeButton) {
    likeButton.click();
    console.log(`Beğeni: ${++clickCount}`);
  }
};

const autoSwipe = () => {
  const limit = getLikeLimit();
  const startTime = Date.now();

  const intervalId = setInterval(() => {
    performClick();
    if (clickCount >= limit) {
      clearInterval(intervalId);
      const timeSpent = ((Date.now() - startTime) / 1000).toFixed(2);
      alert(`Limit: ${clickCount} beğeni\nSüre: ${timeSpent} saniye`);
    }
  }, 1000);
};

autoSwipe();