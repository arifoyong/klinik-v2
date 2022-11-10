import { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout/Layout'
// import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const [data, setData] = useState({})
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

  return (
    <Layout>
      <h1 className="p-2 font-bold ">Index page</h1>

      {data.map((dt,i) => {
        return (<div key={i}>{dt.name}</div>)
      })}
    </Layout>
  )
}