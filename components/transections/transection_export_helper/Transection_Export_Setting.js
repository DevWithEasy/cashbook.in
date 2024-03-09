import React from 'react';
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

const Transection_Export_Setting = ({ fields,setFields }) => {
    const settingsCompulsary = [
        {
            column: 'date',
            title: 'Date'
        },
        {
            column: 'cashin',
            title: 'Cash In'
        },
        {
            column: 'cashout',
            title: 'Cash Out'
        }
    ]
    const settings = [
        {
            column: 'remark',
            title: 'Remark'
        },
        {
            column: 'category',
            title: 'Category'
        },
        {
            column: 'payment',
            title: 'Payment'
        },
        {
            column: 'contact',
            title: 'Contact'
        },
        {
            column: 'members',
            title: 'Members'
        },
        {
            column: 'balance',
            title: 'Balance'
        }
    ]
    const handleColumn=(col)=>{
        if(fields.includes(col)){
            setFields(fields.filter(f=>f !== col))
        }else{
            setFields([...fields,col])
        }
    }
    return (
        <div
            className='space-y-3'
        >
            <p
                className='text-sm'
            >
                Select columns you wish to include in All Entries
            </p>
            <div
                className='grid grid-cols-2 md:grid-cols-3 gap-3'
            >
                {
                    settingsCompulsary.map((s, i) =>
                        <div
                            key={i}
                            className='p-2 md:p-4 flex items-center space-x-2 bg-[#EEEEEE] rounded-md cursor-not-allowed'
                        >
                            <div>
                                <RiCheckboxFill size={25} className='text-[#2563EB] ' />
                            </div>
                            <div
                                className='w-full flex justify-between items-center'
                            >
                                <p className='text-sm'>{s.title}</p>
                                <p className='text-xs'>Compulsary</p>
                            </div>
                        </div>
                    )
                }
                {
                    settings.map((s, i) =>
                    <div
                    key={i}
                    onClick={()=>handleColumn(s.column)}
                    className={`p-2 md:p-4 flex items-center space-x-2 border rounded-md cursor-pointer ${fields.includes(s.column) ? 'bg-[#EBEEFD]' : ''}`}
                >
                    <div>
                        {
                            fields.includes(s.column) ? 
                            <RiCheckboxFill size={25} className='text-[#2563EB] ' />
                            :
                            <RiCheckboxBlankLine size={25} className='text-gray-400'/>
                        }
                        
                    </div>
                    <p className='text-sm'>{s.title}</p>
                </div>
                    )
                }
            </div>
        </div>
    );
};

export default Transection_Export_Setting;