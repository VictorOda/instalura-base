import React from 'react';
import { render, screen } from '../../../infra/tests/testUtils';
import user from '@testing-library/user-event';
import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Victor"
        onChange={() => {}}
        name="nome"
      />,
    );

    // screen.debug();

    const textField = screen.getByPlaceholderText(/nome/i);
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="Nome"
            value="Victor"
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );

        const inputNome = screen.getByPlaceholderText(/nome/i);
        user.type(inputNome, 'teste@gmail.com');

        screen.debug();

        expect(onChangeMock).toHaveBeenCalledTimes(15);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Email"
          value="teste@gmail.com"
          onChange={() => {}}
          name="email"
          isTouched
          error="O campo email é obrigatório"
        />,
      );

      const inputEmail = screen.getByPlaceholderText(/email/i);
      expect(screen.getByPlaceholderText(/email/i)).toHaveValue('teste@gmail.com');
      expect(screen.getByRole(/alert/i)).toHaveTextContent('O campo email é obrigatório');
      expect(inputEmail).toMatchSnapshot();
    });
  });
});
