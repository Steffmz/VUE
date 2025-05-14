const users = JSON.parse(localStorage.getItem('users')) || [];

export const registerUser = (username, password) => {
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    throw new Error('El usuario ya existe.');
  }
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
};

export const loginUser = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('Usuario o contraseña incorrectos.');
  }
  return user;
};