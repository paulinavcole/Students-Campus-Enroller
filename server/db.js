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

const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const [fooState, bazzTech, barCollege] = 
    await Promise.all([
        await Campus.create({
            name: 'Foo State',
            imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Morgan_Hall_of_Williams_College_in_the_fall_%2827_October_2010%29.jpg/1200px-Morgan_Hall_of_Williams_College_in_the_fall_%2827_October_2010%29.jpg',
            address: '1 Foo Lane',
            description: 'Study with the best of the best at Foo State! Go Foos!'
        }),

        await Campus.create({
            name: 'Bazz Tech',
            imageURL: 'https://www.usnews.com/object/image/00000174-6a37-dd01-a576-ea3f3f510000/200907marist_college20?size=responsive640&update-time=',
            address: '3 Bazz Tech Road',
            description: 'The finest in STEM education- attend Bazz Tech to help create a new tomorrow today.'
        }),

        await Campus.create({
            name: 'Bar College',
            imageURL: 'https://static01.nyt.com/images/2020/03/14/upshot/14up-colleges-remote/14up-colleges-remote-mediumSquareAt3X.jpg',
            address: '345 Bar Lane',
            description: 'A fantastic liberal arts education awaits you here!'
        })
    ]);

    await Promise.all([
        Student.create({
            firstName: 'Moe',
            lastName: 'Calvin',
            email: 'moe.calvin@gmail.com',
            imageURL: 'https://i.pinimg.com/originals/7e/0e/42/7e0e4236af6d8dbbd67cf1fcb450ebea.png',
            gpa: 3.0,
            campusId: bazzTech.id
        }),

        Student.create({
            firstName: 'Lucy',
            lastName: 'Harris',
            email: 'lucy.harris@gmail.com',
            imageURL: 'https://www.pngitem.com/pimgs/m/81-813774_cartoon-student-png-free-photo-clipart-student-cartoon.png',
            gpa: 4.0,
            campusId: fooState.id
        }),

        Student.create({
            firstName: 'Ethyl',
            lastName: 'Lim',
            email: 'ethyl.lim@gmail.com',
            imageURL: 'https://img.freepik.com/premium-vector/girl-holding-book-isolated-cartoon-character-elementary-school-student-with-backpack_71593-230.jpg?w=2000',
            gpa: 3.5,
            campusId: fooState.id
        }),

        Student.create({
            firstName: 'Larry',
            lastName: 'Wood',
            email: 'larry.wood@gmail.com',
            imageURL: 'https://i.pinimg.com/originals/2c/45/9f/2c459f19e125b635253cc5472a819f98.jpg',
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