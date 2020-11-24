import React, { Component } from 'react'

function Header() {
  return <div>Header</div>
}

function Main() {
  return <div>Main</div>
}

function Banner() {
  return <div>Banner</div>
}

function Footer() {
  return <div>Footer</div>
}

export default class Test01 extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
