//SignUp
const signUp = document.querySelector("#signup");
signUp.addEventListener('submit', (e) => {
  e.preventDefault();

  //Getting User Info
  const email =  signUp['email'].value;
  const password =  signUp['password'].value;

  console.log(email, password);

})