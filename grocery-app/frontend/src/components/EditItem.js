import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditItem = ({ email, onEditItem, onDeleteItem, item, categories }) => {
    const [newItem, setNewItem] = useState(item.item)
    const [groceryCategory, setGroceryCategory] = useState(item.category)
    const [groceryFrequency, setGroceryFrequency] = useState(item.frequency)
    const [groceryCompleted, setGroceryCompleted] = useState(item.completed)

    const onSubmit = (e) => {
        //e.preventDefault()
        const previousItem = item.item;

        if (!newItem) {
            alert('This cannot be blank')
            return
        }
        if (!groceryCategory) {
          alert('Please select a category')
          return
        }

        onEditItem( email, newItem, previousItem, groceryCategory, groceryFrequency, groceryCompleted )

        setNewItem('')
        setGroceryCategory('')
        setGroceryFrequency(item.frequency)
        setGroceryCompleted(item.completed)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <div className="deleteFa">
                    <label>Item</label>
                    <FaTimes
                        style={{ color: 'red', cursor: 'pointer', height:'15px'}}
                        onClick={() => onDeleteItem(email, item.item)}
                        />
                </div>
                <input
                    type='text'
                    placeholder={newItem}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='category'>Choose Category</label>
                
                <select className='select' name='category' id='categorySelect' 
                    onChange={(e) => setGroceryCategory(e.target.value)}>
                    <option value={item.category} default hidden>{item.category}</option>
                    {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                </select>
            </div>
            <div className='form-control form-control-check'>
                <label>Frequent Item</label>
                <input
                    type='checkbox'
                    checked={groceryFrequency}
                    value={groceryFrequency}
                    onChange={(e) => setGroceryFrequency(e.currentTarget.checked)}
                />
            </div>
            <input type='submit' value='Edit Item' className='btn btn-block' />
        </form>
    )
}

export default EditItem