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

const Total = ({ parts }) => {
    return (
        <b>
        <p>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
        </b>
    )
}

const Course = ({ course }) => {
    
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course