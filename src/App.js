import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        {/* Root Path */}
        <Route path='/' element={<Home />}/>
        {/* End of Root Path */}
      </Routes>
    </>
  );
}

export default App;
