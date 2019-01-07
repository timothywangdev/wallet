import React, { Component } from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import Icon from '@material-ui/core/Icon'

/**
 * Print files.
 */

class WalletComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      auth: false
    }
  }

  deleteFile = async (fileId) => {
    let rv = await window.gapi.client.drive.files.delete({
      fileId: fileId
    })
    console.log(rv)
  }

  loadFile = async (fileId) => {
    let rv = await window.gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    })
    return rv.result
  }

  saveFileGeneric = async (file, raw) => {
    if (!window.gapi.client.drive) {
      await window.gapi.client.load('drive', 'v3')
    }

    async function addContent(fileId) {
      return window.gapi.client.request({
        path: '/upload/drive/v3/files/' + fileId,
        method: 'PATCH',
        params: {
          uploadType: 'media'
        },
        body: file.content
      })
    }
    var metadata = {
      mimeType: 'application/json',
      name: file.name,
      fields: 'id'
    }
    if (raw) {
      delete metadata["mimeType"];
    }

    if (file.parents) {
      metadata.parents = file.parents;
    }

    if (file.id) { //just update
      let resp = await addContent(file.id).then(function(resp) {
        console.log('File just updated', resp.result);
      })
    } else { //create and update
      console.log(window.gapi.client.drive.files)
      let resp = await window.gapi.client.drive.files.create({
        resource: metadata
      })
      resp = await addContent(resp.result.id)
      console.log('created and added content', resp.result);
    }
  }

  addFile = async (data) => {
    try {
      await this.saveFileGeneric({
        content: JSON.stringify({ data: 'abcdde' }),
        name: 'test.json',
        parents: ['appDataFolder'],
      }, false)
    } catch (err) {
      console.log(err)
    }
  }

  listFiles = async () =>  {
    try {
      let rv = await window.gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100
      })

      let files = rv.result.files
      files.map(async (f) => console.log(await this.loadFile(f.id)))

      // delete first one
      await this.deleteFile(files[0].id)
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props

      return (
        <List className={classes.root}>
          <ListItem>
            <Avatar>
              <Icon className={classNames(classes.icon, 'fab fa-ethereum')} />
            </Avatar>
            <ListItemText primary="Primary" secondary="15.23 ETH" />
          </ListItem>
          <ListItem>
            <Avatar>
              <Icon className={classNames(classes.icon, 'fab fa-ethereum')} />
            </Avatar>
            <ListItemText primary="Secondary" secondary="15.23 ETH" />
          </ListItem>
          <ListItem>
            <Avatar>
              <Icon className={classNames(classes.icon, 'fab fa-ethereum')} />
            </Avatar>
            <ListItemText primary="Another" secondary="15.23 ETH" />
          </ListItem>
        </List>)
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  }
})

export default withStyles(styles)(WalletComponent)
