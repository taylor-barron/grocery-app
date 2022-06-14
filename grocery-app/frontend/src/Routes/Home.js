import React from "react";
import { useState, useEffect } from "react";
//import { useAuth0 } from "@auth0/auth0-react";

import Header from "../components/Header";
import AddItem from "../components/AddItem";
import AddCategory from "../components/AddCategory";
import List from "../components/List";
import LogoutButton from "../components/LogoutButton";

const Home = ({user, isAuthenticated}) => {
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [showAddItem, setShowAddItem] = useState(false)
    const [showAddCat, setShowAddCat] = useState(false)
    const [showDeleteOrShop, setShowDeleteOrShop] = useState(false)
    /*const { user, isAuthenticated, isLoading } = useAuth0();*/
    const email = user.email;

    // populate app TESTED
    useEffect(() => {
        const getData = async () => {
          const categoriesFromServer = await fetchCategories(user.email)
          setCategories(categoriesFromServer)
          const itemsFromServer = await fetchItems(user.email)
          setItems(itemsFromServer)
        }
        
        getData()
    }, [])

    // --------------------------------------- READS ------------------------------------------- //

    // gets all categories from server (needs to fetch from live server) TESTED
    const fetchCategories = async (email) => {
        const userEmail = {email: email}
        const categoriesRes = await fetch(process.env.REACT_APP_HEROKU+"getCategories", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userEmail),
        })

        const categoriesData = await categoriesRes.json()

        return categoriesData
    }

    // gets all items from server (needs to fetch from live server) TESTED
    const fetchItems = async (email) => {
        const userEmail = {email: email}
        const itemsRes = await fetch(process.env.REACT_APP_HEROKU+"getItems", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userEmail),
        })

        const itemsData = await itemsRes.json()

        return itemsData
    }

    // --------------------------------------- ADDS ---------------------------------------- //

    // TESTED
    const addCategory = async (email, category) => {
        const addCategory = { email: email, category: category}
        const res = await fetch(process.env.REACT_APP_HEROKU+"addCategory", {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            body: JSON.stringify(addCategory),
        })

        setShowAddCat(false)

        const getData = async (email) => {
            const categoriesFromServer = await fetchCategories(email.email)
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems(email.email)
            setItems(itemsFromServer)
        }

        getData(email)
    }

    // TESTED
    const addItem = async (email, item, category, frequency) => {
        const itemToAdd = {email: email, item: item, category: category, frequency: frequency }
        const res = await fetch(process.env.REACT_APP_HEROKU+"addItem", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(itemToAdd),
        })
  
        const data = await res.json()
  
        setShowAddItem(false)

        const getData = async (email) => {
            const categoriesFromServer = await fetchCategories(email.email)
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems(email.email)
            setItems(itemsFromServer)
        }

        getData(email)
    }
    
    // EDITS

    // TESTED
    const onEditItem = async (email, newItem, previousItem, newCategory, newFrequency, newCompleted) => {
        
        const updateItem = { email: email, item: newItem, previousItem: previousItem, category: newCategory, frequency: newFrequency, completed: newCompleted }

        const res = await fetch(process.env.REACT_APP_HEROKU+"editItem", {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updateItem),
        })

        const data = await res.json()

        const getData = async (email) => {
            const categoriesFromServer = await fetchCategories(email)
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems(email)
            setItems(itemsFromServer)
        }

        getData(email)
    }

    // TESTED
    const onEditCategory = async (email, newCategory, previousCategory, items) => {
        const updateCategory = {email: email, newCategory: newCategory, previousCategory: previousCategory, items: items}

        const res = await fetch(process.env.REACT_APP_HEROKU+"editCategory", {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            body: JSON.stringify(updateCategory),
        })  

        // Display changes
        const getData = async (email) => {
            const categoriesFromServer = await fetchCategories(email)
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems(email)
            setItems(itemsFromServer)
        }

        setShowDeleteOrShop(false)
        getData(email)
    }

    // Toggle items between completed sections and to buy sections TESTED
    // NOTE: consider adding animation to hide how long this takes (2-4 seconds)
    const toggleCompleted = async (email, item, completed) => {
        if (completed == true) { completed = false } else { completed = true; }
        const itemToToggle = { email: email, item: item, completed: completed }
        //const updateItem = { ...itemToToggle, completed: !itemToToggle.completed }

        const res = await fetch(process.env.REACT_APP_HEROKU+"toggleItem", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(itemToToggle),
        })

        //const data = await res.json()
    
        const getData = async (email) => {
            const categoriesFromServer = await fetchCategories(email)
            setCategories(categoriesFromServer)
            const itemsFromServer = await fetchItems(email)
            setItems(itemsFromServer)
        }

        getData(email)
    }

    // ----------------------------------------- DELETES ---------------------------------------- //

    // Delete Task, probably fine, no delete item currently
    const onDeleteCategory = async (email, category) => {

        if (window.confirm(`Are you sure that you want to delete ${category}?`) == true) {

            const categoryToDelete = { email: email, category: category }
            const res = await fetch(process.env.REACT_APP_HEROKU+"deleteCategory", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(categoryToDelete),
            })

            //const data = await res.json()
        
            const getData = async (email) => {
                const categoriesFromServer = await fetchCategories(email)
                setCategories(categoriesFromServer)
                const itemsFromServer = await fetchItems(email)
                setItems(itemsFromServer)
            }
      
            setShowDeleteOrShop(false)
            getData(email)
        }

    }

    // Delete item
    const onDeleteItem = async (email, item) => {

        if (window.confirm(`Are you sure that you want to delete ${item}?`) == true) {

            const itemToDelete = { email: email, item: item }
            const res = await fetch(process.env.REACT_APP_HEROKU+"deleteItem", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(itemToDelete),
            })

            //const data = await res.json()
        
            const getData = async (email) => {
                const categoriesFromServer = await fetchCategories(email)
                setCategories(categoriesFromServer)
                const itemsFromServer = await fetchItems(email)
                setItems(itemsFromServer)
            }
      
            setShowDeleteOrShop(false)
            getData(email)
        }}
  
    return (
      isAuthenticated && (
        <div>
            <Header
                isAuthenticated={true}
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
            {showAddItem && <AddItem email={email} onAddItem={addItem} categories={categories} />}
            {showAddCat && <AddCategory email={email} onAddCategory={addCategory} />}
            <List
                email={email}
                categories={categories}
                items={items}
                // default is false, shopping. True is delete/edit mode
                mode={showDeleteOrShop}
                toggle={toggleCompleted}
                //onEditingFaItem={}
                onEditItem={onEditItem}
                onEditCategory={onEditCategory}
                onDeleteItem={onDeleteItem}
                onDeleteCategory={onDeleteCategory}
            />
        </div>
      )
    )
}

export default Home;