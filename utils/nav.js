export default [
  {
    pathname: '/learning-mode',
    text: 'Learning mode',
  },
  {
    pathname: '/text-mode',
    text: 'Text mode',
  },
  {
    pathname: '/settings',
    text: 'Settings',
  },
  {
    personal: true,
    pathname: '/profile',
    text: 'My profile',
  },
  {
    personal: true,
    pathname: '/sign-out',
    state: { modal: true },
    text: 'Sign out',
  },
];
