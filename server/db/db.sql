-- CREATE DATABASE DrivingLicense
-- GO

USE DrivingLicense

DROP TABLE history_test
DROP TABLE answeres
DROP TABLE questions
DROP TABLE tests
DROP TABLE histories    
DROP TABLE users

CREATE TABLE users (
    id INT IDENTITY(1,1) NOT NULL,
    fullname nvarchar(100) NOT NULL,
    avatar varchar(500) NOT NULL,
    username varchar(20) NOT NULL,
    pass varchar(30) NOT NULL,
    createdate DATE NOT NULL,
    phone varchar(10) NOT NULL,
    email varchar(50) NOT NULL,
    birthday DATE NOT NULL,
    islogin INT NOT NULL,
    lastmodify DATETIME NOT NULL,

    PRIMARY KEY (id)
)
INSERT INTO users VALUES (N'Nguyen Hoang Duc Anh', 'https://elearning.thanglong.edu.vn/pluginfile.php/175751/user/icon/monocolor/f1?rev=3672259','ducanh2611', '1', GETDATE(), '0359314079', 'ducanhmc24@gmail.com', '2002-11-26', 1, GETDATE())

CREATE TABLE histories (
    id INT IDENTITY(1,1) NOT NULL,
    attempdate DATETIME NOT NULL,
    datefinish DATETIME NOT NULL,
    points FLOAT NOT NULL,
    lastmodify DATETIME NOT NULL,
    userid INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id)
)


CREATE TABLE tests(
    id INT IDENTITY(1,1) NOT NULL,
    testname nvarchar(50) NOT NULL,
    timecount INT NOT NULL,
    imagetest varchar(500),
    questionquantity INT NOT NULL,
    verifypoint INT NOT NULL,
    lastmodify DATETIME NOT NULL,

    PRIMARY KEY (id)
)

INSERT INTO tests VALUES (N'Kiểm tra trắc nghiệm bằng lái xe máy 2023', 15, 'https://truongdaylaixehcm.edu.vn/wp-content/uploads/2021/03/Thi-bang-lai-xe-may-Ben-Luc-Long-An.jpg', 25, 21, GETDATE())

CREATE TABLE questions(
    id INT IDENTITY(1,1) NOT NULL,
    context nvarchar(500) NOT NULL,
    imagequestion varchar(500),
    createdate DATETIME NOT NULL,
    lastmodify DATETIME NOT NULL,
    points INT NOT NULL,
    explain nvarchar(500) NOT NULL,

    PRIMARY KEY (id),
)

CREATE TABLE answeres(
    id INT IDENTITY(1,1) NOT NULL,
    context nvarchar(500) NOT NULL,
    istrue INT NOT NULL,
    createdate DATETIME NOT NULL,
    lastmodify DATETIME NOT NULL,
    questionid INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (questionid) REFERENCES questions(id)
    
)

CREATE TABLE history_test(
    historyid INT NOT NULL,
    testid INT NOT NULL,
    questionid  INT NOT NULL,

    answereid INT,
    istrue INT NOT NULL,

    FOREIGN KEY (historyid) REFERENCES histories(id),
    FOREIGN KEY (testid) REFERENCES tests(id),
    FOREIGN KEY (questionid) REFERENCES questions(id)
)

ALTER TABLE history_test
ADD CONSTRAINT PK_h_t PRIMARY KEY (historyid, testid, questionid)

CREATE INDEX user_idx ON users(id, fullname, username, phone, email)
CREATE INDEX histories_idx ON histories(id, points, userid)
CREATE INDEX test_idx on tests(id, testname)
CREATE INDEX question_idx ON questions(id, context)
CREATE INDEX answere ON answeres(id, context, createdate, questionid)
CREATE INDEX history_test_idx ON history_test(historyid, testid, questionid, answereid)