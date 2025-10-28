import { Outlet } from "react-router-dom"

function LayoutPageTraineView() {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-start bg-gradient-to-r from-sky-500 to-violet-500 p-4 sm:p-0">
        <div className="bg-slate-100 w-full max-w-lg sm:max-w-3xl md:max-w-5xl sm:w-[80vw] md:w-[50vw] h-auto sm:h-screen flex flex-col items-center border-glass-border shadow-lg shadow-glass-shadow/10 p-4 sm:p-6 text-sm md:text-lg rounded-lg sm:rounded-2xl overflow-auto">

          <Outlet />

        </div>

      </div>
    </>
  )
}
export default LayoutPageTraineView