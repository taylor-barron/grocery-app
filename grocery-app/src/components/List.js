import Category from './Category'
import Frequent from './Frequent'
import Infrequent from './Infrequent'

const List = ({ categories, items, deleteOrShop }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} category={category} items={items} deleteOrShop={deleteOrShop} />
      ))}
      <Frequent items={items} deleteOrShop={deleteOrShop}/>
      <Infrequent items={items} deleteOrShop={deleteOrShop}/>
    </>
  )
}

export default List