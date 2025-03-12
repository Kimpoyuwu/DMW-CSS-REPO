// Script for form
// Showing text field for other gender (form)
function formtoggleInput() {
    let selectedGender = document.querySelector(".form-radio-op1").checked ? "op1" :
        document.querySelector(".form-radio-op2").checked ? "op2" :
            document.querySelector(".form-radio-other").checked ? "Other" : "";

    let genderOthersContainer = document.querySelector(".input-other-cont");

    if (selectedGender === "Other") {
        genderOthersContainer.style.display = "flex";
    } else {
        genderOthersContainer.style.display = "none";
    }
}

// Adjusting textarea height based on content
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".form-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});


// Showing File name in the list
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.form-tb-file').addEventListener('change', function () {
        const fileListCont = document.querySelector('.input-file-list-cont');
        const fileList = document.querySelector('.form-tb-list');
        fileList.innerHTML = '';

        if (this.files.length > 0) {
            fileListCont.style.display = 'block';

            Array.from(this.files).forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                fileList.appendChild(listItem);
            });
        } else {
            fileListCont.style.display = 'none';
        }
    });
    let fileInput = document.querySelector(".form-tb-file");
    let fileList = document.querySelector(".form-tb-list");
    let storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    function updateFileList(files) {
        fileList.innerHTML = "";
        files.forEach((file) => {
            let listItem = document.createElement("li");
            let fileLink = document.createElement("a");

            fileLink.href = file.url;
            fileLink.textContent = file.name;
            fileLink.target = "_blank";

            listItem.appendChild(fileLink);
            fileList.appendChild(listItem);
        });
    }
    updateFileList(storedFiles);
    fileInput.addEventListener("change", function (event) {
        let newFiles = Array.from(event.target.files).map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        storedFiles = [...storedFiles, ...newFiles];
        localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));

        updateFileList(storedFiles);
    });
    window.addEventListener("beforeunload", function (event) {
        if (storedFiles.length > 0) {
            event.preventDefault();
            event.returnValue = "Are you sure you want to refresh? Uploaded files will be removed.";
        }
    });
    window.addEventListener("unload", function () {
        localStorage.removeItem("uploadedFiles");
    });
});


// Checking required fields and validating form
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

    function handleInputValidation(event) {
        const input = event.target;
        const onlyLetters = ["form-tb-text", "form-tb-middleName", "modal-tb-text", "modal-tb-middleName"];
        const lettersAndNumbers = ["form-tb-text-number, modal-tb-text-number"];
        const onlyNumbers = ["form-tb-number", "form-tb-contNumber", "modal-tb-contNumber"];

        if (onlyLetters.includes(input.classList[0])) {
            input.value = input.value.replace(/[^a-zA-Z ]/g, '');
        } else if (lettersAndNumbers.includes(input.classList[0])) {
            input.value = input.value.replace(/[^a-zA-Z0-9 ]/g, '');
        } else if (onlyNumbers.includes(input.classList[0])) {
            input.value = input.value.replace(/[^0-9]/g, '');
        }
    }

    document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", handleInputValidation);
    });

    // Capitalize the first letter of each word
    document.querySelectorAll("input[type='text'], textarea").forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/\b\w/g, char => char.toUpperCase());
        });
    });
    document.querySelectorAll("input[type='text'], textarea").forEach(input => {
        input.addEventListener("input", handleInputValidation);
    });

    document.querySelector(".form-btn-submit")?.addEventListener("click", function (event) {
        const form = document.querySelector(".form");
        if (form && !validateForm(form)) {
            event.preventDefault();
        }
    });


    document.querySelector(".modal-btn-submit")?.addEventListener("click", function (event) {
        const form = document.querySelector(".modal-form");
        if (form && !validateForm(form)) {
            event.preventDefault();
        }
    });
});

