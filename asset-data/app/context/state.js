// import { createContext, useContext, useState } from 'react'


// const AppContext = createContext()

// const initialState={
//   username: "",
//   role: ""
// }

// export function AppWrapper({ children }) {
//   const [user, setUser] = useState(null)

//   let stateValue = {
//     state: initialState,
//     setUser: setUser
//   }

//   return (
//     <AppContext.Provider value={stateValue}>
//       {children}
//     </AppContext.Provider>
//   )
// }

// export function useAppContext() {
//   return useContext(AppContext)
// }



import { createContext, useContext, useState } from 'react'


const AppContext = createContext()



export function AppWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState({
    user: {userName: "",
            role: "",
          },
    loggedIn: false,
  })

  let stateValue = {
    currentUser,
    setCurrentUser,
  }

  return (
    <AppContext.Provider value={stateValue}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}