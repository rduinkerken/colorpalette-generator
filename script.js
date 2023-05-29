document.addEventListener("DOMContentLoaded", function() {
  let addColorButton = document.getElementById("addColorButton");
  let removePaletteButton = document.getElementById("removePaletteButton"); 

  addColorButton.addEventListener("click", (e) => {
    e.preventDefault();
    let colorInput = document.getElementById("hexColorInput");
    let colorReferenceInput = document.getElementById("colorReferenceInput");
    let colorValue = colorInput.value;
    let colorReference = colorReferenceInput.value;
    if (isValidColor(colorValue)) {
      AddColor(colorValue, colorReference);
      showNotification("Color added successfully!", "success");
      colorInput.value = ""; 
      colorReferenceInput.value = ""; 
    } else {
      showNotification("Invalid color input!", "error");
    }
  });

    removePaletteButton.addEventListener("click", () => {
      localStorage.removeItem("colors");
      displayColorsFromLocalStorage();
      colorsHolder.classList.add("hidden");
      removePaletteButton.classList.add("hidden");
    });
  displayColorsFromLocalStorage(); 
});

function isValidColor(colorValue) {
  const hexRegex = /^(#[0-9A-Fa-f]{6})$/; // Check if the color value is a valid hex color
  if (hexRegex.test(colorValue)) {
    return true;
  }
  if (CSS.supports("color", colorValue)) { // Check if the color value is a valid CSS color name
    return true;
  }
  return false;
}

function showNotification(message, type) {
  let notification = document.createElement("div");
  notification.classList.add("notification");
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

function AddColor(hexColorValue, colorRefValue) {
  let colorsHolder = document.getElementById("colorsHolder");
  let colorDiv = document.createElement("div");
  let colorText = document.createElement("span");
  let colorReference = document.createElement("div");
  let singleColorContainer = document.createElement("div");

  singleColorContainer.classList.add("singleColorContainer");

  colorDiv.classList.add("color");
  colorDiv.style.backgroundColor = hexColorValue;

  colorText.textContent = hexColorValue;
  colorText.style.color = '#' + ("000000" + (0xFFFFFF ^ parseInt(hexColorValue.substring(1), 16)).toString(16)).slice(-6);

  colorReference.textContent = colorRefValue;
  colorReference.classList.add("colorReference");

  colorDiv.appendChild(colorText);
  singleColorContainer.appendChild(colorDiv);
  singleColorContainer.appendChild(colorReference);

  colorsHolder.appendChild(singleColorContainer);

  let storedColors = JSON.parse(localStorage.getItem("colors")) || [];

  storedColors.push({
    color: hexColorValue,
    reference: colorRefValue
  });

  localStorage.setItem("colors", JSON.stringify(storedColors));

  displayColorsFromLocalStorage();
}

function displayColorsFromLocalStorage() {
  let colorsHolder = document.getElementById("colorsHolder");
  colorsHolder.innerHTML = ""; 

  let storedColors = JSON.parse(localStorage.getItem("colors")) || [];

  storedColors.forEach(colorItem => {
    let singleColorContainer = document.createElement("div");
    singleColorContainer.classList.add("singleColorContainer");

    let colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = colorItem.color;

    let colorText = document.createElement("span");
    colorText.textContent = colorItem.color;
    colorText.style.color = '#' + ("000000" + (0xFFFFFF ^ parseInt(colorItem.color.substring(1) || '000000', 16)).toString(16)).slice(-6);

    let colorReference = document.createElement("div");
    colorReference.textContent = colorItem.reference;
    colorReference.classList.add("colorReference");

    colorDiv.appendChild(colorText);
    singleColorContainer.appendChild(colorDiv);
    singleColorContainer.appendChild(colorReference);

    colorsHolder.appendChild(singleColorContainer);
  });

  if (storedColors.length === 0) {
    colorsHolder.classList.add("hidden");
    removePaletteButton.classList.add("hidden");
  } else {
    colorsHolder.classList.remove("hidden");
    removePaletteButton.classList.remove("hidden");
  }}

