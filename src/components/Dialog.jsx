import React from 'react';
import '../styles/dialog.css';


function Dialog({editId, handleSaveData, collegeData, formData, handleChange, defaultSelect }) {
    const {
        name, rank
    } = formData;

    return (
        <div>

            <button disabled={editId} type="button" id='btn' className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Add new Student
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Student</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* form */}
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label" id='label'>Student Name</label>
                                    <div className="col-sm-7">

                                        <input onChange={handleChange} value={name} name='name' className="form-control" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-1" id='label'>Rank</label>
                                    <div className="col-sm-7">
                                        <input type='number' onChange={handleChange} value={rank} name='rank' className="form-control" id="inputPassword3" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label" id='label'>College preference 1</label>
                                    <div className="col-sm-7">
                                        <select id='selectbox' name='pref1' onChange={handleChange} required>
                                            <option >--Select--</option>
                                            {collegeData.map((e) => (


                                                <option key={e.id} disabled={defaultSelect.includes(e.name)} value={e.name} >{e.name}</option>

                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label" id='label'>College preference 2</label>
                                    <div className="col-sm-7">
                                        <select id='selectbox' name='pref2' onChange={handleChange} required>
                                            <option >--Select--</option>
                                            {collegeData.map((e) => (
                                                <option key={e.id} disabled={defaultSelect.includes(e.name)} value={e.name} >{e.name}</option>

                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-1 col-form-label" id='label'>College preference 3</label>
                                    <div className="col-sm-7">
                                        <select id='selectbox' name='pref3' onChange={handleChange} required>
                                            <option>--Select--</option>
                                            {collegeData.map((e) => (
                                                <option key={e.id} disabled={defaultSelect.includes(e.name)} value={e.name} >{e.name}</option>

                                            ))}
                                        </select>
                                        {/* <input onChange={handleChange} value={pref3} name='pref3' className="form-control"  /> */}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <input type="submit" className="btn btn-success" onClick={handleSaveData} data-dismiss="modal" value='Save' />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


            




        </div>
    )
}

export default Dialog