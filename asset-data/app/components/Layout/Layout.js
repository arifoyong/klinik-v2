import Head from 'next/head'
import NavBar  from "./Navbar"


const Layout = ({children}) => (
  <div className="">
    <Head>
        <title>Klinik Auwyong</title>
        <meta name="description" content="Klinik Auwyong" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <NavBar/>

    <main className="w-full mx-auto px-4">
      {children}
    </main>
  </div>
)

export default Layout

