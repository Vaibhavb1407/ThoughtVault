import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaUser, FaSignOutAlt, FaBrain } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ setIsModalOpen }) => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-white w-64 min-h-screen flex flex-col border-r border-gray-200">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <FaBrain size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800">ThoughtVault</h1>
                    <p className="text-xs text-gray-500">Your mind, organized</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <FaHome size={18} />
                    <span>Home</span>
                </Link>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-left"
                >
                    <FaPlus size={18} />
                    <span>Add Thought</span>
                </button>
                <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/profile') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <FaUser size={18} />
                    <span>Profile</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                        <FaSignOutAlt size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
