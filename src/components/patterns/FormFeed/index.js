import { Lottie } from '@crello/react-lottie';
import React, { useState } from 'react';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import successAnim from '../../../lotties/success-alert.json';
import errorAnim from '../../../lotties/error-alert.json';

const formStates = {
  DEFAULT: 'DEFAULT',
  FILTER: 'FILTER',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

// eslint-disable-next-line no-unused-vars
function FormContent({ onClose }) {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);
  const [postInfo, setPostInfo] = useState({
    url: '',
    filter: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setPostInfo({
      ...postInfo,
      [fieldName]: event.target.value,
    });
    console.log('postInfo', postInfo);
  }

  const isFormInvalid = postInfo.url.length === 0;

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      setFormSubmitted(true);

      // Data Transfer Object
      const postDTO = {
        url: postInfo.url,
        filter: postInfo.filter,
      };

      fetch('https://instalura-api.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postDTO),
      })
        .then((respostaDoServidor) => {
          if (respostaDoServidor.ok) {
            return respostaDoServidor.json();
          }
          throw new Error('Não foi possível criar o post agora =/');
        })
        .then((respostaConvertidaEmObjeto) => {
          setSubmissionStatus(formStates.DONE);
          console.log(respostaConvertidaEmObjeto);
        })
        .catch((error) => {
          setSubmissionStatus(formStates.ERROR);
          console.error(error);
        })
        .finally(() => {
          console.log('finally');
        });
    }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button ghost variant="secondary" padding="0 8px" onClick={onClose}>
          <img src="/icons/close.svg" alt="Plus Icon" />
        </Button>
      </Box>
      <Box
        width="100%"
        height="350px"
        backgroundColor="#F2F2F2"
      />
      {!isFormInvalid && (
        <img src={postInfo.url} alt="Post" />
      )}
      <TextField
        placeholder="URL"
        name="url"
        value={postInfo.url}
        onChange={handleChange}
      />
      <Button
        variant="primary"
        fullWidth
        type="submit"
        disabled={isFormInvalid}
      >
        Avançar
      </Button>

    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormFeed({ propsDoModal, onClose }) {
  return (
    <Grid.Row
      flex={1}
      alignItems="center"
      justifyContent="center"
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
          padding={0}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent onClose={onClose} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
