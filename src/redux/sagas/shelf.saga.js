import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import shelfReducer from '../reducers/shelf.reducer';


function* deleteItem(){
    try {
        const itemId = action.payload
        yield axios.delete(`/api/shelf/${itemId}`)
        yield put({ type: 'GET_SHELF' })
    } catch( error ) {
        console.log( 'error in deleteItem', error )
    }
}
//adds a new item to the shelf
function* postItem(action) {
    try {
      console.log("in post item", action.payload);
      yield axios.post('/api/shelf', action.payload) 
      yield put({ type: 'GET_SHELF'})   
  } catch(error) {
      console.log(error);  
  }
}

//fetches all items from the shelf
function* fetchShelf() {
    try {
        const shelfResponse = yield axios.get('/api/shelf');
        console.log('the items ', shelfResponse);
        yield put({type: 'SET_SHELF', payload: shelfResponse.data});
    } catch(error) {
        console.log('error in fetchShelf', error);  
    }
}

function* shelfSaga() {
    yield takeLatest('GET_SHELF', fetchShelf);
    yield takeLatest('POST_ITEM', postItem);
    yield takeLatest('DELETE_ITEM', deleteItem);
  }


export default shelfSaga;