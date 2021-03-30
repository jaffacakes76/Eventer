// logout 
const logout = document.querySelectorAll('#logout');
    logout.forEach(element => {
    element.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href="./home.html";
    });
});

const buy = document.querySelector('#st-buy');
buy.addEventListener('change', (e) => {
    localStorage.redirect="Inbox";
    window.location.href="./requests.html";
});

const rent = document.querySelector('#st-rent');
rent.addEventListener('change', (e) => {
    localStorage.redirect="Sent";
    window.location.href="./requests.html";
});
