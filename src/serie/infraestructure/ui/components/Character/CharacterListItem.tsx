import * as React from 'react';

import { Avatar, Button } from '@mui/material';

import { CHARACTER_DETAIL_URL } from '../../utils/constants';
import { Character } from '../../../../domain/entities/Character';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface CharacterListItemProps extends Character {}

export const CharacterListItem = ({
  id,
  name,
  status,
  gender,
  image
}: CharacterListItemProps) => {
  let navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`${CHARACTER_DETAIL_URL}${id}`);
  };
  return (
    <>
      <ListItem
        disableGutters
        secondaryAction={
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={onClick}>
            Detail
          </Button>
        }>
        <ListItemAvatar>
          <Avatar alt={name} src={image}>
            <img
              alt="Fallback"
              src="https://cms-cdn.placeholder.co/warehouse_for_rent_19b6e42cf3.jpg?width=3840"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontWeight: 'bold' }}
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="inherit">
              {status}
              {' - '}
              {gender}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
