import React from 'react';

export default function CalcKey({name, onClick}) {
  return (
    <button id={name} name={name} onClick={onClick}>{name}</button>
  )
}