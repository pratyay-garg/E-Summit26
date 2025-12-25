import './App.css';
import { Outlet } from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast'
import ScrollToTop from './ScrollToTop'
function App() {
  

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <ScrollToTop />
    <main>
      <Outlet/>
    </main>
    
     </>
  )
}

export default App
