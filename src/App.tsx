import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import { DetailSerie } from './pages/DetailSerie'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/serie/:nom/:id" element={<DetailSerie />} />   
    </Routes>
  )
}

export default App
