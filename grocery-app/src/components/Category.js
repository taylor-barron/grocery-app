import Item from './Item'

const Category = ({ category, items, deleteOrShop }) => {

  const inCategory = items.filter(item => item.category === category.category)
  return (
    <>
      <h2>{ category.category }{' '}</h2>
      <hr></hr>
      {inCategory.map((item, index) => (
        <Item key={index} item={item} deleteOrShop={deleteOrShop} />
      ))}
      <br></br>
    </>
  )
}

export default Category