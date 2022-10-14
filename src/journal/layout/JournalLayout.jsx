import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";

// menu lateral en px
const drawerWidth = 240;
export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}} 
    className='animate__animated animate__fadeIn animate__faster'>
        {/* nav drawerWidth */}
        <NavBar draerWidth={drawerWidth}/>
        {/* sidebar drawerWidth*/}
        <SideBar drawerWidth={drawerWidth}/>
        <Box 
            component='main'
            sx={{flexGrow:1, p: 3}}
        >
                {/* toolbar */}
        <Toolbar />
            {children}


        </Box>

    </Box>
  )
}
