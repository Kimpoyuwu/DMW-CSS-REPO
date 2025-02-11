document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("formModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");
    const form = document.querySelector(".form");
    const toast = document.getElementById("toast");

    modal.style.display = "none";

    openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
        form.addEventListener("submit", function (event) {
            const firstName = document.getElementById("first_name").value.trim();
            const lastName = document.getElementById("last_name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Please fill in all required fields.");
                event.preventDefault();
                return;
            }

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
         
            
    
            showToast("Your form has been submitted!");
            event.preventDefault();
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
    
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    
        function showToast(message) {
            const toast = document.getElementById("toast"); // Ensure you have an element with this ID
            toast.textContent = message;
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }
    
        document.getElementById("numberInput").addEventListener("input", function () {
            this.value = this.value.slice(0, 11);
        });

        const textarea = document.getElementById("message");
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
    
    document.addEventListener("keydown", function (event) {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
            event.preventDefault(); 
        }
    });
    document.getElementById("checkbox").addEventListener("change", function() {
        const passwordField = document.getElementById("password");
        passwordField.type = this.checked ? "text" : "password";
    });