const toggleIcon = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

toggleIcon.addEventListener('click', () => {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    toggleIcon.textContent = isPassword ? '🙈' : '👁️';
});


// const url = " http://127.0.0.1:5000/countries"

// async function getData() {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "content-Type": "application/json",
//             "Authorization": " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzQ4Nzg3Mjg4fQ.KQwVDiHDtjSREyjIFrlCzM1MzEo_x9DGa1EAKSoWODY"
//         },
//         body: JSON.stringify({'query': "nigeria"})
//     });
//     const data = await response.json();
//     console.log(data)
// }
// getData()