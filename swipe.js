let clickCount = 0;
let defaultLimit = 10;

const getLikeLimit = () => {
  return new Promise((resolve) => {
    const userInput = prompt("How many likes do you want to perform?", defaultLimit);
    const limit = isNaN(userInput) || userInput <= 0 ? defaultLimit : parseInt(userInput);
    chrome.storage.sync.set({limit: limit}, function() {
      resolve(limit);
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
      console.log(`Limit: ${clickCount} likes\nTime: ${timeSpent} seconds`);
      clickCount = 0;
    }
  }, 1000);
};

// Listen for messages from the service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startAutoSwipe") {
    autoSwipe();
  }
});