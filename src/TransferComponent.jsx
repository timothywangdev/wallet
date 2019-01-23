import React, { Component } from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles';

/**
 * Print files.
 */

class TransferComponent extends Component {

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        asdsadsad
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  addrList: {
    width: '100%'
  },
  projectListContainer: {
    marginTop: '60px',
    '@media (min-width: 380px) and (max-width : 751px)': {
      maxWidth: '380px'
    },
    '@media (min-width: 752px) and (max-width : 1129px)': {
      maxWidth: '752px'
    },
    '@media (min-width: 1130px) and (max-width : 1489px)': {
      maxWidth: '1130px'
    },
    '@media (min-width: 1490px) ': {
      maxWidth: '1490px'
    }
  },
  projectsHeader: {
    marginBottom: 16,
    color: '#333333',
    alignSelf: 'flex-start'
  },
  fab: {
    textAlign: 'right',
    margin: theme.spacing.unit,
  },
})

export default withStyles(styles)(TransferComponent)
