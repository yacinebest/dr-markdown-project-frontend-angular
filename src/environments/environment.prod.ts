export const environment = {
  production: true,

  ENDPOINTS: {
    USER_CREATION: 'http://localhost:8080/user/create',
    USER_LOGIN: 'http://localhost:8080/user/login',
    USER_INFO: 'http://localhost:8080/user/info',

    DOC_CREATION: 'http://localhost:9999/doc/create',
    DOC_UPDATE: 'http://localhost:9999/doc/update',
    DOC_DELETE: 'http://localhost:9999/doc/delete',
    DOC_RECENT: 'http://localhost:9999/doc/recent',
    DOC_FOR_USER: 'http://localhost:9999/doc/all',
    DOC_FETCH: 'http://localhost:9999/doc/fetch'
  }
};