// listen for auth status changes
auth.onAuthStateChanged(user => {
  const login = document.querySelectorAll('#login');
  const signup = document.querySelectorAll('#signup');
  const logout = document.querySelectorAll('#logout');
  const userdrop = document.querySelectorAll('#user-dropdown');
  const adminItems = document.querySelectorAll('.admin');
  
  if (user) {

    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      if (user.admin) {
        localStorage.ISADMIN="true";
        localStorage.adminId=user.uid;
        //if(window.location.pathname == "/public/events.html") //za localhost
        if(window.location.pathname == "/events.html") //za deploy
          loadEvents();
        adminItems.forEach(item => item.style.display = 'block');
        document.querySelector('#first-name-div').style.display = 'none';
        document.querySelector('#last-name-div').style.display = 'none';
      }
      else
      {
        localStorage.ISADMIN="false";
        //if(window.location.pathname == "/public/events.html") //za localhost
        if(window.location.pathname == "/events.html") //za deploy
          loadEvents();
        adminItems.forEach(item => item.style.display = 'none');
        document.querySelector('#first-name-div').style.display = 'block';
        document.querySelector('#last-name-div').style.display = 'block';
      }
        
    });

    const dropdownUsername = document.querySelectorAll('#dropdown-username');
    var uName;
    db.collection('users').doc(user.uid).get().then(doc =>{
      uName=doc.data().username;
      dropdownUsername.forEach(element => {
        element.innerHTML=uName;
      });
          
    });
    
    login.forEach(element => {
      element.style.display = "none";
    });
    signup.forEach(element => {
      element.style.display = "none";
    });
    logout.forEach(element => {
      element.style.display = "block";
    });
    userdrop.forEach(element => {
      element.style.display = "block";
    });
  } 
  else 
  {
    localStorage.ISADMIN="false";
    adminItems.forEach(item => item.style.display = 'none');

    login.forEach(element => {
      element.style.display = "block";
    });
    signup.forEach(element => {
      element.style.display = "block";
    });
    logout.forEach(element => {
      element.style.display = "none";
    });
    userdrop.forEach(element => {
      element.style.display = "none";
    });
  }
  setUser(user);
});
