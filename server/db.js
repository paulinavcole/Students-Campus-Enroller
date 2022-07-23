const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

const { STRING, TEXT, DECIMAL } = Sequelize;

const Student = conn.define('student', {
    firstName: {
        type: STRING, 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageURL: {
        type: STRING
    },
    gpa: {
        type: DECIMAL,
        validate: {
            isDecimal: true,
            min: 0.0,
            max: 4.0
        }
    }
});

const Campus = conn.define('campus', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageURL: {
        type: STRING
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: TEXT
    }
});

Student.belongsTo(Campus);
Campus.hasMany(Student);