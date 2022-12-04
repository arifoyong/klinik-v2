import Layout from '../components/Layout/Layout'
// import { useContext } from 'react'
import { useAppContext } from '../context/state'

const Test = () => {
  const { state, setState } = useAppContext()
 
  return (
    <Layout>
      <div> 
        {state.role}  
      </div>

      <button onClick={() => setState("1")}>
        click1
      </button>
      <button onClick={() => setState("2")}>
        click2
      </button>

      <button onClick={() => console.log(state)}>
        display
      </button>
    </Layout>
  )
}

export default Test