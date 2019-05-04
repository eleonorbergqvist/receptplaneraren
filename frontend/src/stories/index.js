import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router'

//import { Button, Welcome } from '@storybook/react/demo';
import Footer from '../components/Footer/Footer'
import { HeaderLoggedIn, HeaderLoggedOut } from '../components/Header/Header'
import LoginForm from '../components/LoginForm/LoginForm'

/*storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);*/

//storiesOf('Button', module)
  //.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  //.add('with some emoji', () => (
    //<Button onClick={action('clicked')}>
      //<span role="img" aria-label="so cool">
        //😀 😎 👍 💯
      //</span>
    //</Button>
  /*));*/

storiesOf('Header', module)
  .add('logged in', () => <MemoryRouter><HeaderLoggedIn /></MemoryRouter>)
  .add('logged out', () => <MemoryRouter><HeaderLoggedOut /></MemoryRouter>)

storiesOf('Footer', module)
  .add('default', () => <MemoryRouter><Footer copyrightText="Copyright 2019" /></MemoryRouter>)

storiesOf('LoginForm', module)
  .add('default', () => <LoginForm onSubmit={action('on submit')} />)
