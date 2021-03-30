//izbor jezika
const english=document.querySelectorAll('#english');
const serbian=document.querySelectorAll('#serbian');
const flag=document.querySelectorAll('#flag');
const language=document.querySelectorAll('#language');

var MLstrings = [
  {
    english: 'Organize event',
    serbian: 'Organizuj događaj'
  },
  {
    english: 'Home',
    serbian: 'Početna'
  },
  {
    english: 'Events',
    serbian: 'Događaji'
  },
  {
    english: 'About us',
    serbian: 'O Nama'
  },
  {
    english: 'About Us',
    serbian: 'O Nama'
  },
  {
    english: 'Partners',
    serbian: 'Saradnici'
  },
  {
    english: 'Contact',
    serbian: 'Kontakt'
  },
  {
    english: 'Contact Us',
    serbian: 'Kontaktirajte Nas'
  },
  {
    english: 'Log in',
    serbian: 'Uloguj se'
  },
  {
    english: 'Log In',
    serbian: 'Uloguj Se'
  },
  {
    english: 'Sign up',
    serbian: 'Prijavi se'
  },
  {
    english: 'Sign Up',
    serbian: 'Prijavi Se'
  },
  {
    english: 'Log out',
    serbian: 'Odjavi se'
  },
  {
    english: 'Phone:',
    serbian: 'Telefon:'
  },
  {
    english: 'Address:',
    serbian: 'Adresa:'
  },
  {
    english: 'Inbox',
    serbian: 'Primljeni'
  },
  {
    english: 'Sent',
    serbian: 'Poslati'
  },
  {
    english: 'My Events',
    serbian: 'Moji događaji'
  },
  {
    english: 'My Profile',
    serbian: 'Moj Profil'
  },
  {
    english: 'First Name:',
    serbian: 'Ime:'
  },
  {
    english: 'Last Name:',
    serbian: 'Prezime:'
  },
  {
    english: 'Username:',
    serbian: 'Korisničko ime:'
  },
  {
    english: 'Edit Page',
    serbian: 'Izmeni Stranicu'
  },
  {
    english: 'Hello! Welcome to Eventer.',
    serbian: 'Zdravo! Dobro došli na Eventer.'
  },
  {
    english: 'Our Story',
    serbian: 'Naša Priča'
  },
  {
    english: 'Our Vision',
    serbian: 'Naša Vizija'
  },
  {
    english: 'We Are Here To Help You',
    serbian: 'Tu Smo Da Vam Pomognemo'
  },
  {
    english: 'Our Agents',
    serbian: 'Naši Agenti'
  },
  {
    english: 'Forgot Password?',
    serbian: 'Zaboravili ste lozinku?'
  },
  {
    english: "Don't have an account? Create one!",
    serbian: "Nemate nalog? Napravite ga!"
  },
  {
    english: 'Create Account',
    serbian: 'Napravite Nalog'
  },
  {
    english: 'Already have an account? Login here!',
    serbian: 'Već imate nalog? Ulogujte se ovde!'
  },
  {
    english: 'Organize Your Event',
    serbian: 'Organizujte Vaš Događaj'
  },
  {
    english: '*Type of Event:',
    serbian: '*Tip Događaja:'
  },
  {
    english: 'Select Type of Event',
    serbian: 'Izaberite Tip Događaja'
  },
  {
    english: 'Birthday',
    serbian: 'Rođendan'
  },
  {
    english: 'Wedding',
    serbian: 'Venčanje'
  },
  {
    english: 'New Year',
    serbian: 'Nova Godina'
  },
  {
    english: 'Conference',
    serbian: 'Konferencija'
  },
  {
    english: 'Other (specify in the additional requests field)',
    serbian: 'Drugo (specificirajte u polju za dodatne zahteve)'
  },
  {
    english: 'Other',
    serbian: 'Drugo'
  },
  {
    english: '*Event Start:',
    serbian: '*Početak Događaja:'
  },
  {
    english: '*Event End:',
    serbian: '*Kraj Događaja:'
  },
  {
    english: '*Number of Guests (min 10):',
    serbian: '*Broj Gostiju (min 10):'
  },
  {
    english: 'Choose Space:',
    serbian: 'Izaberi Prostor:'
  },
  {
    english: 'Choose Band:',
    serbian: 'Izaberi Bend:'
  },
  {
    english: 'Choose Catering:',
    serbian: 'Izaberi Ketering:'
  },
  {
    english: 'Choose Photographer:',
    serbian: 'Izaberi Fotografa:'
  },
  {
    english: 'Priority:',
    serbian: 'Prioritet:'
  },
  {
    english: 'Normal',
    serbian: 'Uobičajen'
  },
  {
    english: 'High',
    serbian: 'Visok'
  },
  {
    english: 'Additional Requests:',
    serbian: 'Dodatni zahtevi:'
  },
  {
    english: 'Close',
    serbian: 'Zatvori'
  },
  {
    english: 'Submit Request',
    serbian: 'Pošalji Zahtev'
  },
  {
    english: 'Info About Agency',
    serbian: 'Informacije o Agenciji'
  },
  {
    english: 'Welcome Message:',
    serbian: 'Poruka Dobrodošlice:'
  },
  {
    english: 'Our Story:',
    serbian: 'Naša Priča:'
  },
  {
    english: 'Our Vision:',
    serbian: 'Naša Vizija:'
  },
  {
    english: 'Save',
    serbian: 'Sačuvaj'
  },
  {
    english: 'Get In Touch',
    serbian: 'Javite Nam Se'
  },
  {
    english: 'Send Message',
    serbian: 'Pošalji Poruku'
  },
  {
    english: 'Pictures:',
    serbian: 'Slike:'
  },
  {
    english: 'Map',
    serbian: 'Mapa'
  },
  {
    english: 'Leave A Comment',
    serbian: 'Ostavi Komentar'
  },
  {
    english: 'Send Comment',
    serbian: 'Pošalji Komentar'
  },
  {
    english: 'Partner Page Content',
    serbian: 'Sadržaj Stranice Saradnika'
  },
  {
    english: 'Name:',
    serbian: 'Naziv:'
  },
  {
    english: 'Website:',
    serbian: 'Sajt:'
  },
  {
    english: 'Type of Service:',
    serbian: 'Vrsta Usluge:'
  },
  {
    english: 'Space',
    serbian: 'Prostor'
  },
  {
    english: 'Music',
    serbian: 'Muzika'
  },
  {
    english: 'Catering',
    serbian: 'Ketering'
  },
  {
    english: 'Photographer',
    serbian: 'Fotograf'
  },
  {
    english: 'Work Hours:',
    serbian: 'Radno Vreme:'
  },
  {
    english: 'to',
    serbian: 'do'
  },
  {
    english: 'Description:',
    serbian: 'Opis:'
  },
  {
    english: 'Description',
    serbian: 'Opis'
  },
  {
    english: 'Overview',
    serbian: 'Pregled'
  },
  {
    english: 'Note',
    serbian: 'Napomena'
  },
  {
    english: 'Calendar',
    serbian: 'Kalendar'
  },
  {
    english: 'Partner Note (admin):',
    serbian: 'Napomena o Saradniku (admin):'
  },
  {
    english: 'Save Changes',
    serbian: 'Sačuvaj Izmene'
  },
  {
    english: 'Partner List',
    serbian: 'Lista Saradnika'
  },
  {
    english: 'Search Partners',
    serbian: 'Pretraži Saradnike'
  },
  {
    english: 'Search',
    serbian: 'Pretraga'
  },
  {
    english: 'Add New Partner',
    serbian: 'Dodaj Novog Saradnika'
  },
  {
    english: 'Add Partner',
    serbian: 'Dodaj Saradnika'
  },
  {
    english: 'Event List',
    serbian: 'Lista Događaja'
  },
  {
    english: 'Search Events',
    serbian: 'Pretraži Događaje'
  },
  {
    english: 'Search Requests',
    serbian: 'Pretraži Zahteve'
  },
  {
    english: 'Mine',
    serbian: 'Moji'
  },
  {
    english: 'All',
    serbian: 'Svi'
  },
  {
    english: 'Requests',
    serbian: 'Zahtevi'
  },
  {
    english: 'Reset Date',
    serbian: 'Resetuj Datum'
  },
  {
    english: 'My Requests',
    serbian: 'Moj Zahtevi'
  },
  {
    english: 'Priority: Normal',
    serbian: 'Prioritet: Uobičajen'
  },
  {
    english: 'Priority: High',
    serbian: 'Prioritet: Visok'
  },
  {
    english: 'Event Details',
    serbian: 'Detalji Događaja'
  },
  {
    english: 'Type of Event:',
    serbian: 'Tip Događaja:'
  },
  {
    english: 'Event Start:',
    serbian: 'Početak Događaja:'
  },
  {
    english: 'Event End:',
    serbian: 'Kraj Događaja:'
  },
  {
    english: 'Number of Guests:',
    serbian: 'Broj Gostiju:'
  },
  {
    english: 'Space:',
    serbian: 'Prostor:'
  },
  {
    english: 'Music:',
    serbian: 'Muzika:'
  },
  {
    english: 'Catering:',
    serbian: 'Ketering:'
  },
  {
    english: 'Photographer:',
    serbian: 'Fotograf:'
  },
  {
    english: 'Impressions:',
    serbian: 'Utisci:'
  },
  {
    english: 'Your Impressions:',
    serbian: 'Vaši Utisci:'
  },
  {
    english: 'Submit Ratings',
    serbian: 'Sačuvaj Ocene'
  },
  {
    english: 'Users ',
    serbian: 'Korisnika'
  },
  {
    english: 'Events ',
    serbian: 'Događaja'
  },
  {
    english: 'Partners ',
    serbian: 'Saradnika'
  },
  {
    english: 'Cancel Request',
    serbian: 'Otkaži Zahtev'
  },
  {
    english: 'Confirm Request',
    serbian: 'Potvrdi Zahtev'
  },
  {
    english: 'Submit',
    serbian: 'Pošalji'
  },
  {
    english: 'Block Partner',
    serbian: 'Blokiraj Saradnika'
  },
  {
    english: 'Unblock Partner',
    serbian: 'Odblokiraj Saradnika'
  },
  {
    english: 'Top Events For You',
    serbian: 'Najbolji Događaji Za Vas'
  },
  {
    english: 'Top Events',
    serbian: 'Najbolji Događaji'
  },
  {
    english: 'View All Events',
    serbian: 'Pregled Svih Događaja'
  },
  {
    english: 'Organize Your Wedding',
    serbian: 'Organizujte Vaše Venčanje'
  },
  {
    english: 'Make Your Birthday Memorable',
    serbian: 'Učinite Vaš Rođendan Nezaboravnim'
  },
  {
    english: 'Cheers To a New Year',
    serbian: 'Nazdravite Novoj Godini'
  },
  {
    english: 'Plan Your Conference',
    serbian: 'Isplanirajte Vašu Konferenciju'
  },
  {
    english: 'Are you sure?',
    serbian: 'Da li ste sigurni?'
  },
  {
    english: 'Are you sure you want to confirm this request?',
    serbian: 'Da li ste sigurni da želite da potvrdite ovaj zahtev?'
  },
  {
    english: 'Are you sure you want to cancel this request?',
    serbian: 'Da li ste sigurni da želite da otkažete ovaj zahtev?'
  },
  {
    english: 'Back',
    serbian: 'Nazad'
  },
  {
    english: 'Yes',
    serbian: 'Da'
  },
  {
    english: 'Sender:',
    serbian: 'Poslao/la:'
  }
];


