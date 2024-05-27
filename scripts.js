document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    await validateSignupForm();
});

async function validateSignupForm() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorElement = document.getElementById('signupError');

    if (username.length < 3) {
        errorElement.textContent = 'Username must be at least 3 characters long';
        errorElement.style.display = 'block';
    } else if (!validateEmail(email)) {
        errorElement.textContent = 'Invalid email address';
        errorElement.style.display = 'block';
    } else if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters long';
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
            alert('Signup successful');
            window.location.href = 'login.html';
        } catch (error) {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
