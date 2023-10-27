import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const TrueFalseCheck = (
    {
        label,
        isTrue,
        falseMessage,
        trueMessage
    }: { label?: string | undefined, isTrue?: boolean | undefined, falseMessage?: string, trueMessage?: string }) => {
    if (isTrue) return <Tooltip title={trueMessage ?? ''}><Chip label={label} color={'success'}
                                                                icon={<CheckCircleOutlinedIcon/>}/></Tooltip>
    return <Tooltip title={falseMessage ?? ''}><Chip label={label} color={'default'}
                                                     icon={<DoNotDisturbOnOutlinedIcon/>}/></Tooltip>
}

export default TrueFalseCheck