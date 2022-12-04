import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { PhotoIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import moment from 'moment'

import Layout from '../../components/Layout/Layout'
import IsUser from '../../components/auth/IsUser'
import { useAppContext } from '../../context/state'

const API = process.env.BACKEND_API || "http://domain:8080/api"

const defaultData = {
  id: -1,
  name: "",
  brand: "",
  spec: "",
  quantity: "",
  price: "",
  delivery_cost: "",
  delivery_date: moment().format('yyyy-MM-DD'),
  vendor:"",
  address:"",
  website:"",  
  contact:"",
  phone:"",
  img_uri:""
}

export default function AssetById() {
  const router = useRouter()
  const {currentUser, setCurrentUser} = useAppContext()

  const { id } = router.query  
  const [selectedImage, setselectedImage] = useState();
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    (id > -1) && refreshData(id)
  },[])

  const refreshData = async (id) => {
    const AXIOS_OPTION = {
      method: 'GET',
      url: `${API}/asset/${id}`,
    };
    
    let result = await axios.request(AXIOS_OPTION).then((res) => res.data.data[0])
    result.delivery_date = moment(result.delivery_date).format('yyyy-MM-DD')
    setData(result)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setData({...data, [e.target.name]: e.target.value})
  }

  const changeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setselectedImage(e.target.files[0]);
    }
  }

  const saveAsset = async (e) => {
    e.preventDefault()

    let assetData = new FormData()
    assetData.append('name', data.name)
    assetData.append('brand', data.brand)
    assetData.append('spec', data.spec)
    assetData.append('quantity', data.quantity)
    assetData.append('price', data.price)
    assetData.append('delivery_cost', data.delivery_cost)
    assetData.append('delivery_date', data.delivery_date)
    assetData.append('vendor', data.vendor)
    assetData.append('address', data.address)
    assetData.append('website', data.website)
    assetData.append('contact', data.contact)
    assetData.append('phone', data.phone)
    assetData.append('assetImg', selectedImage)
    
    axios({method: 'POST', 
            url:`${API}/asset`,
            data: assetData,
            headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      alert("success saving data")
      router.push('/asset')
    }).catch((err) => {
      alert(err.message)
    })
  }

  const updateAsset = async (e) => {
    e.preventDefault()

    let assetData = new FormData()
    assetData.append('id', data.id)
    assetData.append('name', data.name)
    assetData.append('brand', data.brand)
    assetData.append('spec', data.spec)
    assetData.append('quantity', data.quantity)
    assetData.append('price', data.price)
    assetData.append('delivery_cost', data.delivery_cost)
    assetData.append('delivery_date', data.delivery_date)
    assetData.append('vendor', data.vendor)
    assetData.append('address', data.address)
    assetData.append('website', data.website)
    assetData.append('contact', data.contact)
    assetData.append('phone', data.phone)
    assetData.append('img_uri', data.img_uri)
    assetData.append('assetImg', selectedImage)
    
    axios({method: 'PUT', 
            url:`${API}/asset/${data.id}`,
            data: assetData,
            headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      alert("success updating data")
      router.push('/asset')
    }).catch((err) => {
      alert(err.message)
    })    
  }

   const handleDelete = async (e) => {
    e.preventDefault()
    const AXIOS_OPTION = {
      method: 'DELETE',
      url: `${API}/asset/${data.id}`,
    };

    axios.request(AXIOS_OPTION).then(() => {
      alert("delete success")
      router.push('/asset')
    }).catch((err) => {
      alert(err.message)
    })
  }


  return (
    <IsUser>
    <Layout>
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <header className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Input Barang Masuk [{id}] 
            </h3>
            <button  onClick={() => router.back()}>
              <ArrowUturnLeftIcon className="w-6 h-6"/>
            </button>
          </header>

          {/*body*/}
          <form className="relative p-6 flex-auto" onSubmit={data.id === -1 ? saveAsset : updateAsset}>
            <div className="flex">
              {/* Input: photo */}
              <div>
                {selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt="img" width={200} height={200}/> : (
                  data.img_uri ? <img src={data.img_uri} alt="img" width={200} height={200}/> : <PhotoIcon className="w-48 h-48 text-yellow-500" />
                )}
                <input type="file" name="file" onChange={changeImage} />
              </div>
              <div className="flex flex-col w-full">
                {/* Input: name */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                      Name
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="name" name="name"
                        autoComplete="off" type="text" required
                        value={data.name} onChange={handleChange}
                        placeholder="Thermometer"/>
                  </div>
                </div>
                {/* Input: Brand */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="brand">
                      Brand
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="brand" name="brand"
                        autoComplete="off" type="text" required
                        value={data.brand} onChange={handleChange}
                        placeholder="Omron"/>
                  </div>
                </div>
                {/* Input: Spec */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="spec">
                      Spec
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="spec" name="spec"
                        autoComplete="off" type="text" required
                        value={data.spec} onChange={handleChange}
                        placeholder="TH-202"/>
                  </div>
                </div>
                {/* Input: Quantity */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="quantity">
                      Quantity
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="quantity" name="quantity"
                        autoComplete="off" type="text" required
                        value={data.quantity} onChange={handleChange}
                        placeholder="2"/>
                  </div>
                </div>
                {/* Input: Price */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="price">
                      Price
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="price" name="price"
                        autoComplete="off" type="text" required
                        value={data.price} onChange={handleChange}
                        placeholder="200,000"/>
                  </div>
                </div>
                {/* Input: Delivery Cost */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="delivery_cost">
                      Delivery Cost
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="delivery_cost" name="delivery_cost"
                        autoComplete="off" type="text"
                        value={data.delivery_cost} onChange={handleChange}
                        placeholder="10,000"/>
                  </div>
                </div>
                {/* Input: Delivery Date */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="delivery_date">
                      Delivery Date
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="delivery_date" name="delivery_date"
                        autoComplete="off" type="date"
                        value={data.delivery_date} onChange={handleChange}
                        placeholder="02/05/2022"/>
                  </div>
                </div>
                {/* Input: Vendor */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="vendor">
                      Vendor
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="vendor" name="vendor"
                        autoComplete="off" type="text"
                        value={data.vendor} onChange={handleChange}
                        placeholder="PT Maju Jaya"/>
                  </div>
                </div>
                {/* Input: Address */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="address">
                      Address
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <textarea className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        row="2" id="address" name="address" 
                        autoComplete="off" type="text"
                        value={data.address} onChange={handleChange}
                        placeholder="Jalan Ahmad Yani no 10, Surabaya"/>
                  </div>
                </div>
                {/* Input: Website */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="website">
                      Website
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="website" name="website"
                        autoComplete="off" type="text"
                        value={data.website} onChange={handleChange}
                        placeholder="http://www.majujaya.com"/>
                  </div>
                </div>
                {/* Input: Contact */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="contact">
                      Contact
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="contact" name="contact"
                        autoComplete="off" type="text"
                        value={data.contact} onChange={handleChange}
                        placeholder="Budi Sugianto"/>
                  </div>
                </div>
                {/* Input: Phone */}
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone">
                      Phone
                    </label>
                  </div>
                  <div className="md:w-3/4">
                    <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
                        id="phone" name="phone"
                        autoComplete="off" type="text"
                        value={data.phone} onChange={handleChange}
                        placeholder="08123456789"/>
                  </div>
                </div>
              </div>
            </div>
          {/*footer*/}
            { currentUser.role === 'admin' && 
            <footer className="flex items-center justify-end p-4 border-t border-solid">
              <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none"
                type="submit"
                onClick={handleDelete}
              >
                Delete
              </button>
              <Link href='/asset'>
                <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">  
                  Close
                </button>
              </Link>
              
              <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit" >
                Save Changes
              </button>
            </footer>
            }
          </form>
          
        </div>

    </Layout>
    </IsUser>
  )
}