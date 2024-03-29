
function showSearchFilters(){
    let currentStatus = document.getElementById("search-filters");
    console.log(currentStatus.style);
}

document.addEventListener('DOMContentLoaded', () => {

document.getElementById('search-filter-visibility').onclick = () => {showSearchFilters()};

}) 