import Sidebar from './Sidebar';
import { useState } from 'react';
import ThoughtForm from './ThoughtForm';

const Layout = ({ children, refreshThoughts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar setIsModalOpen={setIsModalOpen} />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
            {isModalOpen && (
                <ThoughtForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshThoughts={refreshThoughts} />
            )}
        </div>
    );
};

export default Layout;
