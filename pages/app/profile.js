/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import websiteProfilePageHOC from '../../src/components/wrappers/WebsiteProfilePage/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import { breakpointsMedia } from '../../src/theme/utils/breakpointsMedia';

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

const Post = styled.img`
  width: 100%;
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
        <ProfileIcon src={posts[0].photoUrl} alt="Profile Icon" />
        <ProfileInfo>
          <div>234</div>
          <div>Publicações</div>
        </ProfileInfo>
        <ProfileInfo>
          <div>22k</div>
          <div>Seguindo</div>
        </ProfileInfo>
        <ProfileInfo>
          <div>134k</div>
          <div>Seguidores</div>
        </ProfileInfo>
        <ProfileInfo>
          <div>Nicolas Cage</div>
          <div>A whosome person responsible for the best movies ever.</div>
        </ProfileInfo>
      </InfoContainer>
      <GridContainer>
        {posts.map((post) => (
          <Post src={post.photoUrl} key={post._id} alt={post.description} />
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
  posts: [],
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
        posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
