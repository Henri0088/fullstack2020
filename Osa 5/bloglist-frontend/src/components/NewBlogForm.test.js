import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('Test NewBlogForm.js', () => {
    test('Test that NewBlogForm.js calls the callback with correct values', () => {
        const hB = jest.fn()
        let component = render(
            <NewBlogForm handleNewBlog={hB}/>
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        fireEvent.change(title, {
            target: { value: 'sample title' }
        })

        fireEvent.change(author, {
            target: { value: 'sample author' }
        })

        fireEvent.change(url, {
            target: { value: 'sample url' }
        })

        fireEvent.submit(component.container.querySelector("#form"))

        expect(hB.mock.calls).toHaveLength(1)
        expect(hB.mock.calls[0][0]).toEqual({
            'title': 'sample title',
            'author': 'sample author',
            'url': 'sample url'
        })
    })
})

