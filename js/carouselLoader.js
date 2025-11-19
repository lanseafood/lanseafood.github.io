// CarouselLoader - Dynamically loads carousel items from separate files
export class CarouselLoader {
    constructor(carouselSelector = '.carousel') {
        this.carousel = $(carouselSelector);
    }
    async loadItems() {
        const items = [
            { selector: '.item.a', file: 'carousel-items/home.html' },
            { selector: '.item.b', file: 'carousel-items/projects.html' },
            { selector: '.item.c', file: 'carousel-items/art.html' },
            { selector: '.item.d', file: 'carousel-items/connect.html' }
        ];
        const loadPromises = items.map(item => {
            return fetch(item.file)
                .then(response => response.text())
                .then(html => {
                const $item = $(item.selector);
                if ($item.length) {
                    $item.html(html);
                }
            })
                .catch(error => {
                console.error(`Error loading ${item.file}:`, error);
            });
        });
        await Promise.all(loadPromises);
    }
}
// Auto-load carousel items when DOM is ready
$(document).ready(function () {
    const loader = new CarouselLoader();
    loader.loadItems();
});
//# sourceMappingURL=carouselLoader.js.map