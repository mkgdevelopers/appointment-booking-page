import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Header from '../../components/Header/Header';
import './Account.css'


const Account = () => {

    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState();
    const [show, setShow] = useState('true')
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}])[A-Za-z\d@$!%*?&#^()[\]{}]{8,}$/;

    const isValidPassword = (password) => {
    return passwordRegex.test(password);
    };

    const onSubmit = (data) => {
        if(!isValidPassword(data.password)){
            setError('Password must be 8 charachters long and must contain at-least 1 (uppercase letter, number) and a special charachter')
        }
        if(!data.password == data.confirmPassword){
            setError("Password did not matched")
        }
        setShow()
        console.log(
            `name:  ${data.fullName}`
        )
        
    }


  return (
    <div>
        <Header/>
        <div className="account-page">
            {show && (
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>

        <div className="login-field">
            <label className='login-label'>Full Name</label>
            <input
            type='text'
            {...register("fullname", {required:true})}
            className='login-input'
            />
            {errors.fullname && (<p className="login-error">Full Name is required</p>)}
        </div>

        <div className="login-field">
            <lable className="login-label">Email</lable>
            <input 
            type="email"
            {...register('email', {required:true})}
            className='login-input'
            />
            {errors.email && (<p className="login-error">Email is required</p>)}
        </div>

        <div className="login-field">
            <lable className="login-label">Password</lable>
            <input
            type="password"
            {...register('password',{required:true})}
            className='login-input'
            />
            {errors.password && (<p className="login-error">Password is required</p>)}
            
        </div>

        <div className="login-field">
            <lable className="login-label">Confirm Password</lable>
            <input 
            type="password"
            {...register('confirmPassword',{required:true})}
            className='login-input'
            />
            {errors.confirmPassword && (<p className="login-error">Confirm Password is required</p>)}
            {true && error}
        </div>

        <button type="submit" className='login-btn'>Sign Up to Success</button>
      </form>
    )}
    {!show && (<h2>Signed Up! You will be redirected to your dashboard in 55 years. Cant wait?<a href="../">go back</a></h2>)}
      </div>
    </div>

  )
}

export default Account
