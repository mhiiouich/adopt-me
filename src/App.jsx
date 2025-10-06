import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Pet from './Pet.jsx'
import Result from './Result.jsx'
import SearchParams from './SearchParams';
import Details from "./Details"
import Header from './Header';
import  {ThemeProvider} from "./ThemeContext"
function App() {
  const [count, setCount] = useState(0)
  const pets =[];
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className='container'>
          <Header/> 
          {/* <main>
            <SearchParams/>
          </main> */}
          <Routes>
            <Route path="/" element={<SearchParams/>}/>
            <Route path="/details/:id" element={<Details/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
