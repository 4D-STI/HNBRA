import React from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
    return (
        <nav className={`bg-white shadow-md ${isOpen ? 'block' : 'hidden'} md:hidden`}>
            <ul className="flex flex-col items-center p-2">
                <li className="w-full text-center"><a href="#" className="block p-2 hover:bg-blue-300" onClick={toggleMenu}>Órgãos do governo</a></li>
                <li className="w-full text-center"><a href="#" className="block p-2 hover:bg-blue-300" onClick={toggleMenu}>Acesso à informação</a></li>
                <li className="w-full text-center"><a href="#" className="block p-2 hover:bg-blue-300" onClick={toggleMenu}>Legislação</a></li>
                <li className="w-full text-center"><a href="#" className="block p-2 hover:bg-blue-300" onClick={toggleMenu}>Acessibilidade</a></li>
            </ul>
        </nav>
    );
};

export default MobileMenu;
