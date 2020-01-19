import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDrinkItems } from '../redux/selectors';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Button,
} from '@material-ui/core';
import { Link } from 'wouter';
import { deleteDrinks } from '../redux/actions';

function ListItemLink(props: any) {
  const { icon, primary, to, item, checked, handleToggle } = props;

  const labelId = `checkbox-list-secondary-label-${item.id}`;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => <Link href={to} {...linkProps} />),
    [to]
  );

  const ListItemLink = (props: any) => {
    return <ListItem button component={renderLink} {...props} />;
  };

  return (
    <ListItemLink key={item.id} button href={`/drinks/${item.id}`}>
      <ListItemAvatar>
        <Avatar alt={item.title} src={item.image} />
      </ListItemAvatar>
      <ListItemText id={labelId} primary={item.title} />
      <ListItemSecondaryAction>
        <Checkbox
          edge='end'
          onChange={handleToggle(item.id)}
          checked={checked.indexOf(item.id) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemSecondaryAction>
    </ListItemLink>
  );
}

type Props = {};
const Drinks: React.FC<Props> = () => {
  const drinks = useSelector(state => getDrinkItems(state));
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (itemId: string) => () => {
    const currentIndex = checked.indexOf(itemId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(itemId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = () => {
    dispatch(deleteDrinks({ ids: checked }));
  };

  return (
    <div>
      <h3>Drinks ({drinks.length || 0})</h3>
      {!drinks.length && <p>No drinks added.</p>}
      {!!drinks.length && (
        <List dense>
          {drinks.map(item => {
            const labelId = `checkbox-list-secondary-label-${item.id}`;
            return (
              <ListItemLink
                key={item.id}
                item={item}
                handleToggle={handleToggle}
                checked={checked}
              />
            );
          })}
        </List>
      )}
      With selected: <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default Drinks;
