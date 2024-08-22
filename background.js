// Listen for when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("tinder.com")) {
    // If on Tinder, send message to start auto-swiping
    chrome.tabs.sendMessage(tab.id, { action: "startAutoSwipe" })
      .then(response => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
          notifyUser("Error: Could not start auto-swiping. Please refresh the page and try again.");
        } else {
          console.log("Auto-swiping started successfully");
        }
      });
  } else {
    // If not on Tinder, notify the user
    notifyUser("This extension only works on the Tinder website. Please navigate to tinder.com and try again.");
  }
});

// Function to notify user using Chrome's notification API
function notifyUser(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon128.png",
    title: "Tinder Auto Swiper",
    message: message
  });
}