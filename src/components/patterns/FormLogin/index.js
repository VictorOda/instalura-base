import React from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/form/useForm';
import { loginService } from '../../../services/login/loginService';

const loginSchema = yup.object().shape({
  usuario: yup
    .string()
    .required('"Usuário" é obrigatório')
    .min(3, 'Preencha ao menos 3 caracteres'),
  senha: yup
    .string()
    .required('"Senha" é obrigatória')
    .min(8, 'Você precisa fornecer pelo menos 8 caracteres'),
});

// eslint-disable-next-line react/prop-types
export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const initialValues = {
    usuario: '',
    senha: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      })
        .then(() => {
          router.push('/app/profile');
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          form.setIsFormDisabled(false);
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <form id="formCadastro" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="usuario"
        onChange={form.handleChange}
        value={form.values.usuario}
        error={form.errors.usuario}
        isTouched={form.touched.usuario}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        onChange={form.handleChange}
        value={form.values.senha}
        error={form.errors.senha}
        isTouched={form.touched.senha}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        disabled={form.isFormDisabled}
        fullWidth
      >
        Entrar
      </Button>
    </form>
  );
}
