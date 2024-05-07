import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateClass() {
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [data, setData] = useState('');
    const [classList, setClassList] = useState('');
    const [teacherSessionData, setTeacherSessionData] = useState(JSON.parse(localStorage.getItem('data')).user);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if( moduleName && moduleDescription ){
            try {
                const teacherId = JSON.parse(localStorage.getItem('data')).user._id

                const response = await axios.post(`http://localhost:3001/api/class/register-module`,{
                    name : moduleName,
                    description : moduleDescription,
                    teacherId: teacherId
                });
                if(response.status == 201 ){
                    setData(response.data.class);
                    alert(response.data.message);
                    setModuleName('')
                    setModuleDescription('')
                    let inArray = JSON.parse(localStorage.getItem('notification'));
                    inArray.push(response.data.message);
                    localStorage.setItem('notification', JSON.stringify(inArray));
                }
            } catch (error) {
                console.error('Error getting course data:', error);
            }
        }
    };
      
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'moduleName') {
        setModuleName(value);
    } else if (name === 'moduleDescription') {
        setModuleDescription(value);
    }
  };

  return (
        <div className="container">
        <h2 className="mb-4">Module Form</h2>
        <div className="row">
            <div className="col-sm-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="moduleName" className="form-label">Module Name</label>
                        <input type="text" className="form-control" id="moduleName" name="moduleName" value={moduleName} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moduleDescription" className="form-label">Module Description</label>
                        <textarea className="form-control" id="moduleDescription" name="moduleDescription" value={moduleDescription} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="moduleOwner" className="form-label">Module Owner</label>
                        <input disabled type="text" className="form-control" id="moduleOwner" name="moduleOwner" value={`${teacherSessionData.firstName} ${teacherSessionData.lastName}` } />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default CreateClass;