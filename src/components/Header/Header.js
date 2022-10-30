import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import { useNavigate, useLocation } from 'react-router-dom'
import classes from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { contactsActions } from '../../store/contacts-slice'
const Header = () => {
  const isLoggedIn = useSelector((state) => state.contacts.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname

  const toRegisterPage = () => {
    navigate('/register')
  }

  const toLoginPage = () => {
    navigate('/login')
  }

  const logoutHandler = () => {
    localStorage.removeItem('JWT')
    dispatch(contactsActions.logout())
    navigate('/login')
  }

  return (
    <AppBar position="relative" className={classes.cont}>
      <Toolbar>
        <PhoneAndroidIcon className={classes.icon} />
        <Typography variant="h6">PhoneBook</Typography>
        {!isLoggedIn && pathname === '/login' && (
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonRegister}
            onClick={toRegisterPage}
          >
            register
          </Button>
        )}
        {!isLoggedIn && pathname === '/register' && (
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLogin}
            onClick={toLoginPage}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLogin}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
