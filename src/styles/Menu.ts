import styled from "styled-components";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

export const HtmlWrapper = styled(Box)`
    height:100vh;
    background-color: #E6E6FA;
`
export const Text = styled.div`
    font-size: 30px;
`
export const LoginBox = styled(Box)`
    background-color: #E6E6FA;
`
export const MenuButton = styled(Button)`
    background-color: #4B0082 !important;
    border-bottom: 2px solid #E6E6FA !important;
    color: #E6E6FA !important;
    border-radius: 0px !important;
`
export const MenuItemButton = styled(Button)`
    background-color: transparent !important;
    border: 2px solid #4B0082 !important;
    color: #4B0082 !important;
    border-radius: 0px !important;
`
interface StyledMenuProps {
    index: number;
}

export const StyledMenu = styled(Menu) <StyledMenuProps>`
  .MuiPaper-root {
    width: 350px;
  }
  ${({ index }) => index === 0 && `
    .MuiPaper-root {
      left: 0 !important;
    }
  `}
`;