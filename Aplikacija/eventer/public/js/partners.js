$('#service').niceSelect('destroy');

const addpartnerButton=document.querySelector('#add-partner');
addpartnerButton.addEventListener('click', (e)=>{
    e.preventDefault();

        const nam=document.querySelector('#name').value;
        const slog=document.querySelector('#slogan').value;
        const website=document.querySelector('#website').value;
        const adr=document.querySelector('#address').value;
        const ema=document.querySelector('#email').value;
        const pho=document.querySelector('#phone').value;
        const serv=document.querySelector('#service').value;
        const work1=document.querySelector('#workhours1').value;
        const work2=document.querySelector('#workhours2').value;
        const des=document.querySelector('#desc').value;
        const not=document.querySelector('#note').value;

        var isValid=true;
        if(nam=="")
        {
            isValid=false;
            document.querySelector('#name').style.borderColor="red";
        }
        else
            document.querySelector('#name').style.borderColor="#e1e1e1";

        if(pho=="")
        {
            isValid=false;
            document.querySelector('#phone').style.borderColor="red";
        }
        else
            document.querySelector('#phone').style.borderColor="#e1e1e1";
        
        if(serv=="0")
        {
            isValid=false;
            document.querySelector('#service').style.borderColor="red";
        }
        else
            document.querySelector('#service').style.borderColor="#e1e1e1";

        
        if(work1=="")
        {
            isValid=false;
            document.querySelector('#workhours1').style.borderColor="red";
        }
        else
            document.querySelector('#workhours1').style.borderColor="#e1e1e1";


        if(work2=="")
        {
            isValid=false;
            document.querySelector('#workhours2').style.borderColor="red";
        }
        else
            document.querySelector('#workhours2').style.borderColor="#e1e1e1";

        if(!isValid)
            return;



        db.collection('partners').add({
            name: nam,
            slogan: slog,
            website: website,
            adress: adr,
            email: ema,
            phone: pho,
            service: serv,
            workhours1: work1,
            workhours2: work2,
            desc: des,
            note: not,
            urlLogo: "",
            numComments : 0,
            rating : 0,
            nrates : 0,
            blocked: false
        });         
        
        db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=>{
            var partners=doc.data().partners+1;
            doc.ref.update({partners: partners});
        });

        $('#form-add-partner').modal('hide');
        document.querySelector('#form-add-partner').reset();

        if(localStorage.lang=="english")
            alert("The partner has been added!");
        else
            alert("Saradnik je dodat!");
});

db.collection('partners').orderBy("rating", "desc").onSnapshot(snapshot => {
    showPartners(snapshot);
});

function showPartners(snapshot)
{
    const list=document.querySelector('.property-list');
    list.innerHTML="";
    if (snapshot.docs.length) {
        let html = '';
        snapshot.docs.forEach(doc => {
            const partner = doc.data();
            
            var style;
            if (partner.blocked==true)
                style=`style="background-color: orangered;"`;
            else
                style=``;    

            var ratString, notRatedString;
            if(localStorage.lang=="english")
            {
                ratString="Rating";
                notRatedString="Not Rated";
            }
            else
            {
                ratString="Ocena";
                notRatedString="Nije ocenjen";
            }
            var rat;
            if(partner.rating!="0")
                rat=parseFloat(partner.rating).toFixed(2);
            else
                rat=notRatedString;
            
            var logo="img/def_partner_logo.jpg";
            if(partner.urlLogo!="")
                logo=partner.urlLogo;

            var service;
            if(partner.service=="Photograph")
                service="Photographer";
            else
                service=partner.service;
            
            var onePartner;

            if(partner.blocked==true && localStorage.ISADMIN=="false")
            onePartner="";
            else
            onePartner=`
            <a href='javascript:;' id="${doc.id}" onclick="partnerID(this.id);">
            <div class="single-property-item">
                <div class="row">
                    <div class="col-md-4">
                        <div class="property-pic">
                            <img src=${logo} alt="">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="property-text">
                            <div class="s-text" `+style+` lang-switch>${service}</div>
                            <h5 class="r-title">${partner.name}</h5>
                            <div class="properties-location"><i class="icon_pin"></i>${partner.adress}</div>
                            <p>${partner.slogan}</p>
                            <p class="properties-location">Email: ${partner.email}</p>
                            <p class="properties-location">${ratString}: ${rat}</p>
                        </div>
                    </div>
                </div>
            </div>
            </a>
            `;

            html += onePartner;
        });
        
        list.innerHTML+=html;
    } 
    resolveAllMLStrings();
}


function partnerID(id)
{
    localStorage.selID=id;
    window.location.href = './partner.html';
};

//SEARCH PARTNERS
document.querySelector('#search-partners').addEventListener('click', (e) => {
    e.preventDefault();
    const typeOfService=document.querySelector('#partner-service').value;
    const partnerName=document.querySelector('#search-name').value;
    var query=db.collection('partners');
    //var query=firebase.database().ref('partners');
    //query=query.orderByChild('name').startAt(partnerName).endAt(partnerName+"\uf8ff").once("value");
    if (typeOfService!="0")
        query=query.where("service", "==", typeOfService);
    if (partnerName!="")
    {
        query=query.where('name', '>=', partnerName).where('name', '<=', partnerName+ '\uf8ff').orderBy("name", "desc");
    }
       
    /*query.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          console.log(childData.name);
        });
    });*/
    
    query.orderBy("rating", "desc").get().then(snapshot => {
        showPartners(snapshot);
    });
});

auth.onAuthStateChanged(user => {
    db.collection('partners').orderBy("rating", "desc").get().then(snapshot => {
        showPartners(snapshot);
    });
});
