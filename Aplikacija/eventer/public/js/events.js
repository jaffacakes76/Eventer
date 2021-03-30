// listen for auth status changes
auth.onAuthStateChanged(user => {

    const mine = document.querySelector('#mine');
    
    if (user)
        mine.style.display = 'block';
    else 
        mine.style.display = 'none';
});  

function loadEvents() {

    if(localStorage.redirectEvents=="My Events")
    {
        
        db.collection('events').where("euserid","==", localStorage.userId).orderBy("rating", "desc").onSnapshot(snapshot => {
            showEvents(snapshot, "true");
          });
    }
    else
    {
        db.collection('events').orderBy("rating", "desc").onSnapshot(snapshot => {
            showEvents(snapshot, "false");
          });
    }

    const events = document.querySelector('#st-buy');
    const myEvents = document.querySelector('#st-rent');
    if(localStorage.redirectEvents=="My Events")
    {
        myEvents.checked=true;
        events.checked=false;
    }
    else
    {
        myEvents.checked=false;
        events.checked=true;
    };
}

function genEventHtml(id, eventtype, startdate, starttime, enddate, endtime, guestnum, impressions, rating, flag){
    var style;
    var currentdate = new Date(); 
    var limit = currentdate.getFullYear();
    if(currentdate.getMonth()+1<10)
        limit+="-0"+(currentdate.getMonth()+1);
    else
        limit+="-"+(currentdate.getMonth()+1);
    
    if(currentdate.getDate()+1<10)
        limit+="-0"+(currentdate.getDate());
    else
        limit+="-"+currentdate.getDate() + " , ";

    if(currentdate.getHours()+1<10)
        limit+="0"+(currentdate.getHours());
    else
        limit+=currentdate.getHours();
    
    limit+=":";

    if(currentdate.getMinutes()+1<10)
        limit+="0"+(currentdate.getMinutes());
    else
        limit+=currentdate.getMinutes();

    if (enddate+" , "+endtime<limit)
        style=``;
    else if(flag=="true")
        style=`style="background-color: gray;"`;


    if (localStorage.lang=="english")
    {
        var rat;
        if(rating!="0")
            rat=rating;
        else
            rat="Not Rated";
        return `
        <a href='javascript:;' id="${id}" onclick="eventID(this.id);">
        <div class="single-property-item">
            <div class="row">

            <div class="property-pic">
                    <img src="./img/def_partner_logo.jpg" alt=""></img>
                </div>
                <div class="col-md-8">
                    <div class="property-text">
                        <div class="s-text" `+style+` lang-switch>${eventtype}</div>
                        <h5 class="r-title">Start Date & Time: ${startdate}, ${starttime}</h5>
                        <h5 class="r-title">End Date & Time: ${enddate}, ${endtime}</h5>
                        <div class="properties-location">Number of Guests: ${guestnum}</div>
                        <p>${impressions}</p>
                        <h5>Event Rating: ${rat}</h2>
                    </div>
                </div>
            </div>
        </div>
        </a>`;
    }
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
      }
      var rat;
      if(rating!="0")
          rat=rating;
      else
          rat="Nije ocenjen";
      return `
      <a href='javascript:;' id="${id}" onclick="eventID(this.id);">
      <div class="single-property-item">
          <div class="row">
          <div class="property-pic">
                    <img src="./img/def_partner_logo.jpg" alt=""></img>
                </div>
              <div class="col-md-8">
                  <div class="property-text">
                      <div class="s-text" `+style+` lang-switch>${eventtype}</div>
                      <h5 class="r-title">Datum i Vreme Početka: ${startdate}, ${starttime}</h5>
                      <h5 class="r-title">Datum i Vreme Kraja: ${enddate}, ${endtime}</h5>
                      <div class="properties-location">Broj Gostiju: ${guestnum}</div>
                      <p>${impressions}</p>
                      <h5>Ocena Događaja: ${rat}</h2>
                  </div>
              </div>
          </div>
      </div>
      </a>`;
    }
}

