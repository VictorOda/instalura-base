/* eslint-disable no-nested-ternary */
import { Lottie } from '@crello/react-lottie';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import successAnim from '../../../lotties/success-alert.json';
import errorAnim from '../../../lotties/error-alert.json';
import FilterCarousel from '../../commons/Carousel';
import { userService } from '../../../services/user/userService';

const formStates = {
  DEFAULT: 'DEFAULT',
  FILTER: 'FILTER',
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
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);
  const [postImage, setPostImage] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [filterOption, setFilterOption] = useState(0);
  const [description, setDescription] = useState('');
  const filters = ['normal', 'inkwell', 'kelvin', 'maven', 'xpro-ii'];

  function handleChange(event) {
    setPostUrl(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function loadImage() {
    setPostImage(postUrl);
  }

  function chooseFilter() {
    console.log('CHOOSE FILTER');
    setSubmissionStatus(formStates.FILTER);
  }

  function resetForm() {
    setSubmissionStatus(formStates.DEFAULT);
    setPostImage('');
    setPostUrl('');
    setFilterOption(0);
  }

  function postOnClose() {
    resetForm();
    onClose();
  }

  function submitPost() {
    console.log('SENDING POST');
    // Data Transfer Object
    const postDTO = {
      photoUrl: postUrl,
      description,
      filter: `filter-${filters[filterOption]}`,
    };

    userService.createPost(postDTO.description, postDTO.photoUrl, postDTO.filter)
      .then((response) => {
        setSubmissionStatus(formStates.DONE);
        console.log(response);
      })
      .catch((error) => {
        setSubmissionStatus(formStates.ERROR);
        console.error(error);
      });
  }

  const isFormInvalid = postUrl.length === 0;
  const isImageNotLoaded = postImage.length === 0;

  return (
    <FormWrapper>
      <Box
        display="flex"
        justifyContent="flex-end"
        borderRadius="12px"
      >
        <Button ghost variant="secondary" padding="8px 8px" onClick={postOnClose}>
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
              value={postUrl}
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
              type="button"
            >
              <img src="/icons/arrow.svg" alt="Arrow Icon" />
            </Button>
          </Box>
          <Box
            display="flex"
            padding="16px"
            position="relative"
          >
            <TextField
              placeholder="Descrição"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              width="100%"
              padding="12px 90px 12px 16px"
            />
          </Box>
          <Box
            display="flex"
            padding="16px"
            borderRadius="12px"
          >
            <Button
              variant="primary"
              disabled={isImageNotLoaded}
              width="100%"
              onClick={() => chooseFilter()}
              type="button"
            >
              Avançar
            </Button>
          </Box>
        </>
      ) : submissionStatus === formStates.FILTER ? (
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
              type="button"
              width="100%"
              onClick={submitPost}
            >
              Postar
            </Button>
          </Box>
        </>
      ) : submissionStatus === formStates.DONE ? (
        <Box
          display="flex"
          justifyContent="center"
          borderRadius="12px"
        >
          <Lottie
            width="150px"
            height="150px"
            className="lottie-container basic"
            config={{ animationData: successAnim, loop: false, autoplay: true }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          borderRadius="12px"
        >
          <Lottie
            width="150px"
            height="150px"
            className="lottie-container basic"
            config={{ animationData: errorAnim, loop: false, autoplay: true }}
          />
        </Box>
      )}
    </FormWrapper>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormFeed({ propsDoModal, onClose, context }) {
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
          <FormContent onClose={onClose} context={context} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      context: ctx,
    },
  };
}
