function fork()
{
  if(localStorage.selReq!="null")
    if (localStorage.isadmin=="false")
      editreq(0);
    else
      admineditreq();  
  else
    submitreq();
};

function editreq(func)
{
  const eventype=document.querySelector('#eventtype2').value;
  const stdate=document.querySelector('#startdate2').value;
  const sttime=document.querySelector('#starttime2').value;
  const endate=document.querySelector('#enddate2').value;
  const entime=document.querySelector('#endtime2').value;
  const guesnum=parseInt(document.querySelector('#guestnum2').value);
  const espace=document.querySelector('#space2').value;
  const eband=document.querySelector('#band2').value;
  const ecatering=document.querySelector('#catering2').value;
  const ephotograph=document.querySelector('#photograph2').value;
  var epriority;
  if (document.querySelector('#priority-02').checked)
      epriority=document.querySelector('#priority-02').value;
  else
      epriority=document.querySelector('#priority-12').value;
  const eaddreq=document.querySelector('#addreq2').value;

  /*var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1) + "/" 
              + currentdate.getFullYear() + " , "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes();*/

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

  var isValid=true;

  if(eventype=="0")
  {
      isValid=false;
      document.querySelector('#eventtype2').style.borderColor="red";
  }
  else
        document.querySelector('#eventtype2').style.borderColor="#e1e1e1";

  if(document.querySelector('#guestnum2').value=="" || guesnum<10)
    {
        isValid=false;
        document.querySelector('#guestnum2').style.borderColor="red";
    }
    else
        document.querySelector('#guestnum2').style.borderColor="#e1e1e1";

    if(stdate=="")
    {
        isValid=false;
        document.querySelector('#startdate2').style.borderColor="red";
    }
    else
        document.querySelector('#startdate2').style.borderColor="#e1e1e1";

    if(endate=="")
    {
        isValid=false;
        document.querySelector('#enddate2').style.borderColor="red";
    }
    else
        document.querySelector('#enddate2').style.borderColor="#e1e1e1";


    if(sttime=="")
    {
        isValid=false;
        document.querySelector('#starttime2').style.borderColor="red";
    }
    else
        document.querySelector('#starttime2').style.borderColor="#e1e1e1";

    if(entime=="")
    {
        isValid=false;
        document.querySelector('#endtime2').style.borderColor="red";
    }
    else
        document.querySelector('#endtime2').style.borderColor="#e1e1e1";

    if (espace=="None" && eband=="None" && ecatering=="None" && ephotograph=="None")
    {
        

        if(localStorage.lang=="english")
            alert("Select at least one service!");
        else
            alert("Označite bar jednu uslugu!");

        return; 
    };
    
    if(!isValid)
        return;

        
    if (func==0)    //edit req
    {    
        db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).get().then(mainSnapshot=>{

            if(mainSnapshot.data().modified==datetime)
            {
                if(localStorage.lang=="english")
                    alert("Wait a minute...");
                else
                    alert("Sačekajte minut...");
            }
                
            else
            {
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
                .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                    querySnapshot.forEach(function(doc) {
                        if(doc.data().modified!=datetime)
                            doc.ref.delete();
                    });
                });
        
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
                    .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                        querySnapshot.forEach(function(doc) {
                            if(doc.data().modified!=datetime)
                                doc.ref.delete();
                    });
                });

                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox').add({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    userid: localStorage.userId,
                    submited: subdate,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "false",
                    status: "Sent"          //admin ce zahteve sa statusom "Sent" da smesta u inbox
                });
            //user-i nemaju razvrstane zahteve u bazi na inbox i sent, razlikuju se samo po statusu. Admin ima inbox i sent
                db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).update({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "false",
                    status: "Sent"
                }); 
                
                $('#testmodal2').modal('hide');

                if(localStorage.lang=="english")
                    alert("The request has been modified.");
                else
                    alert("Zahtev je izmenjen.");
            }
        }); 
    }
    else if (func==1)   //confirm req
    {
        db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).get().then(mainSnapshot=>{

            if(mainSnapshot.data().modified==datetime)
            {
                if(localStorage.lang=="english")
                    alert("Wait a minute...");
                else
                    alert("Sačekajte minut...");
            }
                
            else
            {
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
                .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                    querySnapshot.forEach(function(doc) {
                        if(doc.data().modified!=datetime)
                            doc.ref.delete();
                    });
                });
        
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
                    .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                        querySnapshot.forEach(function(doc) {
                            if(doc.data().modified!=datetime)
                                doc.ref.delete();
                    });
                });
    
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox').add({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    userid: localStorage.userId,
                    submited: subdate,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "true",
                    status: "Sent"          //admin ce zahteve sa statusom "Sent" da smesta u inbox
                });
            //user-i nemaju razvrstane zahteve u bazi na inbox i sent, razlikuju se samo po statusu. Admin ima inbox i sent
                db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).update({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "true",
                    status: "Sent"
                }); 
                
                $('#confirmmodal').modal('hide');

                if(localStorage.lang=="english")
                    alert("The request has been confirmed.");
                else
                    alert("Zahtev je potvrđen.");
            }
        
        });
    }
    else    //cancel req
    {
        db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).get().then(mainSnapshot=>{

            if(mainSnapshot.data().modified==datetime)
            {
                if(localStorage.lang=="english")
                    alert("Wait a minute...");
                else
                    alert("Sačekajte minut...");
            }
               
            else
            {
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
                .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                    querySnapshot.forEach(function(doc) {
                        if(doc.data().modified!=datetime)
                            doc.ref.delete();
                    });
                });
        
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
                    .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
                        querySnapshot.forEach(function(doc) {
                            if(doc.data().modified!=datetime)
                                doc.ref.delete();
                    });
                });
    
                db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox').add({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    userid: localStorage.userId,
                    submited: subdate,
                    modified: datetime,
                    canceled: "true",
                    confirmed: "false",
                    status: "Sent"          //admin ce zahteve sa statusom "Sent" da smesta u inbox
                });
            //user-i nemaju razvrstane zahteve u bazi na inbox i sent, razlikuju se samo po statusu. Admin ima inbox i sent
                db.collection('users/'+localStorage.userId+'/myRequests').doc(localStorage.selReq).update({
                    eventtype: eventype,
                    startdate: stdate,
                    starttime: sttime,
                    enddate: endate,
                    endtime: entime,
                    guestnum: guesnum,
                    space: espace,
                    band: eband,
                    catering: ecatering,
                    photograph: ephotograph,
                    priority: epriority,
                    addreq: eaddreq,
                    modified: datetime,
                    canceled: "true",
                    confirmed: "false",
                    status: "Sent"
                }); 
                
                $('#cancelmodal').modal('hide');
                

                if(localStorage.lang=="english")
                    alert("The request has been canceled.");
                else
                    alert("Zahtev je otkazan.");
            }
        
        });
    };   
};  


