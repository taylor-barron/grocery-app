import { useState } from "react";

const AddCategory = ({ onAddCategory }) => {
    const [category, setCategory] = useState('')
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!category) {
        alert('Please add a category')
        return
      }
  
      onAddCategory({ category })
  
      setCategory('')
    }
  
    return (
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Category</label>
          <input
            type='text'
            placeholder='Add Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>  
        <input type='submit' value='Add Category' className='btn btn-block' />
      </form>
    )
}
  
export default AddCategory