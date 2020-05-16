import React from 'react'

const Content = ({ parts }) => {
    const content = parts.map(part =>
        <Part key={part.id} part={part} />  
    )
    return content
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Header = ({ header }) => {
    return (
        <h1>{header}</h1>
    )
}

const Course = ({ course }) => {
    
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course