function admineditreq()
{
    const eventype=document.querySelector('#eventtype2').value;
    const stdate=document.querySelector('#startdate2').value;
    const sttime=document.querySelector('#starttime2').value;
    const endate=document.querySelector('#enddate2').value;
    const entime=document.querySelector('#endtime2').value;
    const guesnum=parseInt(document.querySelector('#guestnum2').value);
    const espace=document.querySelector('#space2').value;
    const eband=document.querySelector('#band2').value;
    const ecatering=document.querySelector('#catering2').value;
    const ephotograph=document.querySelector('#photograph2').value;
    var epriority;
    if (document.querySelector('#priority-02').checked)
        epriority=document.querySelector('#priority-02').value;
    else
        epriority=document.querySelector('#priority-12').value;
    const eaddreq=document.querySelector('#addreq2').value;

    /*var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1) + "/" 
                + currentdate.getFullYear() + " , "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();*/
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

    var isValid=true;

    if(eventype=="0")
    {
        isValid=false;
        document.querySelector('#eventtype2').style.borderColor="red";
    }
    else
          document.querySelector('#eventtype2').style.borderColor="#e1e1e1";
  
    if(document.querySelector('#guestnum2').value=="" || guesnum<10)
    {
        isValid=false;
        document.querySelector('#guestnum2').style.borderColor="red";
    }
    else
        document.querySelector('#guestnum2').style.borderColor="#e1e1e1";

    if(stdate=="")
    {
        isValid=false;
        document.querySelector('#startdate2').style.borderColor="red";
    }
    else
        document.querySelector('#startdate2').style.borderColor="#e1e1e1";

    if(endate=="")
    {
        isValid=false;
        document.querySelector('#enddate2').style.borderColor="red";
    }
    else
        document.querySelector('#enddate2').style.borderColor="#e1e1e1";


    if(sttime=="")
    {
        isValid=false;
        document.querySelector('#starttime2').style.borderColor="red";
    }
    else
        document.querySelector('#starttime2').style.borderColor="#e1e1e1";

    if(entime=="")
    {
        isValid=false;
        document.querySelector('#endtime2').style.borderColor="red";
    }
    else
        document.querySelector('#endtime2').style.borderColor="#e1e1e1";

    if (espace=="None" && eband=="None" && ecatering=="None" && ephotograph=="None")
    {
       
        if(localStorage.lang=="english")
            alert("Select at least one service!");
        else
            alert("Označite bar jednu uslugu!");



        return; 
    };

    if (espace=="Any" || eband=="Any" || ecatering=="Any" || ephotograph=="Any")
    {
        
        if(localStorage.lang=="english")
            alert("Select an offer for all required services!");
        else
            alert("Označite ponudu za sve zahtevane usluge!");

        return; 
    };
      
    if(!isValid)
        return;

    
    db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
      .where("userid","==",ruserid).where("submited","==",subdate).limit(1).get().then(doc=>{ 
        if (doc.size>0)
        {
            db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
            .where("userid","==",ruserid).where("submited","==",subdate).get().then((query) => {
                query.docs[0].ref.update({  
                eventtype: eventype,
                startdate: stdate,
                starttime: sttime,
                enddate: endate,
                endtime: entime,
                guestnum: guesnum,
                space: espace,
                band: eband,
                catering: ecatering,
                photograph: ephotograph,
                priority: epriority,
                addreq: eaddreq,
                modified: datetime,
                userid: ruserid,
                submited: subdate,
                canceled: "false",
                confirmed: "false",
                status: "Inbox"          //admin ce zahteve sa statusom "Sent" da smesta u inbox
                });
            });
        }
        else
        {
          db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent').add({  
              eventtype: eventype,
              startdate: stdate,
              starttime: sttime,
              enddate: endate,
              endtime: entime,
              guestnum: guesnum,
              space: espace,
              band: eband,
              catering: ecatering,
              photograph: ephotograph,
              priority: epriority,
              addreq: eaddreq,
              modified: datetime,
              userid: ruserid,
              submited: subdate,
              canceled: "false",
              confirmed: "false",
              status: "Inbox"          //admin ce zahteve sa statusom "Sent" da smesta u inbox
          });
        }


      //user-i nemaju razvrstane zahteve u bazi na inbox i sent, razlikuju se samo po statusu. Admin ima inbox i sent
      db.collection('users/'+ruserid+'/myRequests').where("submited","==",subdate).limit(1).get().then((query) => {
        query.docs[0].ref.update({
        eventtype: eventype,
        startdate: stdate,
        starttime: sttime,
        enddate: endate,
        endtime: entime,
        guestnum: guesnum,
        space: espace,
        band: eband,
        catering: ecatering,
        photograph: ephotograph,
        priority: epriority,
        addreq: eaddreq,
        modified: datetime,
        canceled: "false",
        confirmed: "false",
        status: "Inbox"
        });
      }); 

      $('#testmodal2').modal('hide');
      

      if(localStorage.lang=="english")
        alert("The request has been modified!");
      else
        alert("Zahtev je uspešno izmenjen!");

      db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
      .where("userid","==",ruserid).where("submited","==",subdate).get().then(querySnapshot=> {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
  });
};


