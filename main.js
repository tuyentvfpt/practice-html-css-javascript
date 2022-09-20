const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const enterpasswordEl = document.querySelector("#enter-password");
const emailEl = document.querySelector("#email");

const form = document.querySelector("#signup");

const checkUsername = () =>{
    let valid = false;

    const min = 3,
    max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username))  {
        showError(usernameEl, 'Username cannot be blank.');
      } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, 'Username must be between ${min} and ${max} character.');
      } else {
        showSuccess(usernameEl);
        valid = true;
      }
      return valid;
};
const checkPassword = () => {
    let valid = false;
  
    const password = passwordEl.value.trim();
  
    if (!isRequired(password)) {
      showError(passwordEl, 'Password cannot be blank');
    } else if (!isPasswordSecure(password)) {
      showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase' + 
      'character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else  {
      showSuccess (passwordEl);
      valid =  true;
    }
  
    return valid;
  };
  
  const checkenterpassword = () => {
    let valid = false;
    //check confirm password
    const enterpassword = enterpasswordEl.value.trim();
    const password = passwordEl.value.trim();
  
    if (!isRequired(enterpassword)) {
      showError(enterpasswordEl, 'Please enter the password again');
    } else if (password !== enterpassword) {
      showError(enterpasswordEl, 'The password does not match');
    } else {
      showSuccess(enterpasswordEl);
      valid = true;
    }
  
    return valid;
  };

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
      showError(emailEl, 'Email is not valid.');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };


const isEmailValid = (email) => {
    //regular expresstion (check email)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  
  const isPasswordSecure = (password) => {
    //regular expresstion (check password)
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
  };
  
  const isRequired = value => value === '' ? false : true;
  const isBetween = (length, min, max) => length <min || length > max ? false : true;
  
  const showError = (input,message) => {
    //get the form-field element
    const formField = input.parentElement;
    //add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
    
    //show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
  };
  const showSuccess = (input) => {
    //get the form-field element
    const formField = input.parentElement;
  
    //remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');
  
    //hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
  };
  
  form.addEventListener('submit', function(e) {
    //prevent the form from submitting
    e.preventDefault();
  
    //validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
      isenterpasswordValid = checkenterpassword();

      let isFormValid = isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isenterpasswordValid;
  //submit to the server if the form is valid
  if (isFormValid) {

  }
});

const debounce = (fn, delay = 1) => {
    let timeoutId;
    return (...args) => {
      //cancle the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      //setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args)
      }, delay);
    };
  };


form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
      case 'username':
        checkUsername();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
      case 'confirm-password':
        checkenterpassword();
        break;
    }
  }));