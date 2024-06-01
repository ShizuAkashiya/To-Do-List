document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const storedPassword = localStorage.getItem('user_' + username);
    if (storedPassword && storedPassword === password) {
      alert('Login successful!');
      localStorage.setItem('currentUser', username);
      window.location.href = 'index.html';
    } else {
      alert('Invalid username or password.');
    }
  });