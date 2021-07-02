import React from 'react';

export default function CalcKey({name, onClick, onKeyPress}) {
  return (
    <button name={name} onClick={onClick} onKeyPress={onKeyPress}>{name}</button>
  )
}