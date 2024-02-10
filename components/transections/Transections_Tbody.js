import React from 'react';
import { Transections_Tbody_Tr } from '../Index';

const Transections_Tbody = ({ menuId, setMenuId, check, handleCheck, handleDetails, deleteView, setDeleteView, updateView, setUpdateView }) => {
    return (
        <tbody>
            <Transections_Tbody_Tr {...{
                menuId, setMenuId,
                check,
                handleCheck,
                handleDetails,
                deleteView, setDeleteView,
                updateView, setUpdateView
            }} />
        </tbody>
    );
};

export default Transections_Tbody;