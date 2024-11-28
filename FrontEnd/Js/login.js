document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and redirect user
        if(data.role==="ROLE_USER"){
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
          window.location.href = '/Pages/landing_page.html';
        }
        else{
        localStorage.setItem('token', data.token);
        localStorage.setItem('organizerId', data.userId);
          window.location.href = '/Organizer/Pages/landing_page.html';
        }
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed!');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again later.');
    }
  });

  document.getElementById('register-role').addEventListener('change', function () {
    const organizerFields = document.getElementById('organizer-fields');
    if (this.value === 'ORGANIZER') {
      organizerFields.style.display = 'block'; // Show additional fields
    } else {
      organizerFields.style.display = 'none'; // Hide additional fields
    }
  });
  document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const role = "ROLE_"+document.getElementById('register-role').value;
    if(role==="ROLE_USER"){
      try {
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, role, phoneNumber }),
        });
  
        if (response.ok) {
          alert('Signup successful! Please login to continue.');
        } else {
          const error = await response.json();
          alert(error.message || 'Signup failed!');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    }
    

    else {
      // Handle Organizer Signup
      const description = document.getElementById('description').value;
      const dpUrl = document.getElementById('dp-url').value;
  
      try {
        const response = await fetch('http://localhost:8080/auth/organizersignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, phoneNumber, description, dpUrl }),
        });
  
        if (response.ok) {
          alert('Signup successful! Please login to continue.');
        } else {
          const error = await response.json();
          alert(error.message || 'Signup failed!');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    }
  });