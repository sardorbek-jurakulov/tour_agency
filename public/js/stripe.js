/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe('pk_test_51N9KXcJcWjJ4YG45ujZJwf5nLKyjvswEcL6g4yaWnXTHknjwKLKyf5IhWjCzxM566YHUdzsBuID6lx2hBxIbvbAq005Y0nK9b8');
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch(err) {
    console.log(err);
    showAlert('error', err);
  }
};