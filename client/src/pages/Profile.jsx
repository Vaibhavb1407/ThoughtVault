import { useAuth } from '../context/AuthContext';
import { FaUser, FaChartPie } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-500 mb-8">Manage your account and see your stats</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FaUser className="text-gray-400" />
                        <h2 className="text-lg font-bold text-gray-800">Account Details</h2>
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

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                {user?.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                {user?.email}
                            </div>
                        </div>

                        <button className="mt-4 bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                            Save Changes
                        </button>
                    </div>
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
