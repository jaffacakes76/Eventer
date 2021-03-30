

// listen for auth status changes
auth.onAuthStateChanged(user => {

  const logout = document.querySelectorAll('#logout');
  const userdrop = document.querySelectorAll('#user-dropdown');
  const adminItems = document.querySelectorAll('.admin');
  
  if (user) {

    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      if (user.admin) {
        localStorage.adminId=user.uid;
        localStorage.isadmin="true";
        adminItems.forEach(item => item.style.display = 'block');
        document.querySelector('#first-name-div').style.display='none';
        document.querySelector('#last-name-div').style.display='none';
      }
      else
      {
        localStorage.isadmin="false";
        adminItems.forEach(item => item.style.display = 'none');
        document.querySelector('#first-name-div').style.display='block';
        document.querySelector('#last-name-div').style.display='block';
      }
    });

    const dropdownUsername = document.querySelectorAll('#dropdown-username');
    db.collection('users').doc(user.uid).get().then(doc =>{
      var uName;
      uName=doc.data().username;
      dropdownUsername.forEach(element => {
        element.innerHTML=uName;
      });      
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
    adminItems.forEach(item => item.style.display = 'none');

    logout.forEach(element => {
      element.style.display = "none";
    });
    userdrop.forEach(element => {
      element.style.display = "none";
    });
  }
}); 


function loadRequests() {
 
  const breadcrumb=document.querySelector('.breadcrumb-text');
  var html=``;
  if (localStorage.lang=="english")
  {
    if (localStorage.redirect=="Inbox")
        html=
        `<h2 lang-switch>Inbox</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>${localStorage.redirect}</span>
        </div>`;
      else if (localStorage.redirect=="Sent")  
        html=
        `<h2 lang-switch>Sent</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>${localStorage.redirect}</span>
        </div>`; 
    else 
    {
      if (localStorage.redirect=="Inbox")
        html=
        `<h2 lang-switch>Inbox</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>${localStorage.redirect}</span>
        </div>`;
      else if (localStorage.redirect=="Sent")  
        html=
        `<h2 lang-switch>Sent</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>${localStorage.redirect}</span>
        </div>`; 
    };
  }
  else
  {
    if (localStorage.isadmin=="false")
      if (localStorage.redirect=="Inbox")
        html=
        `<h2 lang-switch>Primljeni</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>Primljeni</span>
        </div>`;
      else if (localStorage.redirect=="Sent")  
        html=
        `<h2 lang-switch>Poslati</h2>
        <div class="breadcrumb-option">
            <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
            <span lang-switch>Poslati</span>
        </div>`;
    else 
    {
    if (localStorage.redirect=="Inbox")
      html=
      `<h2 lang-switch>Primljeni</h2>
      <div class="breadcrumb-option">
          <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
          <span lang-switch>Primljeni</span>
      </div>`;
    else if (localStorage.redirect=="Sent")  
      html=
      `<h2 lang-switch>Poslati</h2>
      <div class="breadcrumb-option">
          <a href="#"><i class="fa fa-home"></i> ${localStorage.username}</a>
          <span lang-switch>Poslati</span>
      </div>`; 
    };
  }
  breadcrumb.innerHTML=html;

  const inbox = document.querySelector('#st-buy');
  const sent = document.querySelector('#st-rent');
  if(localStorage.redirect=="Inbox")
  {
    inbox.checked=true;
    sent.checked=false;
  }
  else
  {
    inbox.checked=false;
    sent.checked=true;
  };

  if (localStorage.ISADMIN=="false")
  {
    db.collection('users/'+localStorage.userId+'/myRequests').orderBy("priority", "asc").orderBy("modified", "desc").onSnapshot(snapshot => {
      if (snapshot.docs.length) {
          let html = '';
          const list=document.querySelector('.property-list');
          list.innerHTML="";

          snapshot.docs.forEach(doc => {
              const request = doc.data();

              var oneRequest=``;

              if (localStorage.redirect=="Inbox" && request.status=="Inbox")
                oneRequest=genReqHtml(doc.id, request.eventtype, request.submited, request.guestnum, request.priority, request.startdate, request.starttime, request.confirmed, request.canceled);
              else if (localStorage.redirect=="Sent" && request.status=="Sent")
                oneRequest=genReqHtml(doc.id, request.eventtype, request.submited, request.guestnum, request.priority, request.startdate, request.starttime, request.confirmed, request.canceled);
              //Dodati jos stvari da lepo izgledaju stavke u listi zahteva
              html += oneRequest;
          });
          
          list.innerHTML+=html;
      } 
    });
  }
  else
  {
    if (localStorage.redirect=="Inbox")
      db.collection('users/'+localStorage.userId+'/inbox').orderBy("priority", "asc").orderBy("modified", "desc").onSnapshot(snapshot => {
        showRequests(snapshot);
      });
    else if (localStorage.redirect=="Sent")
      db.collection('users/'+localStorage.userId+'/sent').orderBy("priority", "asc").orderBy("modified", "desc").onSnapshot(snapshot => {
        showRequests(snapshot);
      });
  };

};

