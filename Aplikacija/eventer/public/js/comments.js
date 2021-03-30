const commentButton=document.querySelector('.site-btn');
commentButton.addEventListener('click', (e)=>{

    e.preventDefault();
    var commEl=document.querySelector('#comment-id');
    const comm=commEl.value;
    if(comm && username)
    {
        const d = new Date();
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        var numComm;

        db.collection('partners').doc(localStorage.selID).get().then(doc=> {
            numComm=doc.data().numComments;
            numComm++;
            commEl.value="";
            db.collection('partners/'+localStorage.selID+'/comments').add(
            {
                num: numComm,
                date: da + " "+ mo +" "+ ye,
                user: username,
                comm: comm,
                likes: 0
            });
            db.collection('partners').doc(localStorage.selID).update({numComments: numComm});
        });

    }
    else if(comm)
    {
        document.querySelector('#login').click();  
    }
});

var loaded=false;
function loadComments(){
db.collection('partners/'+localStorage.selID+'/comments').orderBy('num').onSnapshot(snapshot => {
    if (snapshot.docs.length) {
        let html = '';
        let counter=0;
        const commOption=document.querySelector('.comment-option');
        commOption.innerHTML="";

        snapshot.docs.forEach(doc => {
            const comment = doc.data();

            const oneComm=`
            <div class="single-comment-item first-comment">
                <div class="sc-text">
                    <span>${comment.date}</span>
                    <h5>${comment.user}</h5>
                    <p>${comment.comm}</p>
                    <p>Likes:  ${comment.likes}</p>
                    <a href="javascript:;" id="${doc.id}" onclick="like(this.id);" class="comment-btn">Like</a>
                </div>
            </div>
            `;
        
            var liked=0;
            var likeButton;
            if(db.collection('partners/'+localStorage.selID+'/comments/'+`${doc.id}`+"/usersLiked").get()){
            db.collection('partners/'+localStorage.selID+'/comments/'+`${doc.id}`+"/usersLiked").get().then(snapshot=>{
                if(snapshot.size!=0){
                    likeButton=document.querySelector('#'+`${doc.id}`);
                    snapshot.forEach(elem=>{
                    if(elem.data().id==userId)
                    {
                        liked=1;
                        likeButton.style.backgroundColor="#2cbdb8";
                        likeButton.innerHTML="Liked";
                    } 
               
                    }); 
                    if(!liked)
                    {
                        likeButton.style.backgroundColor="white";
                        likeButton.innerHTML="Like";
                        likeButton.style.color="#707079";
                    }
                }
            });
        }
            html += oneComm;
            counter++;
        });

        commOption.innerHTML+=html;
        loaded=true;

        const comcount=document.querySelector('#comcount');
        if (localStorage.lang=="english")
        {
            if (counter==1)
                comcount.innerHTML=counter+" Comment";
            else
                comcount.innerHTML=counter+" Comments";
        }
        else
        {
            if (counter==1)
                comcount.innerHTML=counter+" Komentar";
            else
                comcount.innerHTML=counter+" Komentara";
        };
    } 
});
}


function like(id){
    if(username) 
    {
        var flag=0;
        var deleteId;
        db.collection('partners/'+localStorage.selID+'/comments').doc(id).get().then(doc=> {
            if(db.collection('partners/'+localStorage.selID+'/comments/'+id+"/usersLiked").get())
            db.collection('partners/'+localStorage.selID+'/comments/'+id+"/usersLiked").get().then(snapshot=>{
                snapshot.forEach(elem=>{
                if(elem.data().id==userId) 
                {
                    flag=1;
                    deleteId=elem.id;
                }
            });   
            var likecount=doc.data().likes;
            if(flag==0){
                db.collection('partners/'+localStorage.selID+'/comments').doc(id).update({likes: ++likecount});
                db.collection('partners/'+localStorage.selID+'/comments/'+id+"/usersLiked").add({id: userId});
            }
            else{
                db.collection('partners/'+localStorage.selID+'/comments').doc(id).update({likes: --likecount});
                db.collection('partners/'+localStorage.selID+'/comments/'+id+"/usersLiked").doc(deleteId).delete();
            }
        });
        });
    }
    else
    {
        document.querySelector('#login').click();
    }
};

auth.onAuthStateChanged(user => {

    if(loaded)
    {
        db.collection('partners/'+localStorage.selID+'/comments').get().then(data=>{

          data.docs.forEach(element => {
            const likeButton=document.querySelector('#'+`${element.id}`);
            var liked=0;
            if(user)
            {
                db.collection('partners/'+localStorage.selID+'/comments/'+`${element.id}`+"/usersLiked").get().then(snapshot=>{
                    snapshot.forEach(elem=>{
                    if(elem.data().id==userId)
                    {
                        liked=1;
                        likeButton.style.backgroundColor="#2cbdb8";
                        likeButton.innerHTML="Liked";
                    } 
                });
            });
            }
            if(!liked || !user)
            {
                likeButton.style.backgroundColor="white";
                likeButton.innerHTML="Like";
                likeButton.style.color="#707079";
            }
        }); 

    });
    }
  });