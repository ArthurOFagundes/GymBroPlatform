import { Outlet } from "react-router-dom"

function LayoutPageForm() {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-r from-sky-500 to-violet-500 px-4">
        <div className="bg-slate-100 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-4 sm:mx-6 my-6 sm:my-12 min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center rounded-lg border-glass-border shadow-lg shadow-glass-shadow/10 p-4 sm:p-6 text-sm sm:text-lg overflow-y-auto">

          <Outlet />

        </div>

      </div>
    </>
  )
}
export default LayoutPageForm