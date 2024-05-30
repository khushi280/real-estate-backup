
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Search from './pages/Search';
import Userlisting from './pages/Userlisting';
import UpdateListing from './pages/UpdateListing';
import About from './pages/About';
import Details from './pages/Details'
import Layout from './components/Outlet'

// export default function App() {
//   return (
  
  // <BrowserRouter>
  // <Layout />
  // <Routes>
  // <Route path='/' element={<Home />} />
  // <Route path='/profiles' element={<Profile />} />
  //   <Route path="/signup" element={<SignUp />}></Route>
  //   <Route path="/signin" element={<SignIn />}></Route>
  //   <Route path='/createlisting' element={<CreateListing />} />
  //   <Route path='/search' element={<Search />} />
  //   <Route path='/userlisting' element={<Userlisting />} />
  //   <Route path='/UpdateListing/:_id' element={<UpdateListing />} />
  //   <Route path='/about' element={<About/>}/>
  //   <Route path="/listing/:listingId" element={<Details/>}/>
  // </Routes>
  // </BrowserRouter>
  
//   )
// }
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {path: "/", element: <Home />},
        {path: "/profiles", element: <Profile />},
        {path: "/signup", element: <SignUp />},
        {path: "/signin", element: <SignIn />},
        
          
            {path: "/createlisting", element: <CreateListing />},
            {path: "/search", element: <Search />},
            {path: "/userlisting", element: <Userlisting />},
            {path: "/UpdateListing/:_id", element: <UpdateListing />},
            {path: "/about", element: <About />},
            {path: "/listing/:listingId", element: <Details />}
            
          
        
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App