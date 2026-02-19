import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Removed for relative paths

    const register = async (userData) => {
        const response = await axios.post('/api/auth/register', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        }
        return response.data;
    };

    const login = async (userData) => {
        const response = await axios.post('/api/auth/login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
        }
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const updateProfile = async (userData) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const response = await axios.put('/api/auth/profile', userData, config);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response.data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
