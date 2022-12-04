import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import BaseModal from './baseModal'

// import { API } from '../../config'
const API = config.BACKEND_API

const SignUpModal = ({closeFunc}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password:''
  })

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // let userData = new FormData()
    // userData.append('name', formData.email)
    // userData.append('email', formData.password)

    var userData = [];
    for (var property in formData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(formData[property]);
      userData.push(encodedKey + "=" + encodedValue);
    }
    userData = userData.join("&");
    
    console.log(userData)
    console.log('API', API)
    axios({method: 'POST', 
            url:`${API}/auth/signup`,
            data: userData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then((res) => {
      alert("success saving new user")
      closeFunc()
      router.push('/')
    }).catch((err) => {
      alert(err.response.data.error)
    })
  }

  return (
    <BaseModal header="Sign Up" width="w-1/2" closeFunc={closeFunc}>
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
                    value={formData.email} onChange={handleChange}
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
                    autoComplete="off" type="password" required
                    value={formData.password} onChange={handleChange}
                    />
              </div>
            </div>
            {/* Input: Password confirmation */}
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/4">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="confirm_password">
                Confirm password
                </label>
              </div>
              <div className="md:w-3/4">
                <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                    id="confirm_password" name="confirm_password"
                    autoComplete="off" type="password" required
                    value={formData.confirm_password} onChange={handleChange}
                    />
              </div>
            </div>

            <footer className="flex justify-end pt-4">
              <button className="bg-red-500 text-white py-2 px-4 mx-2 rounded-lg">
                Cancel
              </button>
              <button type="submit" className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg">
                Signup
              </button>
            </footer>
        </div>
      </form>
    </BaseModal>
  )
}

export default SignUpModal