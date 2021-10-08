import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


/**
 * REQUIREMENTS: 
 * A form to add a new line
 * A list of items
 */

function ShelfPage() {
  
  const dispatch = useDispatch();
  const shelfItems = useSelector(store => store.shelfReducer);
  const [itemDescription ,setItemDescription] = useState("");
  const [imageURL ,setImageURL] = useState("");


  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    //dispatach to get items from item reducer here 
    dispatch({type: 'GET_SHELF'})
  }

  const postItem = () => {
    console.log(itemDescription)
    dispatch({ type: 'POST_ITEM', payload: {itemDescription: itemDescription, imageURL: imageURL}});
  }
  const deleteItem = (event) => {
    console.log(event.target.value)
    dispatch({type: 'DELETE_ITEM', payload: event.target.value})
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <form onSubmit={postItem}>
        <input placeholder="Link to Image" type='text' value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
        <input placeholder="Description" type='text' value={itemDescription} onChange={(event) => setItemDescription(event.target.value)} />
        <input type='submit' value='Add New Item' />
        {shelfItems.map((item) =>(
          <div>
            <img src={item.image_url}/>
            <p>{item.description}</p>
            <button value={item.id} onClick={(event) => deleteItem(event)}>Delete</button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default ShelfPage;
