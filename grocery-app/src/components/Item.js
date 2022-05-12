import { FaCheckSquare, FaTimes } from 'react-icons/fa'

const Item = ({ item, deleteOrShop }) => {

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