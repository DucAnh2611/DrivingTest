const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mssqlConfig = require("./ServerDB");
const sql = require("mssql");

const port  = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.status(200).json({message : "Listening"});
})
app.post('/loginState', async (req, res )=> {
    var userinfo = req.body;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            field:{}
        }
    };

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {

        var sqlReq = new sql.Request(conn);

        await sqlReq.query(`
            SELECT islogin FROM users
            WHERE username = '${userinfo.username}' 
        `).then((data) => {
            if(data.recordsets[0][0].islogin==1) {
                defRes.status= 200;
                defRes.context.status= "ok";
            }
        });
        res.status(defRes.status).json({...defRes.context});
    })
})
app.post('/loginAuth', async (req, res) => {
    var userinfo = req.body;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            field: ""
        }
    };

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {
        var sqlReq = new sql.Request(conn);
        await sqlReq.query(`
            SELECT pass FROM users
            WHERE username = '${userinfo.username}' 
        `).then(async (data) => {
            if(data.rowsAffected[0]!=0) {
                let userLoginData = data.recordsets[0][0];
                if(userLoginData.pass == userinfo.password){
                    await sqlReq.query(`
                        UPDATE users
                        SET islogin = 1
                        WHERE username = '${userinfo.username}' 
                    `).then(async () => {
                        defRes.status= 200;
                        defRes.context.status= "ok";                        
                    });

                }
                else {
                    defRes.context.field="password";
                }
            } else {
                defRes.context.field="username";
            }
            res.status(defRes.status).json({...defRes.context})
        });
    })
});
app.post('/signAuth', async (req, res) => {
    var userinfo = req.body;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            field:[]
        }
    }

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {

        var sqlReq = new sql.Request(conn);
        var listKey = Object.keys(userinfo);
        var sameInfo = false;

        for(let i =0; i< listKey.length; i++) {
            if(listKey[i] != "pass" && listKey[i] != "birthday" && listKey[i] != "fullname") {
                await sqlReq.query(`
                    SELECT * 
                    FROM users
                    WHERE ${listKey[i]} = '${userinfo[listKey[i]]}'
                `).then(async (data) => {
                    if(data.rowsAffected[0] !=0 ) {
                        sameInfo = true;
                        defRes.context.field.push({
                            field: listKey[i],
                            msg: `Da ton tai`
                        })
                    }
                });
            }        
        }
        if(!sameInfo) {
            defRes.status = 200;
            defRes.context.status = "ok";
            await sqlReq.query(`INSERT INTO users VALUES(
                N'${userinfo.fullname}',
                'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
                '${userinfo.username}',
                '${userinfo.pass}',
                GETDATE(),
                '${userinfo.phone}',
                '${userinfo.email}',
                '${userinfo.birthday}',
                1,
                GETDATE()
            )`)
        }
        res.status(defRes.status).json({...defRes.context});   

    })

});

app.get('/user/:username',async (req, res) => {
    var username = req.params.username;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: {}
        }
    }

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {

        var sqlReq = new sql.Request(conn);

        await sqlReq.query(`
            SELECT fullname, birthday, avatar, username, createdate, phone, email
            FROM users
            WHERE username = '${username}'
        `).then(async (data) => {
            if(data.rowsAffected[0] !=0 ) {
                let userData = data.recordsets[0][0];
                defRes.status = 200;
                defRes.context.data = userData;
            }
        });
        res.status(defRes.status).json({...defRes.context});   

    })

})

