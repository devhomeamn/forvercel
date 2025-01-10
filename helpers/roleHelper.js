exports.getUserRole = (user) => {
    return user.role || 'viewer';
  };
  