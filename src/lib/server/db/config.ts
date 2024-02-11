import mysql from "mysql2/promise";

export async function initConnection() {
    const mysqlconn = await mysql.createConnection({
      host: "eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
      user: "qm28i5h4vmg5m4o4",
      password: "ko5f9fz9n1t4499s",
      database: "vbyr7szy10we9x4j",
    });

  return mysqlconn;
}