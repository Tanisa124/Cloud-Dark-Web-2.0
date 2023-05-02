import HomePage from "@/components/home/HomePage";
import { setCartState } from "@/store/CartSlice";
import { wrapper } from "@/store/store";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(setCartState(store.getState().cart.cartState));
      return {
        props: {
          cartState: store.getState().cart.cartState,
        },
      };
    }
);
