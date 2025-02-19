//form js
function toggleGenderInput() {
    let selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let genderOthersContainer = document.getElementById("form-other-gender-cont");
    let otherGenderInput = document.getElementById("form-other-gender");

    if (selectedGender === "Other") {
        genderOthersContainer.style.display = "flex";
    } else {
        genderOthersContainer.style.display = "none";
        otherGenderInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("form-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});



document.getElementById("form-tb-number").addEventListener("input", function () {
    this.value = this.value.slice(0, 11);
});

document.addEventListener("DOMContentLoaded", function () {
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input[required], select[required], textarea[required]");

        inputs.forEach((input) => {
            if (input.type === "radio") {
                const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
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
                if (!input.checked) {
                    isValid = false;
                    input.style.border = "2px solid red";
                } else {
                    input.style.border = "1px solid #d9d9d9";
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

    document.getElementById("form-btn-submit").addEventListener("click", function (event) {
        const form = document.querySelector(".form");
        if (!validateForm(form)) {
            event.preventDefault();
        }
    });

    document.getElementById("modal-btn-submit").addEventListener("click", function (event) {
        const form = document.querySelector(".modal-form");
        if (!validateForm(form)) {
            event.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {

    let middleNameInput = document.getElementById("form-tb-middleName");
    let middleInitialInput = document.getElementById("form-tb-middleInitial");

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

    document.getElementById("form-tb-zipCode").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 4);
    });


    const form = document.getElementById("form");
    const passwordInput = document.getElementById("form-tb-password");
    const confirmPasswordInput = document.getElementById("form-tb-confirm-password");

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

document.getElementById("form-tb-show-password").addEventListener("change", function() {
    const passwordField = document.getElementById("form-tb-password");
    passwordField.type = this.checked ? "text" : "form-tb-password";
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
    const contactNumber = document.getElementById("form-tb-number");
    contactNumber.addEventListener("input", function () {
        if (!/^\d{11}$/.test(this.value)) {
            this.setCustomValidity("Contact number must be exactly 11 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Zip Code (4 digits)
    const zipCode = document.getElementById("form-tb-zipCode");
    zipCode.addEventListener("input", function () {
        if (!/^\d{4}$/.test(this.value)) {
            this.setCustomValidity("Zip code must be exactly 4 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Confirm Password
    const password = document.getElementById("form-tb-password");
    const confirmPassword = document.getElementById("form-tb-confirm-password");

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });

    // Show/hide password
    document.getElementById("form-tb-show-password").addEventListener("change", function () {
        const password = document.getElementById("form-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });
});

//modal js
const submitButton = document.getElementById("modal-btn");
const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close");

modal.style.display = "none";

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.body.style.overflow ="hidden";
    modal.style.display = "flex";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow ="";
});

function toggleGenderInput() {
    let selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let genderOthersContainer = document.getElementById("modal-OtherGender");
    let otherGenderInput = document.getElementById("modal-radio-btn");

    if (selectedGender === "Other") {
        genderOthersContainer.style.display = "flex";
    } else {
        genderOthersContainer.style.display = "none";
        otherGenderInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("modal-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});

document.getElementById("modal-tb-number").addEventListener("input", function () {
    this.value = this.value.slice(0, 11);
});

document.addEventListener("DOMContentLoaded", function () {
    let middleNameInput = document.getElementById("modal-tb-middleName");
    let middleInitialInput = document.getElementById("modal-tb-middleInitial");
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

    document.getElementById("modal-tb-zipCode").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 4);
    });
    const form = document.getElementById("modal");
    const passwordInput = document.getElementById("modal-tb-password");
    const confirmPasswordInput = document.getElementById("modal-tb-confirmPassword");

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

document.getElementById("modal-tb-show-password").addEventListener("change", function() {
    const passwordField = document.getElementById("modal-tb-password");
    passwordField.type = this.checked ? "text" : "modal-tb-password";
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
    const contactNumber = document.getElementById("modal-tb-number");
    contactNumber.addEventListener("input", function () {
        if (!/^\d{11}$/.test(this.value)) {
            this.setCustomValidity("Contact number must be exactly 11 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });
    // Validate Zip Code (4 digits)
    const zipCode = document.getElementById("modal-tb-zipCode");
    zipCode.addEventListener("input", function () {
        if (!/^\d{4}$/.test(this.value)) {
            this.setCustomValidity("Zip code must be exactly 4 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });
    // Validate Confirm Password
    const password = document.getElementById("modal-tb-password");
    const confirmPassword = document.getElementById("modal-tb-confirmPassword");
    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });
     // Show/hide password
     document.getElementById("modal-tb-show-password").addEventListener("change", function () {
        const password = document.getElementById("modal-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });
});
