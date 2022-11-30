import { showAlert } from './alerts.js';
const stripe = Stripe(
  'pk_test_51M9ZnJE8SuPTDTnnzFxTDoMEmvNXHSzAHOUeeeXaC7ju8GsgMb5tQZ7cwW0QvI7FJ7204zk2P85hUksJWAGB1r4M007gV92krn'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
