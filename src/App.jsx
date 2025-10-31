import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Body from "./components/Body"
import Login from "./components/Login"
import About from "./components/About"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="login" element={<Login/>} />
          <Route path="About" element={<About/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
