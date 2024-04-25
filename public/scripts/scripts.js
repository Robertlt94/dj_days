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
        };
    });
};

document.addEventListener('DOMContentLoaded', () => {
    
    const songsAvailable = document.querySelector('#music-cards');
    const currentSongInfo = document.getElementById('info-banner');
    const currentSongImage = document.getElementById('current-song-visual');
    const form = document.getElementById('song-form');

    function fetchMusicLibrary() {
        fetch('/musicLibrary')
            .then(response => response.json())
            .then(data => {
                songsAvailable.innerHTML = '';
                data.forEach((song, index) => {
                    const li = document.createElement('li');
                    li.innerHTML =
                        `<div class="album-container">
                            <img src="${song.image}" alt="${song.artist}">
                            <div class="album-content">
                                <h3>${song.title}(${song.released})</h3>
                                <p>${song.artist}</p>
                                <a href="#" class="album-select-btn">
                                    More
                                </a>
                            </div>
                        </div>`
                    li.onclick = () => updateNowPlaying(index);
                    songsAvailable.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching songs from music library: ', error));
    };
    
    function updateNowPlaying(index) {
        fetch('/musicLibrary')
            .then(response => response.json())
            .then(musicLibrary => {
                const song = musicLibrary[index];
                currentSongInfo.innerHTML = 
                    `<h3>${song.title} (${song.released}) by ${song.artist}</h3>`
                currentSongImage.innerHTML = 
                    `<img src="${song.image}" alt="${song.artist}">
                    <audio controls autoplay>
                        <source src="${song.url}" type="audio/mp3">
                        This Audio File is not supported
                    </audio>`
                    // Audio is just for show until a YouTube API is integrated
            })
            .catch(error => console.error('Error updating now playing section: ', error));
    };

    form.addEventListener('submit', function(event) {
        // event.preventDefault();
        const newSong = {
            title: document.getElementById('title-input').value,
            artist: document.getElementById('artist-input').value,
            released: document.getElementById('release-date-input').value,
            url: document.getElementById('url-input').value,
            image: document.getElementById('image-input').value ? document.getElementById('image-input').value : "https://gratisography.com/wp-content/uploads/2018/09/gratisography-267H-free-stock-photo.jpg"
        };
        fetch('/musicLibrary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to add the new song');
            }
            return response.JSON();
        })
        .then(() => {
            fetchMusicLibrary();
            form.reset();
        })
        .catch(error => console.error("Error posting new song: ", error));
    })

    fetchMusicLibrary();
}) 