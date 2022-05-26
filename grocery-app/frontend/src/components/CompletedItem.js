import { useState } from 'react'
import Button from './Button'
import EditItem from './EditItem'
import { FaCheckSquare, FaTimes } from 'react-icons/fa'

const Item = ({ email, categories, item, mode, toggle, onEditItem, onDeleteItem }) => {
  const [showEditItem, setShowEditItem] = useState(false)
  const [clicks, setClick] = useState(0)

  if (!mode) {
    // shopping mode
    return (
      <div>
        <div className='item'>
          <p className='grocery-item'>{item.item}{' '}</p>
          <FaCheckSquare
            style={{ color: 'steelblue', cursor: 'pointer'}}
            onClick={() => toggle(email, item.item, item.completed)}
          />
        </div>
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
}

export default Item