/**
 * This file will contain dummy data for user related requests.
 */
module.exports = {
    create_data : {
        name: 'Martin',
        email: 'martintinmar@gmail.com',
        password: 'martin1234'
    },
    create_data_incorrect : {
        name: 'Martin',
        email: 'martintinmar@gmail.com',
        password: 'mart'
    },
    new_user_data : {
        name: 'John',
        email: 'john.nhoj@gmail.com',
        password: 'jonny1234'
    },
    login_data : {
        email: 'john.nhoj@gmail.com',
	    password: 'jonny1234'
    },
    login_data_incorrect : {
        email: 'john.nhoj@gmail.com',
	    password: 'wrongpass'
    }
}