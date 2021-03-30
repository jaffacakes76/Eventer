var loaded=false;
var imgcnt="";
var imgs="";

$('#service').niceSelect('destroy');

var init=false;
function loadPartnerData() {
    db.collection('partners').doc(localStorage.selID).get().then(doc=>{
    
        const data=doc.data();
        
        const breadcrumb=document.querySelector('#breadcrumb');
        const bchtml=`
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb-text">
                            <h2>${data.name}</h2>
                            <div class="breadcrumb-option">
                                <span>${data.slogan}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        breadcrumb.innerHTML=bchtml;

        var servicestring,descstring,notestring,calestring, ratingstring, workinghoursstring, addressstring, phonestring, typestring, websitestring, notRated;
        if (localStorage.lang=="english")
        {
            servicestring=data.service;
            descstring="Description";
            overvstring="Overview";
            notestring="Note";
            calestring="Calendar";
            ratingstring="Rating";
            workinghoursstring="Working hours";
            addressstring="Address";
            phonestring="Phone";
            typestring="Type of service";
            websitestring="Website";
            notRated="Not Rated";
        }
        else
        {
            switch (data.service) {
                case "Space":
                    servicestring="Prostor";
                    break;
                case "Music":
                    servicestring="Muzika";
                    break;
                case "Catering":
                    servicestring="Ketering";
                    break;
                case "Photograph":
                    servicestring="Fotograf";
                    break;
                default:
                    break;
            }
            descstring="Opis";
            overvstring="Pregled";
            notestring="Napomena";
            calestring="Kalendar";
            ratingstring="Ocena";
            workinghoursstring="Radno vreme";
            addressstring="Adresa";
            phonestring="Telefon";
            typestring="Tip usluge";
            websitestring="Sajt";
            notRated = "Nije ocenjen";
        };
        var rat;
        if(data.rating!="0")
            rat=parseFloat(data.rating).toFixed(2);
        else
            rat=notRated;
            
        const content=document.querySelector('#content');
        const html=`
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators" id="imgcnt">`+
                imgcnt+`
            </ol>
            <div class="carousel-inner" id="imgs">`+
                imgs+`                
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        
        <div class="row" style="height: 40px;"></div>

        <div class="pd-desc">
            <h4>${descstring}</h4>
            <p>${data.desc}</p>
            <br>
            <br>

            <table class="table table-striped">
            <tbody>
            <tr>
              <th scope="row">${typestring}:</th>
              <td lang-switch>${servicestring}</td>
            </tr>
            <tr>
              <th scope="row">${addressstring}:</th>
              <td>${data.adress}</td>
            </tr>
            <tr>
              <th scope="row">${phonestring}:</th>
              <td>${data.phone}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>${data.email}</td>
            </tr>
            <tr>
                <th scope="row">${websitestring}:</th>
                <td>${data.website}</td>
            </tr>
            <tr>
                <th scope="row">${workinghoursstring}:</th>
                <td>${data.workhours1} - ${data.workhours2}</td>
            </tr>
            <tr>
                <th scope="row">${ratingstring}:</th>
                <td>${rat}</td>
            </tr>
            </tbody>
            </table>
        </div>

        <div class="pd-details-tab admin">
            <div class="tab-item">
                <ul class="nav" role="tablist">
                    <li class="admin" style="display: none;">
                        <a class="active" data-toggle="tab" aria-selected="true" href="#tab-1" role="tab">${notestring}</a>
                    </li>
                    <li class="admin" style="display: none;">
                        <a data-toggle="tab" href="#tab-2" role="tab">${calestring}</a>
                    </li>
                </ul>
            </div>
            <div class="tab-item-content">
                <div class="tab-content">
                    <div class="tab-pane fade active show" id="tab-1" role="tabpanel">
                        <div class="pd-table-desc">
                            <p>${data.note}</p>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="tab-2" role="tabpanel">
    
                        <iframe src="calendar.html" style="border: none; height: 100%; width: 100%; min-height: 630px;"></iframe>
                            
                    </div>
                </div>
            </div>
        </div>     
        `;

        content.innerHTML=html;
        loaded=true; 
        localStorage.imgsAdded=false;

        auth.onAuthStateChanged(user => {

            const adminItems = document.querySelectorAll('.admin');
            
            if (user) {
          
              user.getIdTokenResult().then(idTokenResult => {
                user.admin = idTokenResult.claims.admin;
                if (user.admin) {
                  adminItems.forEach(item => item.style.display = 'block');
                }
                else
                adminItems.forEach(item => item.style.display = 'none');
              });
            } 
            else 
            {
              adminItems.forEach(item => item.style.display = 'none');
            }
        });
    });

    //MAPA
    if (!init)
    {
        init=true;
        var map=L.map('partner-mapid').setView([43.32472,21.90333],15);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=6uPva9hzN3d9dvmqHd5B', {
        attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }).addTo(map);

        L.marker([43.32472, 21.90333]).addTo(map)
            //.bindPopup('Hey!<br> We are here.')
            .openPopup();
    };
};


