const { admin, clientAuth } = require('../firebase/firebase');
const { signInWithEmailAndPassword } = require('firebase/auth');

// Register User using Firebase Admin
const registerUser = async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: 'Email, password, and name are required fields',
    });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Automatically add user profile to Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name: name,
      email: userRecord.email,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'User created successfully',
      user: userRecord,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login User using Firebase Client SDK
const loginUser = async (req, res) => {
  console.log('Received login request with:', req.body);
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    res.status(200).json({
      message: 'User logged in successfully',
      uid: user.uid,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logout User using Firebase Admin (example, typically handled by client)
const logoutUser = async (req, res) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json({ message: 'UID is required for logout.' });
  }
  try {
    await admin.auth().revokeRefreshTokens(uid);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
