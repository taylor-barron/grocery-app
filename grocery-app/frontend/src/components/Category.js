import { useState } from 'react'
import Item from './Item'
import Button from './Button'
import EditCategory from './EditCategory'

const Category = ({ email, categories, category, items, mode, toggle, onDeleteCategory, onDeleteItem, onEditItem, onEditCategory }) => {
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [clicks, setClick] = useState(0)

  const inCategory = items.filter(item => item.category === category)
  const inCategoryUnpurchased = inCategory.filter(inCategory => inCategory.completed === false)

  // default mode is false, shopping. 
  if(mode) {
    return (
      <div>
        <div className='editItemDiv'>
          <h2>{ category }{' '}</h2>
          <Button
            color={showEditCategory ? 'red' : 'skyblue'}
            text={showEditCategory ? 'close' : 'edit'}
            onClick={() => {
              setShowEditCategory(!showEditCategory)
              setClick(1)
            }}
            buttonClass="editItemButton"
          />
        </div>
        {(showEditCategory && clicks == 1) && <EditCategory email={email} onEditCategory={onEditCategory} onDeleteCategory={onDeleteCategory} category={category} items={inCategory} />}
        {inCategoryUnpurchased.map((item, index) => (
          <Item key={index} email={email} item={item} categories={categories} mode={mode} toggle={toggle} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
        ))}
        <br></br>
      </div>
    )
  } else if (!mode  && inCategoryUnpurchased.length != 0) {
    return (
      <>
        <div>
          <h2>{ category }{' '}</h2>
        </div>
        {inCategoryUnpurchased.map((item, index) => (
          <Item key={index} email={email} item={item} categories={categories} mode={mode} toggle={toggle} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
        ))}
        <br></br>
      </>
    )
  }
}

export default Category