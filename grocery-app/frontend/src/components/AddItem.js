import { useState } from 'react'

const AddItem = ({ onAddItem, categories }) => {
  const [item, setItem] = useState('')
  const [category, setCategory] = useState('')
  const [frequency, setFrequency] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!item) {
      alert('Please add an item')
      return
    }
    if (!category) {
      alert('Please add a category')
      return
    }

    onAddItem({ item, category, frequency })

    setItem('')
    setCategory('')
    setFrequency(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Item</label>
        <input
          type='text'
          placeholder='Add Item'
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <div className='form-control'>
          <label htmlFor='category'>Choose Category</label>
          <select className='select' name='category' id='categorySelect' 
            onChange={(e) => setCategory(e.target.value)}>
            <option value={"Select a category"} default hidden disabled>Select a Category</option>
            {categories.map((categories, index) => <option key={index} value={categories.category}>{categories.category}</option>)}
          </select>
      </div>
      <div className='form-control form-control-check'>
        <label>Frequent Item</label>
        <input
          type='checkbox'
          checked={frequency}
          value={frequency}
          onChange={(e) => setFrequency(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Add Item' className='btn btn-block' />
    </form>
  )
}

export default AddItem