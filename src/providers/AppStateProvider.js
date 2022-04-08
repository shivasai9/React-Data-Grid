import { createContext, useReducer } from "react";

const initialAppState = {
    openHistory: false,
    tableData: [],
    historyData: [],
    lastUpdatedCellId: ''
};

const AppContext = createContext(initialAppState);

const getLatestHistoryData = (presentHistoryData, latestHistoryItem) => {
    console.log('presentHistoryData, latestHistoryItem', presentHistoryData, latestHistoryItem)
    const { date, rowNo, colNo, newValue, oldValue } = latestHistoryItem;
    const month = date.toLocaleString('default', { month: 'long' });
    const dateNo = date.getDate();
    const year = date.getFullYear();
    const newNodeHeader = `${month} ${dateNo}, ${year}`;
    const presentNodeHeaders = presentHistoryData.map(node => node?.date);

    let latestHistoryData;
    const newNodeItem = { rowNo: rowNo + 1, colNo: colNo + 1, newValue, oldValue, time: date.toLocaleTimeString() }
    if (presentNodeHeaders.includes(newNodeHeader)) {
        latestHistoryData = presentHistoryData.map((node) => {
            if (node.date === newNodeHeader) {
                return { ...node, changes: [newNodeItem, ...node.changes] }
            } else {
                return node;
            }
        })
    } else {
        latestHistoryData = [{ date: newNodeHeader, changes: [newNodeItem] }, ...presentHistoryData]
    }
    localStorage.setItem('rdg-historyData', JSON.stringify(latestHistoryData));

    return latestHistoryData;
}

const getlatestTableData = (presentTableData, latestTableRow) => {
    let latestTableData = presentTableData.slice();
    const { colName, latestInputVal, rowNo } = latestTableRow;

    latestTableData[rowNo][colName] = latestInputVal;
    localStorage.setItem('rdg-tableData', JSON.stringify(latestTableData));
    return latestTableData;
}
const appStateReducer = (state, action) => {
    switch (action.type) {

        case 'UPDATE_OPEN_HISTORY':
            return { ...state, openHistory: !state.openHistory }

        case 'UPDATE_TABLE_DATA':
            return { ...state, tableData: action.payload }

        case 'UPDATE_HISTORY_DATA':
            return { ...state, historyData: action.payload }

        case 'UPDATE_HISTORY_AND_TABLE_DATA':
            const { historyData, tableData } = state;
            return {
                ...state,
                historyData: getLatestHistoryData(historyData, action.payload?.historyItem),
                tableData: getlatestTableData(tableData, action.payload.tableRow),
                lastUpdatedCellId: action.payload.lastUpdatedCellId
            }

        default:
            throw new Error('dispatch valid action!!')

    }
}
const AppStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialAppState);
    const appstateActions = {
        updateOpenHistory() {
            dispatch({
                type: 'UPDATE_OPEN_HISTORY'
            })
        },
        updateTableData(tableData) {
            dispatch({
                type: 'UPDATE_TABLE_DATA',
                payload: tableData
            })
        },
        updateHistoryData(historyData) {
            dispatch({
                type: 'UPDATE_HISTORY_DATA',
                payload: historyData
            })
        },
        updateHistoryAndTableData(historyItem, tableRow) {
            const lastUpdatedCellId = `${tableRow.rowNo}-${tableRow.colName}`
            dispatch({
                type: 'UPDATE_HISTORY_AND_TABLE_DATA',
                payload: { historyItem, tableRow, lastUpdatedCellId }
            })
        }
    };
    return <AppContext.Provider value={{ state, actions: appstateActions }}> {children}</AppContext.Provider >
}

export { AppContext, AppStateProvider }