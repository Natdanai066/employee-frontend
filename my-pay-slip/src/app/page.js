"use client"
import React, { useEffect } from "react";
import Axios from 'axios';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Page() {
  const BASE_URL = "http://localhost:3001"
  
  const [employeeList, setEmployeeList] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)
  const router = useRouter()

  const getEmployees = () => {
    Axios.get(`${BASE_URL}/employee`).then((response) => {
      setEmployeeList(response.data)
    })
  }

  const deleteEmployee = (id) => {
    const shouldDelete = window.confirm("คุณต้องการลบข้อมูลนี้จริง ๆ หรือไม่?");
    if (shouldDelete) {
      Axios.delete(`${BASE_URL}/employee/${id}`).then((response) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.id !== id
          })
        )
      }).then(() => {
        if (isDeleted === false) {
          setIsDeleted(true)
          setTimeout(() => {
            setIsDeleted(false)
          }, 2000)
        }
      })
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (

    <>
      {isDeleted === true ?
        <div className="absolute right-4 top-4">
          <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-white">ลบข้อมูลสำเร็จ!</span>
          </div>
        </div>
        : (<div></div>)
      }


      <div className="h-screen flex justify-center items-center">
        <div className="shadow-lg p-8 w-3/4 bg-white">
          <div className="flex justify-between align-middle mb-5">
            <h1 className="text-2xl font-medium">ตารางแสดงข้อมูลพนักงานทั้งหมด</h1>
            <button type="button" className="btn btn-outline btn-success" onClick={() => router.push('/formSlip')}>
              เพิ่มข้อมูล
            </button>
          </div>

          <div class="overflow-x-auto">
            <table className="table">
              <thead className="text-lg text-center">
                <tr>
                  <th className="border border-slate-300">#</th>
                  <th className="border border-slate-300">คำนำหน้า</th>
                  <th className="border border-slate-300">ชื่อ</th>
                  <th className="border border-slate-300">นามสกุล</th>
                  <th className="border border-slate-300">ตำแหน่ง</th>
                  <th className="border border-slate-300">เบอร์โทร</th>
                  <th className="border border-slate-300">เงินเดือน</th>
                  <th className="border border-slate-300">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="text-lg">

                {employeeList.length <= 0
                  ? (<tr><td colSpan={8} className="text-red-500 text-center text-xl font-bold border border-slate-300">ไม่พบข้อมูล!!</td></tr>)
                  : (employeeList.map((employee, key) => {
                    return (
                      <tr key={key} className="hover">
                        <td className="border border-slate-300">{employee.id}</td>
                        <td className="border border-slate-300">{employee.prefix}</td>
                        <td className="border border-slate-300">{employee.f_name}</td>
                        <td className="border border-slate-300">{employee.l_name}</td>
                        <td className="border border-slate-300">{employee.department}</td>
                        <td className="border border-slate-300">{employee.tel}</td>
                        <td className="border border-slate-300">{employee.salary}</td>
                        <td className="border border-slate-300">
                          <div className="flex justify-center align-middle gap-2">
                            <Link className="btn btn-info text-white" href={{ pathname: '/resultSlip', query: { empId: employee.id } }} >ดูสลิป</Link>
                            <Link className="btn btn-warning text-white"href={{ pathname: '/editSlip', query: { empId: employee.id } }} >แก้ไข</Link>
              
                            <button className="btn btn-error text-white" onClick={() => deleteEmployee(employee.id)}>ลบ</button>
                          </div>
                        </td>
                      </tr>
                    )
                  }))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
