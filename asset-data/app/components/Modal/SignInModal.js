import BaseModal from './baseModal'

const SignInModal = () => {
  const handleChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <BaseModal header="Sign In" width="w-1/2">
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
                      onChange={handleChange}
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
              <button className="bg-red-500 text-white py-2 px-4 mx-2 rounded-lg">
                Cancel
              </button>
              <button className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg">
                Signup
              </button>
            </footer>
        </div>
      </form>
    </BaseModal>
  )
}

export default SignInModal