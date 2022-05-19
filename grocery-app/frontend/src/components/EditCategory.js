import { useState } from "react";

const EditCategory = ({ onEditCategory, category }) => {
    const [categoryName, setCategoryName] = useState(category.category)

    const onSubmit = (e) => {
        //e.preventDefault()
        // pass edit item function and items, complete item category changes here and refresh page on change

        if (!categoryName) {
            alert('Please enter a category name')
            return
        }

        onEditCategory(category.id, categoryName)

        setCategoryName('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
          <div className='form-control'>
            <label>Category</label>
            <input
              type='text'
              placeholder={categoryName}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>  
          <input type='submit' value='Edit Category' className='btn btn-block' />
        </form>
    )
}

export default EditCategory