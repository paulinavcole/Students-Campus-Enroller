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
        type: STRING,
        allowNull: true
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
        type: STRING,
        allowNull: true
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

const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const [fooState, bazzTech, barCollege] = 
    await Promise.all([
        await Campus.create({
            name: 'Foo State',
            imageURL: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/Hakoniwa-Academy.jpg?q=50&fit=crop&w=750&dpr=1.5',
            address: '1 Foo Lane',
            description: 'Study with the best of the best at Foo State! Go Foos!'
        }),

        await Campus.create({
            name: 'Bazz Tech',
            imageURL: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/07/Tokyo-Metropolitan-Advanced-Nurturing-High-School-.jpg?q=50&fit=crop&w=750&dpr=1.5',
            address: '3 Bazz Tech Road',
            description: 'The finest in STEM education- attend Bazz Tech to help create a new tomorrow today.'
        }),

        await Campus.create({
            name: 'Bar College',
            imageURL: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/07/Duel-Academy.jpg?q=50&fit=crop&w=750&dpr=1.5',
            address: '345 Bar Lane',
            description: 'A fantastic liberal arts education awaits you here!'
        })
    ]);

    await Promise.all([
        Student.create({
            firstName: 'Moe',
            lastName: 'Calvin',
            email: 'moe.calvin@gmail.com',
            imageURL: 'https://www.sanrio.co.jp/wp-content/uploads/2013/09/hellokitty_b.png',
            gpa: 3.0,
            campusId: bazzTech.id
        }),

        Student.create({
            firstName: 'Lucy',
            lastName: 'Harris',
            email: 'lucy.harris@gmail.com',
            imageURL: 'https://www.sanrio.co.jp/wp-content/uploads/2014/03/gudetama_b.png',
            gpa: 4.0,
            campusId: fooState.id
        }),

        Student.create({
            firstName: 'Ethyl',
            lastName: 'Lim',
            email: 'ethyl.lim@gmail.com',
            imageURL: 'https://www.sanrio.co.jp/wp-content/uploads/2013/09/kerokerokeroppi_b.png',
            gpa: 3.5,
            campusId: fooState.id
        }),

        Student.create({
            firstName: 'Larry',
            lastName: 'Wood',
            email: 'larry.wood@gmail.com',
            imageURL: 'https://www.sanrio.co.jp/wp-content/uploads/2013/09/cinnamoroll_b.png',
            gpa: 3.3,
            campusId: barCollege.id
        }),
    ]);
    console.log('data seeded!');
};

module.exports = {
    syncAndSeed,
    models: {
        Student,
        Campus
    }
}