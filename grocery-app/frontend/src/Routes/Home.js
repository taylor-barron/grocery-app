import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import List from "../components/List";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [showDeleteOrShop, setShowDeleteOrShop] = useState(false)
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    // READ FUNCTIONS

    // Fetch single item
    const fetchItem = async (id) => {
        const itemRes = await fetch(`http://localhost:5000/items/${id}`)
        const itemData = await itemRes.json()

        return itemData
    }

    // fetch single category
    const fetchCategory = async (id) => {
        const catRes = await fetch(`http://localhost:5000/categories/${id}`)
        const catData = await catRes.json()

        return catData
    }

    // NEED env for server, Fetch categories to populate app
    const fetchCategories = async (email) => {
        const userEmail = {"email": email}
        const categoriesRes = await fetch('http://localhost:7500/getCategories', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userEmail),
        })

        const categoriesData = await categoriesRes.json()

        return categoriesData
    }

    // reworked
    const fetchItems = async (email) => {
        const itemsRes = await fetch('http://localhost:5000/items')
        const itemsData = await itemsRes.json()

        return itemsData
    }

    // function generates data for home page app
    const getData = async (email) => {
        const categoriesFromServer = await fetchCategories(email)
        console.log(categoriesFromServer)
        setCategories(categoriesFromServer)
        const itemsFromServer = await fetchItems(email)
        setItems(itemsFromServer)
    }

    const email = user.email;
    getData(email)

    // ADDS

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
    addCategory(email, "Hot food")

    // EDITS

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

        /*const getData = async () => {
            const categoriesFromServer = await fetchCategories()
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems()
            setItems(itemsFromServer)
        }*/

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
        /*const getData = async () => {
            const categoriesFromServer = await fetchCategories()
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems()
            setItems(itemsFromServer)
        }*/

        getData()
        setShowDeleteOrShop(false)
    }

    // Toggle items between completed sections and to buy sections
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

    
        /*const getData = async () => {
            const categoriesFromServer = await fetchCategories()
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems()
            setItems(itemsFromServer)
        }*/

        getData()
    }

    // DELETES

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
  
    return (
      isAuthenticated && (
        <div>
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
            <LogoutButton />
        </div>
      )
    );
}

export default Home;