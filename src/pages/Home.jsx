import React, { useState } from 'react'

const Home = () => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
    })
    const [tableData, setTableData] = useState([])
    //For Edit----->
    const [editClick, setEditClick] = useState(false)
    //for Update----->
    const [editIndex, setEditIndex] = useState("")

    const handleChange = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value,
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("inputs", inputs);
        // setTableData([...tableData, inputs])
        // setInputs({
        //     name: "",
        //     email: "",
        // })
        if (editClick) {
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs);
            setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
              name: "",
              email: "",
            })
        } else {
            setTableData([...tableData, inputs])
            setInputs({
                name: "",
                email: "",
            })
        }
    }

    //Delete operation---------->
    const handleDelete = (index) => {
        const filterData = tableData.filter((item, i) => i !== index);
        setTableData(filterData);
    };

    //UPDATE operation------------>
    const handleEdit = (index) => {
        const tempData = tableData[index]
        // console.log('tempData', temData);
        setInputs({
            name: tempData.name,
            email: tempData.email
        })
        setEditClick(true)
        setEditIndex(index)
    }


    return (
        <div className='bg-light'>
            <h1 className='text-center'>Crud App</h1>

            <div className='m-auto p-5 bg-success'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3 d-flex ">
                        <label>Name</label>
                        <input name="name" value={inputs.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3 d-flex">
                        <label>Email</label>
                        <input name="email" value={inputs.email} onChange={handleChange} />
                    </div>
                    <button type='submit' className="btn btn-light">
                        {editClick ? "update" : "Add"}
                    </button>
                </form>
            </div>

            <table className='text-center w-100 p-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, i) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={() => handleEdit(i)} className='m-3'>Edit</button>
                                <button onClick={() => handleDelete(i)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Home