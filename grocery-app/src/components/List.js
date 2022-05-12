import Category from './Category'

const List = ({ categories, items, deleteOrShop }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} category={category} items={items} deleteOrShop={deleteOrShop} />
      ))}
    </>
  )
}

export default List