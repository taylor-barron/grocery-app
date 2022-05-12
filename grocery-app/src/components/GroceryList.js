import GroceryCategory from './Tasks'
import GroceryItem from './Task'

const GroceryList = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <GroceryItem key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default GroceryList