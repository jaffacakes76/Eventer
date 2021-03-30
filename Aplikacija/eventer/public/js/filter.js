document.querySelector('#search').addEventListener('click', (e) => {
    e.preventDefault();
    var conditions = new Array();
    var fields = new Array();
  
    const eventtype=document.querySelector('#etype').value;
    if(eventtype!="0")
    {
      conditions.push(eventtype);
      fields.push("eventtype");
    }
    const priority=document.querySelector('#epriority').value;
    if(priority!="0")
    {
      conditions.push(priority);
      fields.push("priority");
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
    if (localStorage.isadmin=="false")
    {
      var query=db.collection('users/'+localStorage.userId+'/myRequests');
      var i=0;
      conditions.forEach(element => {
        if(fields[i]=="guestnum")
        {   
            if(element=="20")
                query=query.where(fields[i], "<=", 20);
            else if(element=="50")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 21);
            else if(element=="100")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 51);
            else if(element=="500")
                query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 101);
            else
                query=query.where(fields[i], ">=", 501);
        }  
        else
            query=query.where(fields[i], "==", element);


        i++;
      });
  
      query.get().then(snapshot => {
      const list=document.querySelector('.property-list');
      list.innerHTML="";
      if (snapshot.docs.length) {
          let html = '';
          snapshot.docs.forEach(doc => {
              const request = doc.data();
              var oneRequest=``;
              if (localStorage.redirect=="Inbox" && request.status=="Inbox")
                oneRequest=genReqHtml(doc.id, request.eventtype, request.submited, request.guestnum, request.priority, request.startdate, request.starttime);
              else if (localStorage.redirect=="Sent" && request.status=="Sent")
                oneRequest=genReqHtml(doc.id, request.eventtype, request.submited, request.guestnum, request.priority, request.startdate, request.starttime);
              //Dodati jos stvari da lepo izgledaju stavke u listi zahteva
              html += oneRequest;
          });
          
          list.innerHTML+=html;
      } 
    });
    }
    else
    {
        var query;
        if (localStorage.redirect=="Inbox")
            query=db.collection('users/'+localStorage.userId+'/inbox');
        else if (localStorage.redirect=="Sent")
            query=db.collection('users/'+localStorage.userId+'/sent');
  
        var i=0;
        conditions.forEach(element => {
            if(fields[i]=="guestnum")
            {   
                if(element=="20")
                    query=query.where(fields[i], "<=", 20);
                else if(element=="50")
                    query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 21);
                else if(element=="100")
                    query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 51);
                else if(element=="500")
                    query=query.where(fields[i], "<=", parseInt(element)).where(fields[i], ">=", 101);
                else
                    query=query.where(fields[i], ">=", 501); 
                
            }  
            else
                query=query.where(fields[i], "==", element);
            i++;
            });

            query.get().then(snapshot => {
                showRequests(snapshot);
            });
    }
  });


  document.querySelector('#resetFilters').addEventListener('click', (e) => {
        e.preventDefault();
        $("#edate").val("");
        $('#search').click();
  });


  