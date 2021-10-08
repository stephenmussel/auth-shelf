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
    //dispatch to get items from item reducer here 
    dispatch({type: 'GET_SHELF'})
  }

  const postItem = () => {
    console.log(itemDescription)
    if (imageURL === "" || itemDescription === ""){
      alert('put info in the inputs or whatever dude idk im just doing my job, i have a lot of stuff going on right now i really dont want to like bother you or anything and i dont mean to come off as rude its just i walked outside this morning and stepped/slipped on dog poop and got it all over my brand new bright pink leather pants and its just been a lot to deal with id been waiting for those pants to come in the mail for several months because of the recent supply chain issues and when i took them into the leather pants repair store the guy told me he specifically doesnt work with leather that has dog poop on it because of an incident from his childhood that he didnt feel comfortable getting into which is completely understandable i barely feel like i can talk about this but here i am just spilling my guts out to some random user, ugh classic me! lol')
    } else {
      dispatch({ type: 'POST_ITEM', payload: {itemDescription: itemDescription, imageURL: imageURL}});
    }
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
      </form>
        {shelfItems.map((item) =>(
          <div>
            <img src={item.image_url}/>
            <p>{item.description}</p>
            <button value={item.id} onClick={(event) => deleteItem(event)}>Delete</button>
          </div>
        ))}
      
    </div>
  );
}

export default ShelfPage;
