
$( document ).ready(function() {

    var currentdate = new Date(); 
    var limit = currentdate.getFullYear();
    if(currentdate.getMonth()+1<10)
        limit+="-0"+(currentdate.getMonth()+1);
    else
        limit+="-"+(currentdate.getMonth()+1);
        
    if(currentdate.getDate()+1<10)
        limit+="-0"+(currentdate.getDate());
    else
        limit+="-"+currentdate.getDate();

    document.querySelector('#startdate').min=limit;
    
    if (window.location.pathname == "/requests.html") //za deploy verziju
    //if (window.location.pathname == "/public/requests.html")//za localhost
        document.querySelector('#startdate2').min=limit;
});

function enableStartTime()
{
    const start=document.querySelector('#startdate').value;
    if(start!="0")
        document.querySelector('#starttime').disabled=false;
    else
    {
        document.querySelector('#starttime').disabled=true;
        $("#starttime").val("");
    }
    const end=document.querySelector('#enddate').value;
    document.querySelector('#enddate').min=start;
    if(end!="" && start>end)
    {
        $("#enddate").val("");
    }   
}
function setEndDateLimit()
{
    const limit=document.querySelector('#startdate').value;
    const startTime=document.querySelector('#starttime').value;
    if(limit!="0" && startTime!="0")
    {
        document.querySelector('#enddate').disabled=false;
        document.querySelector('#enddate').min=limit;
    }
    else
    {
        document.querySelector('#enddate').disabled=true;
        $("#enddate").val("");
    }   
}

function setEndTimeLimit()
{
    const startDate=document.querySelector('#startdate').value;
    const endDate=document.querySelector('#enddate').value;
    const startTime=document.querySelector('#starttime').value;

    if(endDate!="0")
    {
        document.querySelector('#endtime').disabled=false;
        if(startDate==endDate)
        {
            document.querySelector('#endtime').min=startTime;
        }
        else
            $("#endtime").val("");
       
    }
    else
        document.querySelector('#endtime').disabled=true;   
}

function enableStartTime2()
{
    const start=document.querySelector('#startdate2').value;
    if(start!="0")
        document.querySelector('#starttime2').disabled=false;
    else
    {
        document.querySelector('#starttime2').disabled=true;
        $("#starttime2").val("");
    }
    const end=document.querySelector('#enddate2').value;
    document.querySelector('#enddate2').min=start;
    if(end!="" && start>end)
    {
        $("#enddate2").val("");
    }   
}

function setEndDateLimit2()
{
    const limit=document.querySelector('#startdate2').value;
    const startTime=document.querySelector('#starttime2').value;
    if(limit!="0" && startTime!="0")
    {
        document.querySelector('#enddate2').disabled=false;
        document.querySelector('#enddate2').min=limit;
    }
    else
    {
        document.querySelector('#enddate2').disabled=true;
        $("#enddate2").val("");
    }   
}

function setEndTimeLimit2()
{
    const startDate=document.querySelector('#startdate2').value;
    const endDate=document.querySelector('#enddate2').value;
    const startTime=document.querySelector('#starttime2').value;

    if(endDate!="0")
    {
        document.querySelector('#endtime2').disabled=false;
        if(startDate==endDate)
        {
            document.querySelector('#endtime2').min=startTime;
        }
        else
            $("#endtime2").val("");
       
    }
    else
        document.querySelector('#endtime2').disabled=true;   
}