$('#testmodal1').on('hidden.bs.modal', function () {
  if(localStorage.selReq)
  {
    localStorage.selReq="null";
    $(this).find('.form-horizontal').trigger('reset');
  }
});

var subdate;
var ruserid;

$('#space2').niceSelect('destroy');
$('#band2').niceSelect('destroy');        
$('#catering2').niceSelect('destroy');
$('#photograph2').niceSelect('destroy');
$('#eventtype2').niceSelect('destroy');

function requestID(id)
{
  localStorage.selReq=id;

  if (localStorage.isadmin=="false")
  {
    document.querySelector('#sender-div').disabled=true;
    document.querySelector('#sender-div').style.display="none";
    
    db.collection('users/'+localStorage.userId+'/myRequests').doc(id).get().then(doc=>{
      const req=doc.data();

      document.querySelector('#eventtype2').value=req.eventtype;
      document.querySelector('#startdate2').value=req.startdate;
      document.querySelector('#starttime2').value=req.starttime;
      document.querySelector('#starttime2').disabled=false;
      document.querySelector('#enddate2').disabled=false;
      document.querySelector('#enddate2').min=req.startdate;
      document.querySelector('#enddate2').value=req.enddate;
      document.querySelector('#endtime2').value=req.endtime;
      document.querySelector('#endtime2').disabled=false;
      document.querySelector('#guestnum2').value=req.guestnum;
      document.querySelector('#space2').value=req.space;
      document.querySelector('#band2').value=req.band;
      document.querySelector('#catering2').value=req.catering;
      document.querySelector('#photograph2').value=req.photograph;
      
      if (req.priority=="Normal")
          document.querySelector('#priority-02').checked=true;
      else
          document.querySelector('#priority-12').checked=true;
      document.querySelector('#addreq2').value=req.addreq;

      subdate=req.submited;
      ruserid=req.userid;
    });
  }
  else
  {
    document.querySelector('#sender-div').disabled=false;
    document.querySelector('#sender-div').style.display="block";


    if (localStorage.redirect=="Inbox")
      db.collection('users/'+localStorage.userId+'/inbox').doc(id).get().then(doc=>{
      const req=doc.data();

      document.querySelector('#eventtype2').value=req.eventtype;
      document.querySelector('#startdate2').value=req.startdate;
      document.querySelector('#starttime2').value=req.starttime;
      document.querySelector('#starttime2').disabled=false;
      document.querySelector('#enddate2').disabled=false;
      document.querySelector('#enddate2').value=req.enddate;
      document.querySelector('#enddate2').min=req.startdate;
      document.querySelector('#endtime2').value=req.endtime;
      document.querySelector('#endtime2').disabled=false;
      document.querySelector('#guestnum2').value=req.guestnum;
      document.querySelector('#space2').value=req.space;
      document.querySelector('#band2').value=req.band;
      document.querySelector('#catering2').value=req.catering;
      document.querySelector('#photograph2').value=req.photograph;

      if (req.priority=="Normal")
          document.querySelector('#priority-02').checked=true;
      else
          document.querySelector('#priority-12').checked=true;
      document.querySelector('#addreq2').value=req.addreq;

      subdate=req.submited;
      ruserid=req.userid;

      db.collection('users').doc(ruserid).get().then(doc=>{
        document.querySelector('#respondForm').getElementsByTagName('p')[0].innerHTML=doc.data().firstName+" "+doc.data().lastName;

      });

      });
    else
    db.collection('users/'+localStorage.userId+'/sent').doc(id).get().then(doc=>{
      const req=doc.data();

      document.querySelector('#eventtype2').value=req.eventtype;
      document.querySelector('#startdate2').value=req.startdate;
      document.querySelector('#starttime2').value=req.starttime;
      document.querySelector('#starttime2').disabled=false;
      document.querySelector('#enddate2').disabled=false;
      document.querySelector('#enddate2').min=req.startdate;
      document.querySelector('#enddate2').value=req.enddate;
      document.querySelector('#endtime2').value=req.endtime;
      document.querySelector('#endtime2').disabled=false;
      document.querySelector('#guestnum2').value=req.guestnum;
      document.querySelector('#space2').value=req.space;
      document.querySelector('#band2').value=req.band;
      document.querySelector('#catering2').value=req.catering;
      document.querySelector('#photograph2').value=req.photograph;

      if (req.priority=="Normal")
          document.querySelector('#priority-02').checked=true;
      else
          document.querySelector('#priority-12').checked=true;
      document.querySelector('#addreq2').value=req.addreq;

      subdate=req.submited;
      ruserid=req.userid;

      db.collection('users').doc(ruserid).get().then(doc=>{
        document.querySelector('#respondForm').getElementsByTagName('p')[0].innerHTML=doc.data().firstName+" "+doc.data().lastName;
  
        });
      
    });  
  }

  $('#testmodal2').modal('show');
  document.body.style.overflow = 'hidden';
};

