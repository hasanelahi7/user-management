import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Table = () => {
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({ name: '', age: '', city: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchData = () => {
        fetch(`https://65e0c291d3db23f7624a04da.mockapi.io/users`)
            .then(res => res.json())
            .then(json => setUserData(json));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setFormData({ name: '', age: '', city: '' });
        setShowAddModal(false);
    };

    const editUser = (index) => {
        setFormData(userData[index]);
        setEditingIndex(index);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setFormData({ name: '', age: '', city: '' });
        setEditingIndex(null);
        setShowEditModal(false);
    };

    const viewUser = (user) => {
        alert(`ID: ${user.id}\n Name: ${user.name}\n Age: ${user.age}\n City: ${user.city}`)
    };

    const deleteUser = (index) => {
        fetch(`https://65e0c291d3db23f7624a04da.mockapi.io/users/${userData[index].id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network error');
                }
                const updatedData = [...userData];
                updatedData.splice(index, 1);
                setUserData(updatedData);
            })
            .catch(error => {
                console.error('ERROR', error);
            })
    };

    const saveUser = () => {
        if (formData.name && formData.age && formData.city) {
            if (editingIndex != null) {
                const updatedData = [...userData];
                updatedData[editingIndex] = formData;
                fetch(`https://65e0c291d3db23f7624a04da.mockapi.io/users/${userData[editingIndex].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network error');
                        }
                        setUserData(updatedData);
                        setEditingIndex(null);
                        closeAddModal();
                    })
                    .catch(error => {
                        console.error('ERROR', error);
                    })
            }
            else {
                fetch(`https://65e0c291d3db23f7624a04da.mockapi.io/users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network error');
                        }
                        fetchData();
                        setUserData([...userData, formData]);
                        closeAddModal();
                    })
                    .catch(error => {
                        console.error('ERROR', error);
                    })
            }
        }
        else {
            alert('Please fill all fields')
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="text-center text-3xl font-serif font-bold mb-8">User Management</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={openAddModal}
            >
                <FaUserPlus className="inline-block mr-2" /> Add User
            </button>
            <table className="table-auto w-full bg-white rounded-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">City</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData?.map((user, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.age}</td>
                            <td className="px-4 py-2">{user.city}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => viewUser(user)}
                                >
                                    <FaEye />
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => editUser(index)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deleteUser(index)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6">
                            <div className="float-right items-center mb-4">
                                <span
                                    className="text-2xl font-bold cursor-pointer top-0 right-0"
                                    onClick={closeAddModal}
                                >
                                    &times;
                                </span>
                            </div>
                            <div className="mb-4 mt-8">
                                <label className="block font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2">Age:</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2">City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                                onClick={saveUser}
                            >
                                {editingIndex != null ? 'Update User' : 'Add User'}
                            </button>
                        </div>
                    </div>
                </>
            )}
            {showEditModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded-lg p-6">
                            <div className="float-right flex justify-between items-center mb-4">
                                <span
                                    className="text-2xl font-bold cursor-pointer"
                                    onClick={closeEditModal}
                                >
                                    &times;
                                </span>
                            </div>
                            <div className="mb-4 mt-8">
                                <label className="block font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2">Age:</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-2">City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleChange(e)}
                                    className="border border-gray-400 p-2 w-full"
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                                onClick={saveUser}
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

};

export default Table;