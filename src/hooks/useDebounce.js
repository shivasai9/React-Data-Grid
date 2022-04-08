const useDebounce = (func, debounceTime) => {
    let timer;
    return (...args) => {
        clearInterval(timer);
        timer = setTimeout(() => func(...args), debounceTime) 
    }
};

export default useDebounce;