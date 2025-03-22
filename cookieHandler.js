// Set a cookie with a random 20-character string
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}
function checkAccess() {
    const userCookie = getCookie("userCookie");
    if (!userCookie || userCookie.length !== 20) {
        window.location.href = "403.html";
    }
}
function setUserCookie() {
    if (!document.cookie.includes('userCookie=')) {
        const randomString = generateRandomString();
        setCookie('userCookie', randomString, 365); 
    }
}
