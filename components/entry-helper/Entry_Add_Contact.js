import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RxCross2 } from "react-icons/rx";
import Entry_Add_ContactList from './Entry_Add_ContactList';

const Entry_Add_Contact = ({ contact, setContact, contactAddView, setContactAddView, contactView, setContactView }) => {
    return (
        <div
            className='w-1/2 space-y-1'
        >
            <div
                className='flex justify-between items-center'
            >
                <span className='text-sm'>Contact</span>
                <IoSettingsOutline
                    size={15}
                    className='text-[#4863D4] cursor-pointer'
                />
            </div>
            <div
                className='relative rounded'
            >
                <input
                    onClick={() => setContactView(!contactView)}
                    placeholder={`${contact?.name ? contact?.name : 'Search or Select'}`}
                    className='w-full px-4 py-2 border rounded focus:outline-[#4863D4]'
                />
                {contact?.name &&
                    <button
                        onClick={() => setContact({})}
                        className='absolute right-10 px-3 py-2.5'
                    >
                        <RxCross2 size={18} />
                    </button>
                }
                <button
                    onClick={() => setContactView(!contactView)}
                    className='absolute right-0 px-3 py-2.5 border-l'
                >
                    <RiArrowDownSFill size={20} />
                </button>
                {contactView &&
                    <Entry_Add_ContactList {...{contact, setContact, contactAddView, setContactAddView, contactView, setContactView}}/>
                }
            </div>
        </div>
    );
};

export default Entry_Add_Contact;