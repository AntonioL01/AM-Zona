import Data from '@/shared/Data'
import React from 'react'
import { Link } from 'react-router-dom'

function Category() {
  return (
    <div className='mt-40'>
      <h2 className='font-bold text-3xl text-center mb-6'>
        PRETRAŽI PREMA VRSTI
      </h2>

      <div className='flex justify-center'>
        <div className='grid grid-cols-10 gap-6'>
          {Data.Category.map((category, index) => (
            <Link key={index} to={'search/' + category.name}>
              <div className='border rounded-xl p-4 flex flex-col items-center hover:shadow-md cursor-pointer'>
                <img
                  src={category.icon}
                  width={60}
                  height={60}
                  alt={category.name}
                />
                <h2 className='mt-2 text-center'>{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category
