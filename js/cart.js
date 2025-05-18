/**
 * Cart functionality
 * Handles the shopping cart operations
 */

class CartService {
    constructor() {
        this.items = [];
        this.listeners = [];
    }

    async initialize() {
        await this.loadFromStorage();
        this.notifyListeners();
    }

    addItem(menuItem) {
        // Check for duplicate IDs in the menu
        if (this.items.filter(item => item.menuItem.id === menuItem.id).length > 1) {
            console.warn('Duplicate menuItem.id detected:', menuItem.id);
        }
        const existingItem = this.items.find(item => item.menuItem.id === menuItem.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                menuItem: menuItem,
                quantity: 1
            });
        }
        this.saveToStorage();
        this.notifyListeners();
    }

    removeItem(menuItemId) {
        this.items = this.items.filter(item => item.menuItem.id !== menuItemId);
        this.saveToStorage();
        this.notifyListeners();
    }

    updateQuantity(menuItemId, quantity) {
        const item = this.items.find(item => item.menuItem.id === menuItemId);
        
        if (item) {
            item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
            this.saveToStorage();
            this.notifyListeners();
        }
    }

    incrementQuantity(menuItemId) {
        const item = this.items.find(item => item.menuItem.id === menuItemId);
        
        if (item) {
            item.quantity += 1;
            this.saveToStorage();
            this.notifyListeners();
        }
    }

    decrementQuantity(menuItemId) {
        const item = this.items.find(item => item.menuItem.id === menuItemId);
        
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                this.saveToStorage();
                this.notifyListeners();
            } else {
                this.removeItem(menuItemId);
            }
        }
    }

    clear() {
        this.items = [];
        this.saveToStorage();
        this.notifyListeners();
    }

    getItems() {
        return this.items;
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * 0.1; // 10% tax
    }

    getTotal() {
        return this.getSubtotal(); // No tax
    }

    isEmpty() {
        return this.items.length === 0;
    }

    checkout() {
        if (this.isEmpty()) {
            return null;
        }

        const order = {
            id: this.generateOrderId(),
            items: [...this.items],
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            total: this.getTotal(),
            timestamp: new Date(),
            status: 'Pending'
        };

        this.clear();
        return order;
    }

    generateOrderId() {
        return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    async saveToStorage() {
        await storageService.saveCart(this.items);
    }

    async loadFromStorage() {
        this.items = await storageService.getCart() || [];
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}

const cartService = new CartService();

// Cart UI
const CartUI = {
    render() {
        this.updateCartCount();
        this.renderCartItems();
        this.renderCartSummary();
        this.toggleEmptyState();
    },

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cartService.getTotalItems();
    },

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        const items = cartService.getItems();
        
        items.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.menuItem.id;
            
            cartItemElement.innerHTML = `
                <img src="${item.menuItem.imageUrl}" alt="${item.menuItem.name}" class="cart-item-image">
                <div class="cart-item-content">
                    <div class="cart-item-header">
                        <h3 class="cart-item-name">${item.menuItem.name}</h3>
                        <span class="cart-item-price">$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn decrement" data-id="${item.menuItem.id}">
                                <span class="material-icons">remove</span>
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increment" data-id="${item.menuItem.id}">
                                <span class="material-icons">add</span>
                            </button>
                        </div>
                        <button class="remove-item" data-id="${item.menuItem.id}">
                            <span class="material-icons">delete</span>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Add event listeners
        document.querySelectorAll('.quantity-btn.increment').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.currentTarget.dataset.id;
                cartService.incrementQuantity(id);
                animationManager.animateButton(event.currentTarget);
            });
        });

        document.querySelectorAll('.quantity-btn.decrement').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.currentTarget.dataset.id;
                cartService.decrementQuantity(id);
                animationManager.animateButton(event.currentTarget);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.currentTarget.dataset.id;
                const item = cartService.getItems().find(item => item.menuItem.id === id);
                cartService.removeItem(id);
                uiManager.showToast(`Removed ${item.menuItem.name} from cart`);
            });
        });
    },

    renderCartSummary() {
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');

        subtotalEl.textContent = `$${cartService.getSubtotal().toFixed(2)}`;
        totalEl.textContent = `$${cartService.getTotal().toFixed(2)}`;
    },

    toggleEmptyState() {
        const cartEmpty = document.getElementById('cart-empty');
        const cartItems = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');

        if (cartService.isEmpty()) {
            cartEmpty.style.display = 'flex';
            cartItems.style.display = 'none';
            cartSummary.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartItems.style.display = 'block';
            cartSummary.style.display = 'block';
        }
    },

    renderCheckoutItems() {
        const checkoutItemsContainer = document.getElementById('checkout-items');
        checkoutItemsContainer.innerHTML = '';

        const items = cartService.getItems();
        
        items.forEach(item => {
            const checkoutItemElement = document.createElement('div');
            checkoutItemElement.className = 'checkout-item';
            
            checkoutItemElement.innerHTML = `
                <div class="checkout-item-info">
                    <span>${item.quantity}x</span>
                    <span>${item.menuItem.name}</span>
                </div>
                <span>$${(item.menuItem.price * item.quantity).toFixed(2)}</span>
            `;
            
            checkoutItemsContainer.appendChild(checkoutItemElement);
        });

        // Update summary
        document.getElementById('checkout-subtotal').textContent = `$${cartService.getSubtotal().toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${cartService.getTotal().toFixed(2)}`;
    }
};