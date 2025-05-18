/**
 * Main Application
 * Initializes and sets up the application
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize services
    await initializeApp();
    
    // Show splash screen and animations
    animationManager.initializeSplashScreen();
    
    // Initialize UI interactions
    uiManager.initialize();
});

async function initializeApp() {
    try {
        // Initialize menu service
        const categories = await menuService.initialize();
        MenuUI.renderCategoryTabs(categories);
        
        // Initialize cart service
        await cartService.initialize();
        
        // Register cart listeners
        cartService.addListener(() => {
            CartUI.render();
            animationManager.animateCartChanges();
        });
        
        // Initialize order history
        await orderService.initialize();
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}