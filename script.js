function AddColor (hexColorValue, colorRefValue) {
    console.log("running");
    let colorsHolder = document.getElementById("colorsHolder");
    let colorDiv = document.createElement("div");
    let colorText = document.createElement("span");
    let colorReference = document.createElement("div");
    let singleColorContainer = document.createElement("div");

    singleColorContainer.classList.add("singleColorContainer");

    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = hexColorValue;

    colorText.textContent = hexColorValue;
    colorText.style.color = '#' + ("000000" + (0xFFFFFF ^ parseInt(hexColorValue.substring(1),16)).toString(16)).slice(-6);

    colorReference.textContent = colorRefValue;
    colorReference.classList.add("colorReference");

    colorDiv.appendChild(colorText);
    singleColorContainer.appendChild(colorDiv);
    singleColorContainer.appendChild(colorReference);

    colorsHolder.appendChild(singleColorContainer);
}