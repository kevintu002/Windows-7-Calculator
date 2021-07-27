import React from 'react';

export default function CalcKey({className='', name, id=name, onClick}) {
  return (
    <button 
      className={className} 
      id={id} 
      name={name} 
      onClick={onClick}>{name}
    </button>
  )
}