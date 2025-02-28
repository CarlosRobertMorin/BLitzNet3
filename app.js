// Initialize cartItems from localStorage
let cartItems = new Set(JSON.parse(localStorage.getItem('cartItems')) || []);
console.log('Initial cartItems:', [...cartItems]);

// Get cart count element
const cartCountElement = document.getElementById('cart-count');
if (!cartCountElement) {
    console.error('Error: #cart-count element not found');
} else {
    console.log('Cart count element found');
}

// Update cart count
function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.size;
        console.log('Cart count updated to:', cartItems.size);
    } else {
        console.error('Cannot update cart count: element missing');
    }
}

// Save to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
    console.log('Saved to localStorage:', localStorage.getItem('cartItems'));
    updateCartCount();
}

// Initial cart count update
updateCartCount();

// Add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
console.log('Found', addToCartButtons.length, 'add-to-cart buttons');
if (addToCartButtons.length === 0) {
    console.error('No .add-to-cart buttons found');
}
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        console.log('Add to cart clicked, productId:', productId);
        if (!cartItems.has(productId)) {
            cartItems.add(productId);
            console.log('Added productId:', productId, 'New cartItems:', [...cartItems]);
            saveCart();
        } else {
            alert('This item is already in your cart.');
            console.log('Product already in cart:', productId);
        }
    });
});

// Bundle button
const bundleButton = document.getElementById('bundle-button');
if (!bundleButton) {
    console.error('Error: #bundle-button not found');
} else {
    console.log('Bundle button found');
    bundleButton.addEventListener('click', function() {
        const productsToBundle = ['1', '2'];
        let alreadyInCart = 0;
        let toAdd = [];
        console.log('Bundle button clicked');

        for (let productId of productsToBundle) {
            if (cartItems.has(productId)) {
                alreadyInCart++;
            } else {
                toAdd.push(productId);
            }
        }

        if (alreadyInCart === productsToBundle.length) {
            alert('Both items are now bundled in your cart.');
            console.log('Both items already in cart');
        } else if (alreadyInCart > 0) {
            toAdd.forEach(id => cartItems.add(id));
            console.log('Added remaining items:', toAdd, 'New cartItems:', [...cartItems]);
            saveCart();
        } else {
            productsToBundle.forEach(id => cartItems.add(id));
            console.log('Added all bundle items:', productsToBundle, 'New cartItems:', [...cartItems]);
            saveCart();
        }
    });
}

// Popup functionality
const signInIcon = document.querySelector('.sign-in');
const loginPopup = document.getElementById('loginPopup');

signInIcon.addEventListener('click', (e) => {
    e.preventDefault();
    loginPopup.style.display = 'flex';
});

function closePopup() {
    loginPopup.style.display = 'none';
}

// Close popup when clicking outside
loginPopup.addEventListener('click', (e) => {
    if (e.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
});

// For Google Sign-In (you'll need to implement actual Google auth)
document.getElementById('googleSignIn').addEventListener('click', () => {
    // This is a placeholder - you'll need to implement actual Google Sign-In
    console.log('Google Sign-In clicked');
    // For real implementation, use Google's API:
    // https://developers.google.com/identity/sign-in/web
});

// Basic form submission handler (optional)
document.querySelector('.input-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Add your login logic here
    console.log('Login attempt:', { email, password });
});


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    // Send this data to your backend for authentication
}

// Add this to your Google button
document.getElementById('googleSignIn').classList.add('g-signin2');
document.getElementById('googleSignIn').setAttribute('data-onsuccess', 'onSignIn');