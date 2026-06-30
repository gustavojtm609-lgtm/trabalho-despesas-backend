const { UserDB } = require('./user');
const { CategoryDB } = require('./category');
const { ExpenseDB } = require('./expense');

// Cria o relacionamento de 1 para Muitos (Um usuário tem várias despesas)
UserDB.hasMany(ExpenseDB, { foreignKey: 'usuarioId', as: 'expenses' });
ExpenseDB.belongsTo(UserDB, { foreignKey: 'usuarioId', as: 'user' });

// Cria o relacionamento de 1 para Muitos (Uma categoria tem várias despesas)
CategoryDB.hasMany(ExpenseDB, { foreignKey: 'categoriaId', as: 'expenses' });
ExpenseDB.belongsTo(CategoryDB, { foreignKey: 'categoriaId', as: 'category' });

module.exports = { UserDB, CategoryDB, ExpenseDB };