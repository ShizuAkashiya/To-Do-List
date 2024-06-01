document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username && password) {
      localStorage.setItem('user_' + username, password);
      alert('Registration successful!');
      window.location.href = 'login.html';
    } else {
      alert('Please fill in all fields.');
    }
  });