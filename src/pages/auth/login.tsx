import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';

export default function Login() {
  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email Address" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Password" />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
        <Socials />
        <p>Don&apos;t have account? </p>
      </Auth>
    </Layout>
  );
}
