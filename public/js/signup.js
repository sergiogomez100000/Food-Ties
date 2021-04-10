$("#signup").on("submit", function (e) {
  e.preventDefault();
  const name = $("#name").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();

  if (!name) {
    alert("Please provide a name for the user");
    return;
  }

  if (!email) {
    alert("Please provide a email for the user");
    return;
  }

  if (!password) {
    alert("Please provide a password for the user");
    return;
  }

  const user = {
    name,
    email,
    password,
  };

  fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(function (user) {
      window.location.reload();
    })
    .catch(function (err) {});
});
