'use client';

import { FC } from "react";

interface FormItemProps {
    message: string;
}

const FormItems: FC<FormItemProps> = ({ message }) => {
    return (
        <>
            {message !== '' && (
                <div>{message}</div>
            )}
            <div>
                <label>
                    Name:
                    <input 
                        name="name"
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input 
                        name="email"
                        type="email" 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Zipcode:
                    <input 
                        type="number" 
                        name="zipcode" 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Subcribe:
                    <input 
                        type="checkbox" 
                        name="subcribe" 
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </>
    );
};

export default FormItems;