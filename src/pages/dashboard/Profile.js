import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow'
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {

    const { isLoading, user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || ''
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { name, lastName, email, location } = userData;

        if (!name || !lastName || !email || !location) {
            toast.error("Please fill out all fields");
            return;
        }

        dispatch(updateUser(userData));
    }

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>Profile</h3>

                <div className="form-center">

                    <FormRow
                        type="text"
                        name="name"
                        value={userData.name}
                        handleChange={handleChange}
                    />

                    <FormRow
                        type="text"
                        labelText="last name"
                        name="lastName"
                        value={userData.lastName}
                        handleChange={handleChange}
                    />

                    <FormRow
                        type="email"
                        name="email"
                        value={userData.email}
                        handleChange={handleChange}
                    />

                    <FormRow
                        type="text"
                        name="location"
                        value={userData.location}
                        handleChange={handleChange}
                    />

                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'Save Changes'}
                    </button>

                </div>
            </form>
        </Wrapper>
    )
}

export default Profile
