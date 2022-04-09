import './PersonalInfoDashboard.css';
import { DataTable, HistoryButton, InputSearch, History } from '../../components';
import { AppContext } from '../../providers';
import { useCallback, useContext } from 'react';
import { useDebounce } from '../../hooks';


const PersonalInfoDashboard = () => {
    const { state: appState, actions } = useContext(AppContext);

    const historyButtonOnclickHandler = () => {
        actions.updateOpenHistory();
    }

    const onInputSearchChangeHandler = (event) => {
        const searchValue = event.target.value;
        actions.updateSearchValueAndMatchedRows(searchValue);
    }

    const debouncedOnInputSearchChangeHandler = useCallback(useDebounce(onInputSearchChangeHandler, 300), [])
    

    return <div className='rdg-personal-info-dashboard'>
        <div className='rdg-page-heading'>
            <h3>React Data grid</h3>
            <p>A data grid is an architecture or set of services that gives individuals or groups of users the ability to access, modify and transfer extremely large amounts of geographically distributed data for research purposes</p>
        </div>
        <div className='rdg-view'>
            <div className='rdg-view-row-1'>
                <InputSearch value={appState.searchValue} onChangeHandler={(event) => {
                    actions.updateSearchValue(event.target.value);
                    debouncedOnInputSearchChangeHandler(event);
                }} />
                <HistoryButton onClickHandler={historyButtonOnclickHandler} />
            </div>
            <DataTable data={appState.tableData} />
        </div>
        {appState.openHistory ? <History /> : null}
    </div>
};

export default PersonalInfoDashboard;