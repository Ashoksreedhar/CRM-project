import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import BASE_URL from '../config'
import { set } from 'mongoose'

const emptyForm = { name: "", email: "", number: "", address: "" }

const Dashboards = () => {

  const [users, setUsers] = useState([])
  const [addusers, setAddusers] = useState(emptyForm)
  const [edit, setEdit] = useState(null)

  const handleChange = async (e) => {
    const { name, value } = e.target
    setAddusers({ ...addusers, [name]: value })
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!addusers.name || !addusers.email || !addusers.number || !addusers.address) {
      alert("Please fill in all fields")
      return
    }


    //API CALL FOR ADD-USERS
    try {
      const res = await axios.post(`${BASE_URL}/auth/addusers`, addusers)
      alert(res.data.message)
      fetchData()
      setAddusers(emptyForm)
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Server error")
      }

    }
  }


  const fetchData = async () => {

    // API CALL FOR ALL-USERS
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`${BASE_URL}/auth/allusers`, {
        headers: {
          Authorization: `${token}`
        }
      })
      setUsers(res.data.data)
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Server not responding")
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])


  const handleDelete = async (id) => {

    //API CALL FOR DATA-DELETE
    try {
      const res = await axios.delete(`${BASE_URL}/auth/delete/${id}`)
      setUsers(prevUsers =>
        prevUsers.filter(user => user._id !== id)
      )
      fetchData()
    } catch (error) {

    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`${BASE_URL}/auth/update/${edit}`, addusers)
      alert(res.data.message)
      fetchData()
      setEdit(null)
      setAddusers(emptyForm)
    } catch (error) {

    }
  }

  const userEdit = (customer) => {
    setEdit(customer._id)
    setAddusers({
      name: customer.name || '',
      email: customer.email || '',
      number: customer.number || '',
      address: customer.address || '',
    })
  }


  return (

    <>
      <Navbar />
      <div className='bg-[#06142B] min-h-screen relative overflow-hidden p-1'>

        <div className='max-w-lg mx-auto relative z-10 mb-10'>

          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-white tracking-tight'>
              {edit ? "Update User" : "Add New User"}
            </h2>
            <p className='text-gray-400 mt-2 text-sm'>
              {edit ? "Edit the details below and save changes" : "Fill in the details below to add a new user"}
            </p>
            <div className='mt-4 h-px bg-gradient-to-r from-teal-400 via-blue-500 to-transparent' />
          </div>

          <form onSubmit={edit ? handleUpdate : handleAdd}>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='text-gray-400 text-xs font-medium uppercase tracking-widest mb-2 block'>Full Name</label>
                <input
                  name='name'
                  type='text'
                  value={addusers.name}
                  onChange={handleChange}
                  className='w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-teal-400 focus:bg-white/10 transition-all text-sm'
                  placeholder='John Doe'
                />
              </div>
              <div>
                <label className='text-gray-400 text-xs font-medium uppercase tracking-widest mb-2 block'>Email</label>
                <input
                  name='email'
                  type='email'
                  value={addusers.email}
                  onChange={handleChange}
                  className='w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-teal-400 focus:bg-white/10 transition-all text-sm'
                  placeholder='john@email.com'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-8'>
              <div>
                <label className='text-gray-400 text-xs font-medium uppercase tracking-widest mb-2 block'>Mobile</label>
                <input
                  name='number'
                  type='number'
                  value={addusers.number}
                  onChange={handleChange}
                  className='w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-teal-400 focus:bg-white/10 transition-all text-sm'
                  placeholder='+91 00000 00000'
                />
              </div>
              <div>
                <label className='text-gray-400 text-xs font-medium uppercase tracking-widest mb-2 block'>Address</label>
                <input
                  name='address'
                  type='text'
                  value={addusers.address}
                  onChange={handleChange}
                  className='w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-teal-400 focus:bg-white/10 transition-all text-sm'
                  placeholder='City, State'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-blue-900/30'
            >
              {edit ? " Save Changes" : " Add User"}
            </button>

          </form>
        </div>


        <div className='max-w-7xl mx-auto relative z-10'>

          <div className='mb-6'>
            <h3 className='text-2xl font-bold text-white tracking-tight'>User List</h3>
            <p className='text-gray-400 text-sm mt-1'>Manage all registered users</p>
            <div className='mt-3 h-px bg-gradient-to-r from-teal-400 via-blue-500 to-transparent' />
          </div>

          <div className='overflow-x-auto rounded-2xl border border-white/10'>
            <table className='w-full'>

              <thead>
                <tr className='bg-white/5 text-gray-400 text-xs uppercase tracking-widest'>
                  <th className='px-6 py-4 text-left font-medium'>Name</th>
                  <th className='px-6 py-4 text-left font-medium'>Email</th>
                  <th className='px-6 py-4 text-left font-medium'>Mobile</th>
                  <th className='px-6 py-4 text-left font-medium'>Address</th>
                  <th className='px-6 py-4 text-left font-medium'>Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-white/5'>
                {users.map((user, index) => (
                  <tr key={index} className='hover:bg-white/5 transition-colors group'>

                    <td className='px-6 py-4 text-white text-sm font-medium'>{user.name}</td>
                    <td className='px-6 py-4 text-gray-400 text-sm'>{user.email}</td>
                    <td className='px-6 py-4 text-gray-400 text-sm'>{user.number}</td>
                    <td className='px-6 py-4 text-gray-400 text-sm'>{user.address}</td>

                    <td className='px-6 py-4 space-x-2'>
                      <button
                        onClick={() => userEdit(user)}
                        className='bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className='bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200'
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>

  )
}





export default Dashboards