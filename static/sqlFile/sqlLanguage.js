const addEmployee = 'CREATE TABLE employee (' +
    'empId       INTEGER      PRIMARY KEY,' +
    'name        VARCHAR (45) NOT NULL,' +
    'sex         INTEGER,' +
    'entryTime   VARCHAR (45) NOT NULL,' +
    'onTrial     INTEGER,' +
    'onJob       INTEGER,' +
    'regularTime VARCHAR (45),' +
    'tel         INTEGER (11));';


const addMonthlyAudit = 'CREATE TABLE monthly_audit (auditId          INTEGER      PRIMARY KEY,' +
    'empId            INTEGER (11) NOT NULL,' +
    'currentMonth     VARCHAR (45) NOT NULL,' +
    'otherReward      INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    ' bonus            INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'fine             INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    ' workingDay       INTEGER (11) NOT NULL' +
    'DEFAULT (21),' +
    'outTaxableSalary INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'leaveEarlyHours  INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'leaveEarlyTimes  INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'lateMinutes      INTEGER (11) DEFAULT (0)' +
    'NOT NULL,' +
    'lateHours        INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'lateTimes        INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'absenteeismDays  INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'leaveDays        INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    ' leaveHours       INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'staRisksAndFund  INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'staAccuDeduction INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'staTaxed         INTEGER (11) NOT NULL' +
    'DEFAULT (0),' +
    'staTaxableSalary INTEGER (11) NOT NULL' +
    'DEFAULT (0));';

const salary = 'CREATE TABLE salary (' +
    'salaryId           INTEGER      PRIMARY KEY,' +
    'employeeId         INTEGER,' +
    'fiveRisksByPerson  INTEGER (11) DEFAULT (0),' +
    'fiveRisksByCompany INTEGER      DEFAULT (0),' +
    'oneGoldByperson    INTEGER      DEFAULT (0),' +
    'oneGoldByCompany   INTEGER      DEFAULT (0),' +
    'grossPay           INTEGER      DEFAULT (0),' +
    'children           INTEGER      DEFAULT (0),' +
    'education          INTEGER      DEFAULT (0),' +
    'housing            INTEGER      DEFAULT (0),' +
    'seriousIllness     INTEGER      DEFAULT (0),' +
    'support            INTEGER      DEFAULT (0),' +
    'status             INTEGER      DEFAULT (0),' +
    'createTime         VARCHAR (45),' +
    'addition           INTEGER (11) DEFAULT (0));';
