const { hash, compare } = require('bcrypt');

// hash('abcd', 8)
// .then(encrypted => console.log(encrypted))
// .catch(err => console.log(err.message));

compare('abcd', '$2a$08$TYBO6w5SxNyVjTZO8dho/.zouuzmvQ3dh2iEG/jqJTqreK29ZLX4m')
.then(same => console.log(same))
.catch(err => console.log(err.message));
