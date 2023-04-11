import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Logo(){
    return(
        <Typography 
        color={red[100]} 
        variant="h2"
        sx={{
            textShadow: '0 0 15px #FF0000'
        }
        }
        textAlign={'center'}
        marginTop={'50px'}
        >
        ( DARK-WEB 2.0 )
        </Typography>
    )
}