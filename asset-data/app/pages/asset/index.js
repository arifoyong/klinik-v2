import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

import Layout from '../../components/Layout/Layout'

import {  PencilIcon } from '@heroicons/react/24/solid'
import { formatDD_MMM_YY, formatNo }  from '../../utils/formatDate'
import { API } from '../../config'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const AXIOS_OPTION = {
      method: 'GET',
      url: `${API}/asset`,
    };
    
    axios.request(AXIOS_OPTION).then(res => setData(res.data.data))
  })

  // const handleDelete = (id) => {
  //   const AXIOS_OPTION = {
  //     method: 'DELETE',
  //     url: `${API}/asset/${id}`,
  //   };

  //   // axios.request(AXIOS_OPTION).then(() => mutate(`${API}/asset`))
  //   axios.request(AXIOS_OPTION)
  // }

  return (
    <Layout>
      <div className="flex justify-end p-2 mt-2">
        <Link href="/asset/-1">
          <button className="py-2 px-4 bg-green-600 text-white rounded-xl">
            Add
          </button>
        </Link>
      </div>

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
    </Layout>
  )
}