import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import Layout from '../components/Layout/Layout'
import InputModal from '../components/Modal'
import { LinkIcon } from '@heroicons/react/24/outline'
import {  PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { formatDate, formatNo }  from '../utils/formatDate'
// import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    getData()
  },[])

  const getData = (i) => {
    // const offset = (i-1) * CRYPTO_PERPAGE
    const AXIOS_OPTION = {
      method: 'GET',
      url: 'http://localhost:5000/api/asset',
    };
    // setIsLoading(true)

    axios.request(AXIOS_OPTION)
    .then((resp) => {
      console.log(resp.data.data)
      setData(resp.data.data)
    })
  }
  
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <Layout>
      <div className="flex justify-end p-2 mt-2">
        <button className="py-2 px-4 bg-green-600 text-white rounded-xl"
          onClick={() => setShowModal(!showModal)}>
          Add
        </button>
      </div>

      { showModal && <InputModal closeModal={closeModal}/> }
      <table className="table-auto w-full shadow-xl">
        <thead>
          <tr className="font-bold border-y-2 border-slate-200 ">
            <td className="p-1">#</td>
            <td className="p-1">Nama</td>
            <td className="p-1">Merk</td>
            <td className="p-1">Spec</td>
            <td className="p-1">Jumlah</td>
            <td className="p-1">Harga</td>
            <td className="p-1">Ongkos Kirim</td>
            <td className="p-1">Tgl Kirim</td>
            <td className="p-1">Vendor</td>
            <td className="p-1">Alamat</td>
            <td className="p-1">Contact</td>
            <td className="p-1">HP</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 text-sm">
          { data.length>0 && data.map( (dt,i) => {
            return (
              <tr key={i} 
                  className={`${i%2 === 0 ? '' : 'bg-gray-100'} cursor-pointer hover:bg-gray-400 hover:text-gray-100`}>
                <td className="p-2">
                  <div className="flex gap-2">
                    <PencilIcon className="w-4 h-4 text-yellow-500"/>
                    <TrashIcon className="w-4 h-4 text-red-600"/>  
                  </div>
                </td>
                <td className="p-1">{dt.name}</td>
                <td className="p-1">{dt.brand}</td>
                <td className="p-1">{dt.spec}</td>
                <td className="p-1">{dt.quantity}</td>
                <td className="p-1">{formatNo(dt.price)}</td>
                <td className="p-1">{formatNo(dt.delivery_cost)}</td>
                <td className="p-1">{formatDate(dt.delivery_date)}</td>
                <td className="p-1">{dt.vendor}</td>
                <td className="p-1">{dt.address}</td>
                <td className="p-1">{dt.contact}</td>
                <td className="p-1">{dt.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}