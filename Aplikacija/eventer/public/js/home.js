// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
    });
});


document.addEventListener('onload',loadTopEvents());

function loadTopEvents()
{
  db.collection('events').orderBy("ratingtotal", "desc").limit(5).onSnapshot(snapshot => {
    showTopEvents(snapshot);
  });
}

function showTopEvents(snapshot)
{
  const topEv=document.querySelector('#top-events');
  topEv.innerHTML="";
  if (snapshot.docs.length) {
    let html = '';
    snapshot.docs.forEach(doc => {
        const event = doc.data();
        oneEvent=genTopEventsHtml(doc.id,event.eventtype, event.startdate, event.starttime, event.enddate, event.endtime, event.guestnum, event.impressions, event.ratingtotal);
        html += oneEvent; 
    });
    
    topEv.innerHTML=html;
  }
}

function genTopEventsHtml(id, eventtype, startdate, starttime, enddate, endtime, guestnum, impressions, ratingtotal)
{
    if (ratingtotal!=0)
    {
        if (localStorage.lang=="english")
            return `
            <a href='javascript:;' id="${id}" onclick="topEventID(this.id);">
            <div class="single-top-properties" style="margin-top: 30px; "margin-bottom: 30px;">
                <div class="row">
                    <div class="stp-pic">
                        <img src="./img/def_partner_logo.jpg" alt=""></img>
                    </div>
                    <div class="col-lg-6">
                        <div class="stp-text">
                            <div class="s-text">${eventtype}</div>
                            <h2> </h2>
                            <h4>Start Date & Time: ${startdate}, ${starttime}</h2>
                            <h4>End Date & Time: ${enddate}, ${endtime}</h2>
                            </br>
                            <div>
                                <span style="display: inline-block; color:black;">Number of Guests:</span>
                                <h5 style="display: inline-block;">${guestnum}</h4>
                            </div>
                            <p>${impressions}</p>
                            <div class="room-price">
                                <span>Event Rating: </span>
                                <h4>${ratingtotal}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>`
            ;
        else
        {
            switch (eventtype) {
                case "Birthday":
                    eventtype="Rođendan";
                  break;
                case "Wedding":
                    eventtype="Venčanje";
                  break;
                case "Conference":
                    eventtype="Konferencija";
                  break;
                case "New Year":
                    eventtype="Nova Godina";
                  break;
                default:
                    eventtype="Drugo";
                  break;
            };

            return `
            <a href='javascript:;' id="${id}" onclick="topEventID(this.id);">
            <div class="single-top-properties" style="margin-top: 30px; "margin-bottom: 30px;">
                <div class="row">
                    <div class="stp-pic">
                        <img src="./img/def_partner_logo.jpg" alt=""></img>
                    </div>
                    <div class="col-lg-6">
                        <div class="stp-text">
                            <div class="s-text">${eventtype}</div>
                            <h2> </h2>
                            <h4>Datum i Vreme Početka: ${startdate}, ${starttime}</h2>
                            <h4>Datum i vreme Kraja: ${enddate}, ${endtime}</h2>
                            </br>
                            <div>
                                <span style="display: inline-block; color:black;">Broj Gostiju:</span>
                                <h5 style="display: inline-block;">${guestnum}</h4>
                            </div>
                            <p>${impressions}</p>
                            <div class="room-price">
                                <span>Ocena Događaja: </span>
                                <h4>${ratingtotal}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </a>`;

        };
    }
    else
        return ``;
}


