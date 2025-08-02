const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "system",
  connectString: "localhost:1521/XEXDB",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  let Sql;
  console.log(typeof Parameters[2]);
  Details = Parameters[2];
  fields=['Name','Age','Sal']
  try {
    Details = eval('(${Parameters[2]}');
  } catch (err) {}
  switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.Name}',${Details.Age},'${Details.Sal}')`;
      break;
    case "Read":
      Sql = `select * from ${Parameters[0]}`;
      break;
    case "Update":
      Sql= `update ${Parameters[0]} set Sal='${Details.Sal}' where  Name='${Details.Name}' `;
      break;
    case "Delete":
      Sql=`delete from ${Parameters[0]} where  Name='${Details.Name}'`;
      break;
    
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};
module.exports = Result;
