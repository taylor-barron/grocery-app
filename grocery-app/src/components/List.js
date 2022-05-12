import Category from './Category'

const List = ({ categories, items, onDelete }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} category={category} items={items} onDelete={onDelete} />
      ))}
    </>
  )
}

export default List