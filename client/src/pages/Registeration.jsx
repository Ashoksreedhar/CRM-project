import Navbar from '../components/Navbar'
import { useState } from 'react'
import *  as yup from "yup"
import axios from "axios"
// import { jsx } from 'react/jsx-runtime'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../config'


//yup-schema
const schema = yup.object({
  username: yup
    .string()
    .required('Name is required')
    .min(3, "Atleat 3 characters"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("password is required")
    .min(4, "Atlest 4 characters")

})


const Registeration = () => {

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handeChange = async (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    try {
      await schema.validateAt(name, { ...form, [name]: value })
      setErrors({ ...errors, [name]: "" })
    } catch (err) {
      setErrors({ ...errors, [name]: err.message })
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await schema.validate(form,
        { abortEarly: false })

      setForm({ username: "", email: "", password: "" })


      //API CALL
      const res = await axios.post(`${BASE_URL}/auth/registeration`, form)
      alert(JSON.stringify(res.data))
      navigate('/login')

    } catch (error) {
      const newErrors = {}
      error.inner.forEach((error) => {
        newErrors[error.path] = error.message
      })
      setErrors(newErrors)
    }
  }


  return (
    <>
      <Navbar />

      <form action="" onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center bg-[#06142B] px-10">

        <div className="absolute w-64 h-64 bg-teal-400 rounded-full opacity-65 blur-3xl -top-16 -right-16" />
        <div className="absolute w-56 h-56 bg-yellow-400 rounded-full opacity-65 blur-3xl -bottom-16 -left-16" />
        <div className="absolute w-56 h-56 bg-pink-500 rounded-full opacity-65 blur-3xl -bottom-16 -right-16" />

        <div className="border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-sm">

          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center text-white">Create Account</h2>

          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-medium text-gray-500 mb-1.5">User Name</label>
            <input
              name='username'
              type="text"
              value={form.username}
              onChange={handeChange}
              placeholder='johndoe'
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-gray-400 focus:bg-white transition-colors"
            />
            <p className='text-red-500 text-xs mt-1 min-h-[16px]'>{errors.username}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-medium text-gray-500 mb-1.5">Email</label>
            <input
              name='email'
              type="email"
              value={form.email}
              onChange={handeChange}
              placeholder='job@gmail.com'
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-gray-400 focus:bg-white transition-colors"
            />
            <p className='text-red-500 text-xs mt-1 min-h-[16px]'>{errors.email}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="" className="block text-sm font-medium text-gray-500 mb-1.5">Password</label>
            <input
              name='password'
              type="password"
              value={form.password}
              onChange={handeChange}
              placeholder='••••••••'
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-900 outline-none focus:border-gray-400 focus:bg-white transition-colors"
            />
            <p className='text-red-500 text-xs mt-1 min-h-[16px]'>{errors.password}</p>
          </div>

          <button className='w-full py-2.5 bg-blue-500 hover:bg-gray-700 active:scale-95 transition-all rounded-lg text-white text-sm font-medium'>
            Sign in
          </button>

        </div>
      </form>

    </>
  )
}

export default Registeration