import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Container,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
    {
        name: 'Дашбоард',
        page: '/',
    },
    {
        name: 'История покупок',
        page: '/buys',
    },
    {
        name: 'История продаж',
        page: '/sales',
    },
];

const Navbar = ({
    isAuth,
    
    signout,
}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    
    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <>
                        <NavLink to="/" exact>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}>
                                CSM market
                            </Typography>
                        </NavLink>
                        {
                            isAuth
                                ? (
                                    <>
                                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                            <IconButton
                                                size="large"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={handleOpenNavMenu}
                                                color="inherit"
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorElNav}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                open={Boolean(anchorElNav)}
                                                onClose={handleCloseNavMenu}
                                                sx={{
                                                    display: {xs: 'block', md: 'none'},
                                                }}>
                                                {pages.map(({name, page}) => (
                                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                        <NavLink to={page} exact>
                                                            <Typography textAlign="center">
                                                                {name}
                                                            </Typography>
                                                        </NavLink>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                        
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                            CSM market
                                        </Typography>
                                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                            {pages.map(({name, page}) => (
                                                <NavLink key={page} to={page} exact>
                                                    <Button
                                                        onClick={handleCloseNavMenu}
                                                        sx={{my: 2, color: 'white', display: 'block'}}>
                                                        {name}
                                                    </Button>
                                                </NavLink>
                                            ))}
                                        </Box>
                                        
                                        <Button
                                            color="inherit"
                                            onClick={signout}>
                                            Выйти
                                        </Button>
                                    </>
                                )
                                : null
                        }
                    </>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
