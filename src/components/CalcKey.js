import React from 'react';

export default function CalcKey({className, id, name, onClick}) {
  return (
    <button 
      className={className ? className : ''} 
      id={id ? id : name} 
      name={name} 
      onClick={onClick}>{name}
    </button>
  )
}