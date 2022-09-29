import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home';
import Preferences from './components/Preferences';
import Dashboard from './components/Dashboard';
import useToken from './components/App/useToken';
import { Container } from '@mui/material';

// import { createTheme, ThemeProvider } from '@mui/material';

// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       defaultProps: {

//       }
//     }
//   }
// })


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <Container maxWidth={false} sx={{backgroundImage: "url('background-image.jpg')", backgroundSize: "cover", width: '100vw', height: '100vh', padding: '0', margin: '0'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={ <Login setToken={ setToken } /> } />
          </Routes>
        </BrowserRouter>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/preferences" element={<Preferences/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
