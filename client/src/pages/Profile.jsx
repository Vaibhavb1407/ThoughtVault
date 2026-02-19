import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaChartPie, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({ name, email, password });
            toast.success('Profile updated successfully');
            setPassword('');
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-500 mb-8">Manage your account and see your stats</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-gray-400" />
                            <h2 className="text-lg font-bold text-gray-800">Account Details</h2>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">{user?.name}</p>
                            <p className="text-gray-500 text-sm">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {isEditing && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                        )}

                        {isEditing && (
                            <button
                                type="submit"
                                className="w-full mt-4 bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaSave /> Save Changes
                            </button>
                        )}
                    </form>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartPie className="text-gray-400" />
                        <h2 className="text-lg font-bold text-gray-800">Your Stats</h2>
                    </div>
                    <p className="text-gray-500 text-sm">Overview of your thought vault</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <p className="text-3xl font-bold text-gray-800">0</p>
                            <p className="text-xs text-gray-500 mt-1">Total Thoughts</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                            <p className="text-3xl font-bold text-gray-800">0</p>
                            <p className="text-xs text-gray-500 mt-1">Unique Tags</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
