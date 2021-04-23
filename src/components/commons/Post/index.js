/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { get } from 'lodash';
import { Box } from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { userService } from '../../../services/user/userService';
import { Button } from '../Button';

const PostWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => get(props.theme, `colors.posts.${props.theme.mode}.color`)};

  ${breakpointsMedia({
    xs: css`
      margin-bottom: 16px;
    `,
    md: css`
      margin-bottom: 48px;
    `,
  })}
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  height: 48px;
  margin-right: 16px;
`;

const PostPhoto = styled.img`
  width: 100%;
`;

const PostFigure = styled.figure`
  width: 100%;
  z-index: 0;
  margin: 0;
  padding: 0;
`;

export default function Post({
  username, userPhoto, userId, photoUrl, description, id, likes, filter
}) {
  const [numLikes, setNumLikes] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    likes.forEach((like) => {
      if (like.user === userId) {
        setIsLiked(true);
      }
    });
  }, []);

  function handleLike() {
    userService.likePost(id)
      .then((response) => {
        console.log(response);
        if (isLiked) {
          setNumLikes(numLikes - 1);
        } else {
          setNumLikes(numLikes + 1);
        }
        setIsLiked(!isLiked);
      })
      .catch(() => {
        setNumLikes(numLikes - 1);
        setIsLiked(false);
        // console.error(error);
      });
  }

  return (
    <PostWrapper>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        padding="8px 32px"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
        >
          <ProfilePhoto src={userPhoto} />
          <Text
            variant="subTitle"
            tag="h3"
            color="icons"
          >
            {username}
          </Text>
        </Box>
        <img src="/icons/more.svg" alt="More Icon" />
      </Box>
      {/* Photo */}
      <PostFigure className={filter}>
        <PostPhoto loading="lazy" src={photoUrl} alt="Post" />
      </PostFigure>
      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="space-between"
        padding="16px 32px"
        alignItems="center"
      >
        {/* Main */}
        <Box
          display="flex"
          alignItems="center"
        >
          <Box
            marginRight="16px"
            display="flex"
            alignItems="center"
          >
            <Button
              ghost
              padding="0"
              onClick={() => handleLike()}
            >
              <img src={isLiked ? '/icons/heartFilled.svg' : '/icons/heart.svg'} alt="Heart Icon" />
            </Button>
            <Text
              variant="subTitle"
              tag="span"
              color="icons"
              marginLeft="4px"
            >
              {numLikes}
            </Text>
          </Box>
          <Box
            marginRight="16px"
            display="flex"
            alignItems="center"
          >
            <img src="/icons/message.svg" alt="Message Icon" />
            <Text
              variant="subTitle"
              tag="span"
              color="icons"
              marginLeft="4px"
            >
              1.2k
            </Text>
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <img src="/icons/send.svg" alt="Send Icon" />
          </Box>
        </Box>
        {/* Bookmark */}
        <img src="/icons/bookmark.svg" alt="Bookmark Icon" />
      </Box>
      {/* Comments */}
      <Text
        variant="paragraph1"
        tag="p"
        color="icons"
        padding="8px 32px"
      >
        {description}
      </Text>
    </PostWrapper>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  userPhoto: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
