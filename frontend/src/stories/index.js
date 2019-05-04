import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router'

import AddDayMealModal from '../components/AddDayMealModal/AddDayMealModal'
import { Card } from '../components/Card/Card'
import Footer from '../components/Footer/Footer'
import { HeaderLoggedIn, HeaderLoggedOut } from '../components/Header/Header'
import IngredientsInput from '../components/IngredientsInput/IngredientsInput'
import Input from '../components/Input/Input'
import InputList from '../components/InputList/InputList'
import LoginForm from '../components/LoginForm/LoginForm'
import Modal from '../components/Modal/Modal'
import PrimaryMenuButton from '../components/PrimaryMenuButton/PrimaryMenuButton'
import RecipeEditForm from '../components/RecipeEditForm/RecipeEditForm'
import RecipeForm from '../components/RecipeForm/RecipeForm'
import { RecipeTags } from '../components/RecipeTags/RecipeTags'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import Select from '../components/Select/Select'
import { TabNav } from '../components/Tabs/Tabs'

storiesOf('AddDayMealModal', module)
  .add('default', () => (
    <AddDayMealModal
      text="Copyright 2019"
      onClose={action('On close')}
      recipe={{
        id: 1,
      }}
    />
  ))

storiesOf('Card', module)
  .add('default', () => (
    <Card content="Copyright 2019" image="" alt="Hello"/>
  ))

storiesOf('Footer', module)
  .add('default', () => (
    <MemoryRouter><Footer copyrightText="Copyright 2019" /></MemoryRouter>
  ))

storiesOf('Header', module)
  .add('logged in', () => <MemoryRouter><HeaderLoggedIn /></MemoryRouter>)
  .add('logged out', () => <MemoryRouter><HeaderLoggedOut /></MemoryRouter>)

storiesOf('IngredientsInput', module)
  .add('default', () => (
    <IngredientsInput
      index="text"
      amount="class"
      measurenent="Your name"
      ingredient="Your name"
      onDelete={action('on delete')}
      onChange={action('on change')}
    />
  ))

storiesOf('Input', module)
  .add('default', () => (
    <Input
      type="text"
      className="class"
      placeholder="Your name"
      value="Bobby"
      onBlur={action('on blur')}
      onChange={action('on change')}
      error={"An error"}
    />
  ))

storiesOf('InputList', module)
  .add('default', () => (
    <InputList
      items={[
        {amount: 1, measurment: "ml", ingredient: "Salt"}
      ]}
      onChange={action('on change')}
    />
  ))

storiesOf('LoginForm', module)
  .add('default', () => (
    <LoginForm onSubmit={action('on submit')} />
  ))

storiesOf('Modal', module)
  .add('default', () => (
    <Modal
      text="Hello"
      onClose={action('on close')}
    />
  ))

storiesOf('PrimaryMenuButton', module)
  .add('default', () => (
    <MemoryRouter>
      <PrimaryMenuButton
        text="Hello"
        link="/"
        className="button"
      />
    </MemoryRouter>
  ))

storiesOf('RecipeEditForm', module)
  .add('default', () => (
    <RecipeEditForm
      recipe={{
        title: "My recipe",
        Instructions: "Cook for a while",
        ingredients: [
          {amount: 1, measurment: "ml", ingredient: "Sugar"}
        ]
      }}
      onSubmit={action('on submit')}
    />
  ))

storiesOf('RecipeForm', module)
  .add('default', () => (
    <RecipeForm
      onSubmit={action('on submit')}
    />
  ))

storiesOf('RecipeTags', module)
  .add('default', () => (
    <RecipeTags tags={[{id: 1, name: "My tag"}]} selectedTags={[]} />
  ))

storiesOf('RegisterForm', module)
  .add('default', () => (
    <RegisterForm
      onSubmit={action('on submit')}
    />
  ))

storiesOf('Select', module)
  .add('default', () => (
    <Select
      options={["value", "value2" ]}
    />
  ))
