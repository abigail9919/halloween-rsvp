const serverBaseUrl = "http://localhost:3000"; // Change the base URL to match your server's URL

// Define the submitLogic function in the global scope
async function submitLogic() {
  const guestFirstName = document.getElementById("first-name").value;
  const guestLastName = document.getElementById("last-name").value;
  const guestAmount = parseInt(document.getElementById("guests").value);

  try {
    const response = await fetch(`${serverBaseUrl}/submit-guest`, {
      method: "POST",
      mode: "no-cors", // Set mode to 'no-cors'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: guestFirstName,
        lastName: guestLastName,
        numOfGuests: guestAmount,
      }),
    });

    // Note that you might not be able to access data from 'response' due to CORS restrictions
    console.log("Request sent, but response data may not be accessible due to CORS.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
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

  const submitButton = document.getElementById("submit-button");
  if (submitButton) {
    submitButton.addEventListener("click", submitLogic);
  }
});
