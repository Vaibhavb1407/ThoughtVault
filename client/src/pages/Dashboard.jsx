import { useState, useEffect } from 'react';
import thoughtService from '../services/thoughtService';
import ThoughtCard from '../components/ThoughtCard';
import ThoughtForm from '../components/ThoughtForm';
import { useAuth } from '../context/AuthContext';
import { FaFilter, FaSearch, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
    const [thoughts, setThoughts] = useState([]);
    const [filterMood, setFilterMood] = useState('all');
    const [search, setSearch] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [thoughtToEdit, setThoughtToEdit] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { user } = useAuth();

    // Helper to get token
    const getToken = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser?.token;
    };

    const fetchThoughts = async () => {
        try {
            const token = getToken();
            if (!token) return;
            const data = await thoughtService.getThoughts(token);
            setThoughts(data);
        } catch (error) {
            console.error("Failed to fetch thoughts");
        }
    };

    useEffect(() => {
        fetchThoughts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this thought?')) {
            try {
                const token = getToken();
                await thoughtService.deleteThought(id, token);
                setThoughts(thoughts.filter((t) => t._id !== id));
            } catch (error) {
                alert('Failed to delete thought');
            }
        }
    };

    const handleEdit = (thought) => {
        setThoughtToEdit(thought);
        setIsEditModalOpen(true);
    };

    const filteredThoughts = thoughts.filter((thought) => {
        const matchesMood = filterMood === 'all' || thought.mood === filterMood;
        const matchesSearch =
            thought.title.toLowerCase().includes(search.toLowerCase()) ||
            thought.content.toLowerCase().includes(search.toLowerCase());
        return matchesMood && matchesSearch;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Your Thoughts</h1>
                    <p className="text-gray-500 mt-1">{thoughts.length} thoughts in your vault</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
                >
                    <FaPlus size={16} />
                    <span>New Thought</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search thoughts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-400" />
                    <select
                        value={filterMood}
                        onChange={(e) => setFilterMood(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                    >
                        <option value="all">All Moods</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="motivated">Motivated</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>
            </div>

            {filteredThoughts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredThoughts.map((thought) => (
                        <ThoughtCard
                            key={thought._id}
                            thought={thought}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No thoughts found matching your criteria.</p>
                </div>
            )}

            {isEditModalOpen && (
                <ThoughtForm
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setThoughtToEdit(null);
                    }}
                    thoughtToEdit={thoughtToEdit}
                    refreshThoughts={fetchThoughts}
                />
            )}

            {isCreateModalOpen && (
                <ThoughtForm
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    refreshThoughts={fetchThoughts}
                />
            )}
        </div>
    );
};

export default Dashboard;
