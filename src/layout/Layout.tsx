import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from './Footer';
import Header from './Header';
import { LinkBehavior } from '../auth/infraestructure/ui/utils/LinkBehavior';

let theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});
theme = responsiveFontSizes(theme);

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height={'100vh'} display="flex" flex={1} flexDirection={'column'}>
        <Header />
        <Box display={'flex'} flex={1} width={'100%'}>
          <Container component="main">{children}</Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
