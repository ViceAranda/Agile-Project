import { json } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";

export async function POST({ request }) {
  const { st } = await request.json();
  const mysqlconn = await mysqlconnFn();
  const results = await mysqlconn
    .query("SELECT * FROM USERS where fname = '" + st + "'")
    .then(function ([rows]) {
      //     console.log("Got this far!!");
      //     console.log(rows);
      return rows;
    });

  return json(results);
}