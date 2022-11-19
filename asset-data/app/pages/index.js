import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/Layout/Layout'
export default function Home() {
  
  return (
    <Layout>
      <div className="text-3xl font-bold p-2 mt-2">
        <h1>Welcome to Klinik Auwyong</h1>
      </div>

      
    </Layout>
  )
}