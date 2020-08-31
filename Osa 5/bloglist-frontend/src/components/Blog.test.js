import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Test Blog.js', () => {
    let component
    let hL
    let hR

    beforeEach(() => {
        hL = jest.fn()
        hR = jest.fn()

        const testUser = {
            'name': 'testman',
            'id': 123
        }

        const testBlog = {
            'title': 'testTitle',
            'author': 'testAuthor',
            'url': 'test.com',
            'likes': 2,
            'user': testUser
        }

        component = render(
            <Blog blog={testBlog} handleNewLike={hL} user={testUser} handleRemove={hR}/>
        )
    })

    test('Renders only the author and title at first', () => {
        const minDiv = component.container.querySelector('.minimalInfo')
        const maxDiv = component.container.querySelector('.allInfo')
        expect(minDiv).not.toHaveStyle(`display:none`)
        expect(maxDiv).toHaveStyle(`display:none`)
    })

    test('Renders all info when view button clicked', () => {
        const minDiv = component.container.querySelector('.minimalInfo')
        const maxDiv = component.container.querySelector('.allInfo')
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(maxDiv).not.toHaveStyle(`display:none`)
        expect(minDiv).toHaveStyle(`display:none`)
    })

    test('Clicking like twice calls hL twice', () => {
        fireEvent.click(component.getByText('view'))
        fireEvent.click(component.getByText('like'))
        fireEvent.click(component.getByText('like'))
        expect(hL.mock.calls).toHaveLength(2)
    })
})