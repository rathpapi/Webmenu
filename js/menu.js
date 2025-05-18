/**
 * Menu functionality
 * Handles displaying menu items and categories
 */

class MenuService {
    constructor() {
        this.menuItems = [];
        this.categories = [];
    }

    async initialize() {
        // Force use of sample data for testing
        this.menuItems = this._getSampleMenuItems();
        await storageService.saveMenuItems(this.menuItems);

        // Extract categories
        this.categories = [...new Set(this.menuItems.map(item => item.category))];
        return this.categories;
    }

    getItemsByCategory(category) {
        return this.menuItems.filter(item => item.category === category);
    }

    getItem(id) {
        return this.menuItems.find(item => item.id === id);
    }

    getAllItems() {
        return this.menuItems;
    }

    getCategories() {
        return this.categories;
    }

    _getSampleMenuItems() {
        return [
            {
                id: '1',
                name: 'បាយជ្រូកស្រួយ',
                description: 'Crispy Pork Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file.svg', // Updated to the provided image
            },
            {
                id: '2',
                name: 'បាយទាខ្វៃ',
                description: 'Roasted Duck Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (1).svg', // Updated to the provided image
            },
            {
                id: '3',
                name: 'បាយភ្លៅមាន់ចៀន',
                description: 'Fried Chicken Thigh Rice',
                price: 4.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (2).svg', // Updated to the provided image
            },
            {
                id: '4',
                name: 'បាយមាន់ សុីងហ្គាពូរ',
                description: 'Singapore Chicken Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (3).svg', // Updated to the provided image
            },
            {
                id: '5',
                name: 'បាយមាន់_សុីងហ្គាពូរ_ឈុត_២នាក់',
                description: 'Singapore Chicken Rice 2 Persons',
                price: 7.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (4).svg', // Updated to the provided image
            },
            {
                id: '6',
                name: 'បាយសាច់ជ្រូកអាំងទឹកឃ្មុំ',
                description: 'Honey Roasted Pork Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (5).svg', // Updated to the provided image
            },
            {
                id: '7',
                name: 'បាយសាសុីវ',
                description: 'Char Siu Pork Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (6).svg', // Updated to the provided image
            },
            {
                id: '8',
                name: 'បាយស្លាបមាន់ចៀន',
                description: 'Fried Chicken Wing Rice',
                price: 3.00,
                category: 'Rice', // Changed from 'Burgers' to 'Rice'
                imageUrl: 'image/file (7).svg', // Updated to the provided image
            },
            {
                id: '9',
                name: 'ហ្វឺកាំង ធម្មតា',
                description: 'Pho Kang',
                prices: 4.80,// Single price instead of prices object
                category: 'PHO KANG',
                imageUrl: 'image/file (8).svg',
            },
            {
                id: '10',
                name: 'ហ្វឺអណ្តាតគោ',
                description: 'Pho Ox Tongue',
                prices: { small: 3.80, big: 4.80 }, // <-- FIXED
                category: 'PHO KANG',
                imageUrl: 'image/file (9).svg',
            },
            {
                id: '11',
                name: 'ហ្វឺកាំង_ធម្មតា_សាច់អូស្ត្រាលី',
                description: 'Pho Kang with Australian Beef',
                prices: 5.80,// Single price instead of prices object
                category: 'PHO KANG',
                imageUrl: 'image/file (10).svg',
            },
            //{
                //id: '12',
                //name: 'ហ្វឺប្រហិតមូល',
                //description: 'Pho Meatball',
               // prices: 4.80,// Single price instead of prices object
                //category: 'PHO KANG',
                //imageUrl: 'image/file (11).svg',
            //},
            {
                id: '13',
                name: 'ហ្ហ្វឺសាច់គោប្រហិតមូល',
                description: 'Pho Beef Meatball',
                prices: { small: 3.80, big: 4.80 }, // <-- FIXED
                category: 'PHO KANG',
                imageUrl: 'image/file (12).svg',
            },
            {
                id: '14',
                name: 'ហ្វឺសាច់ឆ្ងក',
                description: 'Pho Beef Brisket',
                prices: { small: 4.80, big: 5.80 }, // <-- FIXED
                category: 'PHO KANG',
                imageUrl: 'image/file (13).svg',
            },
            {
                id: '15',
                name: 'ហ្វឺសរសៃកែង',
                description: 'Pho Beef Tendor',
                prices: { small: 3.80, big: 4.80 }, // <-- FIXED
                category: 'PHO KANG',
                imageUrl: 'image/file (14).svg',
            },
            {
                id: '16',
                name: 'ហ្វឺកាំង ពិសេស',
                description: 'Pho Kang Special',
                prices: 5.80,// Single price instead of prices object
                category: 'PHO KANG',
                imageUrl: 'image/file (15).svg',
            },
            {
                id: '17',
                name: 'ហ្វឺកាំង_ពិសេស_អូស្ត្រាលី',
                description: 'Pho kang Special with Australian Beef',
                prices: 6.80,// Single price instead of prices object
                category: 'PHO KANG',
                imageUrl: 'image/file (16).svg',
            },
            {
                id: '18',
                name: 'ហ្វឺកាំង ទឹកពុះពិសេស',
                description: 'Pho kang Boiling Special Beef',
                price: 6.80,
                category: 'PHO KANG-Boiling', // Changed from 'Salads' to 'PHO KANG-Boiling'
                imageUrl: 'image/file (17).svg',
            },
            {
                id: '19',
                name: 'ហ្វឺកាំង_ទឹកពុះពិសេស_សាច់ជប៉ុន_Wagyu',
                description: 'Pho kang Boiling Special Wagyu Beef A5',
                price: 26.80,
                category: 'PHO KANG-Boiling', // Changed from 'Salads' to 'PHO KANG-Boiling'
                imageUrl: 'image/file (18).svg',
            },
            {
                id: '19',
                name: 'ហ្វឺកាំង_ធម្មតា_សាច់អូស្ត្រាលី',
                description: 'Pho kang Boiling Special Australian Beef',
                price: 7.80,
                category: 'PHO KANG-Boiling', // Changed from 'Salads' to 'PHO KANG-Boiling'
                imageUrl: 'image/file (19).svg',
            },
            {
                id: '20',
                name: 'ប្រហិតសាច់គោ add-on',
                description: 'Beef meatball add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (20).svg',
            },
            {
                id: '21',
                name: 'ពងមាន់ add-on',
                description: 'Egg add-on',
                price: 0.50,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (21).svg',
            },
            {
                id: '22',
                name: 'ពោះគោ ១០០ស្រទាប់ add-on',
                description: 'Beef Tripe add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (22).svg',
            },
            {
                id: '23',
                name: 'មីម៉ាម៉ា add-on',
                description: 'Mama Noodles add-on',
                price: 0.50,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (23).svg',
            },
            {
                id: '24',
                name: 'សរសៃកែង Add-on',
                description: 'Beef Tendon add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (24).svg',
            },
            {
                id: '25',
                name: 'សាច់កំភួន add-on',
                description: 'Beef Shin Shank add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (25).svg',
            },
            {
                id: '26',
                name: 'សាច់គោចំឡក add-on',
                description: 'Beef Tenderloin add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (26).svg',
            },
            {
                id: '27',
                name: 'សាច់គោអូស្ត្រាលី add-on',
                description: 'Australian Beef add-on',
                price: 3.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (27).svg',
            },
            {
                id: '28',
                name: 'សាច់ឆ្ងក add-on',
                description: 'Beef Brisket add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (28).svg',
            },
            {
                id: '29',
                name: 'សាច់ជ្រូកស្រួយ Add-on',
                description: 'Crispy Pork add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (29).svg',
            },
            {
                id: '30',
                name: 'សាច់ជ្រូកអាំងទឹកឃ្មុំ_Add_on',
                description: 'Honey Roasted Pork add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (30).svg',
            },
            {
                id: '31',
                name: 'សាច់ទាខ្វៃ Add-on-2',
                description: 'Roasted Duck add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (31).svg',
            },
            {
                id: '32',
                name: 'សាច់សាសុីវ Add-on',
                description: 'Char Siu Pork add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (32).svg',
            },
            {
                id: '33',
                name: 'អណ្តាតគោ add-on',
                description: 'Ox Tongue add-on',
                price: 2.00,
                category: 'Add-ON', // Changed from 'Sides' to 'Add-ON'
                imageUrl: 'image/file (33).svg',
            },

        ];
    }
}

