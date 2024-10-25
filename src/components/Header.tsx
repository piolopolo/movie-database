import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie Database
        </Typography>
        <Link href="/" passHref>
          <Button variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Home</Button>
        </Link>
        <Link href="/favourites" passHref>
          <Button variant="outlined" style={{ color: 'white', borderColor: 'white', marginLeft: '10px' }} >Favorites</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
