import './History.css';
import { AppContext } from '../../providers';
import { useContext } from 'react';

const History = () => {
    const { state: appState, actions } = useContext(AppContext);

    const closeHistory = () => {
        actions.updateOpenHistory();
    }

    return <div className='rdg-history'>
        <div className='rdg-history-header'>
            <div className='rdg-hh-left'>
                <i className="fa fa-thin fa-clock"></i>
                <div>History</div>
            </div>
            <div className='rdg-hh-right' onClick={closeHistory}>
                x
            </div>
        </div>
        <div className='rdg-history-body'>
            {appState.historyData.length ? appState.historyData.map((node, index) => {
                return <div key={index} className='rdg-history-node'>
                    <div className='rdg-history-node-header'>
                        <div className='rdg-history-above-vertical-line'>
                        </div>
                        <div className='rdg-history-hnode-heading'>
                            <div className='rdg-circle'>
                            </div>
                            <div className='rdg-history-hnode-date'>
                                {node.date}
                            </div>
                        </div>
                    </div>
                    {node.changes.length ? node.changes.map((changes, index) => {
                        return <div key={index} className='rdg-history-node-item'>
                            <div className='rdg-history-above-vertical-line-between-items'>
                            </div>
                            <div className='rdg-history-node-value'>
                                <div>{`updated ${changes.oldValue} to ${changes.newValue} at row ${changes.rowNo}, column ${changes.colNo}`}</div>
                                <div>{changes.time}</div>
                            </div>
                        </div>
                    }) : null}
                </div>
            }) : null}

        </div>

    </div>
}

export default History;

