import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';

export default function Index() {
  return (
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Telescope
        </Typography>
        <Link href="/#" color="primary">
          Go to the about page
        </Link>
      </Box>
  );
}