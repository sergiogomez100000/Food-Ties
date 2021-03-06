const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  
  console.log(email, password);

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to log in");
    }
  }
};



function logToSign (e){
  e.preventDefault();
window.location.href = "/signup"
}

document.querySelector("#signup-btn").addEventListener("click", logToSign);

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);
