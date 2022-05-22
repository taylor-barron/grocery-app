import Category from './Category'
import Frequent from './Frequent'
import Infrequent from './Infrequent'
import { useAuth0 } from "@auth0/auth0-react";

const List = ({ items, categories, mode, onShoppingFaItem, onFaCategory, onEditItem, onEditCategory }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  /*if (isLoading) {
    return <div>Loading ...</div>;
  }*/

  if (isAuthenticated) {
    return (
      <>
        {categories.map((category, index) => (
          <Category key={index} categories={categories} category={category} items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} onFaCategory={onFaCategory} onEditItem={onEditItem} onEditCategory={onEditCategory} />
        ))}
        <Frequent items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} />
        <Infrequent items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} />
        <Category categories={categories} category="" items={items} mode={mode} onShoppingFaItem={onShoppingFaItem} onFaCategory={onFaCategory} onEditItem={onEditItem} onEditCategory={onEditCategory} />
      </>
    )
  } else {
    return ('Please log in.')
  }
}

export default List