import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Bars3BottomLeftIcon, HomeModernIcon, XCircleIcon} from '@heroicons/react/24/outline'

import { isAuth, signOut } from '../../utils/auth'

const NavBar = () => {
  const [active, setActive] = useState(false)
  const [authData, setAuthData] = useState(null)

  useEffect(() => {
    setAuthData(isAuth())
  }, [])

  const handleSignout = () => {
    signOut(() => {
      Router.push("/auth/signin");
    });
  };

  return (
    <nav className="bg-gray-600 flex items-center justify-between flex-wrap p-3">
      <Link href="/">
        <div className="inline-flex items-center p-2 mr-4">
          <HomeModernIcon className="text-white w-6 h-6"/>
          {/* <span className='ml-2 text-xl text-white font-bold uppercase'>
            Auwyong
          </span> */}
        </div>
      </Link>

      {/* Button to be shown on small screen */}
      <button className="lg:hidden inline-flex text-white rounded p-3 outline-none hover:bg-gray-200  hover:text-gray-600" 
              onClick={() =>  setActive(!active)}>
          { active ? <XCircleIcon className="w-6 h-6"/> : <Bars3BottomLeftIcon className="w-6 h-6" /> }           
      </button>

      {/* Navigation content */}
      <div className={`${active ? '' : 'hidden'} w-full lg:flex lg:w-auto`} >
        <div className="flex flex-col lg:flex-row ">
          <Link href='/'>
            <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-600 '>
              Home
            </div>
          </Link>
          <Link href='/asset'>
            <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-600'>
              Asset
            </div>
          </Link>
          
          {authData && (
                <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 cursor-pointer rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-600'
                  onClick={() => handleSignout()}>
                  SignOut
                </div>
            )}

          { authData ? (
            <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-600'>
              {authData.username}
          </div>
          ) : (
            <Link href='/auth/signin'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-600'>
                SignIn
              </div>
            </Link>
          )}
          
          

        </div>
      </div>
    </nav>
  )
}

export default NavBar