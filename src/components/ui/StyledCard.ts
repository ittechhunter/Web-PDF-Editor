import {styled} from '@mui/material/styles'
import {Card} from '@mui/material'


const StyledCard = styled(Card)`
  width: 100%;
   

  ${({theme}) => theme.breakpoints.up('md')} {
    padding: 26px 18px;
  }

  ${({theme}) => theme.breakpoints.down('md')} {
    padding: 26px 12px;
  }
`

export default StyledCard;