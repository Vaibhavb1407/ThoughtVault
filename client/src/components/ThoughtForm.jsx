import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import thoughtService from '../services/thoughtService';
import { useAuth } from '../context/AuthContext';

const ThoughtForm = ({ isOpen, onClose, thoughtToEdit = null, refreshThoughts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('neutral');
    const [tags, setTags] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (thoughtToEdit) {
            setTitle(thoughtToEdit.title);
            setContent(thoughtToEdit.content);
            setMood(thoughtToEdit.mood);
            setTags(thoughtToEdit.tags.join(', '));
        } else {
            setTitle('');
            setContent('');
            setMood('neutral');
            setTags('');
        }
    }, [thoughtToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const thoughtData = {
            title,
            content,
            mood,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        try {
            if (thoughtToEdit) {
                await thoughtService.updateThought(thoughtToEdit._id, thoughtData, token);
            } else {
                await thoughtService.createThought(thoughtData, token);
            }
            if (refreshThoughts) refreshThoughts();
            onClose();
        } catch (error) {
            console.error("Failed to save thought", error);
            alert("Failed to save thought");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">{thoughtToEdit ? 'Edit Thought' : 'New Thought'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="What's on your mind?"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
                            placeholder="Write your thoughts..."
                            required
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                            <select
                                value={mood}
                                onChange={(e) => setMood(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="neutral">Neutral</option>
                                <option value="happy">Happy</option>
                                <option value="sad">Sad</option>
                                <option value="motivated">Motivated</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="work, life, ideas"
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                        >
                            {thoughtToEdit ? 'Update Thought' : 'Save to Vault'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ThoughtForm;
