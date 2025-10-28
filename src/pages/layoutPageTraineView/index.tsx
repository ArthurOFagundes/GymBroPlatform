import { Outlet } from "react-router-dom"

function LayoutPageTraineView() {
  return (
    <>
      <div className="flex flex-col min-h-screen min-w-screen items-center bg-gradient-to-r from-sky-500 to-violet-500">
        <div className="bg-slate-100 w-[50vw] h-screen flex flex-col items-center border-glass-border shadow-lg shadow-glass-shadow/10 p-6 text-sm md:text-lg">

          <Outlet />

        </div>

      </div>
    </>
  )
}
export default LayoutPageTraineView