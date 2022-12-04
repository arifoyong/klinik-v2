import { useState } from 'react'
import Router from 'next/router'
import axios from 'axios'

import Layout from '../../components/Layout/Layout'

import { useAppContext } from '../../context/state'
import { isClientSide } from '../../utils/detectClient'
import { setCookie, setLocalStorage } from '../../utils/auth'

const API = process.env.BACKEND_API || "http://domain:8080/api"

export default function SignIn() {
  const {currentUser, setCurrentUser} = useAppContext()
  const [data, setData] = useState({email:'', password:''})

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSignin = (e) => {
    e.preventDefault()

    axios({method: 'POST', 
            url:`${API}/auth/signin`,
            data: data,
            headers: { "Content-Type": "application/json"}
    }).then((res) => {
      if (isClientSide) {
        setCookie('jwt_token', res.data.token)
        setLocalStorage('user', res.data.user)

        setCurrentUser(res.data.user)
      }

      Router.push('/asset')
    }).catch((err) => {
      alert(err.reponse ? err.response.data.error : err.message)
    })
  }


  return (
    <Layout>
      <div className="w-1/2 px-6 py-6 mt-8 mx-auto bg-gray-100 rounded-3xl drop-shadow-lg">
        <header className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold ">
            Sign In
          </h3>

        </header>
        <form className="relative p-6 flex-auto">
          <div className="flex flex-col">
              {/* Input: Email */}
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                      id="email" name="email"
                      autoComplete="off" type="email" required
                      value={data.name}  onChange={handleChange}
                      placeholder="johndoe@email.com"/>
                </div>
              </div>
              {/* Input: Password */}
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="password">
                  Password
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                      id="password" name="password"
                      value={data.password} autoComplete="off" type="password" required
                      onChange={handleChange}
                      />
                </div>
              </div>

              <footer className="flex justify-end pt-4">
                <button className="bg-red-500 text-white py-2 px-4 mx-2 rounded-lg">
                  Cancel
                </button>
                <button className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg"
                        type="submit"
                        onClick={handleSignin}>
                  Signin
                </button>
              </footer>
          </div>
        </form>
      </div>
    </Layout>
  )
}
