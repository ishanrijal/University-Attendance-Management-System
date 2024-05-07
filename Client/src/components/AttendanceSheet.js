import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendanceSheet() {
    const [data, setData] = useState('');
    const [studentData, setStudentData] = useState('');
    const [classData, setClassData] = useState(JSON.parse(localStorage.getItem('moduleList')));

    const getStudentList = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/user/all-users');
            setStudentData(response.data);
        } catch (error) {
            console.error('Error getting student data:', error);
        }
    };

    const getMyAttendanceList = async () => {
        try {
            const teacherId = JSON.parse(localStorage.getItem('data')).user._id;
            const response = await axios.get(`http://localhost:3001/api/attendance/student-attendance-history?teacherId=${teacherId}`);
            setData(response.data.records);
            localStorage.setItem('attendanceInformation', JSON.stringify(response.data.records));
        } catch (error) {
            console.error('Error getting attendance data:', error);
        }
    };

    useEffect(() => {
        getStudentList();
        getMyAttendanceList();
    }, []);

    const getStudentName = (studentId) => {
        const student = studentData.find(student => student._id === studentId);
        return student ? `${student.firstName} ${student.lastName}` : 'Pramodhya';
    };
    const getClassName = (classId) => {
        const data = classData.find(data => data._id === classId);
        return data ? `${data.name}` : 'Miss Wilinge';
    };

    return (
        <div className="container">
            <h2 className="mb-4">Attendance Sheet</h2>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-bordered attendance-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Student Name</th>
                                <th>Module Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.date.slice(0, 10)}</td>
                                    <td>
                                        {info.students.map((student, idx) => (
                                            <span key={idx}>{getStudentName(student.studentId)}</span>
                                        ))}
                                    </td>
                                    <td>
                                        {getClassName(info.classId)}
                                    </td>
                                    <td>
                                        {info.students.map((student, idx) => (
                                            <span key={idx}>{student.status}</span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AttendanceSheet;
