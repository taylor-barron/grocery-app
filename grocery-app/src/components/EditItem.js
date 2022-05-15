import { useState } from "react";

const EditItem = ({ onEditItem, item, categories }) => {
    const [id, setId] = useState(item.id)
    const [groceryItem, setGroceryItem] = useState(item.item)
    const [groceryCategory, setGroceryCategory] = useState(item.category)
    const [groceryFrequency, setGroceryFrequency] = useState(item.frequency)
    const [groceryCompleted, setGroceryCompleted] = useState(item.completed)

    const onSubmit = (e) => {
        // Chose to refresh page here or else show edit state can make a mess of the page quickly
        //e.preventDefault()

        if (!groceryItem) {
            alert('This cannot be blank')
            return
        }
        if (!groceryCategory) {
          alert('Please select a category')
          return
        }

        onEditItem( id, groceryItem, groceryCategory, groceryFrequency, groceryCompleted )

        setGroceryItem('')
        setGroceryCategory('')
        setGroceryFrequency(item.frequency)
        setGroceryCompleted(item.completed)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Item</label>
                <input
                    type='text'
                    placeholder={groceryItem}
                    value={groceryItem}
                    onChange={(e) => setGroceryItem(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label htmlFor='category'>Choose Category</label>
                
                <select className='select' name='category' id='categorySelect' 
                    onChange={(e) => setGroceryCategory(e.target.value)}>
                    <option value={item.category} default hidden>{item.category}</option>
                    {categories.map((categories, index) => <option key={index} value={categories.category}>{categories.category}</option>)}
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