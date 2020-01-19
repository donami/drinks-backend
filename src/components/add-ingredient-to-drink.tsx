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
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { Ingredient } from '../models/interface';

type Props = {
  ingredients: Ingredient[];
  onSubmit: (data: any) => void;
};
const AddIngredientToDrink: React.FC<Props> = ({ ingredients, onSubmit }) => {
  const [open, setOpen] = React.useState(false);

  const [filtered, setFiltered] = React.useState<Ingredient[]>([]);
  const [amount, setAmount] = React.useState<string>('');
  const [filter, setFilter] = React.useState<string>('');
  const [selected, setSelected] = React.useState<Ingredient | null>(null);

  useEffect(() => {
    const re = new RegExp(filter.toLowerCase(), 'g');
    const newItems = ingredients.filter(item => {
      return !!item.title.toLowerCase().match(re);
    });
    setFiltered(newItems);
  }, [filter]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFilter('');
    setFiltered([]);
    setSelected(null);
    setAmount('');
  };

  const handleFilter = (phrase: string) => {
    setFilter(phrase);
  };

  return (
    <div>
      <Fab color='primary' aria-label='add' onClick={handleClickOpen}>
        <Add />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>Search ingredient</DialogContentText>
          {!selected && (
            <React.Fragment>
              <TextField
                onChange={e => {
                  handleFilter(e.target.value);
                }}
                autoFocus
                margin='dense'
                id='filter'
                label='Filter by name'
                type='text'
                fullWidth
              />
              <div style={{ width: 400 }}>
                {!!filter.length && !!filtered.length && (
                  <List dense>
                    {filtered.map(value => {
                      const labelId = `filter-ingredient-${value.title}`;
                      return (
                        <ListItem key={value.id} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar n°${value.title + 1}`}
                              src={`/static/images/avatar/${value.title +
                                1}.jpg`}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={value.title} />
                          <ListItemSecondaryAction>
                            <Button
                              onClick={() => {
                                setSelected(value);
                              }}
                            >
                              Choose
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
                {!!filter.length && !filtered.length && (
                  <p>
                    <em>Found ingredients matching "{filter}".</em>
                  </p>
                )}
              </div>
            </React.Fragment>
          )}

          {selected && (
            <React.Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h5'>{selected.title}</Typography>
                <Button
                  onClick={() => {
                    setSelected(null);
                    setAmount('');
                    setFilter('');
                    setFiltered([]);
                  }}
                >
                  <Remove color='error' />
                </Button>
              </div>
              <TextField
                onChange={e => {
                  setAmount(e.target.value);
                }}
                margin='dense'
                id='amount'
                label='Amount'
                type='text'
                fullWidth
              />
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit({
                ingredient: selected,
                amount,
              });
              handleClose();
            }}
            disabled={!selected || !amount.length}
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddIngredientToDrink;
