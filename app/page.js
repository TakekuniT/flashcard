'use client';

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from 'next/link';


export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'https://flashcard-2761en3wo-takekuni-tanemoris-projects.vercel.app/', //change later
      },
    });

    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return
    };
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
    if (error){
      console.warn(error.message);
    }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>
          Flashcard SaaS
        </title>
        <meta name="description" content="Create flashcard from your text"/>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant = "h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign ip</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
          textAlign:'center',
          my:4,
        }}>
        <Typography variant="h2">
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5">
          {' '}
          The easiest way to make flashcards from your test
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}} component={Link} href="/generate">
          Get started
        </Button>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant ="h4" >
          Features
        </Typography>
        <Grid container space={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Smart Flashcards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into precise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Accessible Anywhere
            </Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
          
        </Grid>
      </Box>
      <Box sx={{my:6, textAlign: 'center'}}>
        <Typography variant ="h4" >
          Pricing
        </Typography>
        <Grid container space={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{p:3, border: '1px solid', 
              borderColor: 'grey.300', 
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
            <Typography gutterBottom>
              {' '}
              Access to basic flashcard features and limited storage 
            </Typography>
            <Button variant="contained" color="primary">
              Choose basic
            </Button>

            </Box>
            
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{p:3, border: '1px solid', 
              borderColor: 'grey.300', 
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
            <Typography gutterBottom>
              {' '}
              Access to unlimited flashcards and storage with priority supports 
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{mt:2}} 
              onClick={handleSubmit}
            >
              Choose Pro
            </Button>

            </Box>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
}