// Getting first letter of middle name
document.addEventListener("DOMContentLoaded", function () {
    let middleNameInput = document.querySelector(".form-tb-middleName");
    let middleInitialInput = document.querySelector(".form-tb-middleInitial");

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

    // Compare Password and Confirm Password
    const form = document.querySelector(".form");
    const passwordInput = document.querySelector(".form-tb-password");
    const confirmPasswordInput = document.querySelector(".form-tb-confirm-password");

    form.addEventListener("submit", function (event) {
        console.log("Form submitted");

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        passwordInput.style.border = "1px solid #ccc";
        confirmPasswordInput.style.border = "1px solid #ccc";

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            alert("Passwords do not match.");
            event.preventDefault();

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

// Compare Password and Confirm Password in Modal
const form = document.querySelector(".modal-form");
const passwordInput = document.querySelector(".modal-tb-password");
const confirmPasswordInput = document.querySelector(".modal-tb-confirm-password");

form.addEventListener("submit", function (event) {
    console.log("Form submitted");

    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    passwordInput.style.border = "1px solid #ccc";
    confirmPasswordInput.style.border = "1px solid #ccc";

    if (password !== confirmPassword) {
        console.log("Passwords do not match!");
        alert("Passwords do not match.");
        event.preventDefault();

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


``

// Validate form fields
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
    document.querySelector(".form-tb-contNumber").addEventListener("input", function () {
        this.value = this.value.slice(0, 11);
    });

    // Validate Contact Number (10 digits)
    const contactNumber = document.querySelector(".form-tb-contNumber");
    contactNumber.addEventListener("input", function () {
        if (!/^\d{11}$/.test(this.value)) {
            this.setCustomValidity("Contact number must be exactly 11 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Confirm Password
    const password = document.querySelector(".form-tb-password");
    const confirmPassword = document.querySelector(".form-tb-confirm-password");

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });

    // Show/hide password
    document.querySelector(".form-tb-show-password").addEventListener("change", function () {
        const password = document.querySelector(".form-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });
});

// script for toggle button 
// For default Toggle Button
function toggleRadio(isOn) {
    const toggleSwitch = document.querySelector('.toggleSwitch');
    const toggleText = document.querySelector('.toggleText');
    if (isOn) {
      toggleSwitch.classList.add('on');
      toggleText.textContent = 'ON';
    } else {
      toggleSwitch.classList.remove('on');
      toggleText.textContent = 'OFF';
    }
  }
  document.querySelector('.toggleSwitch').addEventListener('click', function() {
    const radioOff = document.querySelector('.radio-input-off');
    const radioOn = document.querySelector('.radio-input-on');

    if (radioOff.checked) {
      radioOn.checked = true;
      toggleRadio(true);
    } else {
      radioOff.checked = true;
      toggleRadio(false);
    }
  });
  function mediumToggleRadio(isOn) {
    const mediumToggleSwitch = document.querySelector('.medium-toggleSwitch');
    const mediumToggleText = document.querySelector('.medium-toggleText');
    if (isOn) {
      mediumToggleSwitch.classList.add('on');
      mediumToggleText.textContent = 'ON';
    } else {
      mediumToggleSwitch.classList.remove('on');
      mediumToggleText.textContent = 'OFF';
    }
  }
  document.querySelector('.medium-toggleSwitch').addEventListener('click', function() {
    const mediumRadioOff = document.querySelector('.medium-radio-input-off');
    const mediumRadioOn = document.querySelector('.medium-radio-input-on');

    if (mediumRadioOff.checked) {
      mediumRadioOn.checked = true;
      mediumToggleRadio(true);
    } else {
      mediumRadioOff.checked = true;
      mediumToggleRadio(false);
    }
  });

  function smallToggleRadio(isOn) {
    const smallToggleSwitch = document.querySelector('.small-toggleSwitch');
    const smallToggleText = document.querySelector('.small-toggleText');
    if (isOn) {
      smallToggleSwitch.classList.add('on');
      smallToggleText.textContent = 'ON';
    } else {
      smallToggleSwitch.classList.remove('on');
      smallToggleText.textContent = 'OFF';
    }
  }
  document.querySelector('.small-toggleSwitch').addEventListener('click', function() {
    const smallRadioOff = document.querySelector('.small-radio-input-off');
    const smallRadioOn = document.querySelector('.small-radio-input-on');

    if (smallRadioOff.checked) {
      smallRadioOn.checked = true;
      smallToggleRadio(true);
    } else {
      smallRadioOff.checked = true;
      smallToggleRadio(false);
    }
  });

  



// "Script for modal"
const submitButton = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

modal.style.display = "none";

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "";
});
// Showing text field for other
function modaltoggleInput() {
    let selectedGender = document.querySelector(".modal-radio-op1").checked ? "op1" :
        document.querySelector(".modal-radio-op2").checked ? "op2" :
            document.querySelector(".modal-radio-other").checked ? "Other" : "";

    let genderOthersContainer = document.querySelector(".modal-other-cont");

    if (selectedGender === "Other") {
        genderOthersContainer.style.display = "flex";
    } else {
        genderOthersContainer.style.display = "none";
    }
}
// Adjusting textarea height based on content
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".modal-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});

// Limiting number of characters in text fields
document.querySelector(".modal-tb-contNumber").addEventListener("input", function () {
    this.value = this.value.slice(0, 11);
});

// Getting first letter of middle name
document.addEventListener("DOMContentLoaded", function () {
    let middleNameInput = document.querySelector(".modal-tb-middleName");
    let middleInitialInput = document.querySelector(".modal-tb-middleInitial");
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

    // Make the first letter of each word uppercase
    let inputs = document.querySelectorAll("input[type='text'], textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
        });
    });

    // Compare Password and Confirm Password
    const form = document.querySelector(".modal");
    const passwordInput = document.querySelector(".modal-tb-password");
    const confirmPasswordInput = document.querySelector(".modal-tb-confirmPassword");

    form.addEventListener("submit", function (event) {
        console.log("Form submitted");

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Reset border styles
        passwordInput.style.border = "1px solid #ccc";
        confirmPasswordInput.style.border = "1px solid #ccc";

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            alert("Passwords do not match.");
            event.preventDefault();
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

// Validate form fields
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
        // Show/hide password
        document.querySelector(".modal-tb-show-password").addEventListener("change", function () {
            const password = document.querySelector(".modal-tb-password");
            const type = this.checked ? "text" : "password";
            password.type = type;
        });
    });
    // Validate Confirm Password
    const password = document.querySelector(".modal-tb-password");
    const confirmPassword = document.querySelector(".modal-tb-confirmPassword");
    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });
     // Show/hide password
     document.querySelector(".modal-tb-show-password").addEventListener("change", function () {
        const password = document.querySelector(".modal-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });
});




const daySelect = document.getElementById("day");
        const monthSelect = document.getElementById("month");
        const yearSelect = document.getElementById("year");
    
        // Populate Month Dropdown
        const months = [
            { name: "January", days: 31 },
            { name: "February", days: 28 }, // Default, will update for leap years
            { name: "March", days: 31 },
            { name: "April", days: 30 },
            { name: "May", days: 31 },
            { name: "June", days: 30 },
            { name: "July", days: 31 },
            { name: "August", days: 31 },
            { name: "September", days: 30 },
            { name: "October", days: 31 },
            { name: "November", days: 30 },
            { name: "December", days: 31 }
        ];
    
        months.forEach((month, index) => {
            let option = new Option(month.name, (index + 1).toString().padStart(2, '0'));
            monthSelect.appendChild(option);
        });
    
        // Populate Year Dropdown (From 1900 to Current Year)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            let option = new Option(i, i);
            yearSelect.appendChild(option);
        }
    
        // Function to Update Day Dropdown Based on Month & Year
        function updateDays() {
            let selectedMonth = parseInt(monthSelect.value);
            let selectedYear = parseInt(yearSelect.value);
            let daysInMonth = 31; // Default
    
            if (selectedMonth) {
                daysInMonth = months[selectedMonth - 1].days;
    
                // Handle February (Leap Year Check)
                if (selectedMonth === 2) {
                    if (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) {
                        daysInMonth = 29; // Leap year
                    } else {
                        daysInMonth = 28;
                    }
                }
            }
    
            // Store previous selected day
            let previousDay = parseInt(daySelect.value);
    
            // Clear existing days
            daySelect.innerHTML = '<option value="">DD</option>';
            for (let i = 1; i <= daysInMonth; i++) {
                let option = new Option(i, i.toString().padStart(2, '0'));
                daySelect.appendChild(option);
            }
    
            // Restore previous valid day if available
            if (previousDay && previousDay <= daysInMonth) {
                daySelect.value = previousDay.toString().padStart(2, '0');
            } else {
                daySelect.value = ""; // Reset if invalid
            }
        }
    
        // Function to Combine Date and Store in Hidden Input
        function combineDate() {
            let day = daySelect.value;
            let month = monthSelect.value;
            let year = yearSelect.value;
    
            if (day && month && year) {
                document.getElementById("full-date").value = `${year}-${month}-${day}`;
            }
        }
    
        // Initialize Days Dropdown
        updateDays();

        // Two decimal places
document.querySelector('.form-tb-deci').addEventListener('input', function (e) {
    let value = e.target.value;
    // Ensure the value is a valid number with up to two decimal places
    if (!/^\d*\.?\d{0,2}$/.test(value)) {
        e.target.value = value.slice(0, -1);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Select all phone number inputs
    const phoneInputs = document.querySelectorAll(".form-tb-tel");

    if (phoneInputs.length > 0) {
        phoneInputs.forEach((phoneInput) => {
            // Select the error message for the current input
            let errorMsg = phoneInput.nextElementSibling;

            // Initialize intlTelInput for each phone input
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: "ph",
                separateDialCode: true,
                preferredCountries: ["ph", "sa", "gb", "jp", "qa"],
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
            });

            // Validation function
            function validatePhone() {
                if (iti.isValidNumber()) {
                    errorMsg.style.display = "none"; // Hide error message
                } else {
                    errorMsg.style.display = "block"; // Show error message
                }
            }

            // Event listener for validation
            phoneInput.addEventListener("blur", validatePhone);
        });
    }
});

// Add submit validation
document.querySelector("submit").addEventListener("click", function () {
    document.querySelectorAll(".form-tb-tel").forEach(input => {
        input.dispatchEvent(new Event("blur")); // Trigger validation on all inputs
    });
});

const zipInput = document.getElementById("zipCode");
        const flagIcon = document.getElementById("flag");
        const zipMessage = document.getElementById("zipMessage");
        const inputGroup = document.getElementById("inputGroup");

        // ZIP Code patterns and corresponding country flags
        const zipFormats = {
            "PH": { regex: /^(0[4-9]\d{2}|[1-9]\d{3})$/, flag: "https://flagcdn.com/w40/ph.png" }, // Philippines (e.g. 1000, 3002)
            "US": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/us.png" }, // USA (00000-99999)
            "CA": { regex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, flag: "https://flagcdn.com/w40/ca.png" }, // Canada
            "GB": { regex: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, flag: "https://flagcdn.com/w40/gb.png" }, // UK
            "DE": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/de.png" }, // Germany
            "FR": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/fr.png" }, // France
            "AU": { regex: /^\d{4}$/, flag: "https://flagcdn.com/w40/au.png" }, // Australia
            "IN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/in.png" }, // India
            "JP": { regex: /^\d{3}-\d{4}$/, flag: "https://flagcdn.com/w40/jp.png" }, // Japan
            "MX": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/mx.png" }, // Mexico
            "BR": { regex: /^\d{5}-\d{3}$/, flag: "https://flagcdn.com/w40/br.png" }, // Brazil
            "CN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/cn.png" }, // China
            "ID": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/id.png" }, // Indonesia
            "TH": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/th.png" }, // Thailand
            "VN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/vn.png" }, // Vietnam
            "KR": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/kr.png" }, // South Korea
            "SG": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/sg.png" }, // Singapore
            "MY": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/my.png" } // Malaysia
        };

        zipInput.addEventListener("input", function () {
            let zip = zipInput.value.trim();
            let matchedCountry = null;

            // Prioritize specific formats (e.g., PH before US)
            for (const country in zipFormats) {
                if (zipFormats[country].regex.test(zip)) {
                    matchedCountry = country;
                    break;
                }
            }

            if (matchedCountry) {
                inputGroup.classList.add("valid");
                inputGroup.classList.remove("invalid");
                flagIcon.src = zipFormats[matchedCountry].flag;
                flagIcon.style.display = "block";
                zipMessage.textContent = `✔ Valid ZIP Code (${matchedCountry})`;
                zipMessage.style.color = "green";
            } else {
                inputGroup.classList.add("invalid");
                inputGroup.classList.remove("valid");
                flagIcon.style.display = "none";
                zipMessage.textContent = "✖ Invalid ZIP Code";
                zipMessage.style.color = "red";
            }
        });