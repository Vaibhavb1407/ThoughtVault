import { FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';

const ThoughtCard = ({ thought, onEdit, onDelete }) => {
    const moodColors = {
        happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        sad: 'bg-blue-100 text-blue-800 border-blue-200',
        motivated: 'bg-green-100 text-green-800 border-green-200',
        neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group animate-fade-in relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${moodColors[thought.mood]?.split(' ')[0].replace('bg-', 'bg-').replace('-100', '-500') || 'bg-gray-500'}`}></div>

            <div className="flex justify-between items-start mb-4 pl-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{thought.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaCalendarAlt size={12} />
                        <span>{formatDate(thought.createdAt)}</span>
                    </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(thought)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <FaEdit size={14} />
                    </button>
                    <button onClick={() => onDelete(thought._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                        <FaTrash size={14} />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 pl-3 line-clamp-3">
                {thought.content}
            </p>

            <div className="flex flex-wrap gap-2 pl-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${moodColors[thought.mood] || moodColors.neutral}`}>
                    {thought.mood.charAt(0).toUpperCase() + thought.mood.slice(1)}
                </span>
                {thought.tags && thought.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ThoughtCard;
