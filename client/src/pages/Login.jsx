import axios from 'axios'
import { useState } from 'react'
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


const schema = yup.object({
  email: yup
    .string()
    .required("Email is  required")
    .email("Invalid email adress"),

  password: yup
    .string()
    .required("Password is required")
})

const Login = () => {

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = async (e) => {
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
      await schema.validate(form, { abortEarly: false })
      setErrors({})

      //API CALL

      const res = await axios.post("http://localhost:5000/auth/login", form)
      if (res.data.error) {
        alert(res.data.error)
        return
      }
      console.log("LOGIN RESPONSE:", res.data)
      console.log("TOKEN:", res.data.token)

      localStorage.setItem("token", res.data.token)
      setForm({ email: "", password: "" })
      navigate("/dashboard")

    } catch (error) {

      if (error.inner) {
        const newError = {}
        error.inner.forEach((error) => {
          newError[error.path] = error.message
        })
        setErrors(newError)
      } else {
        alert(error.response?.data?.message || "Login failed")
      }
    }
  }

  return (
    <>




      <Navbar />
      <form action="" onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center bg-[#06142B] px-10 text-white min-h-screen relative overflow-hidden">

        <div className="absolute w-64 h-64 bg-teal-400 rounded-full opacity-65 blur-3xl -top-16 -right-16" />
        <div className="absolute w-56 h-56 bg-yellow-400 rounded-full opacity-65 blur-3xl -bottom-16 -left-16" />
        <div className="absolute w-56 h-56 bg-pink-500 rounded-full opacity-65 blur-3xl -bottom-16 -right-16" />


        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

          <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">Welcome Back 👋</h2>

          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-medium text-gray-600 mb-1.5">Email address</label>
            <input
              name='email'
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder='example@gmail.com'
              className="w-full px-4 py-2.5 text-sm border-2 border-indigo-100 rounded-xl bg-indigo-50 text-gray-800 outline-none focus:border-indigo-400 focus:bg-white transition-all"
            />
            <p className='text-red-500 text-xs mt-1 min-h-[16px]'>{errors.email}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="" className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
            <input
              name='password'
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder='password'
              className="w-full px-4 py-2.5 text-sm border-2 border-indigo-100 rounded-xl bg-indigo-50 text-gray-800 outline-none focus:border-indigo-400 focus:bg-white transition-all"
            />
            <p className='text-red-500 text-xs mt-1 min-h-[16px]'>{errors.password}</p>
          </div>

          <button
            type='submit'
            className='w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all rounded-xl text-white text-sm font-semibold tracking-wide shadow-md shadow-indigo-200'
          >
            Login
          </button>

        </div>
      </form>


    </>
  )
}

export default Login