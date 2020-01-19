import styled from 'styled-components';

const SubNavigation = styled.div`
  display: flex;

  a {
    padding: ${p => `${p.theme.spacing.small} ${p.theme.spacing.normal}`};
    background-color: ${p => p.theme.colors.accent};
    color: #fff;
    margin-right: ${p => p.theme.spacing.normal};
  }
`;

export default SubNavigation;
