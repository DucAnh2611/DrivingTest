require("dotenv").config();
const mssqlConfig ={
    user: 'sa',
    password: '1',
    server: 'DESKTOP-2P355OA\\LEARNING',
    database: 'DrivingLicense',
    options: { trustServerCertificate: true, enableArithAort: true },
    port: 1433
  }
const sql = require("mssql");
const listQues = require("./db/ques200.json");

sql.connect(mssqlConfig , err => {
    if(err) throw err;
    let sqlReq = new sql.Request();
    listQues.forEach(async ques => {
        sqlReq.query(`
            INSERT INTO questions VALUES( N'${ques.question}', '${ques.img}', GETDATE(), GETDATE(), ${ques.point}, N'${ques.expain}' )
            SELECT SCOPE_IDENTITY() as id
        `, (err, res) => {

            if(err) throw err;
            let quesid = res.recordsets[0][0].id;
            let listAns = ques.ans;
            listAns.forEach(async ans => {
                let istrue = 0;
                if(ans.correct) {
                    istrue = 1;
                }
                sqlReq.query(`
                    INSERT INTO answeres VALUES(N'${ans.context}', ${istrue}, GETDATE(), GETDATE(), ${quesid})
                `, err => {
                    if(err) throw err ;
                    console.log("sucessful!");
                });
            })
        })
    })
    // sqlReq.query(``)
})
