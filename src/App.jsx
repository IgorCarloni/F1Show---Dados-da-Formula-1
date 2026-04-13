import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'
import Season from './pages/Season'
import Standings from './pages/Standings'
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
          <Route path="/season" element={<Season />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/driver/:driverId" element={<DriverDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
