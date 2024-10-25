document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Clear previous error messages
        emailError.textContent = '';
        passwordError.textContent = '';

        // Email validation
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        }

        // Password validation
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
