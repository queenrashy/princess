const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = "Created Account Successfully";
      console.log(data);

      //  Save token if it's returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.is_admin) {
        window.location.href = "/admin_page.html";
      } else {
        window.location.href = "/index.html";
      }
    } else {
      message.textContent = data.error || "Process failed";
      console.error(data);
    }
  } catch (error) {
    message.textContent = "Network error, please try again later.";
    console.error("Network error:", error);
  }
});
