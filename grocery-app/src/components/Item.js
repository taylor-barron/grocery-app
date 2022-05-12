import { FaTimes } from 'react-icons/fa'

const Item = ({ item, onDelete }) => {
  return (
    <div
      //className={`item ${item.reminder && 'reminder'}`}
      //onDoubleClick={() => onToggle(item.id)}
    >
      <h3>
        {item.item}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(item.id)}
        />
      </h3>
    </div>
  )
}

export default Item