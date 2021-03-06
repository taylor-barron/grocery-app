import { useState, useEffect } from 'react'
import Button from './Button'
import EditItem from './EditItem'
import { FaSquare, FaTimes } from 'react-icons/fa'

const Item = ({ email, item, categories, mode, toggle, onEditItem, onDeleteItem }) => {
  const [showEditItem, setShowEditItem] = useState(false)
  const [clicks, setClick] = useState(0)

  /*
  *  item is the item json info
  *  mode is edit or shopping mode
  *       edit should have an edit button that onClick allows edit of JSON
  *       shopping is a check or uncheck that moves item between completed sections and category it belongs to
  *  onFa is the onclick function when the fa is clicked
  *       in shopping mode it is check/uncheck that moves between sections
  *       in edit it is an x that permanently deletes item
  *  onEdit is function to pass to button onClick when in edit mode
  */

  if (!mode) {
    // shopping mode
    return (
      <div>
        <div className='item'>
          <p className='grocery-item'>{item.item}{' '}</p>
          <FaSquare
            style={{ color: 'steelblue', cursor: 'pointer'}}
            onClick={() => toggle(email, item.item, item.completed)}
          />
        </div>
        <hr></hr>
      </div>
    )} else {
      return (
        <div className='edit-item-container'>
            <div className='editItemDiv'>
              <p>{item.item}{' '}</p>
              <Button
                color={showEditItem ? 'red' : 'blue'}
                text={showEditItem ? 'close' : 'edit'}
                onClick={() => {
                  setShowEditItem(!showEditItem)
                  setClick(1)
                }}
                buttonClass="editItemButton"
              />
            </div>
            <hr></hr>
          {(showEditItem && clicks == 1) && <EditItem email={email} onEditItem={onEditItem} onDeleteItem={onDeleteItem} item={item} categories={categories} />}
        </div>        
      )
    }

  /*if (deleteOrShop == false) {
    const icon = 
    <FaTimes
      style={{ color: 'red', cursor: 'pointer' }}
      onClick={() => deleteItem(item.id)}
    />
  }
  return (
    <div className='item'
      //className={`item ${item.reminder && 'reminder'}`}
      //onDoubleClick={() => onToggle(item.id)}
    >
      <p>{item.item}{' '}</p>
      <FaCheckSquare style={{ color: 'steelblue', cursor: 'pointer'}} />
    </div>
  )*/
            /*<FaTimes
              style={{ color: 'red', cursor: 'pointer' }}
              //onClick={() => deleteItem(item.id)}
            />*/
}

export default Item