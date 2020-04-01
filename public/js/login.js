let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');


signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;

    fetch('http://localhost:5000/admins/login', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email, password})
    }).then((res) => {
        if(res.status === 400){
            throw new Error;
        }
        return res.json();
    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(() => alert('Wrong Username Or Password'));
})


registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let confirmPassword = document.getElementById('register-confirm-password').value;

    if(password !== confirmPassword){
        return;
    }
    
    fetch('http://localhost:5000/admins/register', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email, password})
    }).then((res) => res.text()).then((data) => alert(data));
})