app.get('/search/test', async (req, res) => {
    var testname = req.query.key;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: []
        }
    };

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {
        var sqlReq = new sql.Request(conn);
        await sqlReq.query(`
            SELECT * 
            FROM tests
            WHERE testname LIKE N'%${testname}%'
        `).then((data) => {
            if(data.rowsAffected[0]!==0 ) {
                let results = data.recordsets[0];
                defRes= {
                    status: 200,
                    context: {
                        status: "ok",
                        data: results
                    }
                };
            }
        });
        res.status(defRes.status).json({...defRes.context});
    })
})
app.get('/test/:testid/getQues', async (req, res) => {
    var testid = req.params.testid;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: []
        }
    };
    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {
        var sqlReq = new sql.Request(conn);
        await sqlReq.query(`
            SELECT * FROM tests WHERE id = ${testid}
        `).then(async (data) => {
            let TestInfo = {
                test: {
                    questionquantity: data.recordsets[0][0].questionquantity,
                    testname: data.recordsets[0][0].testname,
                    imagetest: data.recordsets[0][0].imagetest,
                    timecount: data.recordsets[0][0].timecount,
                    verifypoint: data.recordsets[0][0].verifypoint,
                },
                questions: []
            }
            let quesQuan = data.recordsets[0][0].questionquantity;
            let ListIndx = [];

            for(let time = 0; time < quesQuan; time++) {
                let stateIndx = true;
                let indx = Math.ceil(Math.random()*200);
            
                ListIndx.forEach(element=>{
                    if(indx == element) {
                        stateIndx = false;
                        time--;
                    }
                })
                if(stateIndx) {
                    ListIndx.push(indx);
                }
            };
            ListIndx = ListIndx.sort(function(a, b){return a-b});
            for(let i = 0; i<quesQuan ; i++) {
                await sqlReq.query(`
                    SELECT a.context as ansContext, q.context as quesContext, q.imagequestion, q.id as quesid, a.id as ansid
                    FROM questions as q INNER JOIN answeres as a ON q.id = a.questionid
                    WHERE q.id = ${ListIndx[i]}
                `).then((data) => {
                    var quesData = data.recordsets[0];
                    var QuestionRes = {
                        id:  quesData[0].quesid,
                        question: quesData[0].quesContext,
                        img: quesData[0].imagequestion,
                        ans: []
                    };
                    quesData.forEach(element => {
                        QuestionRes.ans.push({
                            id: element.ansid,
                            context: element.ansContext
                        });
                    });
                    TestInfo.questions.push(QuestionRes);
                });

            };
            defRes={
                status: 200,
                context: {
                    status: "ok",
                    data: TestInfo
                }
            }
            res.status(defRes.status).json({...defRes.context});   
        });
    });
});
app.get('/getAllTest', (req, res ) => {
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: []
        }
    }
    sql.connect(mssqlConfig, (err) => {
        if(err) throw err
        let sqlReq = new sql.Request();

        sqlReq.query(`
            SELECT *
            FROM tests`, (err, re) => {
                if(err) throw err
                let results = re.recordsets[0];
                defRes= {
                    status: 200,
                    context: {
                        status: "ok",
                        data: results
                    }
                };
                sql.close();
                res.status(defRes.status).json({...defRes.context})
            })
    });
})
app.post("/submitTest", async (req, response) => {   
    var testSubmitedInfo = req.body;

    var defRes = {
        status: 404,
        context: {
            status: "denined",
        }
    };
    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {
        var sqlReq = new sql.Request(conn);

        await sqlReq.query(`
            SELECT * FROM users WHERE username = '${testSubmitedInfo.userInfo.username}'
        `).then(async (data) => {

            let user = data.recordsets[0][0];
            let userid = user.id;
            let listQues = testSubmitedInfo.testSubmit.questions;
            let userpoint=0;

            for(let i =0 ; i< listQues.length; i++){
                
                await sqlReq.query(`
                    SELECT a.istrue, q.points
                    FROM questions as q INNER JOIN answeres as a ON q.id = a.questionid 
                    WHERE a.id = ${listQues[i].ansid}
                `).then(async (results) => {
                    if(results.rowsAffected[0] !==0) {
                        let UserAnswereRes = results.recordsets[0][0];
                        if(UserAnswereRes.istrue == 1) {
                            userpoint += UserAnswereRes.points;
                        }
                    }

                })
            }

            await sqlReq.query(`
                INSERT INTO histories VALUES( '${testSubmitedInfo.testSubmit.test.attemp}', '${testSubmitedInfo.testSubmit.test.finish}' ,${userpoint}, GETDATE(), ${userid})
                SELECT SCOPE_IDENTITY() as historiesid
            `).then(async (data) => {

                let historiesid = data.recordsets[0][0].historiesid;

                for(let i =0 ; i< listQues.length; i++){
                    await sqlReq.query(`
                        SELECT a.istrue
                        FROM questions as q INNER JOIN answeres as a ON q.id = a.questionid 
                        WHERE a.id = ${listQues[i].ansid}
                    `).then(async (results) => {

                        var trueAns = 0;
                        if(results.rowsAffected[0] !== 0 ) {
                            trueAns = results.recordsets[0][0].istrue;
                        }
                        let query = `
                            INSERT INTO history_test VALUES(${historiesid}, ${testSubmitedInfo.testSubmit.test.id}, ${listQues[i].quesid}, NULL, ${trueAns})
                        `
                        if(listQues[i].ansid !== 0 ) {
                            query = `
                                INSERT INTO history_test VALUES(${historiesid}, ${testSubmitedInfo.testSubmit.test.id}, ${listQues[i].quesid}, ${listQues[i].ansid}, ${trueAns})
                            `
                        } 
                        await sqlReq.query(query)  ;
                    })
                }

                await sqlReq.query(`
                    SELECT h.points, t.questionquantity, h.id, t.verifypoint
                    FROM users as u INNER JOIN histories as h ON u.id = h.userid
                                    INNER JOIN history_test as ht ON h.id = ht.historyid
                                    INNER JOIN tests as t ON ht.testid = t.id
                    WHERE u.id = ${userid} AND  h.id = ${historiesid}
                `).then(async (data) => {
                    let userInfo = {
                        fullname: user.fullname,
                        phone: user.phone,
                        email: user.email,
                        birthday: user.birthday
                    }
                    let dataPointTest = data.recordsets[0][0];
                    defRes = {
                        status: 200,
                        context: {
                            status: "ok",
                            data: {
                                userInfo: userInfo,
                                test_history: {
                                    historyid: dataPointTest.id,
                                    point: dataPointTest.points,
                                    verifypoint: dataPointTest.verifypoint,
                                    questionquantity: dataPointTest.questionquantity
                                }
                            }
                        }
                    };
                });
                response.status(defRes.status).json({...defRes.context});   
            });
        })
    })
});

