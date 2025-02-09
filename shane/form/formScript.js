function selectGender() {
    let selected = document.querySelector('input[name="gender"]:checked required').value;
    document.getElementById("selectedGender").textContent = "Selected Gender: " + selected;
}


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("successModal");
    const form = document.querySelector("form");


    function showModal(event) {
        event.preventDefault();
        if (validateForm()) {
            modal.style.display = "flex";
        }
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll("input[required], select[required], textarea[required]");

        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                isValid = false;
                input.style.border = "2px solid red";
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        return isValid;
    }

    function submitModal() {
        form.reset();
        modal.style.display = "none";
    }

    document.getElementById("submitButton").addEventListener("click", showModal);
    document.querySelector(".close-btn").addEventListener("click", closeModal);
    document.querySelector(".successModal").addEventListener("click", submitModal);
});


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