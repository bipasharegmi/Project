

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Home from './Components/Home.jsx'
import Clothes from './Components/Clothes.jsx'
import Category from './Components/Category.jsx'
import Profile from './Components/Profile.jsx'
import AddCategory from './Components/AddCategory.jsx'
import AddClothes from './Components/AddClothes.jsx'
import Editclothes from './components/Editclothes.jsx'






function App() {
  

  return (
    <BrowserRouter>
    <Routes>
  
      <Route path='/' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
      <Route path= '' element={<Home/>}> </Route>
      <Route path= 'clothes' element={<Clothes/>}> </Route>

      <Route path= 'category' element={<Category/>}> </Route>

      <Route path= 'profile' element={<Profile/>} ></Route>
      <Route path= 'add_category' element={<AddCategory/>} ></Route>
      <Route path= 'add_clothes' element={<AddClothes/>} ></Route>
      <Route path= 'edit_clothes/:id' element={<Editclothes/>} ></Route>



      

      
      
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
    
      
  
}

export default App
