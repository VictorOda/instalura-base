import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { get } from 'lodash';
import { Box } from '../../foundation/layout/Box';
import Text from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';

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

export default function Post({ username, userPhoto, photoUrl }) {
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
      <PostPhoto src={photoUrl} alt="Post" />
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
            <img src="/icons/heart.svg" alt="Heart Icon" />
            <Text
              variant="subTitle"
              tag="span"
              color="icons"
              marginLeft="4px"
            >
              5.2k
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
      {/* TODO */}
    </PostWrapper>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  userPhoto: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
};