app.get('/history/:username', async (req, res) => {
    var username = req.params.username;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: []
        }
    };

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {
        var sqlReq = new sql.Request(conn);
        await sqlReq.query(`
        SELECT testname, h.points, h.id, verifypoint, questionquantity, attempdate, datefinish
            FROM users as u INNER JOIN histories as h on u.id = h.userid
                            INNER JOIN history_test as h_t on h.id = h_t.historyid
                            INNER JOIN tests as t on h_t.testid=t.id
            WHERE u.username = '${username}'
            GROUP BY testname, h.points, h.id, verifypoint, questionquantity, attempdate, datefinish
            ORDER BY attempdate DESC
        `).then(async (data) => {
            if(data.rowsAffected[0]!=0) {
                defRes.context.data = data.recordsets[0];
                defRes.status= 200;
                defRes.context.status= "ok";                        
            }
            res.status(defRes.status).json({...defRes.context})
        });
    })
})

app.get('/results/:historyid', async (request, response) => {
    var historyid = request.params.historyid;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: {}
        }
    }
    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {

        var sqlReq = new sql.Request(conn);
        
        await sqlReq.query(`
            SELECT u.fullname, u.phone, u.email, u.birthday, h.points
            FROM users as u INNER JOIN histories as h ON u.id = h.userid
            WHERE h.id = ${historyid}
        `).then(async (data) => {

            let userSubmitInfo = data.recordsets[0][0];

            await sqlReq.query(`
                SELECT DISTINCT t.testname, t.timecount, t.verifypoint, t.questionquantity, t.imagetest
                FROM history_test as ht INNER JOIN tests as t ON ht.testid= t.id
                WHERE ht.historyid = ${historyid}
            `).then(async data => {

                let TestInfo = data.recordsets[0][0];

                await sqlReq.query(`
                    SELECT answereid, questionid, q.context, q.imagequestion, q.explain
                    FROM history_test as ht INNER JOIN questions as q ON ht.questionid=q.id
                    WHERE historyid = ${historyid}
                    ORDER BY questionid ASC
                `).then(async data => {

                    let ListAnswered= data.recordsets[0];

                    for(let i =0; i< ListAnswered.length; i++) {

                        await sqlReq.query(`
                            SELECT a.id, a.context, a.istrue
                            FROM answeres as a INNER JOIN questions as q ON a.questionid = q.id
                            WHERE q.id = ${ListAnswered[i].questionid}
                        `).then(async data => {

                           ListAnswered[i] = {...ListAnswered[i],  ansQues: data.recordsets[0]};

                        })
                    }
                    defRes.status = 200;

                    defRes.context.data= {
                        userInfo: userSubmitInfo,
                        testInfo: TestInfo,
                        historyInfo: ListAnswered

                    }
                })
            })
        });
        response.status(defRes.status).json({...defRes.context});
    })
});
app.post('/statistic/test', async (request, response) => {
    var username = request.body.username;
    var year = request.body.year;

    var defRes = {
        status: 404,
        context: {
            status: "denined",
            data: {}
        }
    }

    var conn = new sql.ConnectionPool(mssqlConfig);
    await conn.connect().then(async () => {

        var sqlReq = new sql.Request(conn);
        
        await sqlReq.query(`
            SELECT id
            FROM users
            WHERE username = '${username}'
        `).then(async (data) => {

            let userid = data.recordsets[0][0].id;

            await sqlReq.query(`
                SELECT points , attempdate, datefinish
                FROM histories
                WHERE userid = ${userid} AND YEAR(attempdate) = ${year}
                ORDER BY attempdate ASC
            `).then(async (data) => {
                
                let listPoints = data.recordsets[0];
                let listResults = new Array(12).fill([]);

                listPoints.forEach(element => {
                    let monthCur = new Date(element.attempdate).getMonth()+1;

                    listResults[monthCur-1]= [...listResults[monthCur-1], element];
                });

                defRes = {
                    status: 200,
                    context: {
                        status: 'ok',
                        data: listResults
                    }
                }

            })

        });
        response.status(defRes.status).json({...defRes.context});
    })

})

app.post('/addquestion', async (request, response) => {
    var questionInfo = request.body;
    var testid = request.params.testid;
    var defRes = {
        status: 404,
        context: {
            status: "denined",
        }
    }
    sql.connect(mssqlConfig, (err) => {
        if(err) throw err;
        let sqlReq = new sql.Request();
        sqlReq.query(`
            INSERT INTO questions VALUES(N'${questionInfo.questionname}', GETDATE(), GETDATE())
            SELECT SCOPE_IDENTITY() as questionid
        `, (err, res) => {
            if(err) throw err;
            
            let lastId = res.recordsets[0][0].questionid;
            if(err) throw err;
            questionInfo.ans.forEach((answ) => {
                let istrue = 0;
                if(answ.istrue) {
                    istrue = 1;
                }
                sqlReq.query(`INSERT INTO answeres VALUES(N'${answ.context}', ${istrue}, GETDATE(), GETDATE(), ${lastId})`);
            });
            defRes = {
                status: 200,
                context: {
                    status: "ok",
                }
            }
            response.status(defRes.status).json({...defRes.context});
        });
    });
} )

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});