const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const decodedToken = jwt.decode(token); // Decode token
        return decodedToken ? decodedToken.userId : null; // Extract user ID from token
    }
    return null;
};

const userId = getUserIdFromToken();
