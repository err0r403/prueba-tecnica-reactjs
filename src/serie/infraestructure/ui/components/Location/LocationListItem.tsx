import * as React from 'react';

import { Button, Typography } from '@mui/material';

import Divider from '@mui/material/Divider';
import { LOCATION_DETAIL_URL } from '../../utils/constants';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Location } from '../../../../domain/entities/Location';
import { useNavigate } from 'react-router-dom';

interface LocationListItemProps extends Location {}

export const LocationListItem = ({ id, name, type }: LocationListItemProps) => {
  let navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`${LOCATION_DETAIL_URL}${id}`);
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
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontWeight: 'bold' }}
          secondary={
            <Typography component="span" variant="body2" color="inherit">
              {type}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ ml: 0 }} />
    </>
  );
};
