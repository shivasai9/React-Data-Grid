import React, { useState, useContext } from 'react';
import './DataTable.css';
import { AppContext } from '../../providers';

const DataTable = ({ data }) => {
    const [selectedCellId, updateSelectedCellId] = useState('');
    const [previousInputVal, updatePreviousInputVal] = useState('');
    const [latestInputVal, updateLatestInputVal] = useState('');
    const { state, actions } = useContext(AppContext);
    console.log('state.lastUpdatedCellId', state.lastUpdatedCellId)
    const inputChangeHandler = (latestVal) => {
        updateLatestInputVal(latestVal);
    }

    const onTableCellClickHandler = (rowNo, rowEl) => {
        const id = `${rowNo}-${rowEl[0]}`;
        updateSelectedCellId(id);
        updatePreviousInputVal(rowEl[1]);
        updateLatestInputVal(rowEl[1]);
    };

    const onInputBlurHandler = (rowNo, colNo, colName) => {
        updateSelectedCellId('');
        if (previousInputVal !== latestInputVal) {
            const historyItem = {
                rowNo,
                colNo,
                newValue: latestInputVal,
                oldValue: previousInputVal,
                date: new Date()
            };
            const tableRow = {
                colName,
                latestInputVal,
                rowNo
            };
            actions.updateHistoryAndTableData(historyItem, tableRow);
        } else {
            updatePreviousInputVal('');
            updateLatestInputVal('');
        }
    }

    return <table className='rdg-table'>
        <tbody>
            <tr>
                {data.length ? Object.entries(data[0])
                    .map((row, index) => <th key={`${row[0]}-${index}`}>{row[0].toUpperCase()}</th>) : null}
            </tr>

            {data.length ? data.map((row, rowIndex) => {
                return <tr key={rowIndex}>{Object.entries(row).map((rowEl, colIndex) => {
                    return <React.Fragment key={colIndex}>
                        {selectedCellId !== `${rowIndex}-${rowEl[0]}` ? <td key={rowEl[0]} id={`${rowIndex}-${rowEl[0]}`}
                            onClick={() => onTableCellClickHandler(rowIndex, rowEl)}>
                            {rowEl[1]}
                            {state.lastUpdatedCellId === `${rowIndex}-${rowEl[0]}` ? <i className="fa fa-check-circle rdg-cell-updated"></i> : null}</td> : null}
                        {selectedCellId === `${rowIndex}-${rowEl[0]}` ?
                            <input className='rdg-inline-input' value={latestInputVal}
                                onChange={(event) => inputChangeHandler(event.target.value)}
                                onBlur={() => onInputBlurHandler(rowIndex, colIndex, rowEl[0])}
                                autoFocus={true} />

                            : null}
                    </React.Fragment>
                })}</tr>
            }) : null}
        </tbody>
    </table>
};

export default DataTable;