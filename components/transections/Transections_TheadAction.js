import React from 'react';
import { MdDeleteOutline, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import {Transections_TheadAction_Change,Transections_TheadAction_MoveCopy} from '../Index';

const Transections_TheadAction = ({ selected, handleSelectAll,copyView, setCopyView,moveView, setMoveView,oppositeView, setOppositeView,categoryView, setCategoryView,paymentView, setPaymentView,contactView, setContactView }) => {
    return (
        <thead
            className='text-sm h-12'
        >
            <tr
                className='bg-slate-100 border-b'
            >
                <td
                    colSpan={9}
                    className='p-4'
                >
                    <div
                        className='flex items-center space-x-5'
                    >

                        <button
                            className='flex items-center space-x-2'
                        >
                            {selected?.length > 0 ?
                                <MdOutlineCheckBox
                                    size={20}
                                    onClick={handleSelectAll}
                                />
                                :
                                <MdOutlineCheckBoxOutlineBlank
                                    size={20}
                                    onClick={handleSelectAll}
                                />
                            }
                            <span>Select all</span>
                        </button>

                        <span className='text-[#4863D4]'>|</span>

                        <button
                            className='px-2 py-0.5 flex items-center space-x-2 hover:bg-[#e7ebff] rounded'
                        >
                            <MdDeleteOutline
                                size={20}
                                className='text-red-500'
                            />
                            <span>Delete</span>
                        </button>

                        <span className='text-[#4863D4]'>|</span>

                        <Transections_TheadAction_MoveCopy {...{copyView, setCopyView,moveView, setMoveView,oppositeView, setOppositeView}} />

                        <span className='text-[#4863D4]'>|</span>

                        <Transections_TheadAction_Change {...{categoryView, setCategoryView,paymentView, setPaymentView,contactView, setContactView }} />
                    </div>
                </td>
            </tr>
        </thead>
    );
};

export default Transections_TheadAction;