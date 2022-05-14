import Item from './Item'

const Category = ({ category, categories, items, mode, onShoppingFaItem, onFaCategory, onEditItem, onEditCategory }) => {

  const inCategory = items.filter(item => item.category === category.category)
  const inCategoryUnpurchased = inCategory.filter(inCategory => inCategory.completed === false)
  return (
    <>
      <h2>{ category.category }{' '}</h2>
      <hr></hr>
      {inCategoryUnpurchased.map((item, index) => (
        <Item key={index} item={item} categories={categories} mode={mode} onShoppingFaItem={onShoppingFaItem} onEditItem={onEditItem} />
      ))}
      <br></br>
    </>
  )
}

export default Category