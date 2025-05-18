/**
 * Animation Manager
 * Handles animations and transitions
 */

class AnimationManager {
    constructor() {
        this.animationDuration = 300; // ms
    }
    
    initializeSplashScreen() {
        const splashScreen = document.getElementById('splash-screen');
        const appContainer = document.getElementById('app');
        
        // Show splash screen for a set duration then fade out
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            
            // After fade out, hide splash and show app
            setTimeout(() => {
                splashScreen.style.display = 'none';
                appContainer.classList.remove('hidden');
                
                // Animate menu items with slight delay
                setTimeout(() => {
                    this.animateMenuItems();
                }, 100);
            }, 500); // Match the CSS transition duration
        }, 2000); // Show splash for 2 seconds
    }
    
    animateMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach((item, index) => {
            // Reset any existing animations
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Apply new animation with staggered delay
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 * index); // Stagger the animations
        });
    }
    
    animateAddToCart(button) {
        // Animate the button
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#5a4ed4'; // Slight color change
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '';
        }, 200);
        
        // Animate the cart icon
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
    
    animateButton(button) {
        button.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
    
    animateCartChanges() {
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach((item) => {
            item.style.backgroundColor = 'var(--surface-color)';
            
            setTimeout(() => {
                item.style.transition = 'background-color 0.5s ease-in-out';
                item.style.backgroundColor = 'var(--card-color)';
            }, 50);
        });
    }
    
    animateCountChange(element) {
        element.style.transform = 'scale(1.3)';
        element.style.color = 'var(--primary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }
}

const animationManager = new AnimationManager();