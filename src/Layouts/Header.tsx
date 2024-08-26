import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { LayoutHeader } from '@paljs/ui/Layout';
import { Actions } from '@paljs/ui/Actions';
import User from '@paljs/ui/User';
import { breakpointDown } from '@paljs/ui/breakpoints';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;




interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  
  return (
  
      <LayoutHeader fixed>
        <HeaderStyle>
          <Actions
            size="Medium"
            actions={[
              {
                icon: { name: 'menu-2-outline' },
                url: {
                  onClick: props.toggleSidebar,
                },
              },
              {
                content: <a className="logo">Admin Template</a>,
              },
              {},
              {},
            ]}
          />
          {/* <div className="right">
            {/* Use the SelectStyled component here */}
            {/* <SelectStyled options={themeOptions()} onChange={(e:any) => props.theme.set(e.value)} /> */}
          {/* </div>  */}
        </HeaderStyle>
    
        <User image="url('/icons/icon-72x72.png')" name="chirag tankwal" size="Medium" />
      </LayoutHeader>
    );
    
};
export default Header;
