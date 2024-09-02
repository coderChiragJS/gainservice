import React, { useState, useRef, Fragment } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import { Layout, LayoutContent, LayoutFooter, LayoutContainer, LayoutColumns, LayoutColumn } from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import menuItems from './menuItem';
import SEO, { SEOProps } from 'components/SEO';
import { Link } from '@mui/material';

// Commenting out this function to disable dynamic theme change
// const getDefaultTheme = (): DefaultTheme['name'] => {
//   if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
//     return localStorage.getItem('theme') as DefaultTheme['name'];
//   } else {
//     const hours = new Date().getHours();
//     return hours > 6 && hours < 19 ? 'default' : 'dark';
//   }
// };

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
  // Set a static theme; do not use dynamic theme based on time or local storage
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject | null>(null);
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<MenuRefObject | null>(null);
  const [seeHeader, setSeeHeader] = useState(true);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  // Commenting out useEffect for dynamic theme setting
  // useEffect(() => {
  //   const localTheme = getDefaultTheme();
  //   if (localTheme !== theme && theme === 'default') {
  //     setTheme(localTheme);
  //   }
  // }, [theme]);

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  return (
    <Fragment>
      <SEO {...rest} />
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                theme={{ set: changeTheme, value: theme }}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
              {!authLayout && (
                <Sidebar
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  {seeHeader && (
                    <header>
                      <div
                        onClick={() => {
                          setMenuState((prevState) => !prevState);
                          menuRef.current?.toggle();
                        }}
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={
                            menuState
                              ? 'https://i.pinimg.com/originals/ac/0c/73/ac0c73d748ae70d2493de6fac113d98c.png'
                              : 'https://i.pinimg.com/originals/ac/0c/73/ac0c73d748ae70d2493de6fac113d98c.png'
                          }
                          alt="Toggle Menu"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </header>
                  )}
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menuItems || []} // Ensure menuItems is always an array
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">{children}</LayoutColumn>
                </LayoutColumns>
                {!authLayout && <LayoutFooter>Footer</LayoutFooter>}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutPage;
