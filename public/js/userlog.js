let userSignInForm = document.querySelector('.user-signin-form');
let userRegisterForm = document.querySelector('.user-register-form');

userSignInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById('user-signin-email').value;
    let password = document.getElementById('user-signin-password').value;

    fetch('http://localhost:5000/users/login', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email, password})
    }).then((res) =>{
        if(res.status === 400){
            throw new Error();
        }
     return res.json();
    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(() => alert('Wrong Email or Password'));
   
})


userRegisterForm.addEventListener('submit', function(e){
    e.preventDefault();
    let name = document.getElementById('user-register-name').value;
    let email = document.getElementById('user-register-email').value;
    let password = document.getElementById('user-register-password').value;
    let userConfirmPassword = document.getElementById('user-register-confirm-password').value;

    if(password !== userConfirmPassword){
        return;
    }
    
    fetch('http://localhost:5000/users/register', {
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email, password,name})
    }).then((res) => res.text()).then((data) => alert(data));
})