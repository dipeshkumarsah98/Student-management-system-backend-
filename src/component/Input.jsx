import React from 'react'

export const Input = ({ label, name, type, required, value }) => {
    return (
        <div className="form-row mb-3">
            <div className="form-group col-md-6">
                <label htmlFor={name} className='form-control-lg'>{label}</label>
                <input
                    type={type || 'text'}
                    className="form-control form-control-lg"
                    id={name}
                    aria-describedby="emailHelp"
                    required={required || false}
                    defaultValue={value || ""}
                />
            </div>
        </div>
    )
}