function showEvents(snapshot, flag)
{
    var currentdate = new Date(); 
    var limit = currentdate.getFullYear();
    if(currentdate.getMonth()+1<10)
        limit+="-0"+(currentdate.getMonth()+1);
    else
        limit+="-"+(currentdate.getMonth()+1);
    
    if(currentdate.getDate()+1<10)
        limit+="-0"+(currentdate.getDate());
    else
        limit+="-"+currentdate.getDate() + " , ";

    if(currentdate.getHours()+1<10)
        limit+="0"+(currentdate.getHours());
    else
        limit+=currentdate.getHours();
    
    limit+=":";

    if(currentdate.getMinutes()+1<10)
        limit+="0"+(currentdate.getMinutes());
    else
        limit+=currentdate.getMinutes();

    const list=document.querySelector('.property-list');
    list.innerHTML="";
    if (snapshot.docs.length) {
        let html = '';
        snapshot.docs.forEach(doc => {
            const event = doc.data();
            if(flag=="true" || localStorage.ISADMIN=="true")
            {
                oneRequest=genEventHtml(doc.id, event.eventtype, event.startdate, event.starttime, event.enddate, event.endtime, event.guestnum, event.impressions, event.rating,"true");
                html += oneRequest;
            }
            else if((event.enddate+" , "+event.endtime)<limit)
            {
                oneRequest=genEventHtml(doc.id, event.eventtype, event.startdate, event.starttime, event.enddate, event.endtime, event.guestnum, event.impressions, event.rating, "false");
                html += oneRequest;
            }
        });
        
        list.innerHTML+=html;
    }
}
  
var evuserid;
var spaceid;
var bandid;
var cateringid;
var photographid;
  
