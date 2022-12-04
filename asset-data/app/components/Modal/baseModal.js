const BaseModal = ({children, header, closeFunc, width="w-2/3"}) => {
  return (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className={`${width} relative y-6 mx-auto text-md`}>

        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <header className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              {header}
            </h3>
            <button className="text-2xl text-gray-400" onClick={closeFunc}>
                ×
            </button>
          </header>

          {/*body*/}
          <main className="relative p-6 flex-auto">
            {children}
          </main>
     
          
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default BaseModal