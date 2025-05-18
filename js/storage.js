/**
 * Storage Service
 * Handles local storage operations
 */

class StorageService {
    constructor() {
        this.CART_KEY = 'feastflow_cart';
        this.MENU_KEY = 'feastflow_menu';
        this.ORDERS_KEY = 'feastflow_orders';
        this.TELEGRAM_CONFIG_KEY = 'feastflow_telegram_config';
    }
    
    // Menu operations
    async getMenuItems() {
        try {
            const menuData = localStorage.getItem(this.MENU_KEY);
            return menuData ? JSON.parse(menuData) : null;
        } catch (error) {
            console.error('Error getting menu items:', error);
            return null;
        }
    }
    
    async saveMenuItems(menuItems) {
        try {
            localStorage.setItem(this.MENU_KEY, JSON.stringify(menuItems));
        } catch (error) {
            console.error('Error saving menu items:', error);
        }
    }
    
    // Cart operations
    async getCart() {
        try {
            const cartData = localStorage.getItem(this.CART_KEY);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error getting cart:', error);
            return [];
        }
    }
    
    async saveCart(cart) {
        try {
            localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }
    
    // Order operations
    async getOrders() {
        try {
            const ordersData = localStorage.getItem(this.ORDERS_KEY);
            return ordersData ? JSON.parse(ordersData) : [];
        } catch (error) {
            console.error('Error getting orders:', error);
            return [];
        }
    }
    
    async saveOrders(orders) {
        try {
            localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving orders:', error);
        }
    }
    
    // Telegram config operations
    async getTelegramConfig() {
        try {
            const configData = localStorage.getItem(this.TELEGRAM_CONFIG_KEY);
            return configData ? JSON.parse(configData) : { botToken: null, chatId: null };
        } catch (error) {
            console.error('Error getting Telegram config:', error);
            return { botToken: null, chatId: null };
        }
    }
    
    async saveTelegramConfig(config) {
        try {
            localStorage.setItem(this.TELEGRAM_CONFIG_KEY, JSON.stringify(config));
        } catch (error) {
            console.error('Error saving Telegram config:', error);
        }
    }
}

const storageService = new StorageService();