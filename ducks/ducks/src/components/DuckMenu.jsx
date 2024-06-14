import '../App.css'
import Duck from './Duck.jsx'

function App() {

  return (
    <>
      <div className='App'>
        <div className='container'>
          <Duck letter='a' center='true' className="duck zero"/>
          <Duck letter='a' className="one"/>
          <Duck letter='a' className="two"/>
          <Duck letter='a' className="three"/>
          <Duck letter='a' className="four"/>
          <Duck letter='a' className="five"/>
          <Duck letter='a' className="six"/>
        </div>
      </div>
    </>
  )
}

export default App