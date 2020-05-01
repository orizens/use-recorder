import React from 'react'

export function Button({ icon, children, onClick, color, animate }) {
  return (
    <button
      className={`button is-medium is-light is-${color}`}
      onClick={onClick}
    >
      <span className={`icon ${animate ? 'rotating' : ''}`}>
        <i className={`lni lni-${icon}`} />
      </span>
      <span>{children}</span>
    </button>
  )
}
