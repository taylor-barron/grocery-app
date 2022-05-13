import { useState } from 'react'
import Button from './Button'
import { FaCheckSquare, FaTimes } from 'react-icons/fa'

const Item = ({ item, mode, onShoppingFaItem, onEditFaItem, editItem }) => {
  const [showEditItem, setShowEditItem] = useState(false)

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
      <div className='item'
        //className={`item ${item.reminder && 'reminder'}`}
        //onDoubleClick={() => onToggle(item.id)}
      >
        <p>{item.item}{' '}</p>
        <FaCheckSquare
        style={{ color: 'steelblue', cursor: 'pointer'}}
        onClick={() => onShoppingFaItem(item.id)}
        />
      </div>
    )} else {
      return (
        <div className='item'
          //className={`item ${item.reminder && 'reminder'}`}
          //onDoubleClick={() => onToggle(item.id)}
        >
          <div>
            <p>{item.item}{' '}</p>
            <Button
              color={showEditItem ? 'red' : 'blue'}
              text={showEditItem ? 'close' : 'edit'}
              onClick={() => setShowEditItem(!showEditItem)}
            />
          </div>
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            //onClick={() => deleteItem(item.id)}
          />
        </div>        
      )
    }

  /*if (deleteOrShop == false) {
    const icon = 
    <FaTimes
      style={{ color: 'red', cursor: 'pointer' }}
      onClick={() => deleteItem(item.id)}
    />
  }*/
  return (
    <div className='item'
      //className={`item ${item.reminder && 'reminder'}`}
      //onDoubleClick={() => onToggle(item.id)}
    >
      <p>{item.item}{' '}</p>
      <FaCheckSquare style={{ color: 'steelblue', cursor: 'pointer'}} />
    </div>
  )
}

export default Item