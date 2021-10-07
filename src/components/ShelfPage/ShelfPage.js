import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


/**
 * REQUIREMENTS: 
 * A form to add a new line
 * A list of items
 */

function ShelfPage() {
  
  const dispatch = useDispatch();
  
  const [itemDescription ,setItemDescription] = useState("");
  const [imageURL ,setImageURL] = useState("");


  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    //dispatach to get items from item reducer here 
  }

  const postItem = () => {
    console.log(itemDescription)
    dispatch({ type: 'POST_ITEM', payload: {itemDescription: itemDescription, imageURL: imageURL}});
  }


  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <form onSubmit={postItem}>
        <input placeholder="Link to Image" type='text' value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
        <input placeholder="Description" type='text' value={itemDescription} onChange={(event) => setItemDescription(event.target.value)} />
        <input type='submit' value='Add New Item' />
      </form>
    </div>
  );
}

export default ShelfPage;
