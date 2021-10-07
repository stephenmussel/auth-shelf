import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import shelfReducer from '../reducers/shelf.reducer';



function* postItem(action) {
    try {
      console.log("in post item", action.payload);
      yield axios.post('/api/shelf', action.payload) 
      //yield put({ type: 'GET_ITEMS'})   
  } catch(error) {
      console.log(error);  
  }
}




function* fetchShelf() {
    try {
        const shelfResponse = yield axios.get('/api/shelf');
        console.log('');
        
        yield put({type: 'SET_SHELF', payload: shelfResponse.data});

    } catch(error) {
        console.log('error in fetchShelf', error);  
    }
}

function* shelfSaga() {
    yield takeLatest('GET_SHELF', fetchShelf);
    yield takeLatest('POST_ITEM', postItem);
  }


export default shelfSaga;