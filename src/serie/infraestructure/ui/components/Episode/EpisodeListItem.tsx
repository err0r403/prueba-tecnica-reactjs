import * as React from 'react';

import { Button, Typography } from '@mui/material';

import Divider from '@mui/material/Divider';
import { EPISODE_DETAIL_URL } from '../../utils/constants';
import { Episode } from '../../../../domain/entities/Episode';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

interface EpisodeListItemProps extends Episode {}

export const EpisodeListItem = ({
  id,
  name,
  episode
}: EpisodeListItemProps) => {
  let navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`${EPISODE_DETAIL_URL}${id}`);
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
              {episode}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ ml: 0 }} />
    </>
  );
};
