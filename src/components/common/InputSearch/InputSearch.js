import './InputSearch.css';

const InputSearch = ({ value, onChangeHandler }) => {
    return <div className='rdg-input-search'>
        <input value={value} placeholder={'Search for data...'} onChange={onChangeHandler} />
        <i className="fa fa-search"></i>
    </div>
}

export default InputSearch;