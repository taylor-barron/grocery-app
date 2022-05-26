import Category from './Category'
import Frequent from './Frequent'
import Infrequent from './Infrequent'
import { useAuth0 } from "@auth0/auth0-react";

//frequent and infrequent need to be checked for functionalities, get rid of onFa
const List = ({ email, categories, items, mode, toggle, onFaCategory, onEditItem, onEditCategory, onDeleteItem, onDeleteCategory }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} email={email} categories={categories} category={category} items={items} mode={mode} toggle={toggle} onEditItem={onEditItem} onEditCategory={onEditCategory} onDeleteItem={onDeleteItem} onDeleteCategory={onDeleteCategory} />
      ))}
      <Frequent email={email} categories={categories} items={items} mode={mode} toggle={toggle} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
      <Infrequent email={email} categories={categories} items={items} mode={mode} toggle={toggle} />
      <Category email={email} categories={categories} category="No Category" items={items} mode={mode} toggle={toggle} onFaCategory={onFaCategory} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
    </>
  )
}

export default List