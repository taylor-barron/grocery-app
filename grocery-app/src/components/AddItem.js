import { useState } from 'react'

const AddItem = ({ onAdd }) => {
  const [item, setItem] = useState('')
  const [category, setCategory] = useState('')
  const [frequency, setFrequency] = useState(false)
  const [completed, setCompleted] = useState(false)

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

    onAdd({ item, category, frequency, completed })

    setItem('')
    setCategory('')
    setFrequency(false)
    setCompleted(false)
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
        <label>Category</label>
        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
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
      <div className='form-control form-control-check'>
        <label>Already Purchased</label>
        <input
          type='checkbox'
          checked={completed}
          value={completed}
          onChange={(e) => setCompleted(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Add Item' className='btn btn-block' />
    </form>
  )
}

export default AddItem