import {Card as MuiCard} from "@mui/material";
import type {CardProps as MuiCardProps} from "@mui/material";


export type CardProps = MuiCardProps;


const Card = (props: CardProps) => {
    return (
        <MuiCard {...props}/>
    )
}

export default Card;