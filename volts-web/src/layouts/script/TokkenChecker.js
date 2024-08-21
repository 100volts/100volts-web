// Function to decode the JWT token
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// Function to check if the JWT token is expired
function isTokenExpired(token) {
    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.exp) {
        return true; // Invalid token or no expiration, consider it expired
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime;
}

// Function to handle token on page load
function checkAndDeleteToken() {
    const tokenKey = 'volts_token'; // The key where your JWT is stored
    const token = localStorage.getItem(tokenKey);

    if (token && isTokenExpired(token)) {
        localStorage.removeItem(tokenKey); // Remove the expired token
        localStorage.removeItem("volts_user_role");
        localStorage.removeItem("company_name");
        console.log('JWT token expired and removed.');
    }
}

// Run the check when the page loads
window.onload = checkAndDeleteToken;
