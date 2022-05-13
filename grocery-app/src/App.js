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

  // reworked, potential problem
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

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
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

    /*setCategories(
      categories.map((category) =>
        category.id === id ? { ...categories } : categories
      )
    )*/
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAddItem={() => setShowAddItem(!showAddItem)}
          onAddCategory={() => setShowAddCat(!showAddCat)}
          onDeleteOrShop={() => setShowDeleteOrShop(!showDeleteOrShop)}
          showItem={showAddItem}
          showCat={showAddCat}
          showDeleteOrShop={showDeleteOrShop}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddItem && <AddItem onAddItem={addItem} />}
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
                    //onEditItem={}
                    //onEditCategory={}
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