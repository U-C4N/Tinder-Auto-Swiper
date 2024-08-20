let clickCount = 0;
let defaultLimit = 10;

chrome.storage.sync.get(['limit'], function(result) {
  defaultLimit = result.limit || defaultLimit;
});

const getLikeLimit = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['limit'], function(result) {
      const userLimit = result.limit || prompt(`Like limit (default: ${defaultLimit}):`, defaultLimit);
      const limit = isNaN(userLimit) || userLimit <= 0 ? defaultLimit : parseInt(userLimit);
      chrome.storage.sync.set({limit: limit}, function() {
        resolve(limit);
      });
    });
  });
};

const performClick = () => {
  const likeButton = document.querySelector("button[class*='Bgi($g-ds-background-like):a']");
  if (likeButton) {
    likeButton.click();
    console.log(`Like: ${++clickCount}`);
  }
};

const autoSwipe = async () => {
  const limit = await getLikeLimit();
  const startTime = Date.now();

  const intervalId = setInterval(() => {
    performClick();
    if (clickCount >= limit) {
      clearInterval(intervalId);
      const timeSpent = ((Date.now() - startTime) / 1000).toFixed(2);
      alert(`Limit: ${clickCount} likes\nTime: ${timeSpent} seconds`);
      clickCount = 0;
    }
  }, 1000);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startAutoSwipe") {
    autoSwipe();
  }
});