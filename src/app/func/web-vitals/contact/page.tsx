'use client'

import { useState } from "react";
import { event } from "../lib/gtag";

export default function Page() {
    const [state, setState] = useState({ message: '' });
    return (
        <div>
            <h1>This is the Content page.</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    event({
                        action: 'submit_form',
                        category: 'Contact',
                        label: state.message
                    });
                    setState({ message: '' });
                }}
            >
                <p>
                    <label>
                        <span>Message:</span>
                        <textarea 
                            style={{ backgroundColor: '#666' }}
                            value={state.message}
                            onChange={e => setState({ message: e.target.value })}
                        />
                    </label>
                </p>
                <p>
                    <button type="submit">submit</button>
                </p>
            </form>
        </div>
    );
}