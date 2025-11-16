import { Route, Switch } from 'react-router-dom'
import Timer from './components/Timer'
import './App.css'

function App() {
  return (
    <div className="bg-[#09090c] min-h-screen w-full flex items-center justify-center p-8">
      {/* Using react-router-dom Route and Switch components */}
      {/* Currently only one route, but infrastructure is ready for more routes */}
      <Switch>
        <Route exact path="/">
          <Timer />
        </Route>
        {/* Additional routes can be added here in the future */}
        {/* Example: <Route path="/about"><About /></Route> */}
      </Switch>
    </div>
  )
}

export default App
