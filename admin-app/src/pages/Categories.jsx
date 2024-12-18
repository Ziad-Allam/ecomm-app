import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory, deleteCategory, editCategory, getAllCategories } from '../features/categories/categoriesSlice';
import ImageUpload from '../components/ImageUpload';
import Form from '../components/common/Form';
import { IoIosClose } from 'react-icons/io';
import { addCategoryFormControls } from '../components/common/config'

const initialState = {
  image: null,
  title: "",
}

function Categories() {
  const [formData, setFormData] = useState(initialState)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState({});
  const [imgLoadingState, setImgLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { categoryList } = useSelector((state) => state.categories)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    currentEditId !== null ?
      dispatch(editCategory({
        id: currentEditId,
        formData: { ...formData, image: uploadedImageUrl }
      })).then((data) => {
        if (data.payload.success) {
          dispatch(getAllCategories())
          setOpenCreateCategory(false)
          setCurrentEditId(null)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product eddited successfully")
        }
      }) :
      dispatch(
        createCategory({
          ...formData,
          image: uploadedImageUrl
        })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(getAllCategories())
          setOpenCreateCategory(false)
          setImageFile(null)
          setFormData(initialState)
          toast.success("Product created successfully")
        }
      })
  }

  function handleDelete(productId) {
    dispatch(deleteCategory(productId)).then(data => {
      if (data.payload.success) {
        dispatch(getAllCategories())
        toast.success("Product deleted successfully")
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every((item) => item);
  }

  return (
    <>
      <div className='flex justify-end w-full'>
        <button onClick={() => setOpenCreateCategory(true)} className='rounded-md bg-gray-700 text-white px-4 py-2 text-sm font-medium shadow'>
          Add category
        </button>
      </div>

      {/* <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden border rounded-md">
              <table className="min-w-full text-left text-sm ">
                <thead
                  className="border-b bg-white font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4">Image</th>
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="px-6 py-4">Product ID</th>
                    <th scope="col" className="px-6 py-4">Creation Dare</th>
                    <th scope="col" className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categoryList && categoryList.length > 0 ? categoryList.map((categoryInfo) => {
                      return (
                        <tr className="border-b">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div className='flex items-center justify-center'>
                              <div className='w-14 h-14'>
                                <img src='' alt="" className='w-full object-cover' />
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <img src={categoryInfo.image?.url} alt="" className='w-10 h-10' />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{categoryInfo.title}</td>
                          <td className="whitespace-nowrap px-6 py-4 uppercase">{categoryInfo._id}</td>
                          <td className="whitespace-nowrap px-6 py-4">Date</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className='flex items-center gap-6'>
                              <button className='text-green-500 font-medium' onClick={() => {
                                setOpenCreateCategory(true);
                                setCurrentEditId(categoryInfo?._id);
                                setFormData(categoryInfo);
                              }}
                              >Edit</button>
                              <button className='text-red-500 font-medium' onClick={() => handleDelete(categoryInfo?._id)}>Delete</button>
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
      </div> */}

      <div>
        {
          categoryList && categoryList.length > 0 ? categoryList.map((categoryInfo) => {
            return (
              <div className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
                {/* Image */}
                <div className="w-24 flex-shrink-0 mb-4 sm:mb-0">
                  <img src={categoryInfo.image?.url} alt="" className="w-24 h-24 object-cover" />
                </div>

                {/* Title and ID */}
                <div className="flex flex-col flex-1 sm:px-4 items-center sm:items-start gap-2">
                  <p className="text-lg font-semibold text-center sm:text-left capitalize">{categoryInfo.title}</p>
                  <p className="text-sm text-gray-500 uppercase text-center sm:text-left">{categoryInfo._id}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
                  <button
                    className="text-green-500 font-medium"
                    onClick={() => {
                      setOpenCreateCategory(true);
                      setCurrentEditId(categoryInfo?._id);
                      setFormData(categoryInfo);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 font-medium"
                    onClick={() => handleDelete(categoryInfo?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })
            :
            null
        }

      </div>
      <div className={`fixed z-50 inset-0 bg-black bg-opacity-80 transition-opacity ${openCreateCategory ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

        <div className={`fixed top-0 right-0 w-full max-w-80 h-full bg-white overflow-y-auto transition-transform ${openCreateCategory ? '-translate-x-0' : 'translate-x-full'}`}>
          {/* <div className={`${openCreateCategory ? 'fixed right-0 top-0 w-64 bg-gray-100 ease-in duration-500' : 'fixed right-[-100%] top-0 ease-in duration-500'} h-screen w-96 overflow-auto`}> */}
          <div className=' flex-col  bg-background p-6 '>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-bold'>{currentEditId !== null ? 'Edit Category' : 'Add new Category'}</h1>
              <button onClick={() => { setOpenCreateCategory(false); setCurrentEditId(null); setFormData(initialState) }} className='text-3xl'>
                <IoIosClose />
              </button>
            </div>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imgLoadingState={imgLoadingState}
              setImgLoadingState={setImgLoadingState}
              formData={formData}
              currentEditId={currentEditId}
              schemaType="Category"
            />
            <div className='py-6'>
              <Form
                formControls={addCategoryFormControls}
                buttonText={currentEditId !== null ? 'Edit' : 'Add'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Categories
