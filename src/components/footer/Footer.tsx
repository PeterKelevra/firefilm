import { Box, Link } from '@material-ui/core';
import React from 'react';
import useFooterStyles from './Footer.styles';

export default function Footer() {
  const classes = useFooterStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" className={ classes.root }>
      <Link href="https://www.innocv.com">
        <img src="https://www.innocv.com/wp-content/uploads/2020/11/innocv_logo.svg"/>
      </Link>
      <Box>
        &copy; FireFilm by Pedro Peña García
      </Box>
    </Box>
  );
}
