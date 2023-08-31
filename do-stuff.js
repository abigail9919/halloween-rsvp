const formInputs = document.querySelectorAll(".form-control");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.parentElement.classList.remove("focused");
    }
  });
});

async function submitLogic() {
  const guestFirstName = document.getElementById("first-name").value;
  const guestLastName = document.getElementById("last-name").value;
  const guestAmount = parseInt(document.getElementById("guests").value);

  try {
    const response = await fetch("/submit-guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: guestFirstName,
        lastName: guestLastName,
        numOfGuests: guestAmount,
      }),
    });

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Error:", error);
  }
}