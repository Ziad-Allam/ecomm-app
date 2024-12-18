import React from 'react'
import { deleteBrand, getAllBrands } from '../features/brand/brandSlice'
import { toast } from 'react-toastify'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';

function Table({ setOpenCreateBrand, setCurrentEditId, setFormData, brandData, data }) {
  const dispatch = useDispatch()

  function handleDelete(productId) {
    dispatch(deleteBrand(productId)).then(data => {
      if (data.payload?.success) {
        dispatch(getAllBrands())
        toast.success("Product deleted successfully")
      }
    })
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden border rounded-md">
            <table className="min-w-full text-left text-sm ">
              <thead className="border-b bg-blue-500 font-medium text-white">
                <tr>
                  <th scope="col" className="px-6 py-4">Ref</th>
                  {
                    brandData.map((item => {
                      return (
                        <th scope="col" className="px-6 py-4">{item.label}</th>

                      )
                    }))
                  }
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  data && data.length > 0 ? data.map((brandInfo, index) => {
                    return (
                      <tr key={brandInfo?._id} className="border-b">
                        <td className="whitespace-nowrap px-6 py-4 uppercase">{index + 1}</td>

                        {brandData.map((col, colIndex) => (

                          col.label === "image" ?
                            <td className="whitespace-nowrap px-6 py-2 ">
                              <img src={brandInfo[col?.key]?.url} alt="" className='w-16 h-16 object-cover' />
                            </td>
                            :
                            col.label === "Brand" ?
                            <td className='whitespace-nowrap px-6 py-4' key={colIndex}>{brandInfo[col.key]?.title}</td>
:
col.label === "Category" ?
<td className='whitespace-nowrap px-6 py-4' key={colIndex}>{brandInfo[col.key]?.title}</td>
:
                            <>
                            
                            <td className='whitespace-nowrap px-6 py-4' key={colIndex}>{brandInfo[col.key]}</td>
                            {console.log('brandInfo[col.key]',brandInfo[col.key])
                            }
                            </>
                        ))}

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className='flex items-center gap-6'>
                            <button
                              className='text-green-500 font-medium bg-gray-100 p-1 text-2xl rounded-md hover:bg-gray-200'
                              onClick={() => {
                                setOpenCreateBrand(true);
                                setCurrentEditId(brandInfo?._id);
                                setFormData(brandInfo);
                              }}>
                              <CiEdit />
                            </button>
                            <button className='text-red-500 font-medium bg-gray-100 p-1 text-2xl rounded-md hover:bg-gray-200' onClick={() => handleDelete(brandInfo?._id)}><MdDeleteOutline /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                    :
                    null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
