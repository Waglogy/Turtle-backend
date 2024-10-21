const inputYTlinkInput = document.querySelector(".input-ytlink")
const inputFileInput = document.querySelector(".input-file")

const inputClick = (type) => {
    if (type != "image") {
        inputFileInput.classList.add("hidden")
        inputYTlinkInput.classList.remove("hidden")
    } else {
        inputFileInput.classList.remove("hidden")
        inputYTlinkInput.classList.add("hidden")
    }
}

// Check the selected option on page load and show the correct field
window.onload = () => {
    const selectedOption = document.querySelector('input[name="media"]:checked')
    if (selectedOption) {
        inputClick(selectedOption.value)
    }
}
