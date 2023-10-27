import {styled} from "@mui/material/styles";

const StyledWrapper = styled('div')`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 8px;
  //height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({theme}) => theme.breakpoints.up('md')} {
    padding-inline: 8px;
  }

  ${({theme}) => theme.breakpoints.down('md')} {
    padding-inline: 4px;
  }
`

export default StyledWrapper;