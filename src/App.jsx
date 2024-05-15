import React from 'react'
import DynamicOSDesktop  from './components/OperatingSystemDynamicModel_Deskstop'

function App() {
  return (
    <div className='w-full h-screen border-2 border-purple-500 p-10'>
      <div className='w-full h-full border-2 border-blue-500'>
        <DynamicOSDesktop/>
      </div>
    </div>
  )
}

export default App
