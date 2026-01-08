import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation
} from '../redux/api/departmentApi'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus, FaBuilding, FaSearch } from 'react-icons/fa'

const AllDepartmentL = () => {
  const navigate = useNavigate()
  const { data, isLoading: isFetchLoading, isError: isFetchError } = useGetDepartmentQuery()

  const [editItem, setEditItem] = useState(null)

  const [addDepartment, addState] = useAddDepartmentMutation()
  const [updateDepartment, updateState] = useUpdateDepartmentMutation()
  const [deleteDepartment, deleteState] = useDeleteDepartmentMutation()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editItem?.name || "",
      image: "",
      head: editItem?.head || "",
      desc: editItem?.desc || "",
      category: editItem?.category || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Enter name"),
      image: editItem ? yup.mixed().notRequired() : yup.mixed().required("Select image"),
      head: yup.string().required("Enter head"),
      desc: yup.string().required("Enter desc"),
      category: yup.string().required("Enter category"),
    }),
    onSubmit: (values, { resetForm }) => {
      const fd = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value) fd.append(key, value)
      })

      editItem
        ? updateDepartment({ id: editItem._id, userData: fd })
        : addDepartment(fd)

      resetForm()
      setEditItem(null)
      document.getElementById("dept_modal").close()
    }
  })

  useEffect(() => {
    if (addState.isSuccess) {
      toast.success("Department added successfully")
      navigate("/admin/department-list")
    }
  }, [addState.isSuccess])

  useEffect(() => {
    if (updateState.isSuccess) {
      toast.success("Department updated successfully")
      navigate("/admin/department-list")
    }
  }, [updateState.isSuccess])

  useEffect(() => {
    if (deleteState.isSuccess) toast.success("Department deleted successfully")
    if (deleteState.isError) toast.error("Failed to delete department")
  }, [deleteState.isSuccess, deleteState.isError])

  const handleClass = (arg) =>
    clsx(
      "w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-4 transition-all duration-300",
      {
        "border-red-400 bg-red-50 focus:ring-red-100": formik.touched[arg] && formik.errors[arg],
        "border-emerald-400 bg-emerald-50 focus:ring-emerald-100": formik.touched[arg] && !formik.errors[arg],
        "border-slate-200 focus:border-slate-900 focus:ring-slate-100": !formik.touched[arg],
      }
    )

  // Skeleton Loader Component
  const TableSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="animate-pulse border-b border-slate-50">
          <td className="p-5"><div className="w-14 h-14 bg-slate-200 rounded-xl"></div></td>
          <td className="p-5"><div className="h-4 w-32 bg-slate-200 rounded-lg"></div></td>
          <td className="p-5"><div className="h-4 w-24 bg-slate-200 rounded-lg"></div></td>
          <td className="p-5"><div className="h-6 w-20 bg-slate-100 rounded-full"></div></td>
          <td className="p-5"><div className="h-4 w-48 bg-slate-100 rounded-lg"></div></td>
          <td className="p-5"><div className="flex gap-2 justify-center"><div className="h-8 w-16 bg-slate-200 rounded-lg"></div><div className="h-8 w-16 bg-slate-200 rounded-lg"></div></div></td>
        </tr>
      ))}
    </>
  )

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4 pb-5">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FaBuilding className="text-emerald-500 text-2xl" />
            Departments
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage and monitor all institutional departments.</p>
        </div>
        <button
          onClick={() => {
            setEditItem(null)
            formik.resetForm()
            document.getElementById("dept_modal").showModal()
          }}
          className="w-full md:w-auto bg-slate-900 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
        >
          <FaPlus size={14} /> Add New Department
        </button>
      </div>

      {/* Main Table Container */}

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden max-h-[500px]">

        {/* SCROLL CONTAINER */}
        <div className="overflow-y-auto max-h-[500px] scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          <table className="w-full table-fixed border-collapse text-left">

            {/* ================= STICKY HEADER ================= */}
            <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur border-b border-slate-100">
              <tr>
                <th className="w-24 p-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Preview
                </th>
                <th className="w-1/4 p-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Department Name
                </th>
                <th className="w-1/4 p-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  H.O.D
                </th>
                <th className="w-32 p-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Category
                </th>
                <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Description
                </th>
                <th className="w-32 p-5 text-xs font-black uppercase tracking-widest text-slate-400 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* ================= BODY ================= */}
            <tbody className="divide-y divide-slate-50">

              {isFetchLoading ? (
                <tr>
                  <td colSpan="6" className="p-6">
                    <TableSkeleton />
                  </td>
                </tr>
              ) : isFetchError ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-2xl font-bold">
                        !
                      </div>
                      <p className="text-slate-500 font-bold">
                        Failed to load departments.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : data?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-slate-400 italic">
                    No departments found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="w-24 p-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition"
                      />
                    </td>

                    <td className="w-1/4 p-5 font-bold text-slate-800">
                      {item.name}
                    </td>

                    <td className="w-1/4 p-5">
                      <div className="flex items-center gap-2 text-slate-600 font-semibold truncate">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                        {item.head}
                      </div>
                    </td>

                    <td className="w-32 p-5">
                      <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                        {item.category}
                      </span>
                    </td>

                    <td className="p-5">
                      <p className="text-slate-500 text-sm font-medium line-clamp-3">
                        {item.desc}
                      </p>
                    </td>

                    <td className="w-32 p-5 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => {
                            setEditItem(item);
                            document.getElementById("dept_modal").showModal();
                          }}
                          className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                        >
                          <FaEdit size={14} />
                        </button>

                        <button
                          onClick={() =>
                            window.confirm("Are you sure?") &&
                            deleteDepartment(item._id)
                          }
                          disabled={deleteState.isLoading}
                          className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                        >
                          {deleteState.isLoading ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : (
                            <FaTrash size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section (Integrated with Logic) */}
      <dialog id="dept_modal" className="modal modal-middle backdrop-blur-md">
        <div className="modal-box max-w-lg rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl bg-white">

          <div className="bg-slate-900 p-8 text-white relative">
            <h3 className="text-2xl font-black tracking-tight">{editItem ? "Update Details" : "New Department"}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Institutional Records</p>
            <button
              onClick={() => document.getElementById("dept_modal").close()}
              className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
            >✕</button>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-8 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Full Name</label>
                <input className={handleClass("name")} {...formik.getFieldProps("name")} placeholder="e.g. Science Department" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Dept Head</label>
                  <input className={handleClass("head")} {...formik.getFieldProps("head")} placeholder="HOD Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Category</label>
                  <select className={handleClass("category")} {...formik.getFieldProps("category")}>
                    <option value="">Choose...</option>
                    <option value="cricket">Cricket</option>
                    <option value="hockey">Hockey</option>
                    <option value="western">Western</option>
                    <option value="ncc">NCC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Visual Identity</label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-emerald-400 transition-colors">
                  <input type="file" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white cursor-pointer" onChange={e => formik.setFieldValue("image", e.target.files[0])} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Description</label>
                <textarea rows="3" className={handleClass("desc")} {...formik.getFieldProps("desc")} placeholder="Enter department mission..." />
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                disabled={addState.isLoading || updateState.isLoading}
                className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
              >
                {addState.isLoading || updateState.isLoading ? <span className="loading loading-spinner"></span> : (editItem ? "Update Record" : "Save Department")}
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("dept_modal").close()}
                className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default AllDepartmentL