import get from "lodash/get";

export function buildGPSButton(handleClick) {
  let controlDiv = document.createElement("div");

  let firstChild = document.createElement("button");
  firstChild.style.backgroundColor = "#fff";
  firstChild.style.border = "none";
  firstChild.style.outline = "none";
  firstChild.style.width = "40px";
  firstChild.style.height = "40px";
  firstChild.style.borderRadius = "2px";
  firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
  firstChild.style.cursor = "pointer";
  firstChild.style.marginRight = "10px";
  firstChild.style.padding = "0";
  firstChild.title = "Your Location";
  controlDiv.appendChild(firstChild);

  let secondChild = document.createElement("div");
  secondChild.style.margin = "10px";
  secondChild.style.width = "20px";
  secondChild.style.height = "20px";
  secondChild.style.backgroundImage =
    "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
  secondChild.style.backgroundSize = "200px 20px";
  secondChild.style.backgroundPosition = "0 0";
  secondChild.style.backgroundRepeat = "no-repeat";
  firstChild.appendChild(secondChild);

  firstChild.addEventListener("click", handleClick);

  controlDiv.index = 1;

  return controlDiv;
}

export function buildSearchThisAreaButton(handleClick) {
  let controlDiv = document.createElement("div");
  controlDiv.index = 1;

  let firstChild = document.createElement("button");
  firstChild.style.backgroundColor = "#fff";
  firstChild.style.border = "none";
  firstChild.style.borderRadius = "2px";
  firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
  firstChild.style.cursor = "pointer";
  firstChild.style.fontSize = "18px";
  firstChild.style.height = "40px";
  firstChild.style.visibility = "hidden";
  firstChild.style.lineHeight = "40px";
  firstChild.style.margin = "10px 10px 0 0";
  firstChild.style.outline = "none";
  firstChild.style.padding = "0";
  firstChild.style.width = "160px";
  firstChild.title = "Search this area";
  firstChild.innerText = "Search this area";
  firstChild.addEventListener("click", handleClick);

  controlDiv.appendChild(firstChild);
  return controlDiv;
}

export function extractBounds(rawBounds) {
  return {
    ne: {
      lat: rawBounds.getNorthEast().lat(),
      lng: rawBounds.getNorthEast().lng()
    },
    sw: {
      lat: rawBounds.getSouthWest().lat(),
      lng: rawBounds.getSouthWest().lng()
    }
  };
}

export function isSameLocation(oldLocation, newLocation) {
  return (
    get(oldLocation, "lat") === get(newLocation, "lat") &&
    get(oldLocation, "lng") === get(newLocation, "lng")
  );
}
