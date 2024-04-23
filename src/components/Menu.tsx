import React, { useState } from "react";
import Box from '@mui/material/Box';
import { HtmlWrapper, StyledMenu, MenuItemButton, MenuButton } from "../styles/Menu";
import MenuItem from '@mui/material/MenuItem';
import { menuData } from '../mockData/mockMenuData';
import { Link } from "react-router-dom";
import axios from "axios";

function MenuComponenet() {
    const [anchorEls, setAnchorEls] = useState<(HTMLElement | null)[]>([null, null]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    const handleClose = () => {
        setAnchorEls([null, null]);
    };

    const handleLogout = () => {
        axios.post("http://localhost:3001/api/logout")
            .then(response => {
                localStorage.removeItem("token");
                console.log(response.data.message);
                window.location.href = "/login";
            })
            .catch(error => {
                console.error("Ошибка при разлогинивании:", error);
            });
    };

    return (
        <HtmlWrapper
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{ width: '100%' }}
        >
            <Link to="/main" style={{ width: '100%' }}>
                <MenuButton fullWidth>надпись</MenuButton>
            </Link>
            <Box
                display="flex"
                justifyContent='space-between'
                sx={{ width: '100%' }}
            >
                <Box display="flex">
                    {menuData.map((menuItem, index) => (
                        <Box key={index}>
                            <MenuItemButton
                                aria-controls={`simple-menu-${index}`}
                                aria-haspopup="true"
                                onClick={(e) => handleClick(e, index)}
                                sx={{ borderRadius: '0px' }}
                                variant="contained"
                            >
                                {menuItem.name}
                            </MenuItemButton>
                            <StyledMenu
                                anchorEl={anchorEls[index]}
                                id={`simple-menu-${index}`}
                                index={index}
                                onClose={handleClose}
                                open={Boolean(anchorEls[index])}
                            >
                                {menuItem.items.map((item, itemIndex) => (
                                    <MenuItem key={itemIndex} onClick={handleClose}>{item.label}</MenuItem>
                                ))}
                            </StyledMenu>
                        </Box>
                    ))}
                </Box>
                <Box>
                    <MenuItemButton
                        sx={{ borderRadius: '0px' }}
                        variant="contained"
                    >сменить коммитет</MenuItemButton>
                    <MenuItemButton
                        onClick={handleLogout}
                        sx={{ borderRadius: '0px' }}
                        variant="contained"
                    >выход</MenuItemButton>
                </Box>
            </Box>
        </HtmlWrapper>
    );
}

export default MenuComponenet;