function topEventID(id)
{
    localStorage.selTopEv=id;
    db.collection('events').doc(id).get().then(doc=>{
        const ev=doc.data();

        db.collection('partners').doc(ev.space).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#space4').innerHTML=doc.data().name;
                document.querySelector('#spaceTop').disabled=false;
                document.querySelector('#spaceTop').style.display="block";
            }
            else
            {
                document.querySelector('#space4').innerHTML="";
                document.querySelector('#spaceTop').disabled=true;
                document.querySelector('#spaceTop').style.display="none";
            }
        });

        db.collection('partners').doc(ev.band).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#band4').innerHTML=doc.data().name;
                document.querySelector('#musicTop').disabled=false;
                document.querySelector('#musicTop').style.display="block";
            }
            else
            {
                document.querySelector('#band4').innerHTML="";
                document.querySelector('#musicTop').disabled=true;
                document.querySelector('#musicTop').style.display="none";
            }
        });

        db.collection('partners').doc(ev.catering).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#catering4').innerHTML=doc.data().name;
                document.querySelector('#cateringTop').disabled=false;
                document.querySelector('#cateringTop').style.display="block";
            }
            else
            {
                document.querySelector('#catering4').innerHTML="";
                document.querySelector('#cateringTop').disabled=true;
                document.querySelector('#cateringTop').style.display="none";
            }
        });

        db.collection('partners').doc(ev.photograph).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#photographer4').innerHTML=doc.data().name;
                document.querySelector('#photographerTop').disabled=false;
                document.querySelector('#photographerTop').style.display="block";
            }
            else
            {
                document.querySelector('#photographer4').innerHTML="";
                document.querySelector('#photographerTop').disabled=true;
                document.querySelector('#photographerTop').style.display="none";
            }
        });
           
        if (localStorage.lang=="english")
            document.querySelector('#eventtype4').innerHTML=ev.eventtype;
        else
        { 
            switch (ev.eventtype) {
            case "Birthday":
                document.querySelector('#eventtype4').innerHTML="Rođendan";
                break;
            case "Wedding":
                document.querySelector('#eventtype4').innerHTML="Venčanje";
                break;
            case "Conference":
                document.querySelector('#eventtype4').innerHTML="Konferencija";
                break;
            case "New Year":
                document.querySelector('#eventtype3').innerHTML="Nova Godina";
                break;
            default:
                document.querySelector('#eventtype4').innerHTML="Drugo";
                break;
            };
        };

        document.querySelector('#startdate4').innerHTML=ev.startdate;
        document.querySelector('#starttime4').innerHTML=ev.starttime + "h";
        document.querySelector('#enddate4').innerHTML=ev.enddate;
        document.querySelector('#endtime4').innerHTML=ev.endtime + "h";
        document.querySelector('#guestnum4').innerHTML=ev.guestnum;
        document.querySelector('#impressions').innerHTML=ev.impressions;

        var rat,erat;
        if (localStorage.lang=="english")
        {
            rat="Rating: ";
            erat="Event Rating: ";
        }
        else
        {
            rat="Ocena: ";
            erat="Ocena Događaja: "
        };

        const rate="Not Rated";
        if(ev.rating!="0")
            document.querySelector('#prating').innerHTML=erat+ev.rating;
        else
            document.querySelector('#prating').innerHTML=erat+rate;
        
        if(ev.ratingspace!="0")
            document.querySelector('#pratingspace').innerHTML=rat+ev.ratingspace;
        else
            document.querySelector('#pratingspace').innerHTML=rat+rate;

        if(ev.ratingband!="0")
            document.querySelector('#pratingband').innerHTML=rat+ev.ratingband;
        else
            document.querySelector('#pratingband').innerHTML=rat+rate;

        if(ev.ratingcatering!="0")
            document.querySelector('#pratingcatering').innerHTML=rat+ev.ratingcatering;
        else
            document.querySelector('#pratingcatering').innerHTML=rat+rate;

        if(ev.ratingphotograph!="0")
            document.querySelector('#pratingphotograph').innerHTML=rat+ev.ratingphotograph;
        else
            document.querySelector('#pratingphotograph').innerHTML=rat+rate;


        document.querySelector('#impe').innerHTML=ev.impressions;
        if(ev.rating!="0")
            document.querySelector('#rating').value=ev.rating;
    });  

    $('#testmodal4').modal('show');
};



$('#testmodal4').on('hidden.bs.modal', function() {
    if(localStorage.selTopEv)
    {
      localStorage.selTopEv="null";
      $(this).find('.form-horizontal').trigger('reset');
    }
});