function genReqHtml(id, type, submited, guestNum, priority, startd, startt, confirmed, canceled){
  var style;
  if (confirmed=="true")
    style=`style="background-color: green;"`;
  else if (canceled=="true")  
    style=`style="background-color: orangered;"`;
  else
    style=``;

  if (localStorage.lang=="english")
    return `
    <a href='javascript:;' id="${id}" onclick="requestID(this.id);">
    <div class="single-property-item">
        <div class="row">
            <div class="col-md-8">
                <div class="property-text">
                    <div class="s-text" `+style+` lang-switch>${type}</div>
                    <h5 class="r-title">Start Date & Time: ${startd}, ${startt}</h5>
                    <div class="properties-location">Number of guests: ${guestNum}</div>
                    <p>Priority: ${priority}</p>
                    <p>Submited: ${submited}</p>
                </div>
            </div>
        </div>
    </div>
    </a>`;
  else
  {
    if (priority=="High")
      priority="Visok";
    else
      priority="Uobičajen";
    
    switch (type) {
      case "Birthday":
        type="Rođendan";
        break;
      case "Wedding":
        type="Venčanje";
        break;
      case "Conference":
        type="Konferencija";
        break;
      case "New Year":
        type="Nova Godina";
        break;
      default:
        type="Drugo";
        break;
    }
    return `
    <a href='javascript:;' id="${id}" onclick="requestID(this.id);">
    <div class="single-property-item">
        <div class="row">
            <div class="col-md-8">
                <div class="property-text">
                    <div class="s-text"`+style+`>${type}</div>
                    <h5 class="r-title">Datum i vreme početka: ${startd}, ${startt}</h5>
                    <div class="properties-location">Broj Gostiju: ${guestNum}</div>
                    <p>Prioritet: ${priority}</p>
                    <p>Kreiran: ${submited}</p>
                </div>
            </div>
        </div>
    </div>
    </a>`;
  }
}

function showRequests(snapshot)
{
  const list=document.querySelector('.property-list');
  list.innerHTML="";
  if (snapshot.docs.length) {
    let html = '';
    snapshot.docs.forEach(doc => {
        const request = doc.data();
        oneRequest=genReqHtml(doc.id, request.eventtype, request.submited, request.guestnum, request.priority, request.startdate, request.starttime, request.confirmed, request.canceled);
        //Dodati jos stvari da lepo izgledaju stavke u listi zahteva
        html += oneRequest;
    });
    
    list.innerHTML+=html;
    
  }
}

function confirmator(selector)
{
  $('#testmodal2').modal('hide');

  if (selector==0)
    $('#confirmmodal').modal('show');
  else
    $('#cancelmodal').modal('show');
    
}

function back(selector)
{
  if (selector==0)
    $('#confirmmodal').modal('hide');
  else
    $('#cancelmodal').modal('hide');

  $('#testmodal2').modal('show');
  document.body.style.overflow = 'hidden';
}

$('#testmodal2').on('hidden.bs.modal', function (e) {
  document.body.style.overflow = 'auto';
})