english.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.lang="english";
    location.reload();
  });
});

serbian.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.lang="serbian";
    location.reload();
  });
});


document.addEventListener('onload',changeLang());

function changeLang()
{
  if(localStorage.lang=="serbian")
  {
    language.forEach(element => {
      element.innerHTML="Srpski"
    });
    flag.forEach(element => {
      element.src="img/flag-serbian.png";
    });
  }
  else
  {
    language.forEach(element => {
      element.innerHTML="English"
    });
    flag.forEach(element => {
      element.src="img/flag.png";
    });
  };

  resolveAllMLStrings();
  if (window.location.pathname == "/requests.html")       //za deploy
  //if (window.location.pathname == "/public/requests.html")  //za live server
  {
    loadRequests();
  };
  if (window.location.pathname == "/events.html")       //za deploy
  //if (window.location.pathname == "/public/events.html")  //za live server
  {
    loadEvents();
  };
  if (window.location.pathname == "/partner.html")       //za deploy
  //if (window.location.pathname == "/public/partner.html")  //za live server
  {
    loadPartnerData();
    loadComments();
  };
  loadPartnerSelect();
};


function resolveAllMLStrings() {
  let stringsToBeResolved = document.querySelectorAll('[lang-switch]');
  stringsToBeResolved.forEach(stringToBeResolved => {
      let originaltextContent = stringToBeResolved.textContent;
      let resolvedText = resolveMLString(originaltextContent, MLstrings);
      stringToBeResolved.textContent = resolvedText;
  });
}

function resolveMLString(stringToBeResolved, MLstrings) {
    var matchingStringIndex = MLstrings.find(function(stringObj) {
        // Create an array of the objects values:
        let stringValues = Object.values(stringObj);
        // Now return if we can find that string anywhere in there
        return stringValues.includes(stringToBeResolved);
    });
    if (matchingStringIndex) {
        return matchingStringIndex[localStorage.lang];
    } else {
        // If we don't have a match in our language strings, return the original
        return stringToBeResolved;
    }
}
