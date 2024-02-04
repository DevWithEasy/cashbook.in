import {
    Drawer,
    DrawerContent,
    DrawerOverlay
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdInfo } from "react-icons/md";

const DuplicateBook = ({ view, setView }) => {
    const [steps, setSteps] = useState([
        'members',
        'category',
        'payment',
        'contact'
    ])
    const stepsTopics = [
        {
            title: 'Members and Roles',
            step: 'members'
        },
        {
            title: 'Categories',
            step: 'category'
        },
        {
            title: 'Payments Mode',
            step: 'payment'
        },
        {
            title: 'Contacts',
            step: 'contact'
        },
    ]

    const handleStep = (i) => {
        const find = steps.find(step => step === i)

        if (find) {
            const filter = steps.filter(step => step !== i)
            setSteps(filter)
        } else {
            setSteps([...steps, i])
        }
    }

    return (
        <>
            <Drawer
                isOpen={view}
                placement='right'
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <div
                        className='h-28'
                    >
                        <div
                            className='px-6 py-4 flex justify-between items-center border-b'
                        >
                            <p className='text-xl'>Duplicate Book</p>
                            <button
                                onClick={() => setView(!view)}
                                className='px-4 py-1 border rounded'
                            >X</button>
                        </div>
                        <div
                            className='p-4 flex items-center space-x-3 bg-[#EEEDFA]'
                        >
                            <MdInfo
                                size={20}
                                className='text-[#4863D4]'
                            />
                            <p
                                className='text-sm'
                            >
                                Create new book with same settings as Robbani
                            </p>
                        </div>
                    </div>
                    <div
                        className='h-[calc(100vh-192px)] p-6 space-y-5 overflow-y-auto'
                    >
                        <p
                            className='text-base'
                        >
                            Step 1 : Choose New Book Name
                        </p>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block text-sm'
                            >Enter new book name</label>
                            <input
                                placeholder='Enter New Book Name'
                                className='w-full p-2 border rounded focus:outline-[#4863D4]'
                            />
                        </div>
                        <div

                        >
                            <p
                                className='text-base'
                            >
                                Step 2 : Choose settings to duplicate
                            </p>
                            <div
                                className='mt-5 space-y-2'
                            >
                                {
                                    stepsTopics.map((step, i) =>
                                        <div
                                            key={i}

                                            onClick={() => handleStep(step.step)} className='px-6 py-4 flex items-center space-x-2 bg-[#EEEDFA] rounded cursor-pointer'
                                        >
                                            {steps.includes(step.step) ?
                                                <MdCheckBox
                                                    size={20}
                                                    className='text-[#4863D4]'
                                                />
                                                :
                                                <MdCheckBoxOutlineBlank
                                                    size={20}
                                                    className='text-[#4863D4]'
                                                />
                                            }
                                            <p

                                                className='text-xs'
                                            >
                                                {step.title}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-20 p-6 flex justify-end items-center space-x-4'
                    >
                        <button
                            onClick={() => setView(!view)}
                            className='px-6 py-2 bg-gray-200 rounded'
                        >
                            Cancel
                        </button>
                        <button
                            className='px-6 py-2 bg-[#4863D4] text-white rounded'
                        >
                            Add New Book
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DuplicateBook;