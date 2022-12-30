import { useEffect, useState } from 'react'
import Link from 'next/link'

import Layout from '../../components/Layout/Layout'
import IsUser from '../../components/auth/IsUser'
import { isAuth } from '../../utils/auth'

import {  PencilIcon } from '@heroicons/react/24/solid'
import { formatDD_MMM_YY, formatNo }  from '../../utils/formatDate'

const API = process.env.BACKEND_API
const PER_PAGE = 20

export default function Home({data, count, currentPage}) {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    setCurrentUser(isAuth())
  },[])

  const AddButton = () => (
    <div className="flex justify-end p-2 mt-2">
    { currentUser.role === 'admin' && 
        <Link href="/asset/-1">
          <button className="py-2 px-4 bg-green-600 text-white rounded-xl">
            Add
          </button>
        </Link>
    }
  </div>
  )

  const Pagination = () => {
    let pages = []
    const noOfPages = Math.ceil(count/PER_PAGE)
    
    for (let i=0; i<noOfPages; i++) {
      pages.push(i+1)
    }
    return (
      <div className="flex px-4 py-4 justify-center">
       {pages.map((page,i) => (
          <Link key={i} href={`/asset/?page=${page}`}>
            <button className={`${page === currentPage ? 'bg-gray-500 text-white': 'hover:bg-gray-200'} 
                                px-4 py-2 mx-1 rounded-md `}>
                {page}
            </button>
          </Link>
       ))
      }
      </div>
    )
  }

  return (
    <IsUser>
      <Layout>
        <AddButton />

        <table className="table-auto w-full shadow-xl">
          <thead>
            <tr className="font-bold border-y-2 border-slate-200 ">
              <td className="p-1">#</td>
              <td className="p-1">Product</td>
              <td className="p-1">Cost</td>
              <td className="p-1">Delivery</td>
              <td className="p-1">Vendor</td>
              <td className="p-1"> </td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 text-sm">
          { data.length>0 && data.map((dt,i) => {
              return (
                <tr key={dt.id} 
                    className={`${i%2 === 0 ? '' : 'bg-gray-100'} cursor-pointer hover:bg-gray-400 hover:text-gray-100`}>
                  <td className="p-2">
                    {dt.id}
                  </td>
                  <td className="p-1">
                    <div className="flex">
                      <div className="p-2">
                        {dt.img_uri && <img src={dt.img_uri} alt="img" width={100} height={100}/>}
                      </div>
                      <div className="flex flex-col p-2">
                        <div className="font-bold text-lg">{dt.name}</div>
                        <div className="">Spec: {dt.spec}</div>
                        <div className="">Brand: {dt.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1">
                    <div className="flex flex-col">
                      <div>Harga: {formatNo(dt.price)}</div>
                      <div>Ongkos kirim: {formatNo(dt.delivery_cost)}</div>
                    </div>
                  </td>
                  <td className="p-1">{formatDD_MMM_YY(dt.delivery_date)}</td>
                  <td className="p-1">
                    <div>{dt.vendor}</div>
                    <div>{dt.website}</div>
                    <div>Alamat: {dt.address}</div>
                    <div>Contact: {dt.contact} (HP: {dt.phone})</div>
                  </td>
                  <td className="p-1 flex gap-2">
                    <Link href={`/asset/${dt.id}`}>
                      <PencilIcon className="w-6 h-6 text-yellow-500"/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Pagination />
      </Layout>
    </IsUser>
  )
}


export async function getServerSideProps(context) {
  const page = context.query.page || 1
  const res = await fetch(`http://backend:5000/api/asset?page=${page}&limit=${PER_PAGE}`)
  const data = await res.json()

  return { props: { data: data.assets, count:data.count, currentPage: parseInt(page) } }
}