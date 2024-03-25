import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaChevronLeft } from 'react-icons/fa';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Table"
        },
        {
            path: "/about",
            name: "About Us"
        },
        {
            path: "/contact",
            name: "Contact Us"
        }
    ]
    return (
        <div className="flex">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar bg-green-900 text-white h-screen transition-all duration-500">
                <div className="top_section flex items-center justify-between px-4 py-5">
                    <div className="bars" style={{ marginLeft: isOpen ? "150px" : "0px" }}>
                        {isOpen ? <FaChevronLeft onClick={toggle} /> : <FaBars onClick={toggle} />}
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link flex items-center text-white hover:bg-light-blue-500 hover:text-gray-300 py-2 px-4 transition-all duration-500"
                    >
                        <div className={isOpen ? "link_text block" : "link_text hidden"}>{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main className="w-full">{children}</main>
        </div>
    );
};

export default Sidebar;