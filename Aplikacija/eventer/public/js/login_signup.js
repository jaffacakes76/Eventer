var passwordError;
var emailError;
var usernameError;
//  signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const passwordRepeated = signupForm['confirm-password'].value;

  if(password==passwordRepeated)
  {
    signupForm.querySelector('#confirm-error').innerHTML="";
    passwordError=false;
  }  
  else
  {
    if(localStorage.lang=="english")
      signupForm.querySelector('#confirm-error').innerHTML="*"+"Password must be confirmed";
    else
      signupForm.querySelector('#confirm-error').innerHTML="*"+"Lozinka mora biti potvrđena";

    
    passwordError=true;
  }
  checkUsername();
  checkEmail();
  
  if(passwordError===false && usernameError===false && emailError===false)
  {
      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection('users').doc(cred.user.uid).set({
          username: signupForm['username-field'].value,
          firstName: signupForm['first-name-field'].value,
          lastName: signupForm['last-name-field'].value,
          email : email
        });

        // close the signup modal & reset form
        $('#myModal1').modal('hide');
        signupForm.reset();
        signupForm.querySelector('#email-error').innerHTML="";
        signupForm.querySelector('#password-error').innerHTML="";
        
        db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=>{
          var users=doc.data().users+1;
          doc.ref.update({users: users});
        });
        
      }).catch(err => {
        if(err.message=="Password should be at least 6 characters")
        {
          if(localStorage.lang=="english")
              signupForm.querySelector('#password-error').innerHTML="*"+"Password should be at least 6 characters"; 
          else
              signupForm.querySelector('#password-error').innerHTML="*"+"Lozinka mora sadržati najmanje 6 karaktera"; 
        }
        else
            signupForm.querySelector('#password-error').innerHTML="";


        
        if(err.message=="The email address is already in use by another account.")
        {
          if(localStorage.lang=="english")
              signupForm.querySelector('#email-error').innerHTML="*"+"The email address is already in use by another account"; 
          else
              signupForm.querySelector('#email-error').innerHTML="*"+"Uneta email adresa je zauzeta";  
        }
        else if(err.code=="auth/invalid-email")
        {
          if(localStorage.lang=="english")
              signupForm.querySelector('#email-error').innerHTML="*"+"The email address is not valid"; 
          else
              signupForm.querySelector('#email-error').innerHTML="*"+"Uneta email adresa nije validna";
        }
        else 
              signupForm.querySelector('#email-error').innerHTML="";  


      });
    }
});


// logout 
const logout = document.querySelectorAll('#logout');
logout.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
});

//  login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  //log in the user
  auth.signInWithEmailAndPassword(email,password).then(cred => {
    // close the login modal & reset form
    $('#myModal').modal('hide');
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML="";
  }).catch(err => {


    if(err.message=="The email address is badly formatted.")
    {
      if(localStorage.lang=="english")
          loginForm.querySelector('.error').innerHTML="*"+"The email address is badly formatted"; 
      else
          loginForm.querySelector('.error').innerHTML="*"+"Email adresa je loše formatirana";  
    }


    if(err.message=="There is no user record corresponding to this identifier. The user may have been deleted.")
    {
      if(localStorage.lang=="english")
          loginForm.querySelector('.error').innerHTML="*"+"There is no user record corresponding to this identifier"; 
      else
          loginForm.querySelector('.error').innerHTML="*"+"Ne postoji korisnik sa unetom email adresom";  
    }
   
    if(err.message=="The password is invalid or the user does not have a password.")
    {
      if(localStorage.lang=="english")
          loginForm.querySelector('.error').innerHTML="*"+"The password is invalid"; 
      else
          loginForm.querySelector('.error').innerHTML="*"+"Pogrešna lozinka";  
    }
  
});

});

const createAcc = document.querySelector('#create-acc');
createAcc.onclick = function(){ 
  $('#myModal').modal('hide');
  loginForm.reset();
  document.querySelector('#signup').click();
}

const loginHere = document.querySelector('#login-here');
loginHere.onclick = function(){ 
  $('#myModal1').modal('hide');
  loginForm.reset();
  document.querySelector('#login').click();
}

//funkcija koja je bila u home.js
var username;
var userId;
var firstName;
var lastName;

function setUser(user){
  if(user)
  {
    db.collection('users').doc(user.uid).get().then(doc =>{
      username=doc.data().username;
      userId=user.uid;
      
      localStorage.username=username;
      localStorage.userId=userId;
      user.getIdTokenResult().then(idTokenResult => {
        user.admin = idTokenResult.claims.admin;
        if (user.admin) {
        
        }
        else
        {
          localStorage.firstName=doc.data().firstName;
          localStorage.lastName=doc.data().lastName;
        }
      });
      
    })
    
  }
  else
  {
    username=null;
    userId=null;
    localStorage.username=username;
    localStorage.userId=userId;

    firstName=null;
    lastName=null;
    localStorage.firstName=firstName;
    localStorage.lastName=lastName;
  }
};

function checkUsername()
{
  const name=signupForm['username-field'].value;
  db.collection('users').where("username", "==", name).get().then(snapshot => {
    if (snapshot.docs.length) 
    {
          if(localStorage.lang=="english")
              document.querySelector('#username-error').innerHTML="*"+"Username is already in use"; 
          else
              document.querySelector('#username-error').innerHTML="*"+"Korisničko ime je zauzeto";  

          
          usernameError=true;
    }
    else
    {
          document.querySelector('#username-error').innerHTML="";
          usernameError=false;
    }
  });
}

function checkEmail()
{
  const emailVal=signupForm['signup-email'].value;
  db.collection('users').where("email", "==", emailVal).get().then(snapshot => {
    if (snapshot.docs.length) 
    {

      if(localStorage.lang=="english")
          document.querySelector('#email-error').innerHTML="*"+"The email address is already in use by another account"; 
      else
          document.querySelector('#email-error').innerHTML="*"+"Uneta email adresa je zauzeta";

          emailError=true;   
    }
    else
    {
      document.querySelector('#email-error').innerHTML="";
      emailError=false;
    } 
  });
}
