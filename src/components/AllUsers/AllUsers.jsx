import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [control, setControl] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:5500/users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [control])

    // handle delete user
    const handleDeleteUser = (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                fetch(`http://localhost:5500/delete/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setControl(!control);
                            alert("Successfully Deleted");
                        }
                    })
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <div className='flex justify-end'>
                <Link to={"/addUser"}>
                    <button className="btn btn-success mt-5"> <span className='mr-3 text-white'>New User</span> <FaUserPlus className='text-white' /></button>
                </Link>
            </div>
            <table className='w-full text-center mt-10'>
                <thead className='bg-green-400 text-white'>
                    <tr >
                        <th className='py-2'>Sl. No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <tr key={user._id} className='border-b border-green-500'>
                            <td className='py-3'>{index + 1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.gender}</td>
                            <td>{user?.status}</td>
                            <td>
                                <Link to={`/updateUser/${user._id}`}>
                                    <button className='bg-slate-100 p-3 mr-1 text-blue-500 cursor-pointer'><FaPen />
                                    </button>
                                </Link>

                                <Link to={`/deleteUser/${user._id}`}>
                                    <button onClick={() => handleDeleteUser(user._id)} className='bg-slate-100 p-3 mr-1 text-red-400 cursor-pointer'><FaTrash /></button>
                                </Link>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;