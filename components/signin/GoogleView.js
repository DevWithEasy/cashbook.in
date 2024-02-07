import React from 'react';
import google from '../../public/image/google.png'
import mail from '../../public/image/mail.png'
import Image from 'next/image';
import Link from 'next/link';
import { googleSignIn } from '../../libs/socialSigninAction';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slice/authSlice';

const GoogleView = ({ handleView }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    
    return (
        <div
            className='space-y-3'
        >
            <p
                className='text-lg'
            >
                Choose one option to continue
            </p>
            <button
                onClick={()=>googleSignIn(router, dispatch, login)}
                className='w-full p-3 flex justify-center items-center space-x-2 text-blue-500 hover:bg-gray-100 border rounded'
            >
                <Image
                    src={google.src}
                    alt='logo'
                    height={20}
                    width={20}
                />
                <span>Continue With Google</span>
            </button>
            <button
                onClick={handleView}
                className='w-full p-3 flex justify-center items-center space-x-2 text-blue-500 hover:bg-gray-100 border rounded'
            >
                <Image
                    src={mail.src}
                    alt='logo'
                    height={20}
                    width={20}
                />
                <span>Continue With Email</span>
            </button>
            <div
                className='text-sm'
            >
                <span>
                    By continuing, you are indicating that you accept our
                </span>
                <Link
                    href=''
                >
                    <a
                        className='px-1 text-blue-500'
                    >
                        Terms of Service
                    </a>
                </Link>
                <span>
                    and
                </span>
                <Link
                    href=''
                >
                    <a
                        className='px-1 text-blue-500'
                    >
                        Privacy Policy.
                    </a>
                </Link>
            </div>
            <h2
                className='py-2 text-center'
            >
                OR
            </h2>
            <button
                onClick={handleView}
                className='w-full p-3 flex justify-center items-center space-x-2 text-blue-500 hover:bg-gray-100 border rounded'
            >
                <span>Other Ways to Login</span>
            </button>
        </div>
    );
};

export default GoogleView;