function toggleGenderInput() {
    let selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let genderOthersContainer = document.getElementById("genderOthersContainer");
    let otherGenderInput = document.getElementById("input-otherGender");

    if (selectedGender === "Other") {
        genderOthersContainer.style.display = "flex";
    } else {
        genderOthersContainer.style.display = "none";
        otherGenderInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("description");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");


    function showModal(event) {
        event.preventDefault();
        if (validateForm()) {
            modal.style.display = "flex";
        }
    }


    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll("input[required], select[required], textarea[required]");

        inputs.forEach((input) => {
            if (input.type === "radio") {
                const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = [...radioGroup].some(radio => radio.checked);

                if (!isChecked) {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "2px solid red"; // Apply red border
                    });
                    isValid = false;
                } else {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "none"; // Reset border if selected
                    });
                }
            } else {
                if (input.value.trim() === "") {
                    isValid = false;
                    input.style.border = "2px solid red";
                } else {
                    input.style.border = "1px solid #ccc";
                }
            }
        });


        return isValid;
    }
    function submitModal() {
        form.reset();
        modal.style.display = "none";
    }

    document.getElementById("submitButton").addEventListener("click", showModal);
});