// const pool = require('../connection/postgres');

// const getTest = async () => {
//     try {
//         const result = await pool.query('SELECT * FROM users');
//         console.log(result);
//         return (result.rows);
//     } catch (error) {
//         console.error('Error getting user details:', error);
//         res.status(500).json({ error: 'Failed to get user details' });
//     }
// };

// const postTest = async (name, phone) => {
//     try {
//         const result = await pool.query(
//             'INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *',
//             [name, phone]
//         );
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error saving user details:', error);
//         res.status(500).json({ error: 'Failed to save user details' });
//     }
// };
// module.exports = { getTest, postTest };
