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

    <main className="w-full lg:w-5/6 mx-auto px-2">
      {children}
    </main>
  </div>
)

export default Layout

