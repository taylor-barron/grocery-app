import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditCategory = ({ email, onEditCategory, onDeleteCategory, category, items }) => {
    const oldCategory = category.category;
    const [newCategory, setNewCategory] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        // pass edit item function and items, complete item category changes here and refresh page on change
        const previousCategory = category;

        if (!newCategory) {
            alert('Please enter a category name')
            return
        }

        onEditCategory( email, newCategory, category[1], items )

        setNewCategory('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
          <div className='form-control'>
            <div className="deleteFa">
              <label>Category</label>
              <FaTimes
                style={{ color: 'red', cursor: 'pointer', height:'15px'}}
                onClick={() => onDeleteCategory(email, category, items)}
              />
            </div>
            <input
              type='text'
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>  
          <input type='submit' value='Edit Category' className='btn btn-block' />
        </form>
    )
}

export default EditCategory