"use client";
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useSearchParams } from "next/navigation"
import Link from 'next/link'

function editSlip() {
    const BASE_URL = "http://localhost:3001"
    const searchParams = useSearchParams()
    const empIdParams = searchParams.get("empId");
    const [employee, setEmployeeList] = useState([])

    const getEmployees = () => {
        Axios.get(`${BASE_URL}/employee/${empIdParams}`).then((response) => {
            console.log('response data = ', response.data);
            setEmployeeList(response.data)
        })
    }

    useEffect(() => {
        getEmployees()
    }, []);

    const [isSubmitSucceed, setIsSubmitSucceed] = useState(false)

    const handleChange = (event) => {
        setEmployeeList({ ...employee, [event.target.name]: [event.target.value] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(employee);

        const bodyData = {
            f_name: employee.f_name,
            l_name: employee.l_name,
            iden_no: employee.iden_no,
            tel: employee.tel,
            prefix: employee.prefix,
            department: employee.department,
            salary: employee.salary,
            start_date: employee.start_date,
            social_secure: employee.social_secure,
            personal_leave: employee.personal_leave,
            sick_leave: employee.sick_leave,
            bank: employee.bank,
            stage: employee.stage,
            acc_num: employee.acc_num,
            bank_branch: employee.bank_branch,
            ot_hour: employee.ot_hour,
            circulation: employee.circulation,
            month: employee.month,
            commission: employee.commission,
        }

        try {
            // เพิ่มโค้ด Axios.post เพื่อส่งข้อมูลไปยัง API
            await Axios.patch(`${BASE_URL}/employee/${empIdParams}`, bodyData)
                .then((res) => console.log("Updated Successfully!!"))
                .catch((err) => console.log(err));

            setEmployeeList({
                f_name: "",
                l_name: "",
                iden_no: "",
                tel: "",
                prefix: "",
                department: "",
                salary: 0,
                start_date: "",
                social_secure: 0,
                personal_leave: 0,
                sick_leave: 0,
                bank: "",
                stage: "",
                acc_num:"",
                bank_branch:"",
                ot_hour:"",
                circulation:"",
                month:"",
                commission:"",
            });

            window.location.reload();

        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="relative shadow-lg p-8 w-2/4 h-[842px] text-center bg-white">
                <div className="flex justify-center"></div>
                <div
                    className="d-flex justify-con
    tent-center align-items-center bg-primary vh-100"
                >
                    <div className="bg-white p-3 rounded w-25 text-center mx-auto">
                        <h1 className="text-2xl mb-6">กรอกข้อมูล</h1>

                        <form onSubmit={handleSubmit}>
                            <div class="grid grid-cols-3 gap-4">

                            <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">รหัสประจำตัว</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกรหัสประจำตัว.."
                                            name="iden_no"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.iden_no}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ชื่อ</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกชื่อจริง.."
                                            name="f_name"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.f_name}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">นามสกุล</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกนามสกุล.."
                                            name="l_name"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.l_name}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">เบอร์โทรศัพท์</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกเบอร์โทรศัพท์.."
                                            name="tel"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.tel}
                                        />
                                    </label>
                                </div>
                                {/* prefix */}
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">คำนำหน้าชื่อ</span>
                                        </div>
                                        <select className="select select-bordered" name="prefix" onChange={handleChange} required value={employee.prefix}>
                                            <option disabled selected>
                                                -- เลือก --
                                            </option>
                                            <option value="นาย">นาย</option>
                                            <option value="นาง">นาง</option>
                                            <option value="นางสาว">นางสาว</option>
                                        </select>
                                    </label>
                                </div>
                                {/* department */}
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ตำแหน่งงาน</span>
                                        </div>
                                        <select className="select select-bordered" name="department" onChange={handleChange} required value={employee.department}>

                                            <option disabled selected>
                                                -- เลือก --
                                            </option>
                                            <option value="Front End Developer">Front End Developer</option>
                                            <option value="Back End Developer">Back End Developer</option>
                                            <option value="Full Stack Developer">Full Stack Developer</option>
                                            <option value="DevOps Engineer">DevOps Engineer</option>
                                        </select>

                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">เงินเดือน</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกเงินเดือน.."
                                            name="salary"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.salary}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ระยะเวลาการทำงาน (วัน)</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกระยะเวลาการทำงาน.."
                                            name="stage"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.stage}
                                        />
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">วันที่เริ่มทำงาน</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกวันที่เริ่มทำงาน.."
                                            name="start_date"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.start_date}
                                        />
                                    </label>
                                </div>

                            
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">รวมทั้งหมด(กี่เดือน เช่น 15 เดือน)</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกวันที่สิ้นสุดทำงาน.."
                                            name="month"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.month}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ประกันสังคม(%)</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกประกันสังคม.."
                                            name="social_secure"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.social_secure}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ยอดขาย</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกยอดขาย.."
                                            name="circulation"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.circulation}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ค่าคอม %</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกค่าคอม.."
                                            name="commission"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.commission}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ลาป่วย</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกลาป่วย.."
                                            name="sick_leave"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.sick_leave}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ลากิจ</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="กรอกลาป่วย.."
                                            name="personal_leave"
                                            className="input input-bordered w-full"
                                            onChange={handleChange}
                                            required
                                            value={employee.personal_leave}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ธนาคาร</span>
                                        </div>
                                        <select className="select select-bordered" name="bank" onChange={handleChange} required value={employee.bank}>

                                            <option disabled selected>
                                                -- เลือก --
                                            </option>
                                            <option value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</option>
                                            <option value="ธนาคารกสิกรไทย">ธนาคารกสิกรไทย</option>
                                            <option value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</option>
                                            <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
                                            <option value="ธนาคารไทยพาณิชย์">ธนาคารไทยพาณิชย์</option>
                                            <option value="ธนาคารกรุงศรีอยุธยา">ธนาคารกรุงศรีอยุธยา</option>
                                            <option value="ธนาคารเกียรตินาคินธนาคารซีไอเอ็มบีไทย">ธนาคารเกียรตินาคินธนาคารซีไอเอ็มบีไทย</option>
                                            <option value="ธนาคารซีไอเอ็มบีไทย">ธนาคารซีไอเอ็มบีไทย</option>
                                            <option value="ธนาคารทหารไทย">ธนาคารทหารไทย</option>
                                        </select>

                                    </label>
                                    
                                </div>
                                <div className="mb-3">
                            <label className="form-control w-full">
                            <div className="label">
                                     <span className="label-text">เลขบัญชี</span>
                                     </div>
                                    <input
                                    type="number"
                                    placeholder="กรอกเลขบัญชี.."
                                    name="acc_num"
                                    className="input input-bordered w-full"
                                    onChange={handleChange}
                                    required
                                    value={employee.acc_num}

                                    />
                                </label>
                                </div>
                               <div className="mb-3">
                            <label className="form-control w-full">
                            <div className="label">
                                     <span className="label-text">สาขา</span>
                                     </div>
                                    <input
                                    type="text"
                                    placeholder="กรอกสาขา.."
                                    name="bank_branch"
                                    className="input input-bordered w-full"
                                    onChange={handleChange}
                                    required
                                    value={employee.bank_branch}

                                    />
                                </label>
                                </div>
                                <div className="mb-3">
                            <label className="form-control w-full">
                            <div className="label">
                                     <span className="label-text">ot(ชั่วโมง)</span>
                                     </div>
                                    <input
                                    type="text"
                                    placeholder="กรอกot.."
                                    name="ot_hour"
                                    className="input input-bordered w-full"
                                    onChange={handleChange}
                                    required
                                    value={employee.ot_hour}
                                    

                                    />
                                </label>
                                </div>
                            </div>




                            <div className="flex justify-center align-middle gap-4 mt-10">
                                <Link href={{ pathname: '/' }} className="btn px-12">ย้อนกลับ</Link>
                                <button
                                    className="btn btn-success text-white px-12"
                                    type="submit"
                                >
                                    แก้ไขข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default editSlip;