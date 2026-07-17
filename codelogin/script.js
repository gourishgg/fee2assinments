// login UI script for fee 2/codelogin/login.html
// Provides show/hide password and a basic login interaction.

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const showIcon = document.querySelector('.showicon');
    const loginButton = document.querySelector('button');
    const forgotLink = document.querySelector('.forgot');

    if (!usernameInput || !passwordInput || !showIcon || !loginButton || !forgotLink) {
        console.warn('Login script: expected DOM elements not found.');
        return;
    }

    showIcon.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        showIcon.classList.toggle('password-visible', isPassword);
    });

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // This is a demo login flow. Replace with real authentication as needed.
        alert(`Welcome back, ${username}!`);
        usernameInput.value = '';
        passwordInput.value = '';
        passwordInput.type = 'password';
        showIcon.classList.remove('password-visible');
    });

    forgotLink.addEventListener('click', () => {
        alert('If you forgot your password, please contact support or reset it from your account page.');
    });
});