function isNumberKey(evt)
{
    var charCode=(evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else
        return true; 
}

$('#space').niceSelect('destroy');
$('#band').niceSelect('destroy');        
$('#catering').niceSelect('destroy');
$('#photograph').niceSelect('destroy');
$('#eventtype').niceSelect('destroy');

var spaces,bands,caterings,photographs;

function loadPartnerSelect(){
db.collection('partners').get().then(partner=>{
    if (localStorage.lang=="english")
    {
        spaces=`<option value="None" selected>Not Required</option>
        <option value="Any">No Preference</option>`;
        bands=`<option value="None" selected>Not Required</option>
        <option value="Any">No Preference</option>`;
        caterings=`<option value="None" selected>Not Required</option>
        <option value="Any">No Preference</option>`;
        photographs=`<option value="None" selected>Not Required</option>
        <option value="Any">No Preference</option>`;
    }
    else
    {
        spaces=`<option value="None" selected>Nije Potrebno</option>
        <option value="Any">Bez Opredeljenja</option>`;
        bands=`<option value="None" selected>Nije Potrebno</option>
        <option value="Any">Bez Opredeljenja</option>`;
        caterings=`<option value="None" selected>Nije Potrebno</option>
        <option value="Any">Bez Opredeljenja</option>`;
        photographs=`<option value="None" selected>Nije Potrebno</option>
        <option value="Any">Bez Opredeljenja</option>`;
    };

    partner.forEach(element => {
        if (element.data().blocked==false)
        switch (element.data().service){
            case "Space":
                spaces+=`<option value="${element.id}">${element.data().name} (${element.data().adress})</option>`;
                break;
            case "Music":
                bands+=`<option value="${element.id}">${element.data().name} (${element.data().adress})</option>`;
                break;
            case "Catering":
                caterings+=`<option value="${element.id}">${element.data().name} (${element.data().adress})</option>`;
                break;
            case "Photograph":
                photographs+=`<option value="${element.id}">${element.data().name} (${element.data().adress})</option>`;
                break;
            default: break;
        };
    });

    const spaceoptions=document.querySelector('#space');
    spaceoptions.innerHTML=spaces;   
    const bandoptions=document.querySelector('#band');
    bandoptions.innerHTML=bands;
    const cateringoptions=document.querySelector('#catering');
    cateringoptions.innerHTML=caterings;
    const photooptions=document.querySelector('#photograph');
    photooptions.innerHTML=photographs; 

    
    //if (window.location.pathname == "/public/requests.html") // za localhost
    if (window.location.pathname == "/requests.html")  // za deploy
    {
        const spaceoptions2=document.querySelector('#space2');
        spaceoptions2.innerHTML=spaces;   
        const bandoptions2=document.querySelector('#band2');
        bandoptions2.innerHTML=bands;
        const cateringoptions2=document.querySelector('#catering2');
        cateringoptions2.innerHTML=caterings;
        const photooptions2=document.querySelector('#photograph2');
        photooptions2.innerHTML=photographs; 
    };
});
}

function submit()
{
    if(localStorage.username=="null")
    {
        $('#testmodal1').modal('hide');
        document.querySelector('#login').click();
        
    }
    else
    {
        submitreq();
        
    }  
};

function submitreq()
{
    const eventype=document.querySelector('#eventtype').value;
    const stdate=document.querySelector('#startdate').value;
    const sttime=document.querySelector('#starttime').value;
    const endate=document.querySelector('#enddate').value;
    const entime=document.querySelector('#endtime').value;
    const guesnum=parseInt(document.querySelector('#guestnum').value);
    const espace=document.querySelector('#space').value;
    const eband=document.querySelector('#band').value;
    const ecatering=document.querySelector('#catering').value;
    const ephotograph=document.querySelector('#photograph').value;
    var epriority;
    if (document.querySelector('#priority-0').checked)
        epriority=document.querySelector('#priority-0').value;
    else
        epriority=document.querySelector('#priority-1').value;
    const eaddreq=document.querySelector('#addreq').value;

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
       document.querySelector('#eventtype').style.borderColor="red";
   }
   else
        document.querySelector('#eventtype').style.borderColor="#e1e1e1";

   if(document.querySelector('#guestnum').value=="" || guesnum<10)
    {
        isValid=false;
        document.querySelector('#guestnum').style.borderColor="red";
    }
    else
        document.querySelector('#guestnum').style.borderColor="#e1e1e1";
  
    if(stdate=="")
    {
        isValid=false;
        document.querySelector('#startdate').style.borderColor="red";
    }
    else
        document.querySelector('#startdate').style.borderColor="#e1e1e1";

    if(endate=="")
    {
        isValid=false;
        document.querySelector('#enddate').style.borderColor="red";
    }
    else
        document.querySelector('#enddate').style.borderColor="#e1e1e1";


    if(sttime=="")
    {
        isValid=false;
        document.querySelector('#starttime').style.borderColor="red";
    }
    else
        document.querySelector('#starttime').style.borderColor="#e1e1e1";

    if(entime=="")
    {
        isValid=false;
        document.querySelector('#endtime').style.borderColor="red";
    }
    else
        document.querySelector('#endtime').style.borderColor="#e1e1e1";

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

   
    var docRef = db.collection("users").doc(localStorage.userId);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().lastSubmit==datetime)
            {
                if(localStorage.lang=="english")
                    alert("Wait a minute...");
                else
                    alert("Sačekajte minut...");
            }
                
            else
            {
                db.collection('users').doc(localStorage.userId).set({lastSubmit: datetime}, { merge: true });
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
                    submited: datetime,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "false",
                    status: "Sent",
                }); 
    
                db.collection('users/'+localStorage.userId+'/myRequests').add({
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
                    submited: datetime,
                    modified: datetime,
                    canceled: "false",
                    confirmed: "false",
                    status: "Sent"
                }); 
                
                $('#testmodal1').modal('hide');
                $('#eventtype option[value="0"]').attr('selected', 'selected');
                $('#eventtype option[value="0"]').prop('selected', 'selected');
                $("#eventtype").val("0").change();
                document.querySelector('#form-organize').reset();
               
                if(localStorage.lang=="english")
                    alert("Request sent!\nThank you for using Eventer!");
                else
                    alert("Zahtev poslat!\nHvala Vam što koristite Eventer!");
            }
            
        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};      
