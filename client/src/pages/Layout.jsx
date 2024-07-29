import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <>
   <div className ="w-full">
        <div>
            <main>
                <Outlet />
            </main>
        </div>
   </div>
   </>
  )
}

export default Layout