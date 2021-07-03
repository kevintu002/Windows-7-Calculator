import React from 'react';

export default function CalcKey({id, name, onClick}) {
  return (
    <button id={id ? id : name} name={name} onClick={onClick}>{name}</button>
  )
}