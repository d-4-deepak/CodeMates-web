import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Body from "./components/Body"
import Login from "./components/Login"
import About from "./components/About"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"

function App() {

  return (
    <>
     <Provider store={appStore}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="About" element={<About/>} />
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
