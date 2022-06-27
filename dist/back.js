let file;

function failed(error) {
  console.log(error);
}

function newTab(tab) {
  console.log(`Displaying : ${file}`);
}

function loadV3dFile(requestDetails) {
  file = requestDetails.url;
  let targetUrl =
    browser.runtime.getURL("v3dreader.html") +
    "?filename=" +
    encodeURIComponent(file);
  //Prevent infinite loop when fetching file for display
  if (requestDetails.originUrl.toString() == targetUrl) {
    return;
  }
  let updating = browser.tabs.update({ url: targetUrl });
  updating.then(newTab, failed);
}

function addListener() {
  browser.webRequest.onBeforeRequest.addListener(
    loadV3dFile,
    {
      urls: ["*://*/*.v3d", "*://*/*.V3D"],
    },
    ["blocking"]
  );
}

function removeListener() {
  browser.webRequest.onBeforeRequest.removeListener(
    loadV3dFile,
    {
      urls: ["*://*/*.v3d", "*://*/*.V3D"],
    },
    ["blocking"]
  );
}

addListener();
