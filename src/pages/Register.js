import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {

  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(store => store.user);

  const [values, setValues] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setValues({
      ...values,
      [name]: value
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all the fields');
      return;
    };
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember
    })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Name */}
        {!values.isMember && <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange} />}
        {/* Email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange} />
        {/* Password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange} />
        {/* Submit Button */}
        <button
          className="btn btn-block"
          type="submit">Submit
        </button>

        {/* Toogle Fields */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
