const guest = {
    firstName: String,
    lastName: String,
    numOfGuests: Number
};

const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.parentElement.classList.remove('focused');
    }
  });
});

function submitLogic() {
    halloweenGuest = new guest();
    console.log(formInputs);
    // guest.firstName = formInputs.
}