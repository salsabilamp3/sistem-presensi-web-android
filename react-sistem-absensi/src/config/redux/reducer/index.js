const initialState ={
    popup: false,
    isLogin: false,
    isLoading: false,
    user: {},
    datasiswa: [],
    datauser: [],
    dataabsen: [],
    jumlahsiswa: '',
    jumlahabsen: '',

}

const reducer = (state=initialState , action) => {
    if (action.type === 'CHANGE_ISLOGIN') {
        return{
            ...state,
            isLogin: action.value
        }
    }
    if (action.type === 'CHANGE_USER') {
        return{
            ...state,
            user: action.value
        }
    }
    if (action.type === 'CHANGE_LOADING') {
        return{
            ...state,
            isLoading: action.value
        }
    }
    if (action.type === 'SET_DATA') {
        return{
            ...state,
            datasiswa: action.value
        }
    }
    if (action.type === 'SET_USER') {
        return{
            ...state,
            datauser: action.value
        }
    }
    if (action.type === 'SET_ABSENKELAS') {
        return{
            ...state,
            dataabsen: action.value
        }
    }
    if (action.type === 'SET_JUMSIS') {
        return{
            ...state,
            jumlahsiswa: action.value
        }
    }
    if (action.type === 'SET_JUMAB') {
        return{
            ...state,
            jumlahabsen: action.value
        }
    }
    return state;
}

export default reducer;