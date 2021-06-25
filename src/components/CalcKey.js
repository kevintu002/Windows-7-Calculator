import React from 'react';

export default function CalcKey({name, onClick}) {
  return (
    <button name={name} onClick={onClick}>{name}</button>
  )
}