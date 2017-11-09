module.exports = function(sequelize, DataTypes) {
  var Record = sequelize.define("Record", {
    user_name: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  // Record.sync({force:true});

  return Record;
};
