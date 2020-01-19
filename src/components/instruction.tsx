import React, { useState } from 'react';
import { Edit, Cancel, Save, Check, Delete } from '@material-ui/icons';
import { TextField } from '@material-ui/core';

type Props = {
  instruction: string;
  index: number;
  handleDelete: any;
  handleUpdate: any;
};
const Instruction: React.FC<Props> = ({
  instruction,
  index,
  handleDelete,
  handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [instructionText, setInstructionText] = useState(instruction);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>{index + 1}.</span>
      {!isEditing && (
        <>
          <div>{instructionText}</div>{' '}
          <Edit
            style={{ cursor: 'pointer', marginLeft: 20 }}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
          <Delete
            style={{ cursor: 'pointer', marginLeft: 10 }}
            onClick={handleDelete}
          />
        </>
      )}
      {isEditing && (
        <>
          <TextField
            onChange={e => {
              setInstructionText(e.target.value);
            }}
            autoFocus
            margin='dense'
            id='filter'
            value={instructionText}
            label='Instruction'
            type='text'
            fullWidth
            style={{ flex: 1 }}
          />
          <Check
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsEditing(!isEditing);
              handleUpdate(instructionText);
            }}
          />
          <Cancel
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setInstructionText(instruction);
              setIsEditing(!isEditing);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Instruction;
