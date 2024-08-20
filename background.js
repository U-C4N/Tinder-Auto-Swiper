chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.url.includes("tinder.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "startAutoSwipe" });
  } else {
    alert("This extension only works on the Tinder website.");
  }
});