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

document.getElementById("input-number").addEventListener("input", function () {
    this.value = this.value.slice(0, 11);
});

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll("input[required], select[required], textarea[required]");

        inputs.forEach((input) => {
            if (input.type === "radio") {
                const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = [...radioGroup].some(radio => radio.checked);

                if (!isChecked) {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "2px solid red";
                    });
                    isValid = false;
                } else {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "none";
                    });
                }
            } else if (input.type === "checkbox") {
                const checkboxWrapper = input.closest(".ios-checkbox").querySelector(".checkbox-bg");

                if (!input.checked) {
                    isValid = false;
                    checkboxWrapper.style.border = "2px solid red";
                } else {
                    checkboxWrapper.style.border = "2px solid var(--checkbox-border)";
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

    document.getElementById("submitButton").addEventListener("click", function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {

    let middleNameInput = document.getElementById("input-middleName");
    let middleInitialInput = document.getElementById("input-middleInitial");

    middleNameInput.addEventListener("input", function () {
        let middleName = middleNameInput.value.trim();
        if (middleName.length > 0) {
            let initials = middleName
                .split(" ")
                .filter(word => word.length > 0)
                .map(word => word.charAt(0).toUpperCase())
                .join("");
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

    document.getElementById("input-zipCode").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 4);
    });


    const form = document.getElementById("myForm");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    form.addEventListener("submit", function (event) {
        console.log("Form submitted");  // Debugging - Check if script runs

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Reset border styles
        passwordInput.style.border = "1px solid #ccc";
        confirmPasswordInput.style.border = "1px solid #ccc";

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");  // Debugging - Check validation
            alert("Passwords do not match.");
            event.preventDefault();  // Prevent form submission

            // Highlight the fields in red
            passwordInput.style.border = "2px solid red";
            confirmPasswordInput.style.border = "2px solid red";
            return;
        }

        alert("Form submitted successfully!");

        setTimeout(() => {
            location.reload();
        }, 3000);
    });

});

document.getElementById("checkbox").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
});
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input[required], select[required]");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (!this.checkValidity()) {
                this.reportValidity();
            } else {
                this.setCustomValidity("");
            }
        });
    });

    // Validate Contact Number (10 digits)
    const contactNumber = document.getElementById("input-number");
    contactNumber.addEventListener("input", function () {
        if (!/^\d{11}$/.test(this.value)) {
            this.setCustomValidity("Contact number must be exactly 11 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Zip Code (4 digits)
    const zipCode = document.getElementById("input-zipCode");
    zipCode.addEventListener("input", function () {
        if (!/^\d{4}$/.test(this.value)) {
            this.setCustomValidity("Zip code must be exactly 4 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Confirm Password
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });

    // Show/hide password
    document.getElementById("checkbox").addEventListener("change", function () {
        const type = this.checked ? "text" : "password";
        password.type = type;
        confirmPassword.type = type;
    });
});
//modal js
const submitButton = document.getElementById("submit-Button");
const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close");

modal.style.display = "none"; 

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "flex";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
});
