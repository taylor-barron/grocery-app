import Category from './Category'
import Frequent from './Frequent'
import Infrequent from './Infrequent'

const List = ({ categories, items, mode, onShoppingFaItem, onFaCategory, onEditItem, onEditCategory }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} categories={categories} category={category} items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} onFaCategory={onFaCategory} onEditItem={onEditItem} onEditCategory={onEditCategory} />
      ))}
      <Frequent items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} />
      <Infrequent items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} />
    </>
  )
}

export default List