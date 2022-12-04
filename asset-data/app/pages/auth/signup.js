import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import Layout from '../../components/Layout/Layout'
import IsAdmin from '../../components/auth/IsAdmin'
import {useRouter} from 'next/router'

const API = process.env.BACKEND_API 

const INITIAL_DATA = {
  email:'', 
  username:'',
  role:'user',
  password:'',
  confirm_pw:''
}

export default function SignUp() {
  const router = useRouter()
  const [data, setData] = useState(INITIAL_DATA)

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(data)
    if (data.password !== data.confirm_pw) {
      alert("Password & confirm password are not the same")
    }
    
    
    if (data.password === data.confirm_pw) {
      axios({method: 'POST', 
              url:`${API}/auth/signup`,
              data: data,
              headers: { "Content-Type": "application/json" }
      }).then((res) => {
        if (res.status === 200) {
          alert("Signup success")
          router.push('/')
        } else {
          alert("Signup error")
        }
      }).catch((err) => {
        alert(err.message)
      })
    }
  }

  return (
    <IsAdmin >
    <Layout>
      <div className="w-1/2 px-6 py-6 mt-8 mx-auto bg-gray-100 rounded-3xl drop-shadow-lg">
        <header className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold ">
            Sign Up
          </h3>

        </header>
        <form className="relative p-6 flex-auto" onSubmit={handleSubmit}>
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
                        onChange={handleChange}
                      placeholder="johndoe@email.com"/>
                </div>
              </div>
              {/* username */}
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                      id="username" name="username"
                      autoComplete="off" type="text" required
                        onChange={handleChange}
                      placeholder="johndoe"/>
                </div>
              </div>
              {/* role */}
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="role">
                    Role
                  </label>
                </div>
                <div className="md:w-3/4">
                  <select id="role" name="role" 
                    defaultValue="user" onChange={handleChange}
                    className="border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight" >
                    <option value="user" >User</option>
                    <option value="admin">Admin</option>
                  </select>
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
                      autoComplete="off" type="password" required
                      onChange={handleChange}
                      />
                </div>
              </div>
              {/* Input: Password confirmation */}
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="confirm_pw">
                  Confirm password
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                      id="confirm_pw" name="confirm_pw"
                      autoComplete="off" type="password" required
                      onChange={handleChange}
                      />
                </div>
              </div>

              <footer className="flex justify-end pt-4">
                <button className="bg-red-500 text-white py-2 px-4 mx-2 rounded-lg" 
                        onClick={() => router.push('/')}>
                  Cancel
                </button>
                <button className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg" type="submit">
                  Signup
                </button>
              </footer>
          </div>
        </form>
      </div>
    </Layout>
    </IsAdmin>
  )
}
