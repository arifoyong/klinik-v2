import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout/Layout'
import InputModal from '../components/Modal'
import {  PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { formatDD_MMM_YY, formatNo }  from '../utils/formatDate'
import { API } from '../config'
// import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [data, setData] = useState({})
  const [selectedRow, setSelectedRow] = useState({})
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    getData()
  },[])

  const getData = (i) => {
    // const offset = (i-1) * CRYPTO_PERPAGE
    const AXIOS_OPTION = {
      method: 'GET',
      url: `${API}/asset`,
    };
    // setIsLoading(true)

    axios.request(AXIOS_OPTION)
    .then((resp) => {
      setData(resp.data.data)
    })
  }
  
  const closeModal = () => {
    setShowModal(false)
    getData()
  }

  const handleEdit = (selectedData) => {
    setSelectedRow(selectedData)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    const AXIOS_OPTION = {
      method: 'DELETE',
      url: `${API}/asset/${id}`,
    };


    axios.request(AXIOS_OPTION)

    
    getData()
  }

  return (
    <Layout>
      <div className="flex justify-end p-2 mt-2">
        <button className="py-2 px-4 bg-green-600 text-white rounded-xl"
          onClick={() => setShowModal(!showModal)}>
          Add
        </button>
      </div>

      { showModal && <InputModal closeModal={closeModal} selectedRow={selectedRow}/> }
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
              <tr key={dt.id} 
                  className={`${i%2 === 0 ? '' : 'bg-gray-100'} cursor-pointer hover:bg-gray-400 hover:text-gray-100`}>
                <td className="p-2">
                  <div className="flex gap-2">
                    <PencilIcon className="w-4 h-4 text-yellow-500" onClick={() => handleEdit(dt)}/>
                    <TrashIcon className="w-4 h-4 text-red-600"  onClick={() => handleDelete(dt.id)}/>  
                  </div>
                </td>
                <td className="p-1">{dt.id} {dt.name}</td>
                <td className="p-1">{dt.brand}</td>
                <td className="p-1">{dt.spec}</td>
                <td className="p-1">{dt.quantity}</td>
                <td className="p-1">{formatNo(dt.price)}</td>
                <td className="p-1">{formatNo(dt.delivery_cost)}</td>
                <td className="p-1">{formatDD_MMM_YY(dt.delivery_date)}</td>
                <td className="p-1">{dt.vendor}</td>
                <td className="p-1">{dt.address}</td>
                <td className="p-1">{dt.contact}</td>
                <td className="p-1">{dt.img_uri && <Image src={dt.img_uri}
                                      alt="img"
                                      width={50}
                                      height={50}/>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}