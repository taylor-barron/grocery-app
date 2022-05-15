import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
//import Category from './components/Category'
import AddItem from './components/AddItem'
import About from './components/About'
import AddCategory from './components/AddCategory'

const App = () => {
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddCat, setShowAddCat] = useState(false)
  const [showDeleteOrShop, setShowDeleteOrShop] = useState(false)
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

  // reworked
  useEffect(() => {
    const getData = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
      const itemsFromServer = await fetchItems()
      setItems(itemsFromServer)
    }

    getData()
  }, [])

  // reworked
  const fetchItems = async () => {
    const itemsRes = await fetch('http://localhost:5000/items')
    const itemsData = await itemsRes.json()

    return itemsData
  }

  // Fetch single item
  const fetchItem = async (id) => {
    const itemRes = await fetch(`http://localhost:5000/items/${id}`)
    const itemData = await itemRes.json()

    return itemData
  }

  // reworked
  const fetchCategories = async () => {
    const categoriesRes = await fetch('http://localhost:5000/categories')
    const categoriesData = await categoriesRes.json()

    return categoriesData
  }

  // fetch single category
  const fetchCategory = async (id) => {
    const catRes = await fetch(`http://localhost:5000/categories/${id}`)
    const catData = await catRes.json()

    return catData
  }

  // reworked
  const addItem = async (item) => {
    const res = await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    const data = await res.json()

    setItems([...items, data])

  }

  // reworked
  const addCategory = async (category) => {
    const res = await fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(category),
    })

    const data = await res.json()

    setCategories([...categories, data])
  }

  // EDIT FUNCTIONS

  // onEditItem
  const onEditItem = async (id, newItem, newCategory, newFrequency, newCompleted) => {
    //const itemToEdit = await fetchItem(id)
    const updateItem = { id: id, item: newItem, category: newCategory, frequency: newFrequency, completed: newCompleted }

    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateItem),
    })

    const data = await res.json()

    const getData = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
      const itemsFromServer = await fetchItems()
      setItems(itemsFromServer)
    }

    getData()
  }

  // Edit Category
  const onEditCategory = async (id, newCategory) => {
    const categoryToEdit = await fetchCategory(id)
    const updateCategory = {id: id, category: newCategory}

    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateCategory),
    })
    
    // update all items to new category
    const allItems = await fetchItems()
    const inCategory = allItems.filter(item => item.category === categoryToEdit.category)

    /*for (var i = 0; i < inCategory.length; i++) {
      onEditItem(inCategory[i].id, inCategory[i].item, newCategory, inCategory[i].frequency, inCategory[i].completed)  
    }*/
    if (inCategory.length > 1) {
      console.log(inCategory)
      // Object.keys(inCategory)
      // inCategory.array.forEach(element => {
      Object.values(inCategory).forEach(element => {
        onEditItem(element.id, element.item, newCategory, element.frequency, element.completed)
      });
    } else if (inCategory.length == 1) {
      console.log(inCategory)
      const oneItem = inCategory[0]
      onEditItem(oneItem.id, oneItem.item, newCategory, oneItem.frequency, oneItem.completed)
    }

    // Display changes
    const getData = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
      const itemsFromServer = await fetchItems()
      setItems(itemsFromServer)
    }

    getData()
    setShowDeleteOrShop(false)
  }

  // Delete Task, probably fine, no delete item currently
  const deleteCategory = async (id) => {
    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setCategories(categories.filter((category) => category.id !== id))
      : alert('Error Deleting This Category')
  }

  const deleteItem = async (id) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setCategories(categories.filter((category) => category.id !== id))
      : alert('Error Deleting This Category')
  }

  // Edit Completed function
  const toggleCompleted = async (id) => {
    const itemToToggle = await fetchItem(id)
    const updateItem = { ...itemToToggle, completed: !itemToToggle.completed }

    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateItem),
    })

    const data = await res.json()

    
    const getData = async () => {
      const categoriesFromServer = await fetchCategories()
      setCategories(categoriesFromServer)
      const itemsFromServer = await fetchItems()
      setItems(itemsFromServer)
    }

    getData()
  }

  // Edit item.item and item.category

  return (
    <Router>
      <div className='container'>
        <Header
          onAddItem={() => {
            setShowAddItem(!showAddItem)
            setShowAddCat(false)
            setShowDeleteOrShop(false)
          }}
          onAddCategory={() => {
            setShowAddCat(!showAddCat)
            setShowAddItem(false)
            setShowDeleteOrShop(false)
          }}
          onDeleteOrShop={() => {
            setShowDeleteOrShop(!showDeleteOrShop)
            setShowAddCat(false)
            setShowAddItem(false)
          }}
          showItem={showAddItem}
          showCat={showAddCat}
          showDeleteOrShop={showDeleteOrShop}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddItem && <AddItem onAddItem={addItem} categories={categories} />}
                {showAddCat && <AddCategory onAddCategory={addCategory} />}
                {categories.length > 0 ? (
                  <List
                    categories={categories}
                    items={items}
                    // default is false, shopping. True is delete/edit mode
                    mode={showDeleteOrShop}
                    onShoppingFaItem={toggleCompleted}
                    //onEditingFaItem={}
                    onFaCategory={deleteCategory}
                    onEditItem={onEditItem}
                    onEditCategory={onEditCategory}
                  />
                ) : (
                  'No Items To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App