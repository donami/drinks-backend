import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Fab,
  Typography,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Icon,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { Ingredient } from '../models/interface';

type Props = {
  onSubmit: (data: any) => void;
};
const AddInstruction: React.FC<Props> = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const [instruction, setInstruction] = React.useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInstruction('');
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Add />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add instruction</DialogTitle>
        <DialogContent>
          <React.Fragment>
            <TextField
              onChange={e => {
                setInstruction(e.target.value);
              }}
              autoFocus
              margin='dense'
              id='instruction'
              label='Instruction'
              type='text'
              fullWidth
            />
          </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(instruction);
              handleClose();
            }}
            disabled={!instruction.length}
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddInstruction;
