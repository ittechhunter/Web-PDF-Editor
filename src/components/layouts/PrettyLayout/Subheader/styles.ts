import {styled} from "@mui/material/styles";

export const StyledContainer = styled('div')`
   display: grid;
  padding: 8px;
   ${({ theme }) => theme.breakpoints.up('xs')} {
      grid-auto-flow: row;
      width: 100%;
   }
   ${({ theme }) => theme.breakpoints.up('md')} {
      grid-auto-flow: column;
      justify-content: space-between;
      align-items: center;
   }
`

export const StyledDate = styled('div')`
  display: grid;
  ${({ theme }) => theme.breakpoints.up('md')} {
    & > p {
      margin-top: -3px;
    }
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    grid-column-gap: 4px;

    & > p {
      padding-left: 4px;
    }
  }
`