db.collection('partners/'+localStorage.selID+'/images/').onSnapshot(snapshot => {
    if (snapshot.docs.length) {
        
        snapshot.docs.forEach(doc => {
            imgcnt=`<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;
            imgs=``;
        
            for(var i=1;i<snapshot.docs.length;i++)
            {
                imgcnt=imgcnt+`<li data-target="#carouselExampleIndicators" data-slide-to="+i+"></li>`;
            };

            var flag=0;
            snapshot.forEach(elem=>{
                if (flag==0)
                {
                    imgs=imgs+`<div class="carousel-item active">
                    <img class="d-block w-100" src="${elem.data().url}" alt="">
                    </div>`;
                    flag=1;
                }
                else
                imgs=imgs+`<div class="carousel-item">
                    <img class="d-block w-100" src="${elem.data().url}" alt="">
                    </div>`;
            });
        });

        if(loaded==true && localStorage.imgsAdded==true)
        {
            var imgcntEl=document.querySelector('#imgcnt');
            imgcntEl.innerHTML=imgcnt;
            var imgsEl=document.querySelector('#imgs');
            imgsEl.innerHTML=imgs;
        }
    } 
});


function fillEditPartnerForm()
{
  if (localStorage.isadmin)
  {
    
    db.collection('partners').doc(localStorage.selID).get().then(doc=>{
        
      const partner=doc.data();
      
      document.querySelector('#name').value=partner.name;
      document.querySelector('#slogan').value=partner.slogan;
      document.querySelector('#website').value=partner.website;
      document.querySelector('#address').value=partner.adress;
      document.querySelector('#email').value=partner.email;
      document.querySelector('#phone').value=partner.phone;
      document.querySelector('#service').value=partner.service;
      document.querySelector('#workhours1').value=partner.workhours1;
      document.querySelector('#workhours2').value=partner.workhours2;
      document.querySelector('#desc').value=partner.desc;
      document.querySelector('#note').value=partner.note;
    });

      $('#testmodal').modal('show');
    }
}

function editPartner()
{
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


            
    db.collection('partners').doc(localStorage.selID).update({
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
        note: not
    }); 

    $('#testmodal').modal('hide');

    if(localStorage.lang=="english")
        alert("The partner has been modified.");
    else
        alert("Podaci o saradniku su izmenjeni.");

    

    loadPartnerData();
}

function blockPartner()
{
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

    db.collection('partners').doc(localStorage.selID).update({
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
        blocked: true
    }); 

    $('#testmodal').modal('hide');

    if(localStorage.lang=="english")
        alert("The partner has been blocked.");
    else
        alert("Saradnik je blokiran.");

    

    loadPartnerData();
}

function unblockPartner()
{
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

    db.collection('partners').doc(localStorage.selID).update({
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
        blocked: false
    }); 

    $('#testmodal').modal('hide');


    if(localStorage.lang=="english")
        alert("The partner has been unblocked.");
    else
        alert("Saradnik je odblokiran.");

   

    loadPartnerData();
}
