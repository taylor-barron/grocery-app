import { useState } from 'react'
import Item from './Item'
import Button from './Button'
import EditCategory from './EditCategory'

const Category = ({ category, categories, items, mode, onShoppingFaItem, onFaCategory, onEditItem, onEditCategory }) => {
  const [showEditCategory, setShowEditCategory] = useState(false)
  const [click, setClicks] = useState(0)

  const inCategory = items.filter(item => item.category === category.category)
  const inCategoryUnpurchased = inCategory.filter(inCategory => inCategory.completed === false)

  // default mode is false, shopping. 
  if(mode) {
    return (
      <>
        <div className='editItemDiv'>
          <h2>{ category.category }{' '}</h2>
          <Button
            color={showEditCategory ? 'red' : 'skyblue'}
            text={showEditCategory ? 'close' : 'edit'}
            onClick={() => {
              setShowEditCategory(!showEditCategory)
              setClicks(1)
            }}
            buttonClass="editItemButton"
          />
        </div>
        {(showEditCategory && click > 0) && <EditCategory onEditCategory={onEditCategory} category={category} />}
        {inCategoryUnpurchased.map((item, index) => (
          <Item key={index} item={item} categories={categories} mode={mode} onShoppingFaItem={onShoppingFaItem} onEditItem={onEditItem} />
        ))}
        <br></br>
      </>
    )
  } else { 
    return (
      <>
        <div>
          <h2>{ category.category }{' '}</h2>
        </div>
        {inCategoryUnpurchased.map((item, index) => (
          <Item key={index} item={item} categories={categories} mode={mode} onShoppingFaItem={onShoppingFaItem} onEditItem={onEditItem} />
        ))}
        <br></br>
      </>
    )
  }
}

export default Category