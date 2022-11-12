
const LabelInput = ({labelText, inputPlaceholder}) => (
  <div class="md:flex md:items-center mb-2">
    <div class="md:w-1/4">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for={labelText}>
        {labelText}
      </label>
    </div>
    <div class="md:w-3/4">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          id={labelText} 
          type="text" 
          placeholder={inputPlaceholder}/>
    </div>
  </div>
)

const InputModal = ({closeModal}) => (
  <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-1/2 my-6 mx-auto text-md">
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
            <LabelInput labelText="Barang" inputPlaceholder="Thermometer"/>
            <LabelInput labelText="Merk" inputPlaceholder="Omron"/>
            <LabelInput labelText="Spec" inputPlaceholder="TH-202"/>
            <LabelInput labelText="Qty" inputPlaceholder="1"/>
            <LabelInput labelText="Price" inputPlaceholder="235,000"/>
            <LabelInput labelText="Ongkos kirim" inputPlaceholder="10,000"/>
            <LabelInput labelText="Tgl" inputPlaceholder="22 May 22"/>
            <LabelInput labelText="Vendor" inputPlaceholder="Makmur Jaya"/>
            <LabelInput labelText="Website" inputPlaceholder="http://www.makmurjaya.com"/>
            <LabelInput labelText="Contact" inputPlaceholder="John Doe"/>
            <LabelInput labelText="HP" inputPlaceholder="08123256048"/>
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
              onClick={closeModal}
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

export default InputModal