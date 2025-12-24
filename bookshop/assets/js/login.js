/* --- LOGIN.JS --- */

let isLoginMode = true;

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
    
    // Mock Authentication
    const nameInput = document.getElementById('name-input').value;
    const user = {
        name: isLoginMode ? "Demo User" : (nameInput || "New User"),
        email: "user@example.com"
    };

    localStorage.setItem('bookshop_user', JSON.stringify(user));
    
    // Redirect to home or previous page
    window.location.href = 'index.html';
});