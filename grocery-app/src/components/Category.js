import Item from './Item'

const Category = ({ category, items, onDelete }) => {

  const inCategory = items.filter(item => item.category === category.category)
  return (
    <>
      <h2>{ category.category }{' '}</h2>
      <hr></hr>
      {inCategory.map((item, index) => (
        //if (category.category == item.category) {}
        <Item key={index} item={item} onDelete={onDelete} />
      ))}
      <br></br>
    </>
  )
}

/*{items.map((item, index) => (
        //if (category.category == item.category) {}
        <Item key={index} item={item} onDelete={onDelete} />
      ))}*/

export default Category