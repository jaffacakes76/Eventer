function subRat()
{
    var srat;
    var brat;
    var crat;
    var frat;
    var rat;

    var ratingscount=0;
    var ratingtotal=0;

    if(document.querySelector('#ratingspace').value!="")
    {
        srat=parseInt(document.querySelector('#ratingspace').value);

        db.collection('events').doc(localStorage.selEv).update({
            ratingspace: srat
        });

        let rating,nrates;
        db.collection('partners').doc(spaceid).get().then(doc=>{
            rating=doc.data().rating;
            nrates=doc.data().nrates;

            srat+=rating*nrates;
            srat/=++nrates;

            db.collection('partners').doc(spaceid).update({
                rating: srat,
                nrates: nrates
            });

            ratingtotal+=srat;
            ++ratingscount;
        });
    };

    if(document.querySelector('#ratingband').value!="")
    {
        brat=parseInt(document.querySelector('#ratingband').value);

        db.collection('events').doc(localStorage.selEv).update({
            ratingband: brat
        });
        
        let rating,nrates;
        db.collection('partners').doc(bandid).get().then(doc=>{
            rating=doc.data().rating;
            nrates=doc.data().nrates;

            brat+=rating*nrates;
            brat/=++nrates;

            db.collection('partners').doc(bandid).update({
                rating: brat,
                nrates: nrates
            });

            ratingtotal+=brat;
            ++ratingscount;
        });
    };

    if(document.querySelector('#ratingcatering').value!="")
    {
        crat=parseInt(document.querySelector('#ratingcatering').value);

        db.collection('events').doc(localStorage.selEv).update({
            ratingcatering: crat
        });

        let rating,nrates;
        db.collection('partners').doc(cateringid).get().then(doc=>{
            rating=doc.data().rating;
            nrates=doc.data().nrates;

            crat+=rating*nrates;
            crat/=++nrates;

            db.collection('partners').doc(cateringid).update({
                rating: crat,
                nrates: nrates
            });

            ratingtotal+=crat;
            ++ratingscount;
        });
    };

    if(document.querySelector('#ratingphotograph').value!="")
    {
        frat=parseInt(document.querySelector('#ratingphotograph').value);

        db.collection('events').doc(localStorage.selEv).update({
            ratingphotograph: frat
        });

        let rating,nrates;
        db.collection('partners').doc(photographid).get().then(doc=>{
            rating=doc.data().rating;
            nrates=doc.data().nrates;

            frat+=rating*nrates;
            frat/=++nrates;

            db.collection('partners').doc(photographid).update({
                rating: frat,
                nrates: nrates
            });

            ratingtotal+=frat;
            ++ratingscount;
        });
    };
    
    if(document.querySelector('#rating').value!="")
    {
        rat=parseInt(document.querySelector('#rating').value);

        db.collection('events').doc(localStorage.selEv).update({rating: rat});

        ratingtotal+=rat;
        ++ratingscount;
    };

    if(ratingscount==0)
        ratingtotal=0;
    else
        ratingtotal/=ratingscount;

    const imps=document.querySelector('#impe').value;
    db.collection('events').doc(localStorage.selEv).update({impressions: imps, ratingtotal: ratingtotal});

    $('#testmodal3').modal('hide');

    if(localStorage.lang=="english")
        alert("Ratings have been submited.");
    else
        alert("Ocene uspešno unete.");
}
