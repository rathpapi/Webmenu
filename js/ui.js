/**
 * UI Manager
 * Handles UI interactions and navigation
 */

class UIManager {
    constructor() {
        this.currentSection = 'menu-section';
    }
    
    initialize() {
        // Set up navigation
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.addEventListener('click', (event) => {
                const section = event.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Cart icon click
        document.getElementById('cart-icon').addEventListener('click', () => {
            this.navigateToSection('cart-section');
        });
        
        // Start ordering buttons
        document.getElementById('start-ordering-btn').addEventListener('click', () => {
            this.navigateToSection('menu-section');
        });
        
        document.getElementById('start-ordering-from-orders-btn').addEventListener('click', () => {
            this.navigateToSection('menu-section');
        });
        
        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.showCheckoutModal();
        });
        
        // Place order button
        document.getElementById('place-order-btn').addEventListener('click', async () => {
            await this.handlePlaceOrder();
        });
        
        // Clear cart button
        document.getElementById('clear-cart-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                cartService.clear();
                this.showToast('Cart cleared');
            }
        });
        
        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            });
        });
    }
    
    navigateToSection(section) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(sectionElement => {
            sectionElement.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(section).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.dataset.section === section) {
                navItem.classList.add('active');
            }
        });
        
        this.currentSection = section;
        
        // Refresh section content
        if (section === 'orders-section') {
            OrderUI.render();
        }
    }
    
    showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    }
    
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }
    
    showCheckoutModal() {
        if (cartService.isEmpty()) {
            this.showToast('Your cart is empty');
            return;
        }

        // No need to load or display Telegram config

        // Render checkout items
        CartUI.renderCheckoutItems();

        // Show modal
        this.showModal('checkout-modal');
    }
    
    async handlePlaceOrder() {
        // Get table number and remark from input
        const tableNumber = document.getElementById('table-number').value.trim();
        const remark = document.getElementById('remark').value.trim();

        // Prevent order if table number is empty
        if (!tableNumber) {
            this.showToast('Please enter your table number before placing the order.');
            document.getElementById('table-number').focus();
            return;
        }

        // Process order
        const order = cartService.checkout();

        if (!order) {
            this.showToast('Cannot place an empty order');
            return;
        }

        // Add table number and remark to order
        order.tableNumber = tableNumber;
        order.remark = remark;

        // Add to order history
        await orderService.addOrder(order);

        // Hide checkout modal
        this.hideModal('checkout-modal');

        // Show confirmation
        await this.showOrderConfirmation(order);
    }
    
    async showOrderConfirmation(order) {
        document.getElementById('confirmation-order-id').textContent = order.id;

        // Show table number if present
        let tableNumberElem = document.getElementById('confirmation-table-number');
        if (!tableNumberElem) {
            // Create element if not exists
            tableNumberElem = document.createElement('p');
            tableNumberElem.id = 'confirmation-table-number';
            const content = document.getElementById('order-confirmation-content');
            content.insertBefore(tableNumberElem, document.getElementById('telegram-status'));
        }
        tableNumberElem.textContent = order.tableNumber ? `Table Number: ${order.tableNumber}` : '';

        const telegramStatus = document.getElementById('telegram-status');
        telegramStatus.innerHTML = '<p>Sending notification to Telegram...</p>';

        // Show the modal first
        this.showModal('order-confirmation-modal');

        // Then try to send Telegram notification
        if (telegramService.isConfigured()) {
            const result = await telegramService.sendOrderNotification(order);

            if (result.success) {
                telegramStatus.className = 'telegram-status telegram-success';
                telegramStatus.innerHTML = '<p><span class="material-icons">check_circle</span> ' + result.message + '</p>';
            } else {
                telegramStatus.className = 'telegram-status telegram-error';
                telegramStatus.innerHTML = '<p><span class="material-icons">error</span> ' + result.message + '</p>';
            }
        } else {
            telegramStatus.className = 'telegram-status telegram-error';
            telegramStatus.innerHTML = '<p><span class="material-icons">info</span> Telegram notification not configured.</p>';
        }
    }
}

function renderMenuItems(items) {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = ''; // This removes old elements and their listeners

    items.forEach(item => {
        const itemElement = document.createElement('div');
        // ...build your item HTML...
        itemElement.innerHTML = `
            <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(itemElement);
    });

    // Attach listeners only to the new buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const id = event.currentTarget.dataset.id;
            cartService.addItem(menuService.getItemById(id));
        });
    });
}

function renderOrderDetails(order) {
    let orderDetailsHtml = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>$${order.total.toFixed(2)}</span>
        </div>
    `;
    orderDetailsHtml += `
    <div class="summary-row">
        <span>Tax (10%)</span>
        <span>$${order.tax.toFixed(2)}</span>
    </div>
`;
    // ...rest of your code...
}

const uiManager = new UIManager();

const categories = menuService.getCategories();

MenuUI.renderCategoryTabs(categories);
// Should also call:
MenuUI.renderMenuItems(categories[0]); // Show first category by default