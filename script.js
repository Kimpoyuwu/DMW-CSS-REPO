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

    document.getElementById("submitButton").addEventListener("click", showModal);
});

document.addEventListener("DOMContentLoaded", function () {
    let inputNumber = document.getElementById("input-number");

    inputNumber.value = "+63";


    inputNumber.addEventListener("input", function (event) {
        if (!inputNumber.value.startsWith("+63")) {
            inputNumber.value = "+63 ";
        }

        let rawNumber = inputNumber.value.replace("+63", "");
        if (rawNumber.length > 10) {
            inputNumber.value = "+63" + rawNumber.slice(0, 10);
        }
    });
    let middleNameInput = document.getElementById("input-middleName");
        let middleInitialInput = document.getElementById("input-middleInitial");

        middleNameInput.addEventListener("input", function () {
            let middleName = middleNameInput.value.trim();
            if (middleName.length > 0) {
                let initials = middleName
                    .split(" ")
                    .filter(word => word.length > 0)
                    .map(word => word.charAt(0).toUpperCase())
                    .join("") + ".";
                middleInitialInput.value = initials;
            } else {
                middleInitialInput.value = "";
            }
        });

            let inputs = document.querySelectorAll("input[type='text'], textarea");

            inputs.forEach(input => {
                input.addEventListener("input", function () {
                    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
                });
            });

});
//4 input numbers for zip code
document.getElementById("input-zipCode").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 4); 
});
//Email and Password Validation
form.addEventListener("submit", function (event) {
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        event.preventDefault();
        return;
    }
    });