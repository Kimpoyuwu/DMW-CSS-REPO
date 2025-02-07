document.addEventListener("DOMContentLoaded", function () {
    const toggleWrapper = document.getElementById("toggle-wrapper");
    const toggleOn = document.getElementById("toggle-on");
    const toggleOff = document.getElementById("toggle-off");

    toggleWrapper.addEventListener("click", function () {
        if (toggleOn.checked) {
            toggleOff.checked = true;
            console.log("Switched to Off");
        } else {
            toggleOn.checked = true;
            console.log("Switched to On");
        }
    });
});
