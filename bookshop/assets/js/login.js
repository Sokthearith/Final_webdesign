/* --- LOGIN.JS --- */

let isLoginMode = true;

function togglePassword() {
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
    }
}

function toggleMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('form-title');
    const nameGroup = document.getElementById('name-group');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');

    if (isLoginMode) {
        title.innerText = "Welcome Back";
        nameGroup.style.display = "none";
        submitBtn.innerText = "Login";
        toggleBtn.innerText = "Don't have an account? Sign up";
    } else {
        title.innerText = "Create Account";
        nameGroup.style.display = "block";
        submitBtn.innerText = "Sign Up";
        toggleBtn.innerText = "Already have an account? Login";
    }
}

document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const emailInputEl = document.getElementById('email-input');
    const emailInput = emailInputEl ? emailInputEl.value : '';
    const nameInput = document.getElementById('name-input');
    const name = nameInput ? nameInput.value : '';
    
    // Mock Authentication
    const user = {
        name: isLoginMode ? (name || emailInput.split('@')[0]) : (name || emailInput.split('@')[0] || "New User"),
        email: emailInput
    };

    localStorage.setItem('bookshop_user', JSON.stringify(user));
    
    // Get return URL (don't clear pending book ID here - let shared.js handle it)
    const returnUrl = localStorage.getItem('bookshop_return_url') || 'index.html';
    
    // Clear return URL only (keep pending book ID for shared.js to process)
    localStorage.removeItem('bookshop_return_url');
    
    // Redirect back to the page they came from
    window.location.href = returnUrl;
});