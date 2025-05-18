/**
 * Orders functionality
 * Handles order history and order operations
 */

class OrderService {
    constructor() {
        this.orders = [];
    }

    async initialize() {
        await this.loadFromStorage();
    }

    async addOrder(order) {
        this.orders.unshift(order); // Add to beginning of array
        await this.saveToStorage();
        return order;
    }

    getOrders() {
        return this.orders;
    }

    getOrder(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    async saveToStorage() {
        await storageService.saveOrders(this.orders);
    }

    async loadFromStorage() {
        this.orders = await storageService.getOrders() || [];
    }

    clear() {
        this.orders = [];
        this.saveToStorage();
    }
}

const orderService = new OrderService();

// Order UI
const OrderUI = {
    render() {
        const ordersSection = document.getElementById('orders-section');
        const ordersList = document.getElementById('orders-list');
        const ordersEmpty = document.getElementById('orders-empty');
        
        ordersList.innerHTML = '';
        
        const orders = orderService.getOrders();
        
        if (orders.length === 0) {
            ordersEmpty.style.display = 'flex';
            ordersList.style.display = 'none';
        } else {
            ordersEmpty.style.display = 'none';
            ordersList.style.display = 'block';
            
            orders.forEach(order => {
                const orderCard = this.createOrderCard(order);
                ordersList.appendChild(orderCard);
            });
        }
    },
    
    showOrderDetails(orderId) {
        const order = orderService.getOrder(orderId);
        const orderDetailsContent = document.getElementById('order-details-content');
        
        // Format date
        const date = new Date(order.timestamp);
        const formattedDate = date.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Create HTML
        orderDetailsContent.innerHTML = `
            <div class="order-details-header">
                <span class="order-details-id">${order.id}</span>
                <span class="order-details-date">${formattedDate}</span>
            </div>
            <div class="order-status status-${order.status.toLowerCase()}" style="display: inline-block; margin-bottom: 16px;">
                ${order.status === 'Pending' ? 'Order' : order.status}
            </div>
            <h3>Order Items</h3>
            <div class="order-details-items">
                ${order.items.map(item => `
                    <div class="order-detail-item">
                        <img src="${item.menuItem.imageUrl}" alt="${item.menuItem.name}" class="order-item-image">
                        <div class="order-item-details">
                            <div class="order-item-name">${item.menuItem.name}</div>
                            <div class="order-item-price">$${item.menuItem.price.toFixed(2)}</div>
                        </div>
                        <div class="order-item-quantity">${item.quantity}x</div>
                    </div>
                `).join('')}
            </div>
            <div class="checkout-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${order.subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${order.total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        // Show modal
        uiManager.showModal('order-details-modal');
    },
    
    createOrderCard(order) {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.dataset.id = order.id;
        
        // Format date
        const date = new Date(order.timestamp);
        const formattedDate = date.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Get preview items (up to 3)
        const previewItems = order.items.slice(0, 3);
        const remainingItems = order.items.length > 3 ? order.items.length - 3 : 0;
        
        // Create HTML
        orderCard.innerHTML = `
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-date">${formattedDate}</span>
            </div>
            <div class="order-summary">
                <div class="order-items-preview">
                    ${previewItems.map(item => `
                        <img src="${item.menuItem.imageUrl}" alt="${item.menuItem.name}" class="preview-item">
                    `).join('')}
                    ${remainingItems > 0 ? `<div class="more-items">+${remainingItems}</div>` : ''}
                </div>
                <div class="order-info">
                    <div class="order-total">$${order.total.toFixed(2)}</div>
                    <div class="order-status status-${order.status.toLowerCase()}">${order.status === 'Pending' ? 'Order' : order.status}</div>
                </div>
            </div>
            <button class="view-order-btn" data-id="${order.id}">View Details</button>
        `;
        
        // Add event listener for view details button
        orderCard.querySelector('.view-order-btn').addEventListener('click', (event) => {
            const orderId = event.currentTarget.dataset.id;
            this.showOrderDetails(orderId);
        });
        
        return orderCard;
    },
};