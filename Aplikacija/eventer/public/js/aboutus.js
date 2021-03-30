function addInfo()
{
    const phone=document.querySelector('#phone').value;
    const address=document.querySelector('#address').value;
    const email=document.querySelector('#email').value;
    const story=document.querySelector('#our-story').value;
    const vision=document.querySelector('#our-vision').value;
    const welcomeMsg=document.querySelector('#welcome-message').value;

    if(phone!="" && address!="" && email!="" && story!="" && vision!="")
       {
        db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=> {

            if(doc.exists)
            {
                db.collection('agencyInfo').doc(localStorage.aboutUsId).update({
                    phone: phone,
                    address: address,
                    email: email,
                    story: story,
                    vision: vision,
                    welMsg: welcomeMsg
                });
            }
            else
            {
                db.collection('agencyInfo').add({
                    phone: phone,
                    address: address,
                    email: email,
                    story: story,
                    vision: vision,
                    welMsg: welcomeMsg,
                });

            }
        });
                 
            $('#testmodal2').modal('hide');

            if(localStorage.lang=="english")
                alert("Data has been successfuly added.");
            else
                alert("Informacije su uspešno dodate.");

            
        } 
    else
    {
        if(localStorage.lang=="english")
            alert("Please fill all fields.");
        else
            alert("Molimo Vas da unesete sve podatke.");

    }
        
};

db.collection('agencyInfo').onSnapshot(snapshot => {
    if (snapshot.docs.length) {
        snapshot.docs.forEach(doc => {
            
            const info = doc.data();

            localStorage.aboutUsId=doc.id;

            const phone=document.querySelectorAll('.phone-field');
            phone.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.phone;
            });

            const address=document.querySelectorAll('.address-field');
            address.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.address;
            });

            const email=document.querySelectorAll('.email-field');
            email.forEach(element => {
                element.innerHTML="";
                element.innerHTML=info.email;
            });

            
            const msg=document.querySelector('#welcome-message-text');
            msg.innerHTML=info.welMsg;

            const story=document.querySelector('#our-story-text');
            story.innerHTML=info.story;

            const vision=document.querySelector('#our-vision-text');
            vision.innerHTML=info.vision;

        });
    }
});

const editAboutUs = document.querySelectorAll('#edit-about-us');
editAboutUs.forEach(element=>{element.onclick = function(){ 
  
        db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=> {

            if(doc.exists)
            {
                document.querySelector('#phone').value=doc.data().phone;
                document.querySelector('#address').value=doc.data().address;
                document.querySelector('#email').value=doc.data().email;
                document.querySelector('#our-story').value=doc.data().story;
                document.querySelector('#our-vision').value=doc.data().vision;
                document.querySelector('#welcome-message').value=doc.data().welMsg;
            }
        });
}
});


document.addEventListener('DOMContentLoaded',function(){
    db.collection('agencyInfo').doc(localStorage.aboutUsId).get().then(doc=>{
        document.querySelector('#cusers').innerHTML=doc.data().users;
        document.querySelector('#cevents').innerHTML=doc.data().events;
        document.querySelector('#cpartners').innerHTML=doc.data().partners;

        $('.timer').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });
});



// (function ($) {
// 	$.fn.countTo = function (options) {
// 		options = options || {};
// 		return $(this).each(function () {
// 			// set options for current element
// 			var settings = $.extend({}, $.fn.countTo.defaults, {
// 				from:            $(this).data('from'),
// 				to:              $(this).data('to'),
// 				speed:           $(this).data('speed'),
// 				refreshInterval: $(this).data('refresh-interval'),
// 				decimals:        $(this).data('decimals')
// 			}, options);
			
// 			// how many times to update the value, and how much to increment the value on each update
// 			var loops = Math.ceil(settings.speed / settings.refreshInterval),
// 				increment = (settings.to - settings.from) / loops;
			
// 			// references & variables that will change with each update
// 			var self = this,
// 				$self = $(this),
// 				loopCount = 0,
// 				value = settings.from,
// 				data = $self.data('countTo') || {};
			
// 			$self.data('countTo', data);
			
// 			// if an existing interval can be found, clear it first
// 			if (data.interval) {
// 				clearInterval(data.interval);
// 			}
// 			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
// 			// initialize the element with the starting value
// 			render(value);
			
// 			function updateTimer() {
// 				value += increment;
// 				loopCount++;
				
// 				render(value);
				
// 				if (typeof(settings.onUpdate) == 'function') {
// 					settings.onUpdate.call(self, value);
// 				}
				
// 				if (loopCount >= loops) {
// 					// remove the interval
// 					$self.removeData('countTo');
// 					clearInterval(data.interval);
// 					value = settings.to;
					
// 					if (typeof(settings.onComplete) == 'function') {
// 						settings.onComplete.call(self, value);
// 					}
// 				}
// 			}
			
// 			function render(value) {
// 				var formattedValue = settings.formatter.call(self, value, settings);
// 				$self.html(formattedValue);
// 			}
// 		});
// 	};
	
// 	$.fn.countTo.defaults = {
// 		from: 0,               // the number the element should start at
// 		to: 0,                 // the number the element should end at
// 		speed: 1000,           // how long it should take to count between the target numbers
// 		refreshInterval: 100,  // how often the element should be updated
// 		decimals: 0,           // the number of decimal places to show
// 		formatter: formatter,  // handler for formatting the value before rendering
// 		onUpdate: null,        // callback method for every time the element is updated
// 		onComplete: null       // callback method for when the element finishes updating
// 	};
	
// 	function formatter(value, settings) {
// 		return value.toFixed(settings.decimals);
// 	}
// }(jQuery));

// jQuery(function ($) {
//   // custom formatting example
//   $('.count-number').data('countToOptions', {
// 	formatter: function (value, options) {
// 	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
// 	}
//   });
  
//   // start all the timers
//   $('.timer').each(count);  
  
//   function count(options) {
// 	var $this = $(this);
// 	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
// 	$this.countTo(options);
//   }
// });