import { styled } from '@mui/material/styles'


const StyledGrid = styled('div')`
  display: grid;
  width: 100%;
  grid-gap: 16px;
  ${({ theme }) => theme.breakpoints.up('md')} {
    grid-auto-flow: column;
    justify-content: start;
  }
`

export default StyledGrid;
