import { Lottie } from '@crello/react-lottie';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import successAnim from '../../../lotties/success-alert.json';
import errorAnim from '../../../lotties/error-alert.json';
import FilterCarousel from '../../commons/Carousel';

const formStates = {
  DEFAULT: 'DEFAULT',
  FILTER: 'FILTER',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

// eslint-disable-next-line react/prop-types
function FormContent({ onClose }) {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);
  const [postImage, setPostImage] = useState('');
  const [postInfo, setPostInfo] = useState({
    url: '',
    filter: '',
  });
  const [filterOption, setFilterOption] = useState(0);
  const filters = ['normal', 'inkwell', 'kelvin', 'maven', 'xpro-ii'];

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setPostInfo({
      ...postInfo,
      [fieldName]: event.target.value,
    });
    console.log('postInfo', postInfo);
  }

  function loadImage() {
    setPostImage(postInfo.url);
    setSubmissionStatus(formStates.FILTER);
  }

  const isFormInvalid = postInfo.url.length === 0;

  return (
    <FormWrapper onSubmit={(event) => {
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
        borderRadius="12px"
      >
        <Button ghost variant="secondary" padding="8px 8px" onClick={onClose}>
          <img className="filter-1877" src="/icons/close.svg" alt="Plus Icon" />
        </Button>
      </Box>
      {postImage.length === 0 ? (
        <Box
          width="100%"
          height="350px"
          backgroundColor="#F2F2F2"
        />
      ) : (
        <figure className={`filter-${filters[filterOption]}`}>
          <PostImage src={postImage} alt="Post" />
        </figure>
      )}

      {submissionStatus === formStates.DEFAULT ? (
        <>
          <Box
            display="flex"
            padding="16px"
            position="relative"
          >
            <TextField
              placeholder="URL"
              name="url"
              value={postInfo.url}
              onChange={handleChange}
              width="100%"
              padding="12px 90px 12px 16px"
            />
            <Button
              variant="primary"
              disabled={isFormInvalid}
              onClick={loadImage}
              height="46px"
              margin="0 0 0 8px"
              position="absolute"
              right="16px"
              borderRadius="0 12px 12px 0"
            >
              <img src="/icons/arrow.svg" alt="Arrow Icon" />
            </Button>
          </Box>
          <Box
            display="flex"
            padding="16px"
            borderRadius="12px"
          >
            <Button
              variant="primary"
              type="submit"
              disabled={isFormInvalid}
              width="100%"
            >
              Avançar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            padding="0"
            width={{
              xs: '100vw',
              md: '500px',
            }}
          >
            <FilterCarousel
              imageUrl={postImage}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </Box>
          <Box
            display="flex"
            padding="16px"
            borderRadius="12px"
          >
            <Button
              variant="primary"
              type="submit"
              disabled={isFormInvalid}
              width="100%"
            >
              Postar
            </Button>
          </Box>
        </>
      )}
    </FormWrapper>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormFeed({ propsDoModal, onClose }) {
  return (
    <Grid.Row
      flex={1}
      alignItems="center"
      justifyContent="center"
      marginLeft={{ xs: '0' }}
      marginRight={{ xs: '0' }}
    >
      <Grid.Col
        display="flex"
        paddingLeft={{ xs: '0' }}
        paddingRight={{ xs: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          flex={1}
          padding={0}
          backgroundColor="white"
          height={{
            xs: '100vh',
            md: 'auto',
          }}
          minWidth={{
            xs: '100vw',
            md: '500px',
          }}
          maxWidth={{
            xs: '100vw',
            md: '500px',
          }}
          borderRadius={{
            xs: '0',
            md: '12px',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent onClose={onClose} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
