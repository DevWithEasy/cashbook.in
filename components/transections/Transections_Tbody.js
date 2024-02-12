import React from 'react';
import { Transections_Tbody_Tr } from '../Index';
import { useSelector } from 'react-redux'
import Entry from '../../utils/Entry';

const Transections_Tbody = ({ menuId, setMenuId, check, handleCheck, handleDetails, deleteView, setDeleteView, updateView, setUpdateView }) => {
    const { entries } = useSelector(state => state.book)
    const entryConst = new Entry(entries)
    const generatedEntries = entryConst.generatedEntry()
    return (
        <tbody>
            {
                generatedEntries.map(entry =>
                    <Transections_Tbody_Tr
                        key={entry._id}
                        {...{
                            entry,
                            menuId, setMenuId,
                            check,
                            handleCheck,
                            handleDetails,
                            deleteView, setDeleteView,
                            updateView, setUpdateView
                        }}
                    />
                )
            }

        </tbody>
    );
};

export default Transections_Tbody;