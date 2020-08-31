
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/reset')

        const user = {
            'username':'testman',
            'name':'Henri',
            'password':'12345'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.get('#frontpageLogIn')
    })

    describe('Login', function() {
        it('Succeeds with correct credentials', function() {
            cy.get('#username').type('testman')
            cy.get('#password').type('12345')
            cy.get('#loginButton').click()

            cy.contains('testman logged in')
        })

        it('Fails with incorrect credentials', function() {
            cy.get('#username').type('testman')
            cy.get('#password').type('notTheCorrectPassword')
            cy.get('#loginButton').click()

            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            const credentials = {
                'username':'testman',
                'password':'12345'
            }
            cy.request('POST', 'http://localhost:3001/api/login', credentials)
            .then(res => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('Can create a new blog', function() {
            cy.get('#openNewBlogForm').click()

            cy.get('#title').type('testTitle')
            cy.get('#author').type('testAuthor')
            cy.get('#url').type('testUrl')
            cy.get('#createBlogButton').click()

            cy.get('#blogList').contains('testTitle')
            cy.get('#blogList').contains('testAuthor')
        })

        it('Can like a blog', function() {
            const blog = {
                'title':'Humble Pi',
                'author':'Matt Parker',
                'url':'standupmaths.com',
            }
            const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token
            cy.request({'method':'POST', 'url':'http://localhost:3001/api/blogs', 'body':blog, 'auth':{'bearer': token}})
            cy.visit('http://localhost:3000')

            cy.get('.minimalInfo').contains('Humble Pi').contains('view').click()
            cy.get('.allInfo').contains('Humble Pi').contains('like').click()

            cy.get('.allInfo').contains('Humble Pi').get('.likeAmount').contains('1')
        })
    })

})