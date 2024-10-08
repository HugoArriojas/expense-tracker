import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/Button';
import { authUrl, isAuthenticated } from '~/services/auth.server';

export const loader = async ({ request }: LoaderArgs) => {
  const authenticated = await isAuthenticated(request);

  return { authenticated };
};

export const action = async () => {
  return redirect(authUrl);
};

const Index = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className='grid h-screen place-items-center'>
      <article className='prose flex flex-col items-center'>
        <h1 className='text-slate-100 mb-3'>Expense Tracker</h1>
        {data.authenticated ? (
          <Link to='/app/form'>
            <Button>Enter App</Button>
          </Link>
        ) : (
          <Form method='post'>
            <Button>Sign In with Google</Button>
          </Form>
        )}
      </article>
    </div>
  );
};

export default Index;
