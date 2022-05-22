import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AddCategory = ({ onAddCategory }) => {
    const [category, setCategory] = useState('')
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    const onSubmit = (e) => {
      e.preventDefault()
      const email = user.email;
  
      if (!category) {
        alert('Please add a category')
        return
      }

      const data = {category: category, email: email}
  
      onAddCategory({ email, category/*category, userEmail*/ })
  
      setCategory('')
      //setEmail('')
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