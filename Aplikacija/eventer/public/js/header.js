document.querySelectorAll('#myEvents').forEach(element=>{element.addEventListener('click', function(){
    localStorage.redirectEvents="My Events";
    window.location.href="./events.html";
});
});
document.querySelectorAll('#inbox').forEach(element=>{element.addEventListener('click', function(){
    localStorage.redirect="Inbox";
    window.location.href="./requests.html";
});
});
document.querySelectorAll('#sent').forEach(element=>{element.addEventListener('click', function(){
    localStorage.redirect="Sent";
    window.location.href="./requests.html";
});
});


db.collection('agencyInfo').onSnapshot(snapshot => {
    if (snapshot.docs.length) {
        snapshot.docs.forEach(doc => {
            const info = doc.data();
  
            const phone=document.querySelectorAll('.phone-field');
            phone.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.phone;
            });
  
            const address=document.querySelectorAll('.address-field');
            address.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.address;
            });
  
            const email=document.querySelectorAll('.email-field');
            email.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.email;
            });
        });
    }
  });


const myProfile = document.querySelectorAll('#my-profile');
myProfile.forEach(element=>{element.onclick = function(){ 
        db.collection('users').doc(localStorage.userId).get().then(doc=> {

                document.querySelector('#first-name').value=doc.data().firstName;
                document.querySelector('#last-name').value=doc.data().lastName;
                document.querySelector('#profile-email').value=doc.data().email;
                document.querySelector('#profile-email').disabled=true;
                document.querySelector('#profile-username').value=doc.data().username;
                
            
        });
}});

var usernameEditError;
function editUserInfo()
{
    var isValid=true;
    usernameEditError=false;

    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    //const email = document.querySelector('#profile-email').value;
    const usernameEdit = document.querySelector('#profile-username').value;

    if(firstName=="")
   {
       isValid=false;
       document.querySelector('#first-name').style.borderColor="red";
   }
   else
        document.querySelector('#first-name').style.borderColor="#e1e1e1";

    if(lastName=="")
   {
       isValid=false;
       document.querySelector('#last-name').style.borderColor="red";
   }
   else
        document.querySelector('#last-name').style.borderColor="#e1e1e1";


    /*if(email=="")
    {
         isValid=false;
        document.querySelector('#profile-email').style.borderColor="red";
    }
    else
         document.querySelector('#profile-email').style.borderColor="#e1e1e1";*/

    if(usernameEdit=="")
    {
        isValid=false;
        document.querySelector('#profile-username').style.borderColor="red";
    }
    else
        document.querySelector('#profile-username').style.borderColor="#e1e1e1";

    if(isValid==false)
        return;

    if(usernameEdit!=username)
    {
        db.collection('users').where("username", "==", usernameEdit).get().then(snapshot => {
            if (snapshot.docs.length) 
            {
                if(localStorage.lang=="english")
                    document.querySelector('#username-edit-error').innerHTML="*"+"Username is already in use";
                else
                    document.querySelector('#username-edit-error').innerHTML="*"+"Korisničko ime je zauzeto";
        
        
                  document.querySelector('#profile-username').style.borderColor="red";
                  usernameEditError=true;
            }
            else
            {
                  document.querySelector('#username-edit-error').innerHTML="";
                  document.querySelector('#profile-username').style.borderColor="#e1e1e1";
                  usernameEditError=false;

                  if(localStorage.ISADMIN=="false")
                        db.collection('users').doc(localStorage.userId).update({
                            firstName: firstName,
                            lastName: lastName,
                            //email: email,
                            username: usernameEdit,
                        });
                else
                    db.collection('users').doc(localStorage.userId).update({
                    //email: email,
                    username: usernameEdit,
                    });
            
                $('#profilemodal').modal('hide');
                document.querySelector('#profile-edit').reset();

                if(localStorage.lang=="english")
                    alert("Profile info has been modified!");
                else
                    alert("Profilni podaci su izmenjeni!");
                    }
                });
                const dropdownUsername = document.querySelectorAll('#dropdown-username');
                dropdownUsername.forEach(element => {
                    element.innerHTML=usernameEdit;
                });

    }
    else
    {
        document.querySelector('#username-edit-error').innerHTML="";
        document.querySelector('#profile-username').style.borderColor="#e1e1e1";
        usernameEditError=false;

        if(localStorage.ISADMIN=="false")
            db.collection('users').doc(localStorage.userId).update({
                firstName: firstName,
                lastName: lastName,
                //email: email,
                username: usernameEdit,
            });
        else
            db.collection('users').doc(localStorage.userId).update({
            //email: email,
            username: usernameEdit,
            });
            
        $('#profilemodal').modal('hide');
        document.querySelector('#profile-edit').reset();

        if(localStorage.lang=="english")
            alert("Profile info has been modified!");
        else
            alert("Profilni podaci su izmenjeni!");
        const dropdownUsername = document.querySelectorAll('#dropdown-username');
        dropdownUsername.forEach(element => {
            element.innerHTML=usernameEdit;
          });

    }

    
};


function goToEvents()
{
    localStorage.redirectEvents="All Events";
    window.location.href="./events.html";
}