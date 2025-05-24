const toggleIcon = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

toggleIcon.addEventListener("click", () => {
  const isPassword = passwordField.type === "password";
  passwordField.type = isPassword ? "text" : "password";
  toggleIcon.textContent = isPassword ? "🙈" : "👁️";
});

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
      message.style.backgroundColor = "white";
      message.style.color = "green";
      message.style.padding = "30px";
      message.style.textAlign = "center";
      message.style.margin = "20px";
      message.style.border = "1px solid green";
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
      message.style.backgroundColor = "white";
      message.style.color = "red";
      message.style.padding = "30px";
      message.style.textAlign = "center";
      message.style.margin = "20px";
      message.style.border = "1px solid red";

      console.error(data);
    }
  } catch (error) {
    message.textContent = "Network error, please try again later.";
    message.style.backgroundColor = "white";
    message.style.color = "red";
    message.style.padding = "30px";
    message.style.textAlign = "center";
    message.style.margin = "20px";
    message.style.border = "1px solid red";
    console.error("Network error:", error);
  }
});