function forkCancel()
{
  if(localStorage.selReq!="null")
    if (localStorage.isadmin=="false")
      editreq(2);
    else
      adminCancelRequest();
};

function adminCancelRequest()
{
    db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
    .where("userid","==",ruserid).where("submited","==",subdate).limit(1).get().then(doc=>{ 
        if (doc.size>0)
        {
            db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
            .where("userid","==",ruserid).where("submited","==",subdate).get().then((query) => {
                query.docs[0].ref.delete();
            });
        }
        else
        {
            db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
            .where("userid","==",ruserid).where("submited","==",subdate).get().then((query) => {
                query.docs[0].ref.delete();
            });
        };
    });

    db.collection('users/'+ruserid+'/myRequests').where("submited","==",subdate).limit(1).get().then((query) => {
        query.docs[0].ref.delete();
    }); 

    $('#cancelmodal').modal('hide');

    if(localStorage.lang=="english")
        alert("The request has been canceled.");
    else
        alert("Zahtev je otkazan.");
};


function forkConfirm()
{
  if(localStorage.selReq!="null")
    if (localStorage.isadmin=="false")
      editreq(1);
    else
      adminConfirmRequest();
};

function adminConfirmRequest()
{
    const eventype=document.querySelector('#eventtype2').value;
    const stdate=document.querySelector('#startdate2').value;
    const sttime=document.querySelector('#starttime2').value;
    const endate=document.querySelector('#enddate2').value;
    const entime=document.querySelector('#endtime2').value;
    const guesnum=parseInt(document.querySelector('#guestnum2').value);
    const espace=document.querySelector('#space2').value;
    const eband=document.querySelector('#band2').value;
    const ecatering=document.querySelector('#catering2').value;
    const ephotograph=document.querySelector('#photograph2').value;
    var epriority;
    if (document.querySelector('#priority-02').checked)
        epriority=document.querySelector('#priority-02').value;
    else
        epriority=document.querySelector('#priority-12').value;
    const eaddreq=document.querySelector('#addreq2').value;

    /*var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1) + "/" 
                + currentdate.getFullYear() + " , "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();*/
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

    var isValid=true;

    if(eventype=="0")
    {
        isValid=false;
        document.querySelector('#eventtype2').style.borderColor="red";
    }
    else
          document.querySelector('#eventtype2').style.borderColor="#e1e1e1";
  
    if(document.querySelector('#guestnum2').value=="" || guesnum<10)
    {
        isValid=false;
        document.querySelector('#guestnum2').style.borderColor="red";
    }
    else
        document.querySelector('#guestnum2').style.borderColor="#e1e1e1";

    if(stdate=="")
    {
        isValid=false;
        document.querySelector('#startdate2').style.borderColor="red";
    }
    else
        document.querySelector('#startdate2').style.borderColor="#e1e1e1";

    if(endate=="")
    {
        isValid=false;
        document.querySelector('#enddate2').style.borderColor="red";
    }
    else
        document.querySelector('#enddate2').style.borderColor="#e1e1e1";


    if(sttime=="")
    {
        isValid=false;
        document.querySelector('#starttime2').style.borderColor="red";
    }
    else
        document.querySelector('#starttime2').style.borderColor="#e1e1e1";

    if(entime=="")
    {
        isValid=false;
        document.querySelector('#endtime2').style.borderColor="red";
    }
    else
        document.querySelector('#endtime2').style.borderColor="#e1e1e1";

    if (espace=="None" && eband=="None" && ecatering=="None" && ephotograph=="None")
    {
        if(localStorage.lang=="english")
            alert("Select at least one service!");
        else
            alert("Označite bar jednu uslugu!");

        back(0);
        return; 
    };

    if (espace=="Any" || eband=="Any" || ecatering=="Any" || ephotograph=="Any")
    {
        if(localStorage.lang=="english")
            alert("Select an offer for all required services!");
        else
            alert("Označite ponudu za sve zahtevane usluge!");

        back(0);
        return; 
    };
      
    if(!isValid)
        return;


    db.collection("events").add({
        eventtype: eventype,
        startdate: stdate,
        starttime: sttime,
        enddate: endate,
        endtime: entime,
        guestnum: guesnum,
        space: espace,
        band: eband,
        catering: ecatering,
        photograph: ephotograph,
        euserid: ruserid,
        rating: 0,
        ratingspace: 0,
        ratingband: 0,
        ratingcatering: 0,
        ratingphotograph: 0,
        impressions: ""
    });

    db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=>{
        var events=doc.data().events+1;
        doc.ref.update({events: events});
    });

    if(localStorage.lang=="english")
        alert("The request has been confirmed.");
    else
        alert("Zahtev je potvrđen.");

    db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
    .where("userid","==",ruserid).where("submited","==",subdate).limit(1).get().then(doc=>{ 
        if (doc.size>0)
        {
            db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/sent')
            .where("userid","==",ruserid).where("submited","==",subdate).get().then((query) => {
                query.docs[0].ref.delete();
            });
        }
        else
        {
            db.collection('users/3YIl0PXpR5ctFOtrppKh7URUBqA3/inbox')
            .where("userid","==",ruserid).where("submited","==",subdate).get().then((query) => {
                query.docs[0].ref.delete();
            });
        };
    });

    db.collection('users/'+ruserid+'/myRequests').where("submited","==",subdate).limit(1).get().then((query) => {
        query.docs[0].ref.delete();
    }); 

    $('#confirmmodal').modal('hide');
    //adminCancelRequest();
};