const menuService = new MenuService();

// Menu UI
const MenuUI = {
    renderCategoryTabs(categories) {
        console.log('Categories:', categories); // Debugging line
        const tabsContainer = document.getElementById('category-tabs');
        tabsContainer.innerHTML = '';
        
        categories.forEach((category, index) => {
            const tabElement = document.createElement('div');
            tabElement.className = `category-tab ${index === 0 ? 'active' : ''}`;
            tabElement.dataset.category = category;
            
            // Add icon based on category
            const icon = this.getCategoryIcon(category);
            tabElement.innerHTML = `
                <span class="material-icons">${icon}</span>
                ${category}
            `;
            
            tabElement.addEventListener('click', () => {
                document.querySelectorAll('.category-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                tabElement.classList.add('active');
                this.renderMenuItems(category);
                animationManager.animateMenuItems();
            });
            
            tabsContainer.appendChild(tabElement);
        });
        
        // Show items for the first category by default
        if (categories.length > 0) {
            this.renderMenuItems(categories[0]);
        }
    },
    
    renderMenuItems(category) {
        const menuItemsContainer = document.getElementById('menu-items');
        menuItemsContainer.innerHTML = '';

        const items = menuService.getItemsByCategory(category);

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.dataset.id = item.id;

            let priceHtml = '';
            let sizeSelectorHtml = '';

            // PHO KANG with both small and big prices
            if (
                item.category === 'PHO KANG' &&
                item.prices &&
                typeof item.prices === 'object' &&
                typeof item.prices.small === 'number' &&
                typeof item.prices.big === 'number'
            ) {
                priceHtml = `<span class="menu-item-price">$<span class="price-value">${item.prices.small.toFixed(2)}</span></span>`;
                sizeSelectorHtml = `
                    <div class="size-selector">
                        <label>
                            <input type="radio" name="size-${item.id}" value="small" checked> Small
                        </label>
                        <label>
                            <input type="radio" name="size-${item.id}" value="big"> Big
                        </label>
                    </div>
                `;
            }
            // PHO KANG with only a single price (as price or as prices: number)
            else if (
                item.category === 'PHO KANG' &&
                (
                    (typeof item.price === 'number') ||
                    (typeof item.prices === 'number')
                )
            ) {
                const singlePrice = typeof item.price === 'number' ? item.price : item.prices;
                priceHtml = `<span class="menu-item-price">$${singlePrice.toFixed(2)}</span>`;
                // No size selector
            }
            // Other categories
            else if (typeof item.price === 'number') {
                priceHtml = `<span class="menu-item-price">$${item.price.toFixed(2)}</span>`;
            } else {
                priceHtml = `<span class="menu-item-price">N/A</span>`;
            }

            itemElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        ${priceHtml}
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${sizeSelectorHtml}
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <span class="material-icons">add_shopping_cart</span> Add to Cart
                    </button>
                </div>
            `;

            menuItemsContainer.appendChild(itemElement);
        });

        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.currentTarget.dataset.id;
                const item = menuService.getItem(id);

                let selectedSize = null;
                let price = item.price;

                if (
                    item.category === 'PHO KANG' &&
                    item.prices &&
                    typeof item.prices === 'object' &&
                    typeof item.prices.small === 'number' &&
                    typeof item.prices.big === 'number'
                ) {
                    const sizeInput = document.querySelector(`input[name="size-${item.id}"]:checked`);
                    selectedSize = sizeInput ? sizeInput.value : 'small';
                    price = item.prices[selectedSize];
                } else if (
                    item.category === 'PHO KANG' &&
                    typeof item.prices === 'number'
                ) {
                    price = item.prices;
                }

                const cartItem = { ...item, selectedSize, price };
                cartService.addItem(cartItem);
                uiManager.showToast(`Added ${item.name}${selectedSize ? ' (' + selectedSize + ')' : ''} to cart`);
                animationManager.animateAddToCart(event.currentTarget);
            });
        });

        // Update price display on size change
        document.querySelectorAll('.size-selector input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                const itemId = event.target.name.replace('size-', '');
                const item = menuService.getItem(itemId);
                const priceValue = event.target.value === 'big' ? item.prices.big : item.prices.small;
                const priceSpan = document.querySelector(`[data-id="${itemId}"] .price-value`);
                if (priceSpan) priceSpan.textContent = priceValue.toFixed(2);
            });
        });

        document.querySelectorAll('.size-selector').forEach(selector => {
            selector.addEventListener('click', function(e) {
                if (e.target.classList.contains('size-btn')) {
                    const btns = this.querySelectorAll('.size-btn');
                    btns.forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    const size = e.target.dataset.size;
                    const itemId = this.dataset.itemId;
                    const item = menuService.getItem(itemId);
                    const price = item.prices[size];
                    const priceSpan = document.querySelector(`[data-id="${itemId}"] .price-value`);
                    if (priceSpan) priceSpan.textContent = price.toFixed(2);
                }
            });
        });
    },
    
    getCategoryIcon(category) {
        switch (category.toLowerCase()) {
            case 'rice':
                return 'rice_bowl'; // Icon for Rice
            case 'pho kang': // Added case for 'PHO KANG'
                return 'ramen_dining'; // Example icon for PHO KANG
            case 'pho kang-boiling': // Added case for 'PHO KANG-Boiling'
                return 'star'; // Example icon for PHO KANG-Boiling
            case 'add-on': // Added case for 'Add-ON'
                return 'add_circle'; // Example icon for Add-ON
            
            default:
                return 'restaurant_menu';
        }
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await menuService.initialize();
    const categories = menuService.getCategories();
    MenuUI.renderCategoryTabs(categories);
    // This will render the first category by default
});

console.log(menuService.getItemsByCategory('Rice'));

/* HTML Structure
<div id="menu-items"></div>
*/