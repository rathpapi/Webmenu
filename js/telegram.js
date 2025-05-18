/**
 * Telegram Service
 * Handles sending notifications to Telegram
 */

// Set your Telegram Bot Token and Chat ID here
const TELEGRAM_BOT_TOKEN = '7534936777:AAH6LLNspB4fezFBxjqYqYqGMjx6CKLrSlQ';
const TELEGRAM_CHAT_ID = '-1002435104635';

const telegramService = {
    botToken: TELEGRAM_BOT_TOKEN,
    chatId: TELEGRAM_CHAT_ID,

    initialize: async function() {
        // Initialization code here (or leave empty if not needed)
    },

    isConfigured: function() {
        return this.botToken && this.chatId;
    },

    sendOrderNotification: async function(order) {
        if (!this.isConfigured()) {
            return {
                success: false,
                message: 'Telegram is not configured. Please set your bot token and chat ID.'
            };
        }

        try {
            const message = this._formatOrderMessage(order);
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();

            if (data.ok) {
                return {
                    success: true,
                    message: 'Order notification sent successfully!'
                };
            } else {
                return {
                    success: false,
                    message: `Failed to send notification: ${data.description}`
                };
            }
        } catch (error) {
            return {
                success: false,
                message: `Error sending notification: ${error.message}`
            };
        }
    },

    _formatOrderMessage: function(order) {
        // Format date
        const date = new Date(order.timestamp);
        const formattedDate = date.toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Build message
        let message = `<b>🔔 New Order Received!</b>\n\n`;
        message += `<b>Order ID:</b> ${order.id}\n`;
        message += `<b>Date:</b> ${formattedDate}\n`;
        message += `<b>Status:</b> ${order.status}\n`;
        if (order.tableNumber) {
            message += `<b>Table Number:</b> ${order.tableNumber}\n`;
        }
        message += `\n`;

        message += `<b>Items:</b>\n`;
        order.items.forEach(item => {
            message += `- ${item.quantity}x ${item.menuItem.name} ($${(item.menuItem.price * item.quantity).toFixed(2)})\n`;
        });

        message += `\n<b>Subtotal:</b> $${order.subtotal.toFixed(2)}\n`;
        // Tax line removed
        // if (order.tax > 0) {
        //     message += `<b>Tax:</b> $${order.tax.toFixed(2)}\n`;
        // }
        message += `<b>Total:</b> $${order.total.toFixed(2)}`;

        return message;
    }
};