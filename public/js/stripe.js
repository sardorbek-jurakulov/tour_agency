/* eslint-disable */
import axios from 'aios';
const stripe = Stripe('pk_test_51N9KXcJcWjJ4YG45ujZJwf5nLKyjvswEcL6g4yaWnXTHknjwKLKyf5IhWjCzxM566YHUdzsBuID6lx2hBxIbvbAq005Y0nK9b8');

export const bookTour = async (tourId) => {
  // 1) Get checkout session from API
  const session = await axios()

  // 2) Create checkout form + charge credit card


}