function eventID(id)
{
    localStorage.selEv=id;
    db.collection('events').doc(id).get().then(doc=>{
        const ev=doc.data();
        evuserid=ev.euserid;
        if(userId==evuserid)
        {
            
            var currentdate = new Date(); 
            var datetime = currentdate.getFullYear();
            if(currentdate.getMonth()+1<10)
                datetime+="-0"+(currentdate.getMonth()+1);
            else
                datetime+="-"+(currentdate.getMonth()+1);
                
            if(currentdate.getDate()+1<10)
                datetime+="-0"+(currentdate.getDate());
            else
                datetime+="-"+currentdate.getDate() + " , ";
        
            if(currentdate.getHours()+1<10)
                datetime+="0"+(currentdate.getHours());
            else
                datetime+=currentdate.getHours();
            
            datetime+=":";
        
            if(currentdate.getMinutes()+1<10)
                datetime+="0"+(currentdate.getMinutes());
            else
                datetime+=currentdate.getMinutes();

            var eventDate=ev.enddate+" , "+ev.endtime;
            if(eventDate<datetime)
                enableRating();
            else
                disableRating();
        }
        else
            disableRating();

        if (ev.ratingspace!=0)
        {
            document.querySelector('#ratingspace').disabled=true;
            document.querySelector('#ratingspace').style.display="none"; 
        };
        
        if (ev.ratingband!=0)
        {
            document.querySelector('#ratingband').disabled=false;
            document.querySelector('#ratingband').style.display="none";
        };
        
        if (ev.ratingcatering!=0)
        {
            document.querySelector('#ratingcatering').disabled=false;
            document.querySelector('#ratingcatering').style.display="none";
        };
        
        if (ev.ratingphotograph!=0)
        {
            document.querySelector('#ratingphotograph').disabled=true;
            document.querySelector('#ratingphotograph').style.display="none";
        };

        db.collection('partners').doc(ev.space).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#space3').innerHTML=doc.data().name;
                spaceid=ev.space;

                document.querySelector('#space3').disabled=false;
                document.querySelector('#space3').style.display="block";
                document.querySelector('#spacelabel').disabled=false;
                document.querySelector('#spacelabel').style.display="inline-block";
                document.querySelector('#pratingspace').disabled=false;
                document.querySelector('#pratingspace').style.display="block";
            }
            else
            {
                document.querySelector('#space3').innerHTML="";
                document.querySelector('#space3').disabled=true;
                document.querySelector('#space3').style.display="none";
                document.querySelector('#pratingspace').disabled=true;
                document.querySelector('#pratingspace').style.display="none";
                document.querySelector('#spacelabel').disabled=true;
                document.querySelector('#spacelabel').style.display="none";

                document.querySelector('#ratingspace').disabled=true;
                document.querySelector('#ratingspace').style.display="none";
                spaceid="";
            }
        });

        db.collection('partners').doc(ev.band).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#band3').innerHTML=doc.data().name;
                bandid=ev.band;

                document.querySelector('#band3').disabled=false;
                document.querySelector('#band3').style.display="block";
                document.querySelector('#bandlabel').disabled=false;
                document.querySelector('#bandlabel').style.display="inline-block";
                document.querySelector('#pratingband').disabled=false;
                document.querySelector('#pratingband').style.display="block";
            }
            else
            {
                document.querySelector('#band3').innerHTML="";
                document.querySelector('#band3').disabled=true;
                document.querySelector('#band3').style.display="none";
                document.querySelector('#pratingband').disabled=true;
                document.querySelector('#pratingband').style.display="none";
                document.querySelector('#bandlabel').disabled=true;
                document.querySelector('#bandlabel').style.display="none";

                document.querySelector('#ratingband').disabled=true;
                document.querySelector('#ratingband').style.display="none";
                bandid="";
            }
        });

        db.collection('partners').doc(ev.catering).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#catering3').innerHTML=doc.data().name;
                cateringid=ev.catering;

                document.querySelector('#catering3').disabled=false;
                document.querySelector('#catering3').style.display="block";
                document.querySelector('#cateringlabel').disabled=false;
                document.querySelector('#cateringlabel').style.display="inline-block";
                document.querySelector('#pratingcatering').disabled=false;
                document.querySelector('#pratingcatering').style.display="block";
            }
            else
            {
                document.querySelector('#catering3').innerHTML="";

                document.querySelector('#catering3').disabled=true;
                document.querySelector('#catering3').style.display="none";
                document.querySelector('#pratingcatering').disabled=true;
                document.querySelector('#pratingcatering').style.display="none";
                document.querySelector('#cateringlabel').disabled=true;
                document.querySelector('#cateringlabel').style.display="none";

                document.querySelector('#ratingcatering').disabled=true;
                document.querySelector('#ratingcatering').style.display="none";
                cateringid="";
            }
        });

        db.collection('partners').doc(ev.photograph).get().then(doc=>{
            if(doc.exists)
            {
                document.querySelector('#photographer3').innerHTML=doc.data().name;
                photographid=ev.photograph;

                document.querySelector('#photographer3').disabled=false;
                document.querySelector('#photographer3').style.display="block";
                document.querySelector('#photographerabel').disabled=false;
                document.querySelector('#photographerlabel').style.display="inline-block";
                document.querySelector('#pratingphotograph').disabled=false;
                document.querySelector('#pratingphotograph').style.display="block";
            }
            else
            {
                document.querySelector('#photographer3').innerHTML="";
                document.querySelector('#photographer3').disabled=true;
                document.querySelector('#photographer3').style.display="none";
                document.querySelector('#pratingphotograph').disabled=true;
                document.querySelector('#pratingphotograph').style.display="none";
                document.querySelector('#photographerlabel').disabled=true;
                document.querySelector('#photographerlabel').style.display="none";

                document.querySelector('#ratingphotograph').disabled=true;
                document.querySelector('#ratingphotograph').style.display="none";

                photographid="";
            }
        });
           
        if (localStorage.lang=="english")
            document.querySelector('#eventtype3').innerHTML=ev.eventtype;
        else
        { 
            switch (ev.eventtype) {
            case "Birthday":
                document.querySelector('#eventtype3').innerHTML="Rođendan";
                break;
            case "Wedding":
                document.querySelector('#eventtype3').innerHTML="Venčanje";
                break;
            case "Conference":
                document.querySelector('#eventtype3').innerHTML="Konferencija";
                break;
            case "New Year":
                document.querySelector('#eventtype3').innerHTML="Nova Godina";
                break;
            default:
                document.querySelector('#eventtype3').innerHTML="Drugo";
                break;
            };
        };

        document.querySelector('#startdate3').innerHTML=ev.startdate;
        document.querySelector('#starttime3').innerHTML=ev.starttime + "h";
        document.querySelector('#enddate3').innerHTML=ev.enddate;
        document.querySelector('#endtime3').innerHTML=ev.endtime + "h";
        document.querySelector('#guestnum3').innerHTML=ev.guestnum;
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

    $('#testmodal3').modal('show');
};

