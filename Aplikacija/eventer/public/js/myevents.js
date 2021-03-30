 
document.addEventListener("DOMContentLoaded",function() {
    var text;
    const breadcrumb=document.querySelector('.breadcrumb-text');

    if (localStorage.lang=="english")
    {
        if(localStorage.redirectEvents=="My Events")
            text="My Events";
        else
            text="Events";

        var html=
            `<h2 lang-switch>Event List</h2>
            <div class="breadcrumb-option">
                <a href="./home.html"><i class="fa fa-home"></a></i><a href="./home.html" lang-switch>Home</a>
                <span lang-switch>${text}</span>
            </div>`;
    }
    else
    {
        if(localStorage.redirectEvents=="My Events")
            text="Moji Događaji";
        else
            text="Događaji";

        var html=
            `<h2 lang-switch>Lista Događaja</h2>
            <div class="breadcrumb-option">
                <a href="./home.html"><i class="fa fa-home"></a></i><a href="./home.html" lang-switch>Početna</a>
                <span lang-switch>${text}</span>
            </div>`;
    }
    
    breadcrumb.innerHTML=html;
    
});
         
    const buy = document.querySelector('#st-buy');
    
    buy.addEventListener('change', (e) => {
        localStorage.redirectEvents="All Events";
        window.location.href="./events.html";
    });
    
    const rent = document.querySelector('#st-rent');
    
    rent.addEventListener('change', (e) => {
        localStorage.redirectEvents="My Events";
        window.location.href="./events.html";
    });
   
    
    
    