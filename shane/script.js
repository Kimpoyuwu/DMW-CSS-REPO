function toggleRadio(isOn) {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleSwitch2 = document.getElementById('toggleSwitch2');
    const toggleText = document.getElementById('toggleText');
    const toggleText2 = document.getElementById('toggleText2');

    if (isOn) {
      toggleSwitch.classList.add('on');
      toggleText.textContent = 'ON';
      toggleSwitch2.classList.add('on');
      toggleText2.textContent = 'ON';
    } else {
      toggleSwitch.classList.remove('on');
      toggleText.textContent = 'OFF';
      toggleSwitch2.classList.remove('on');
      toggleText2.textContent = 'OFF';
    }
  }
  document.getElementById('toggleSwitch').addEventListener('click', function() {
    const radioOff = document.getElementById('radioOff');
    const radioOn = document.getElementById('radioOn');

    if (radioOff.checked) {
      radioOn.checked = true;
      toggleRadio(true);
    } else {
      radioOff.checked = true;
      toggleRadio(false);
    }
  });

  document.getElementById('toggleSwitch2').addEventListener('click', function() {
    const radioOff = document.getElementById('radioOff2');
    const radioOn = document.getElementById('radioOn2');

    if (radioOff.checked) {
      radioOn.checked = true;
      toggleRadio(true);
    } else {
      radioOff.checked = true;
      toggleRadio(false);
    }
  });
