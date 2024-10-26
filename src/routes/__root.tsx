import {
  Box,
  CssBaseline,
  Tabs,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import {
  Outlet,
  createRootRoute,
  linkOptions,
  useMatchRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { TabLink } from '../components/TabLink'

export const Route = createRootRoute({
  component: RootComponent,
})

const theme = createTheme({ colorSchemes: { dark: true } })

function RootComponent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ padding: '1em' }}>
        <NavTabs />
      </Box>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </ThemeProvider>
  )
}

function NavTabs() {
  const matchRoute = useMatchRoute()
  const links = [linkOptions({ to: '/', label: 'Home' })]
  const currentTab = links.find(({ to }) => matchRoute({ to }))?.to
  return (
    <Tabs value={currentTab}>
      {links.map(({ to, label }) => (
        <TabLink key={to} value={to} to={to} label={label} />
      ))}
    </Tabs>
  )
}
