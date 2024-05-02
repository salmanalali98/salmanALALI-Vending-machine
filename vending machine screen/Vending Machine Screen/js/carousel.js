document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const imageModal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const buyButton = document.getElementById('buyButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const returnButton = document.getElementById('returnButton');
    const closeButtons = document.querySelectorAll('.close');

    let imagesData = [];
    let currentImageIndex = 0;

    fetch('assets/gallery.json')
    .then(response => response.json())
    .then(images => {
        imagesData = images;

        displayGallery(imagesData);

        buyButton.addEventListener('click', function() {
            confirmationModal.style.display = 'block';
        });
    })
    .catch(error => console.error('Error fetching images:', error));

    function displayGallery(images) {
        gallery.innerHTML = '';

        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const img = document.createElement('img');
            img.alt = image.caption;
            img.src = `${image.url}`;

            const info = document.createElement('div');
        info.classList.add('info');

        const caption = document.createElement('p');
        caption.textContent = image.caption;

        const price = document.createElement('p');
        price.textContent = image.price;

            img.addEventListener('click', function() {
                currentImageIndex = index;
                displayImageInModal(currentImageIndex);
                imageModal.style.display = 'block';
            });

            thumbnail.appendChild(img);
            info.appendChild(caption);
            info.appendChild(price); 
            thumbnail.appendChild(info);
            gallery.appendChild(thumbnail);
        });
    }

    function displayImageInModal(index) {
        const image = imagesData[index];
        fullImage.src = `${image.url}`;
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            imageModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        });
    });

    returnButton.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        imageModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == imageModal || event.target == confirmationModal) {
            imageModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        }
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});




console.log('carousel loading...');

var prev = document.getElementById('carouselPrev')
var next = document.getElementById('carouselNext')
var images = document.getElementById('carouselImages')
var caption = document.getElementById('carouselCaption')

fetch('assets/gallery.json').then(function(res) {
res.json().then(function(json) {
for(var i = 0; i < json.length; i++) {
    var image = document.createElement('img');
    image.setAttribute('alt', json[i].caption);
    image.setAttribute('title', json[i].caption);
    image.setAttribute('src', json[i].url);
    images.appendChild(image);
}
setupCarousel(json);

})
}) 

function setupCarousel(json) {

var imageCount = json.length;
var currentImage = 1;
var imageWidth = 500;

prev.addEventListener('click', function() {
    if(currentImage != 1){
        --currentImage;
        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    caption.innerText = json[currentImage - 1].caption;
})

next.addEventListener('click', function() {
    if(currentImage !== imageCount) {
        ++currentImage;
        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    caption.innerText = json[currentImage - 1].caption;
});
}