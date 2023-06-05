function checkPassword(){
    let Password = document.getElementById('password').value;
    let ConfirmPassword = document.getElementById('confirm_password').value;
    let Message = document.getElementById('message');

    if (password.length !=0){
        if (password == confirmPassword) {
            message.textContent = 'password match';
            message.style.backgroundColor = 'blue';
        } else{
            message.textContent = 'password do not match';
            message.style.backgroundColor = 'red';
        }
    } else{
        alert('password can not be empty!!!');
        message.textContent = '';

    }
}