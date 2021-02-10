import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
    <>
        <h1>Hello world</h1>
        <GlobalStyle />
        <SignIn />
        {/* <SignUp /> */}
    </>
);

export default App;