$('#testmodal3').on('hidden.bs.modal', function() {
    if(localStorage.selEv)
    {
      localStorage.selEv="null";
      $(this).find('.form-horizontal').trigger('reset');
    }
});

function enableRating()
{
    document.querySelector('#rating').disabled=false;
    document.querySelector('#ratingspace').disabled=false;
    document.querySelector('#ratingband').disabled=false;
    document.querySelector('#ratingcatering').disabled=false;
    document.querySelector('#ratingphotograph').disabled=false;
    document.querySelector('#impediv').disabled=false;
    document.querySelector('#buttonRat').disabled=false;
    document.querySelector('#rating').style.display="inline-block";
    document.querySelector('#ratingspace').style.display="inline-block";
    document.querySelector('#ratingband').style.display="inline-block";
    document.querySelector('#ratingcatering').style.display="inline-block";
    document.querySelector('#ratingphotograph').style.display="inline-block";
    document.querySelector('#impediv').style.display="block";
    document.querySelector('#buttonRat').style.display="block";
}
function disableRating()
{
    document.querySelector('#rating').disabled=true;
    document.querySelector('#ratingspace').disabled=true;
    document.querySelector('#ratingband').disabled=true;
    document.querySelector('#ratingcatering').disabled=true;
    document.querySelector('#ratingphotograph').disabled=true;
    document.querySelector('#impediv').disabled=true;
    document.querySelector('#buttonRat').disabled=true;
    document.querySelector('#rating').style.display="none";
    document.querySelector('#ratingspace').style.display="none";
    document.querySelector('#ratingband').style.display="none";
    document.querySelector('#ratingcatering').style.display="none";
    document.querySelector('#ratingphotograph').style.display="none";
    document.querySelector('#impediv').style.display="none";
    document.querySelector('#buttonRat').style.display="none";
}
function isValidRating(evt)
{
    var charCode=(evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 49 || charCode > 53))
        return false;
    else
        return true; 
}

//FILTER EVENTS
document.querySelector('#filter-events').addEventListener('click', (e) => {
    e.preventDefault();
    var conditions = new Array();
    var fields = new Array();
  
    const eventtype=document.querySelector('#etype').value;
    if(eventtype!="0")
    {
      conditions.push(eventtype);
      fields.push("eventtype");
    }
    
    const numGuests=document.querySelector('#eguests').value;
    if(numGuests!="0")
    {
      conditions.push(numGuests);
      fields.push("guestnum");
    }
    const sdate=document.querySelector('#edate').value;
    if(sdate)
    {
        conditions.push(sdate);
        fields.push("startdate");
    }
     var flag=false;
      var query=db.collection('events');
      if (localStorage.redirectEvents=="My Events")
      {
        query=query.where("euserid","==", localStorage.userId);
        flag=true;
      }
        

      var i=0;
      conditions.forEach(element => {
        if(fields[i]=="guestnum")
        {   
            if(element=="20")
                query=query.where(fields[i], "<=", 20).orderBy(fields[i], "desc");
            else if(element=="50")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 21).orderBy(fields[i], "desc");
            else if(element=="100")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 51).orderBy(fields[i], "desc");
            else if(element=="500")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 101).orderBy(fields[i], "desc");
            else
                query=query.where(fields[i], ">=", 501).orderBy(fields[i], "desc");
        }  
        else
            query=query.where(fields[i], "==", element);
        i++;
      });
  
      query.orderBy("rating", "desc").get().then(snapshot => {
        showEvents(snapshot, flag);
    });
    
  });

  document.querySelector('#resetFilters').addEventListener('click', (e) => {
    e.preventDefault();
    $("#edate").val("");
    $('#filter-events').click();
});

// logout 
const logoutEv = document.querySelectorAll('#logout');
    logoutEv.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut();
            window.location.href="./events.html";
            buy.click();
    });
});