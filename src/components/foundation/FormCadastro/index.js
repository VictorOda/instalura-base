import React, { useState } from 'react';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../layout/Box';
import { Grid } from '../layout/Grid';
import Text from '../Text';

function FormContent() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    usuario: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
    console.log('userInfo', userInfo);
  }

  const isFormInvalid = userInfo.email.length === 0 || userInfo.usuario.length === 0;

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      console.log('formulário pronto para envio');
    }}
    >
      <Text
        variant="title"
        tag="h1"
        color="tertiaryMain"
      >
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiaryLight"
        marginBottom="32px"
      >
        Você está a um passo de saber tudo o que está
        rolando no bairro, complete seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          onChange={handleChange}
        />
      </div>
      <Button
        variant="primary"
        fullWidth
        type="submit"
        disabled={isFormInvalid}
      >
        Cadastrar
      </Button>
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ propsDoModal }) {
  return (
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
