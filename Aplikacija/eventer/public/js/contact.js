function setEmail(user){
    emailField=document.querySelector('#email-contact-us');
    nameField=document.querySelector('#name-contact-us');
    if(user)
    {
            db.collection('users').doc(user.uid).get().then(doc =>{

                emailField.value=user.email;
                if(localStorage.ISADMIN=="false")
                    nameField.value=doc.data().firstName+" "+doc.data().lastName;
                else
                    nameField.value=doc.data().username;
                
              });
    }
        
    else
    {
        emailField.value="";
        nameField.value="";
    }
        
};

auth.onAuthStateChanged(user => {
    setEmail(user);
});



//MAPA
var map=L.map('mapid').setView([43.32472,21.90333],15);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=6uPva9hzN3d9dvmqHd5B', {
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

L.marker([43.32472, 21.90333]).addTo(map)
    //.bindPopup('Hey!<br> We are here.')
    .openPopup();





