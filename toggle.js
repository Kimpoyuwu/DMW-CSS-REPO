document.addEventListener("DOMContentLoaded", function () {
    const toggleOn = document.getElementById("toggle-on");
    const toggleOff = document.getElementById("toggle-off");

    toggleOn.addEventListener("change", function () {
        if (toggleOn.checked) {
            console.log("Switched to On");
        }
    });

    toggleOff.addEventListener("change", function () {
        if (toggleOff.checked) {
            console.log("Switched to Off");
        }
    });
});
