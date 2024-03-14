import React from 'react'

export default function Placeholder(props) {
    return (
        <div>
            <p aria-hidden="true">
                <span class="placeholder col-6">{props.label}</span>
            </p>
        </div>
    )
}
