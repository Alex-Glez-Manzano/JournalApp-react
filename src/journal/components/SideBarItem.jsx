import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/Journal'

export const SideBarItem = ({title = '', body, id, date, imageUrls=[]}) => {
    const dispath = useDispatch();
    const onClickNote = () =>{
        dispath(setActiveNote({title, body, id, date, imageUrls}))
    }
    const newTitle = useMemo (()=>{
        return title.length > 12
            ? title.substring(0, 12) + '...'
            : title;
    },[title]);
  return (
    <ListItem disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
            <TurnedInNot />
            </ListItemIcon>
            <Grid container>
            <ListItemText primary={newTitle}/>
            <ListItemText secondary={body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
