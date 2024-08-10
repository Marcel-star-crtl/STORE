const loginUser = async (email, password) => {
    try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
  
export { loginUser };
  