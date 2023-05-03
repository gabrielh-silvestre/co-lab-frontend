export const INVALID_AUTH_RESPONSES = [
  { data: { user: {}, session: {} }, error: new Error('Error') },
  { data: { user: null, session: {} }, error: null },
  { data: { user: {}, session: null }, error: null }
];
