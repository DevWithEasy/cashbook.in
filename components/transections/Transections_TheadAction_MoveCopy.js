import {
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react';
import React from 'react';
import { MdContentCopy, MdOutlineArrowDropDown, MdOutlineTurnRight } from 'react-icons/md';
import { TbPlusMinus } from 'react-icons/tb';

const Transections_TheadAction_MoveCopy = ({ copyView, setCopyView, moveView, setMoveView, oppositeView, setOppositeView }) => {
    return (
        <Menu>
            <MenuButton

            >
                <button
                    className='flex items-center space-x-2 text-[#4863D4]'
                >
                    <MdOutlineTurnRight
                        size={20}
                    />
                    <span>Move or Copy</span>
                    <MdOutlineArrowDropDown size={20} className='text-gray-500' />
                </button>

            </MenuButton>
            <MenuList
                className='space-y-2'
            >
                <button
                    onClick={() => setMoveView(!moveView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <MdOutlineTurnRight size={20} />
                    <span>Move Entry</span>
                </button>

                <button
                    onClick={() => setCopyView(!copyView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <MdContentCopy size={20} />
                    <span>Copy Entry</span>
                </button>

                <button
                    onClick={() => setOppositeView(!oppositeView)}
                    className='w-full p-2 flex space-x-2 text-gray-700 hover:bg-slate-100'
                >
                    <TbPlusMinus size={20} />
                    <span>Copy Opposite Entry</span>
                </button>
            </MenuList>
        </Menu>
    );
};

export default Transections_TheadAction_MoveCopy;