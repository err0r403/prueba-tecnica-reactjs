import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        RenApp Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        py: 3
      }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100px'}>
      <Container component="footer">
        <Copyright />
      </Container>
    </Box>
  );
}
