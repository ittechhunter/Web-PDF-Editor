import {styled} from '@mui/material/styles';
import {Tooltip} from "@mui/material";
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return (
        <Tooltip title='Expand' placement="top">
            <IconButton {...other}>
                <ExpandMoreIcon/>
            </IconButton>
        </Tooltip>
    );
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default ExpandMore;
