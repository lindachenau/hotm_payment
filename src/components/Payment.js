import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import StripeForm from './StripeForm'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const stripe_charge_server = process.env.REACT_APP_STRIPE_CHARGE_SERVER
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const bookings_url = process.env.REACT_APP_HOTM_BOOKING_BACKEND
const contactPhone = process.env.REACT_APP_HOTM_CONTACT

const logo = require('../images/logo.png')

const useStyles = makeStyles(theme => ({
  container1: {
    display: 'flex',
    marginTop: 10,
    marginBottom: 20
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    maxWidth: '40%',
    width: 'auto',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 120,
    }
  }
}))

function Payment () {
 
  const classes = useStyles()

  const [query] = useState(queryString.parse(useLocation().search))
  const [bookingData, setBookingData] = useState(null)
  const [amount, setAmount] = useState(0)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTotal, setBookingTotal] = useState(0)

  useEffect(() => {
    const fetchBooking = async () => {
      const config = {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        url: `${bookings_url}/?booking_id=${query.booking_id}`
      }

      try {
        const result = await axios(config)
        setBookingData(result.data[0])
      } catch (err) {
        alert(`Unable to fetch booking data: ${err}. Please call ${contactPhone} to resolve this issue.`)
      }
    }

    fetchBooking()

  }, [])

  useEffect(() => {
    if (bookingData) {
      setAmount((bookingData.total_amount * query.percentage / 100).toFixed(2))
      setBookingDate(bookingData.booking_date)
      setBookingTotal(bookingData.total_amount)
    }
  }, [bookingData])

  const submit = async (token) => {
    // const charge = async (bookingId) => {
    //   const response = await fetch(stripe_charge_server, {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({
    //       id: token.id,
    //       description: `${userName}'s deposit for booking on ${bookingDate}`,
    //       amount: (amount * 100).toFixed(0)
    //     })
    //   })

    //   const {id, status} = await response.json()
    // }
  }

  return (
    <Container maxWidth="sm" style={{paddingTop: 20, paddingBottom: 20}}>
      <div className={classes.container1}>
        <div className={classes.grow} />
        <img className={classes.logo} src={logo} alt="Hair on the move logo" />
        <div className={classes.grow} />
      </div>      
      <Typography variant="body1" align="left" color="textPrimary">
        {`Paying ${query.payment_type} $${amount} for hotm2u booking_id: ${query.booking_id}`}
      </Typography>
      <Typography variant="body1" align="left" color="textPrimary">
        {`Booking date : ${bookingDate}`}
      </Typography>
      <Typography variant="body1" align="left" color="textPrimary" gutterBottom>
        {`Booking total : $${bookingTotal}`}
      </Typography>            
      <StripeForm stripePublicKey={stripePublicKey} handleCharge={submit} payMessage="Pay"/>
    </Container>
  )
}

export default Payment