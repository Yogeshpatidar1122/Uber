import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})

    const { captain, setCaptain } = useContext(CaptainDataContext)
    // const navigate = useNavigate()



    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            email: email,
            password: password
        }
        console.log(captainData);


        // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

        // if (response.status === 200) {
        //     const data = response.data

        //     setCaptain(data.captain)
        //     localStorage.setItem('token', data.token)
        //     navigate('/captain-home')

        // }


        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col lg:justify-center lg:items-center'>
            <div className='flex flex-col items-center justify-center h-full lg:flex lg:items-center lg:justify-center lg:mb-10'>
                <img
                    className='w-16 mb-10 '
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="uber_logo"
                />

                <form className='w-full max-w-lg'>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        type="password"
                        placeholder='password'
                    />

                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >
                        Login
                    </button>

                </form>
                <p className='text-center mt-4'>
                    Join as Fleet ?{` `}
                    <Link to='/Captain-signup' className='text-blue-600'>
                        Register as Captain
                    </Link>
                </p>

                {/* user-login link */}
                <div className='flex flex-col items-center justify-center  w-full'>
                    <Link
                        to='/login'
                        className='bg-lime-600 flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 mt-5 w-full md:w-7/12 lg:w-full text-lg'
                    >
                        Sign in as User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Captainlogin;
