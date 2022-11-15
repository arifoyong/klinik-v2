import {useState, useEffect} from 'react'

import { formatYYYY_MM_DD } from '../utils/formatDate'

import {API} from '../config'

const InputModal = ({closeModal, selectedRow}) => {
  const [data, setData] = useState({
    name: "",
    brand: "",
    spec: "",
    quantity: "",
    price: "",
    delivery_cost: "",
    delivery_date:"",
    vendor:"",
    address:"1",
    website:"",  
    contact:"",
    phone:""
  })

  useEffect(() => {
    selectedRow && setData(selectedRow)
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    setData({...data, [e.target.name]: e.target.value})
  }

  const saveAsset = async (e) => {
    // e.preventDefault()
    const res = await fetch(
      `${API}/asset`,
      {
        body: JSON.stringify({
          name: data.name,
          brand: data.brand,
          spec: data.spec,
          quantity: data.quantity,
          price: data.price,
          delivery_cost: data.delivery_cost,
          delivery_date: data.delivery_date,
          vendor: data.vendor,
          address: data.address,
          website: data.website,  
          contact: data.contact,
          phone: data.phone
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    if (result.error) {
      alert(result.error)
      // toast.notify(result.error, "error")
    } 

    closeModal()
  }


  const LabelInput = ({labelText, inputPlaceholder, inputName, inputVal, inputType= "text"}) => (
    <div className="md:flex md:items-center mb-2">
      <div className="md:w-1/4">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={labelText}>
          {labelText}
        </label>
      </div>
      <div className="md:w-3/4">
        <input className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight" 
            id={labelText} name={inputName} 
            autoComplete="off" type={inputType} 
            value={inputVal} onChange={handleChange}
            placeholder={inputPlaceholder}/>
      </div>
    </div>
  )
  
  return (
  <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-2/3 my-6 mx-auto text-md">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <header className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Input Barang Masuk
            </h3>
            <button className="text-2xl text-gray-400" onClick={closeModal}>
                ×
            </button>
          </header>

          {/*body*/}
          <main className="relative p-6 flex-auto">
            {LabelInput({labelText:"Barang", inputPlaceholder:"Thermometer", inputName:"name", inputVal:data.name})}
            {LabelInput({labelText:"Merk", inputPlaceholder:"Omron", inputName:"brand", inputVal:data.brand})}
            {LabelInput({labelText:"Spec", inputPlaceholder:"TH-202", inputName:"spec", inputVal:data.spec})}
            {LabelInput({labelText:"Qty", inputPlaceholder:"1", inputName:"quantity", inputVal:data.quantity})}
            {LabelInput({labelText:"Harga", inputPlaceholder:"120,000", inputName:"price", inputVal:data.price})}
            {LabelInput({labelText:"Ongkos Kirim", inputPlaceholder:"10,000", inputName:"delivery_cost", inputVal:data.delivery_cost})}
            {LabelInput({labelText:"Tgl Kirim", inputPlaceholder:"2 May 22", inputName:"delivery_date", inputVal:data.delivery_date, inputType:"date"})}
            {LabelInput({labelText:"Vendor", inputPlaceholder:"Makmur Jaya", inputName:"vendor", inputVal:data.vendor})}
            {LabelInput({labelText:"Alamat", inputPlaceholder:"Makmur Jaya", inputName:"address", inputVal:data.address})}
            {LabelInput({labelText:"Website", inputPlaceholder:"http://www.makmurjaya.com", inputName:"website", inputVal:data.website})}
            {LabelInput({labelText:"Contact", inputPlaceholder:"John Doe", inputName:"contact", inputVal:data.contact})}
            {LabelInput({labelText:"Phone", inputPlaceholder:"08123231023", inputName:"phone", inputVal:data.phone})}

          </main>
          {/*footer*/}
          <footer className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => saveAsset()}
            >
              Save Changes
            </button>
          </footer>
          
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default InputModal