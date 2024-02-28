import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
} from '@chakra-ui/react'
import Image from "next/image";
import user_img from '../public/image/profile.png';
import { FaLongArrowAltRight } from "react-icons/fa";

const UpdateProfilePhoto = ({ view, setView }) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const handleFile = (e) => {
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    return (
        <>
            <Modal isOpen={view} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <div
                        className='h-[370px]'
                    >
                        <div
                            className='h-16 px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>Update Profile Photo</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                        <div className="h-[calc(370px-128px)] p-6 space-y-5">
                            <div className="flex justify-between items-center">
                                <Image
                                    src={user?.image?.url || user_img.src}
                                    alt=""
                                    height={100}
                                    width={100}
                                />
                                <FaLongArrowAltRight size={30}/>
                                {image ?
                                    <Image
                                        src={image}
                                        alt=""
                                        height={100}
                                        width={100}
                                    />
                                    :
                                    <div
                                        className='h-[100px] w-[100px] border rounded-full'
                                    >

                                    </div>
                                }
                            </div>
                            <label 
                                htmlFor="file"
                                className='text-sm'
                            >
                                Choose a photo
                            </label>
                            <input 
                                type="file" 
                                onChange={(e) => handleFile(e)}
                                className='w-full px-4 py-2 bg-gray-100 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        <div
                            className='h-16 px-6 py-4 flex justify-end items-center space-x-5 border-t'
                        >
                            <button 
                                onClick={() => setView(!view)}
                                className='px-6 py-3 border rounded'
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={(e) => uploadPhoto(e, user._id, file, setUpdatePhoto, dispatch, login)}
                                className='px-6 py-3 bg-[#4863D4] text-white border rounded'
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateProfilePhoto;