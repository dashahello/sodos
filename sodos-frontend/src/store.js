import { action, createStore, thunk } from 'easy-peasy';
import API_ROOT from './API_ROOT';

const store = createStore({
  // test: 123,
  // setTest: action((state, payload) => {
  //   state.test = payload;
  // })
  register: thunk((actions, { toSubmit, onError, onSuccess }) => {
    fetch(`${API_ROOT}/users/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(toSubmit),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
        } else {
          onSuccess('Account created, you can log in now');
        }
      });
  }),

  login: thunk((actions, { toSubmit, onError, onSuccess }) => {
    fetch(`${API_ROOT}/users/auth/login`, {
      method: 'POST',
      body: JSON.stringify(toSubmit),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
        } else {
          // actions.setCurrentUser(res);
          actions.fetchCurrentUser();
          onSuccess('Logged in :)');
        }
      });
  }),

  logout: thunk((actions, { onError, onSuccess }) => {
    fetch(`${API_ROOT}/users/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
        } else {
          // actions.setCurrentUser(res);
          actions.setCurrentUser(null);
          onSuccess('Logged out :)');
        }
      });
  }),

  currenUser: null,
  setCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  currentUserLoading: true,
  setCurrentUserLoading: action((state, payload) => {
    state.currentUserLoading = payload;
  }),
  fetchCurrentUser: thunk((actions) => {
    actions.setCurrentUserLoading(true);
    fetch(`${API_ROOT}/users/current`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          // onError(
          //   Array.isArray(res.message) ? res.message.join(' ') : res.message,
          // );

          console.log('err', res);
        } else {
          actions.setCurrentUser(res);
          console.log(res);
        }
      })
      .finally(() => {
        actions.setCurrentUserLoading(false);
      });
  }),

  fetchUserById: thunk((actions, { userId, onError, onSuccess }) => {
    fetch(`${API_ROOT}/users/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
          console.log('err', res);
        } else {
          onSuccess(res);
        }
      });
  }),

  fetchAllUsers: thunk((actions, { onError, onSuccess }) => {
    fetch(`${API_ROOT}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
          console.log('err', res);
        } else {
          onSuccess(res);
        }
      });
  }),

  fetchAllPermissionsByUserId: thunk(
    (actions, { userId, onError, onSuccess }) => {
      fetch(`${API_ROOT}/users/${userId}/permissions`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            onError(
              Array.isArray(res.message) ? res.message.join(' ') : res.message,
            );
            console.log('err', res);
          } else {
            onSuccess(res);
          }
        });
    },
  ),

  createPermission: thunk((actions, { visitorId, onSuccess, onError }) => {
    fetch(`${API_ROOT}/users/${visitorId}/permissions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
          console.log('err', res);
        } else {
          onSuccess(res);
        }
      });
  }),

  deletePermissionById: thunk(
    (actions, { visitorId, permissionId, onSuccess, onError }) => {
      fetch(`${API_ROOT}/users/${visitorId}/permissions/${permissionId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            onError(
              Array.isArray(res.message) ? res.message.join(' ') : res.message,
            );
            console.log('err', res);
          } else {
            onSuccess(res);
          }
        });
    },
  ),

  updateUserById: thunk((actions, { userId, toSubmit, onSuccess, onError }) => {
    fetch(`${API_ROOT}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(toSubmit),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          onError(
            Array.isArray(res.message) ? res.message.join(' ') : res.message,
          );
          console.log('err', res);
        } else {
          actions.fetchCurrentUser();
          onSuccess();
        }
      });
  }),
});

export default store;
