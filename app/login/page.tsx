"use client";
import { useState } from 'react';
import { login, signup } from '@/lib/actions/user.actions';

const auth = () => {

    const [error, setError] = useState<{ login: string, signup: string }>({
        login: '',
        signup: ''
    });

    const [formData, setFormData] = useState<{ login: { username: string, password: string }, signup: { username: string, password: string } }>({
        login: { 
            username: '', 
            password: '' 
        }, 
        signup: { 
            username: '', 
            password: '' 
        }
    });

    const reset = () => {
        setError({
            login: '',
            signup: ''
        });
    };

    const handleSignup = async (e : any) => { 
        e.preventDefault();
        reset();
        if(formData.signup.username?.length >= 4 && formData.signup.password?.length >= 8){
            const response = await signup({ username: formData.signup.username, password: formData.signup.password });
            const data = JSON.parse(response);
            console.log(data.token);
            console.log(data.user);
        }
        else{
            setError({...error, signup: 'length of username or password is less than 8 characters.'});
        }
    };

    const handleLogin = async (e : any) => {
        e.preventDefault();
        reset();
        if(formData.login.username?.length >= 4 && formData.login.password?.length >= 8){
            const response = await login({ username: formData.login.username, password: formData.login.password });
            const data = JSON.parse(response);
            console.log(data.token);
            console.log(data.user);
        }
        else{
            setError({...error, login: 'username or password is incorrect.'});
        }
    };

  return (
    <div className='flex flex-col p-8'>
        <div className='mb-8'>
            <h1 className='font-semibold mb-4 text-[18px]'> Login </h1>
            <form className='flex flex-col gap-2 mb-1'>
                <div>
                    <label className='text-[15px]'> username: </label>
                    <input 
                        type='text' 
                        className='border-2 border-gray-400'
                        onChange={(e) => setFormData({ ...formData, login: {...formData.login, username: e.target.value } })}
                    />    
                    {formData.login.username}
                </div>
                <div>
                    <label className='text-[15px]'> password: </label>
                    <input 
                        type='password' 
                        className='border-2 border-gray-400'
                        onChange={(e) => setFormData({ ...formData, login: {...formData.login, password: e.target.value } })}
                    />    
                    {formData.login.password}
                </div>
                <button
                    className='bg-gray-200 p-[2px] px-2 w-fit border-2 border-[#383838] text-[14px] mt-2'
                    onClick={handleLogin}
                >
                    login
                </button>
            </form>
            {error.login}
        </div>
        <div className='mb-8'>
            <h1 className='font-semibold mb-4 text-[18px]'> Create Account </h1>
            <form className='flex flex-col gap-2 mb-1'>
                <div>
                    <label className='text-[15px]'> username: </label>
                    <input 
                        type='text' 
                        className='border-2 border-gray-400'
                        onChange={(e) => setFormData({ ...formData, signup: {...formData.signup, username: e.target.value } })}
                    />    
                    {formData.signup.username}
                </div>
                <div>
                    <label className='text-[15px]'> password: </label>
                    <input 
                        type='password' 
                        className='border-2 border-gray-400'
                        onChange={(e) => setFormData({ ...formData, signup: {...formData.signup, password: e.target.value } })}
                    />    
                    {formData.signup.password}
                </div>
                <button
                    className='bg-gray-200 p-[2px] px-2 w-fit border-2 border-[#383838] text-[14px] mt-2'
                    onClick={handleSignup}
                >
                    create account
                </button>
            </form>
            {error.signup}
        </div>
    </div>
  )
}

export default auth;