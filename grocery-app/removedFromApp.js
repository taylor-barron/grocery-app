
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddCat, setShowAddCat] = useState(false)
  const [showDeleteOrShop, setShowDeleteOrShop] = useState(false)
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const { user, isAuthenticated, isLoading } = useAuth0();

  // reworked
  useEffect(() => {
    const getData = async () => {
      const categoriesFromServer = await fetchCategories(user.email)
      console.log(categoriesFromServer)
      setCategories(categoriesFromServer)
      const itemsFromServer = await fetchItems(user.email)
      setItems(itemsFromServer)
    }
    /*if (isAuthenticated) {
      const email = user.email;
      getData(email)
    }
      const email = user.email;*/
      getData()
  }, [])

  // reworked
  const fetchItems = async (email) => {
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

  // NEED env for heroku, Fetch categories to populate app
  const fetchCategories = async (email) => {

    const categoriesRes = await fetch('http://localhost:7500/getCategories'/*'https://grocery-app-tb.herokuapp.com/getCategories'*/, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: email,
    })

    const categoriesData = await categoriesRes.json()
    console.log(categoriesData)

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
  const addCategory = async (email, category) => {
    const addCategory = { email: email, category: category}
    const res = await fetch(/*process.env.REACT_APP_HEROKU+*/'https://grocery-app-tb.herokuapp.com/addCategory', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(addCategory),
    })

    const data = await res.json()
    console.log(data)

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

  // Edit completed attribute, ie move items between bought and category sections
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

  // DELETE's

  const deleteItem = async (id) => {
    const res = await fetch(`http://localhost:5000/items/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setCategories(categories.filter((category) => category.id !== id))
      : alert('Error Deleting This Category')
  }

  // Delete Task, probably fine, no delete item currently
  const deleteCategory = async (id) => {
    const categoryToDelete = fetchCategory(id)
    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setCategories(categories.filter((category) => category.id !== id))
      : alert('Error Deleting This Category')
    
      // update all items to new category
      const allItems = await fetchItems()
      const inCategory = allItems.filter(item => item.category === categoryToDelete.category)
  
      if (inCategory.length > 1) {
        console.log(inCategory)
        Object.values(inCategory).forEach(element => {
          onEditItem(element.id, element.item, "", element.frequency, element.completed)
        });
      } else if (inCategory.length == 1) {
        console.log(inCategory)
        const oneItem = inCategory[0]
        onEditItem(oneItem.id, oneItem.item, "", oneItem.frequency, oneItem.completed)
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

  // Edit item.item and item.category

  /*if (isLoading) {
    return <div>Loading ...</div>;
  } else {
  
    const userCategories = fetchCategories(user.email);
    console.log(userCategories)*/

    {
	
      "email": "taylor.barron989@gmail.com",
      "previousCategory": "d",
      "newCategory": "f",
      "items": [
        {
          "item": "d",
          "category": "d",
          "frequency": true,
          "completed": false
        },
        {
          "item": "s",
          "category": "d",
          "frequency": true,
          "completed": false
          
        }
      ]
  }