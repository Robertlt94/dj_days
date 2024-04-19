
const showHomePage = true;
const showFindASongPage = document.getElementById('find-a-song-container').computedStyleMap.
const showAddASongPage = false;
const showAboutPage = false;
const showContactUsPage = false;

function pageNavigation() {

}

function showSearchFilters(){
    let currentStatus = document.getElementById("search-filters");
    console.log(currentStatus.style);
}

document.addEventListener('DOMContentLoaded', () => {

    console.log(showFindASongPage);
// document.getElementById('search-filter-visibility').onclick = () => {showSearchFilters()};

}) 