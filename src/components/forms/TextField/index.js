import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Text from '../../foundation/Text';
import { propToStyle } from '../../../theme/utils/propToStyle';

const InputWrapper = styled.div`
  margin-bottom: 17px;
  ${propToStyle('width')}
  ${propToStyle('padding')}
`;

const Input = styled(Text)`
  width: 100%;
  border: 1px solid ${({ theme }) => get(theme, `colors.tertiaryLight.${theme.mode}.contrastText`)};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;

  ${({ theme, isFieldInvalid }) => isFieldInvalid && css`
    border-color: ${get(theme, `colors.error.${theme.mode}.color`)};
    & + span {
      color: ${get(theme, `colors.error.${theme.mode}.color`)};
      font-size: 11px;
    }
  `}

  ${propToStyle('padding')}
`;

Input.defaultProps = {
  tag: 'input',
  variant: 'paragraph1',
};

export default function TextField({
  placeholder,
  name,
  onChange,
  value,
  error,
  isTouched,
  padding,
  ...props
}) {
  const hasError = Boolean(error);
  const isFieldInvalid = hasError && isTouched;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <InputWrapper {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        isFieldInvalid={isFieldInvalid}
        padding={padding}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {isFieldInvalid
      && (
      <Text
        variant="smallestException"
        color="error"
        role="alert"
      >
        {error}
      </Text>
      )}
    </InputWrapper>
  );
}

TextField.defaultProps = {
  error: '',
  isTouched: false,
  padding: '12px 16px',
};

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  padding: PropTypes.string,
  error: PropTypes.string,
  isTouched: PropTypes.bool,
};
