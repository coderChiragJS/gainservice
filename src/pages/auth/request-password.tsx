import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import Auth from 'components/Auth';

export default function RequestPassword() {
  return (
    <Layout title="Forgot Password">
      <Auth title="Forgot Password" subTitle="Enter your email address and we’ll send a link to reset your password">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email Address" />
          </InputGroup>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Request Password
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
