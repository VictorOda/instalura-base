/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LazyLoad from 'react-lazyload';
import websiteProfilePageHOC from '../../src/components/wrappers/WebsiteProfilePage/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import { breakpointsMedia } from '../../src/theme/utils/breakpointsMedia';
import Text from '../../src/components/foundation/Text';

const ProfileContainer = styled.div`
  width: 90%;
  max-width: 992px;
  margin-left: auto;
  margin-right: auto;
 
  ${breakpointsMedia({
    xs: css`
      padding: 0 0 64px 0;
    `,
    md: css`
      padding: 96px 0 64px 0;
    `,
  })}
`;

const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  ${breakpointsMedia({
    xs: css`
     grid-gap: 8px;
    `,
    md: css`
      grid-gap: 24px;
    `,
  })}
`;

const PostContainer = styled.div`
  ${breakpointsMedia({
    xs: css`
      width: 100px;
      height: 100px;
    `,
    md: css`
      width: 200px;
      height: 200px;
    `,
    lg: css`
      width: 300px;
      height: 300px;
    `,
  })}
`;

const Post = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 36px 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  ${breakpointsMedia({
    xs: css`
     width: 100%;
    `,
    md: css`
      width: 80%;
    `,
  })}
`;

const ProfileIcon = styled.img`
  border-radius: 50%;
  ${breakpointsMedia({
    xs: css`
     height: 128px;
    `,
    md: css`
      height: 196px;
    `,
    lg: css`
      height: 248px;
    `,
  })}
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
`;

function ProfilePage({ user, posts }) {
  return (
    <ProfileContainer>
      <InfoContainer>
        <ProfileIcon src={posts[posts.length - 1].photoUrl} alt="Profile Icon" />
        <ProfileInfo>
          <Text
            variant="subTitle"
            tag="span"
            color="tertiaryMain"
          >
            234
          </Text>
          <Text
            variant="paragraph1"
            tag="span"
            color="tertiaryLight"
          >
            Publicações
          </Text>
        </ProfileInfo>
        <ProfileInfo>
          <Text
            variant="subTitle"
            tag="span"
            color="tertiaryMain"
          >
            22k
          </Text>
          <Text
            variant="paragraph1"
            tag="span"
            color="tertiaryLight"
          >
            Seguindo
          </Text>
        </ProfileInfo>
        <ProfileInfo>
          <Text
            variant="subTitle"
            tag="span"
            color="tertiaryMain"
          >
            134k
          </Text>
          <Text
            variant="paragraph1"
            tag="span"
            color="tertiaryLight"
          >
            Seguidores
          </Text>
        </ProfileInfo>
        <ProfileInfo>
          <Text
            variant="subTitle"
            tag="span"
            color="tertiaryMain"
          >
            {user.username}
          </Text>
          <Text
            variant="paragraph1"
            tag="span"
            color="tertiaryLight"
          >
            A wholesome person responsible for the best movies ever.
          </Text>
        </ProfileInfo>
      </InfoContainer>
      <GridContainer>
        {posts.map((post) => (
          <LazyLoad height={320} offset={100} key={post._id}>
            <PostContainer>
              <Post src={post.photoUrl} alt={post.description} />
            </PostContainer>
          </LazyLoad>
        ))}
      </GridContainer>
    </ProfileContainer>
  );
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
};

ProfilePage.defaultProps = {
  user: {},
  posts: [
    {
      _id: '',
      photoUrl: '',
      description: '',
    },
  ],
};

export default websiteProfilePageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Profile' },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
        },
        posts: profilePage.posts.reverse(),
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
