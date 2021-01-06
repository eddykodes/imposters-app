import React from 'react'

// Material UI
import Container from '@material-ui/core/Container'

export default function Layout(props) {
  return (
    <Container>
      { props.children }
    </Container>
  )
}
