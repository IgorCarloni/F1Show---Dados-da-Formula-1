import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'
import DriverDetail from './pages/DriverDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/driver/:driverId" element={<DriverDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
