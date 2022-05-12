import Item from './Item'

const Category = ({ category, items, onDelete }) => {
  return (
    <>
      <h2>{ category.category }{' '}</h2>
      {items.map((item, index) => (
        <Item key={index} item={item} onDelete={onDelete} />
      ))}
    </>
  )
}

export default Category