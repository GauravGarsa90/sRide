import * as mysql from 'mysql';
import * as util from 'util';

const con = mysql.createConnection({
    host: "localhost",
    user: "srideuser",
    password: "sridepassword",
    database: "sride"
  });
const query = util.promisify(con.query).bind(con);
export const writeAuditLogs = async (info: {time: Date, response: string, prime: number}) => {
    try {
        const updateQuery = "INSERT INTO audit_logs " +
                                "(date, response, was_prime) " + 
                                "VALUES ('" +
                                info.time.toDateString() + "', '" +
                                info.response + "', '" +
                                info.prime + "')";
        const update = await query(updateQuery);
    } catch (error) {
        console.error(error, JSON.stringify(info));
    }finally{
        return;
    }
}