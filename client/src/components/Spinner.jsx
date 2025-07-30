import React from 'react'

function Spinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-b-transparent animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-l-blue-300 border-r-transparent animate-spin [animation-duration:1.5s]"></div>
      </div>
    </div>
  )
}

export default Spinner
