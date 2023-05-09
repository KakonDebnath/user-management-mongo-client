import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';



const AddUser = () => {
    const [updateUser, setUpdateUser] = useState();

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5500/updateUser/${id}`)
                .then(res => res.json())
                .then(data => setUpdateUser(data))
        }
    }, [])

    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        const user = { name, email, gender, status }

        fetch('http://localhost:5500/add', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged && data.insertedId) {
                    alert("Data inserted successfully")
                    form.reset();
                } else {
                    alert("Data inserted Failed")
                }
            })
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        const updateUser = { name, email, gender, status }

        fetch(`http://localhost:5500/updateUser/${id}`, {
            method: 'put',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updateUser),
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount !== 0){
                    alert("data updated successfully");
                }else{
                    alert("Please Change Something to Update")
                }
            })
    }


    return (
        <div>
            <div className='flex justify-end '>
                <Link to={"/"}>
                    <button className="btn btn-success mt-5"> <span className='mr-3 text-white'>All User</span> <FaUser className='text-white' /></button>
                </Link>
            </div>
            <div className='text-center'>

                <div>
                    {
                        updateUser ?
                            <>
                                <h2 className='text-3xl'>Update User</h2>
                                <p className='text-lg'>Use The below form to Update existing User</p>
                                <form onSubmit={handleUpdateUser} className='space-y-5 mb-10 w-8/12 mx-auto'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name='name' placeholder="Type here" className="input input-bordered w-full" defaultValue={updateUser?.name} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="Type here" className="input input-bordered w-full" defaultValue={updateUser?.email} />
                                    </div>
                                    <div className='flex items-center space-x-10'>
                                        <label htmlFor="gender">Gender</label>
                                        <div className='flex items-center space-x-10'>
                                            <p className='space-x-5'>
                                                <input type="radio" name="gender" value="male" defaultChecked={updateUser?.gender === "male" ? true : false} />
                                                <span>Male</span>
                                            </p>
                                            <p className='space-x-5'>
                                                <input type="radio" name="gender" value="female" defaultChecked={updateUser?.gender !== "male" ? true : false} />
                                                <span>Female</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-10'>
                                        <label htmlFor="status">Status</label>
                                        <div className='flex items-center space-x-10'>
                                            <p className='space-x-5'>
                                                <input type="radio" name="status" value="active" defaultChecked={updateUser?.status === "active" ? true : false} />
                                                <span>Active</span>
                                            </p>
                                            <p className='space-x-5'>
                                                <input type="radio" name="status" value="inactive" defaultChecked={updateUser?.status !== "active" ? true : false} />
                                                <span>Inactive</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <button type='submit' className="btn btn-success w-full">Add User</button>
                                    </p>
                                </form>
                            </> :
                            <>
                                <h2 className='text-3xl'>Create New User</h2>
                                <p className='text-lg'>Use The below form to create The New User</p>
                                <form onSubmit={handleAddUser} className='space-y-5 mb-10 w-8/12 mx-auto'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name='name' placeholder="Type here" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="Type here" className="input input-bordered w-full" />
                                    </div>
                                    <div className='flex items-center space-x-10'>
                                        <label htmlFor="gender">Gender</label>
                                        <div className='flex items-center space-x-10'>
                                            <p className='space-x-5'>
                                                <input type="radio" name="gender" value="male" defaultChecked={true} />
                                                <span>Male</span>
                                            </p>
                                            <p className='space-x-5'>
                                                <input type="radio" name="gender" value="female" />
                                                <span>Female</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-10'>
                                        <label htmlFor="status">Status</label>
                                        <div className='flex items-center space-x-10'>
                                            <p className='space-x-5'>
                                                <input type="radio" name="status" value="active" defaultChecked={true} />
                                                <span>Active</span>
                                            </p>
                                            <p className='space-x-5'>
                                                <input type="radio" name="status" value="inactive" />
                                                <span>Inactive</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        <button type='submit' className="btn btn-success w-full">Add User</button>
                                    </p>
                                </form>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default AddUser;