import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
//import Category from './components/Category'
import AddItem from './components/AddItem'
import About from './Routes/About'
import AddCategory from './components/AddCategory'
import Profile from './Routes/Profile'
import Home from './Routes/Home'
//import newUsersCategories from './backend/newUser'

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home user={user} isAuthenticated={isAuthenticated} />} />
          <Route path='/about' element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )}
  else {
    return (
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/about' element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

        /*<Header
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
        />*/

/*
                {categories.length > 0 ? (
                  <List
                    categories={fetchCategories}
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
                */