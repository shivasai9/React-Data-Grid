import './HistoryButton.css';

const HistoryButton = ({ onClickHandler }) => {
    return <div className="rdg-history-button" onClick={onClickHandler}>
        <i className="fa fa-thin fa-clock"></i>
        <div>History</div>
    </div>
}

export default HistoryButton;