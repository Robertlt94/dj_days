const navOptions = [
    {
        navId: 'nav-find-a-song',
        pageId: 'find-a-song-container'
    },
    {
        navId: 'nav-add-a-song',
        pageId: 'add-a-song-container'
    },
    {
        navId: 'nav-about',
        pageId: 'about-container'
    },
    {
        navId: 'nav-contact-us',
        pageId: 'contact-us-container'
    }
]

function showPage(id) {
    navOptions.forEach(option => {
        if(option.navId != id){
            document.getElementById(option.pageId).style.visibility = "hidden";
            return;
        }else {
            document.getElementById(option.pageId).style.visibility = "visible";
            return;
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {

    

}) 